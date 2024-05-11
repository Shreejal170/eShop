const webpack = require("webpack");
const path = require("path");

module.exports = function override(config, env) {
  config.resolve.fallback = {
    url: require.resolve("url"),
    fs: false,
    assert: require.resolve("assert"),
    crypto: require.resolve("crypto-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify/browser"),
    buffer: require.resolve("buffer"),
    stream: require.resolve("stream-browserify"),
    zlib: require.resolve("browserify-zlib"),
    querystring: require.resolve("querystring-es3"),
    path: require.resolve("path-browserify"),
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};

// https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5
