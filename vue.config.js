module.exports = {
  configureWebpack: {
    devServer: {
      watchOptions: {
        ignored: {},
        poll: 1000,
      },
    },
  },
  transpileDependencies: ['vuetify'],
};
