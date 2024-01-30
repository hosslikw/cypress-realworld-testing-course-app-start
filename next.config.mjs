// next.config.mjs
const myAssets = {
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "source.unsplash.com", "tailwindui.com"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "[name].[ext]",
        },
      },
    });
    return config;
  },
};

export default myAssets;

