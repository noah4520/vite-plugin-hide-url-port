# vite-plugin-hide-url-port

**A Vite plugin to customize or hide port numbers printed in dev server URLs.**  
Make Vite's console output match the actual port you access in Docker / DevContainer / Cloud IDE environments, improving clarity and experience.

## ✨ Why this plugin?

When working inside Docker, DevContainer, or Cloud IDEs, the port Vite shows in console logs (e.g., `5173`) often doesn't match the port you're actually using (e.g., `443`). This can confuse developers and testers.

👉 This plugin allows you to:

- **Remove the port**: e.g., `https://localhost/`
- **Override the port**: e.g., `https://localhost:443/`
- **Non-intrusive**: It only changes the console output, not the actual server port.

## 🚀 Installation

```bash
pnpm add -D vite-plugin-hide-url-port
# or
npm install -D vite-plugin-hide-url-port
# or
yarn add -D vite-plugin-hide-url-port
```

## 🛠 Usage

In your vite.config.ts:

```ts
import hideUrlsPort from 'vite-plugin-hide-url-port'

export default {
  plugins: [
    hideUrlsPort({
      port: 443, // Show port 443 in printed URLs. Leave empty to remove port display.
    }),
  ],
}
```

## ⚙ Configuration

| Name         | Type             | Default   | Description                                                                     |
| :----------- | :--------------- | :-------- | :------------------------------------------------------------------------------ |
| overridePort | number \| string | undefined | The port to display in URLs. If not set, the port will be removed from display. |

Example:

```ts
// Show as https://localhost:8080/
hideUrlsPort({ port: 8080 })

// Show as https://localhost/ (port removed)
hideUrlsPort()
```

## 📌 Notes

- Only affects console URL output. Does not change the actual dev server port.
- Ensure your Docker / DevContainer port mappings match the displayed port.
- Only active in Vite dev server (does not affect production builds).

## 📜 License

[MIT](./LICENSE) License © 2025 [Noah Chen](https://github.com/noah4520)
