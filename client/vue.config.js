module.exports = {
  transpileDependencies: [
    'vuetify',
  ],
  devServer: {
    proxy: 'https://api.imgbb.com/1/upload',
  },
  runtimeCompiler: true,
};
