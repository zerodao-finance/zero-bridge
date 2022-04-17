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
    zlib: require.resolve('browserify-zlib'),
    url: require.resolve("url"),
  });
  config.resolve.fallback = fallback;
  return config;
};
