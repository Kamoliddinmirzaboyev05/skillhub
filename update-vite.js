const fs = require('fs');
const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
`;

['superadmin', 'mentor', 'student'].forEach(dir => {
  fs.writeFileSync(`/Users/user/Desktop/ProAcademy/${dir}/vite.config.ts`, viteConfig);
});
