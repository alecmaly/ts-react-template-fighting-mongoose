const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
    entry: path.resolve(paths.SRC_PATH, 'index.tsx'),
    output: {
      filename: outputFilename,
      path: paths.DIST_DIR
    },
    resolve: {
      // Add '.ts' and '.tsx' as resolvable extensions.
      extensions: [".ts", ".tsx", ".js", "jsx", ".json"]
    },

    module: {
      rules: [{
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
        }
      ]
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
