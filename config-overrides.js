const webpack = require("webpack");
module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    fs: false,
    zlib: require.resolve("browserify-zlib"),
    url: require.resolve("url"),
    buffer: require.resolve("buffer"),
  });
  config.resolve.fallback = fallback;
  config.resolve.extensions = config.resolve.extensions || [];
  config.plugins = config.plugins || [];
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ["buffer", "Buffer"],
    })
  );
	/*
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
    })
  ); */
  return config;
};
