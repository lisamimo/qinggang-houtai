module.exports = {
  baseUrl: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://gb.lemengxiangju.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}