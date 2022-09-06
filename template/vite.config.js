import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from "path"
import fs from "fs"

const optimizeDepsElementPlusIncludes = ["element-plus/es"]
fs.readdirSync("node_modules/element-plus/es/components").map((dirname) => {
  fs.access(
    `node_modules/element-plus/es/components/${dirname}/style/css.mjs`,
    (err) => {
      if (!err) {
        optimizeDepsElementPlusIncludes.push(
          `element-plus/es/components/${dirname}/style/css`
        );
      }
    }
  )
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    DefineOptions(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  assetsInclude: ['src/assets/images/**/*.*'],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/css/global.scss";'
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 9537,
    open: true,
    proxy: {
      '/api': {
        target: 'http://192.168.9.231:9527',
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  optimizeDeps: {
    include: optimizeDepsElementPlusIncludes,
  },
})
