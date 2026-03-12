/// <reference types="vite/client" />

interface Window {
  electronAPI: {
    platform: string
    ping: () => Promise<string>
  }
}