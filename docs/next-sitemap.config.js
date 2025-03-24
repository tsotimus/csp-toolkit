/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://csp-toolkit.tsotne.co.uk",
  generateRobotsTxt: true, // (optional)
  generateIndexSitemap: false,
  sitemapSize: 100,
  output: "export",
  additionalPaths: async () => [
    {
      loc: "/",
      priority: "1.0",
    },
    {
      loc: "guides/nextjs-app",
      priority: 0.9,
    },
    {
      loc: "guides/nextjs-pages",
      priority: 0.9,
    },
    {
      loc: "/guides/react-router",
      priority: 0.9,
    },
    {
      loc: "/guides/nuxt",
      priority: 0.9,
    },
    {
      loc: "/guides/remix",
      priority: 0.9,
    },
    {
      loc: "/guides/express",
      priority: 0.9,
    },
    {
      loc: "/api-docs",
      priority: 0.6,
    },
  ],
};
