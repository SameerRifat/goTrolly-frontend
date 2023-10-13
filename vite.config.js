// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isLocalBackend = process.env.LOCAL_BACKEND === 'true';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: isLocalBackend ? process.env.VITE_REACT_APP_API_URL : "https://gotrolly-api.onrender.com/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
