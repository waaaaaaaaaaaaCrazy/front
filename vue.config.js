const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 开启代理服务器
  devServer: {
    // 代理服务器可以将路由中的指定前缀转发到指定的后端服务器中
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // 后端API地址
        changeOrigin: true,  // 代理时是否更改host
        pathRewrite: {
          '^/api': '' // 重写路径，去掉/api前缀
        }
      }
    }
  }
})
