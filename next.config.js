// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

module.exports = {
  // images: {
  //   domains: ["lh3.googleusercontent.com", "img.tofunft.com", "www.cryptotimes.io", "pbs.twimg.com", "apefest.com", "minnesota.cbslocal.com", "935650.smushcdn.com"],
  // },
  publicRuntimeConfig: {
    ENDPOINT: process.env.ENDPOINT,
    API: process.env.API
  },

  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  }
};

