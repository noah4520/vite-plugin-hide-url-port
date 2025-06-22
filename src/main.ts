import type { ViteDevServer } from 'vite'

export type hideUrlPortConfig = {
  /**
   * Override the port in printed URLs. Must be a number or numeric string.
   */
  overridePort?: number | string
}

/**
 * Replace the port in a URL string.
 * @param url Original URL
 * @param currentPort Port to replace
 * @param targetPort Port string to replace with (may be empty string)
 * @returns Updated URL
 */
function replacePort(url: string, currentPort: number | string, targetPort: string): string {
  return url.replace(`:${currentPort}`, targetPort)
}

/**
 * Vite plugin to hide or override port in printed dev server URLs.
 * @param config plugin configuration
 * @returns Vite plugin object
 */
export function hideUrlPort(config: hideUrlPortConfig = {}) {
  const { overridePort } = config
  let skipModifyPort = false
  let targetPort = ''

  if (overridePort !== undefined) {
    const portStr = String(overridePort)
    if (!/^\d+$/.test(portStr)) {
      console.error(
        `\x1b[31mError: Invalid overridePort "${overridePort}". ` +
          `overridePort must be a numeric string or number.\n` +
          `No override applied—URLs will be printed with their original port.\x1b[0m`,
      )
      skipModifyPort = true
    } else {
      targetPort = `:${portStr}`
    }
  }

  return {
    name: 'hide-url-port',
    configureServer(server: ViteDevServer) {
      return () => {
        const originalPrint = server.printUrls.bind(server)
        const currentPort = server.config.server?.port

        server.printUrls = () => {
          if (!skipModifyPort && server.resolvedUrls) {
            const replace = (url: string) => replacePort(url, currentPort, targetPort)
            server.resolvedUrls.local = server.resolvedUrls.local.map(replace)
            server.resolvedUrls.network = server.resolvedUrls.network.map(replace)
          }
          originalPrint()
        }
      }
    },
  }
}

export default { hideUrlPort }
