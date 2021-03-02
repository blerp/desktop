// module.exports = {
//   // Add support for native node modules
//   resolve: {
//     extensions: ["*", ".js", ".jsx"],
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.jsx?$/,
//         loader: "babel",
//         query: {
//           cacheDirectory: true,
//           presets: ["react", "es2015"],
//         },
//       },
//     ],
//     rules: [
//       {
//         test: /\.css$/i,
//         use: ["style-loader", "css-loader"],
//       },
//       {
//         test: /\.node$/,
//         use: "node-loader",
//       },
//       {
//         test: /\.(m?js|node)$/,
//         parser: { amd: false },
//         use: {
//           loader: "@marshallofsound/webpack-asset-relocator-loader",
//           options: {
//             outputAssetBase: "native_modules",
//           },
//         },
//       },
//       {
//         test: /\.(js|jsx)$/,
//         include: path.resolve(__dirname, "src"),
//         exclude: /(node_modules|bower_components|build)/,
//         use: ["babel-loader"],
//       },
//     ],
//   },
// };
