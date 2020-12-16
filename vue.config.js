module. exports = {
  devServer: {
    port: 8888,     // 端口
  },
  publicPath:process.env.NODE_ENV ==='production'?'./':'/'
};
