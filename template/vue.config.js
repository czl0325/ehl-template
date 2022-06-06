const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  transpileDependencies: true,
  productionSourceMap: false,
  devServer: {
    open: true,
    host: "0.0.0.0",
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  pluginOptions: {
    pwa: {
      name: "name",
      themeColor: '#079BFF',
      msTileColor: '#333333',
      appleMobileWebAppCapable: 'yes',
      appleMobileWebAppStatusBarStyle: 'black',
      workboxPluginMode: 'InjectManifest',
      workboxOptions: {
        swSrc: 'src/service-worker.js',
        importWorkboxFrom: 'disabled',
        importScripts: 'https://cdn.myun.info/workbox-v4.3.1/workbox-sw.js'
      }
    }
  }
})
