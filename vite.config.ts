import { fileURLToPath, URL } from 'node:url'

import type { UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const isBuild = command === 'build'
  return {
    plugins: [vue(), vueJsx()],
    server: {
      host: '0.0.0.0',
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:4003', // 目标地址
          changeOrigin: true, // 设置同源 默认false，是否需要改变原始主机头为目标URL,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    // 基本路径
    base: isBuild ? './' : '/',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
}
