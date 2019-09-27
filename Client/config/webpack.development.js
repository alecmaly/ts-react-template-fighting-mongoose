    module.exports = (env, config, options) => {
      const {
        paths
      } = options;
      config.devServer = {
        contentBase: paths.SRC_PATH,
        host: 'localhost',
        port: 8000,
        historyApiFallback: true,
        stats: 'normal',
        open: true
      };
    };
