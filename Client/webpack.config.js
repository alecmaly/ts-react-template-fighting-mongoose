const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const autoprefixer = require('autoprefixer')
const configDevelopment = require("./config/webpack.development");

const rootPath = path.resolve(__dirname);
const paths = {
  ROOT_PATH: rootPath,
  SRC_PATH: path.resolve(rootPath, "src"),
  PUBLIC_DIR: path.resolve(rootPath, "public"),
  DIST_DIR: path.resolve(rootPath, "dist")
};
const isDev = process.env.NODE_ENV.trim() !== "production";


module.exports = env => {
  const devtool = isDev ? 'source-map' : false;
  const outputFilename = isDev ? 'main.js' : '[name].[hash].js';


  console.log("Node Environment:", process.env.NODE_ENV);
  console.log("Development Mode:", isDev);
  console.log("Dev Tool:", devtool);
  console.log("Output Filename:", outputFilename);

  const config = {
    // mode: "production",
    // Enable sourcemaps for debugging webpack's output.
    // devtool: "source-map",
    devtool,
    entry: [
      require.resolve('./config/polyfills'),


      path.resolve(paths.SRC_PATH, 'index.tsx')
    ],
    output: {
      filename: outputFilename,
      path: paths.DIST_DIR
    },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },

    module: {
      rules: [
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [{
            loader: "babel-loader"  // ts-loader
          }]
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: "pre",
          test: /\.js$/,
          loader: "source-map-loader"
        },
        {
          test: /\.html$/,
          loader: "html-loader",
          options: {
            minimize: true,
            removeComments: false,
            collapseWhitespace: false
          }
        },
        // "postcss" loader applies autoprefixer to our CSS.
          // "css" loader resolves paths in CSS and adds assets as dependencies.
          // "style" loader turns CSS into JS modules that inject <style> tags.
          // In production, we use a plugin to extract that CSS to a file, but
          // in development "style" loader enables hot editing of CSS.
          {
            test: /\.css$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ],
          }
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(paths.SRC_PATH, "index.html")
      })
    ],

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    // externals: {
    //   react: "React",
    //   "react-dom": "ReactDOM"
    // }
  };

  if (isDev === true) {
    console.log("Applying Development Configuration");
    configDevelopment(env, config, {
      paths,
      isDev
    });
  }

  return config;
};
