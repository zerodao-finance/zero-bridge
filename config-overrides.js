const webpack = require("webpack");

module.exports = {
  webpack: function (config, env) {
    config.plugins = [
      ...config.plugins,
      new webpack.ProvidePlugin({
        process: "process/browser.js",
        Buffer: ["buffer", "Buffer"],
      }),
    ];
    config.resolve.fallback = {
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
    };
    return config;
  },
  devServer: function (configFunction) {
    return function (proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost);
      config.headers = {
        "X-Frame-Options": "DENY",
        "X-XSS-Protection": "1; mode=block",
      };

      return config;
    };
  },
};
