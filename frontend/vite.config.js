import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // AJOUTE CETTE LIGNE

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // AJOUTE CETTE LIGNE
  ],
})