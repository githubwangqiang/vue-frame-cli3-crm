module.exports = {
  // baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.82.160:8001', // 域名
        // target: 'http://192.168.80.122:8001', // 域名
        // target: 'http://192.168.1.161:8071', // 域名
        ws: false,
        changOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
