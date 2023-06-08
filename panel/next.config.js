module.exports = {
  i18n: {
    locales: ["fa", "en"],
    defaultLocale: "fa",
    localeDetection: false,
  },
  pageExtensions: ["js"],

  env: {
    MODE: "development",
    // apiUrl: "http://79.175.151.68:3001/api/graphql",
    // apiHost: "http://79.175.151.68:3001/",
    // apiUrl: "http://localhost:3001/api/graphql",
    // apiHost: "http://localhost:3001/",
    apiUrl: process.env.apiUrl,
    apiHost: process.env.apiHost,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
    }
    return config
  },
}
