/*
 * @Author: 阮志雄
 * @Date: 2022-09-22 12:38:05
 * @LastEditTime: 2022-09-30 15:22:26
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \web-gis-vue3\vite.config.ts
 */
import { fileURLToPath, URL } from 'node:url'

import type { UserConfigExport, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import cesium from 'vite-plugin-cesium' // 引入插件

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const isBuild = command === 'build'
  return {
    plugins: [vue(), vueJsx(), cesium()],
    server: {
      host: '0.0.0.0',
      open: true,
      proxy: {
        '/geoserver': {
          target: 'http://10.172.246.234:7070', // 目标地址
          changeOrigin: true, // 设置同源 默认false，是否需要改变原始主机头为目标URL,
          // rewrite: (path) => path.replace(/^\/geoserver/, ''),
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
