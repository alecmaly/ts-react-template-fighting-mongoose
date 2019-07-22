    module.exports = (env, config, options) => {
      const {
        paths
      } = options;
      config.devServer = {
        contentBase: paths.PUBLIC_DIR,
        host: 'localhost',
        port: 8000,
        historyApiFallback: true,
        stats: 'normal',
        open: true
      };
    };
