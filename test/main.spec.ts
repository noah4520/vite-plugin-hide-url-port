import { describe, it, expect, vi } from 'vitest'
import { hideUrlPort } from '../src/main'
import type { ViteDevServer } from 'vite'

type ServerWithUrls = ViteDevServer & {
  resolvedUrls: NonNullable<ViteDevServer['resolvedUrls']>
}

describe('hideUrlPort', () => {
  it('should return plugin with correct name', () => {
    const plugin = hideUrlPort()
    expect(plugin.name).toBe('hide-url-port')
  })

  it('should configure server to hide port', () => {
    const plugin = hideUrlPort()
    const mockPrintUrls = vi.fn()
    const mockServer = {
      printUrls: mockPrintUrls,
      config: { server: { port: 3000 } },
      resolvedUrls: {
        local: ['http://localhost:3000'],
        network: ['http://192.168.1.1:3000'],
      },
    } as unknown as ServerWithUrls

    const serverHook = plugin.configureServer(mockServer)
    serverHook()

    mockServer.printUrls()

    expect(mockServer.resolvedUrls.local[0]).toBe('http://localhost')
    expect(mockServer.resolvedUrls.network[0]).toBe('http://192.168.1.1')
    expect(mockPrintUrls).toHaveBeenCalled()
  })

  it('should override port when overridePort is provided', () => {
    const plugin = hideUrlPort({ overridePort: 8080 })
    const mockPrintUrls = vi.fn()
    const mockServer = {
      printUrls: mockPrintUrls,
      config: { server: { port: 3000 } },
      resolvedUrls: {
        local: ['http://localhost:3000'],
        network: ['http://192.168.1.1:3000'],
      },
    } as unknown as ServerWithUrls

    const serverHook = plugin.configureServer(mockServer)
    serverHook()

    mockServer.printUrls()

    expect(mockServer.resolvedUrls.local[0]).toBe('http://localhost:8080')
    expect(mockServer.resolvedUrls.network[0]).toBe('http://192.168.1.1:8080')
    expect(mockPrintUrls).toHaveBeenCalled()
  })

  it('should handle string override port', () => {
    const plugin = hideUrlPort({ overridePort: '9000' })
    const mockPrintUrls = vi.fn()
    const mockServer = {
      printUrls: mockPrintUrls,
      config: { server: { port: 3000 } },
      resolvedUrls: {
        local: ['http://localhost:3000'],
        network: [],
      },
    } as unknown as ServerWithUrls

    const serverHook = plugin.configureServer(mockServer)
    serverHook()

    mockServer.printUrls()

    expect(mockServer.resolvedUrls.local[0]).toBe('http://localhost:9000')
  })

  it('should handle override port not being a number', () => {
    const plugin = hideUrlPort({ overridePort: 'not-a-number' })
    const mockPrintUrls = vi.fn()
    const mockServer = {
      printUrls: mockPrintUrls,
      config: { server: { port: 3000 } },
      resolvedUrls: {
        local: ['http://localhost:3000'],
        network: [],
      },
    } as unknown as ServerWithUrls

    const serverHook = plugin.configureServer(mockServer)
    serverHook()

    mockServer.printUrls()

    expect(mockServer.resolvedUrls.local[0]).toBe('http://localhost:3000')
  })
})
