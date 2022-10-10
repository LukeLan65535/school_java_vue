const { defineConfig } = require('@vue/cli-service')
let proxyObj = {}
proxyObj['/']={
  ws: false,
  target: 'http://127.0.0.1:8088',
  chageOrigin: true,
  pathRewrite:{
    '^/': ""
  }
}
// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     host:'0.0.0.0',
//     // port: 8080,
//     proxy: proxyObj
//     }
// })


