module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      });
    }
    return config;
  },
};
