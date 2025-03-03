export default {
  logo: <span style={{ fontWeight: 600 }}>package-template</span>,
  project: {
    link: "https://github.com/RockiRider/csp",
  },
  docsRepositoryBase: "https://github.com/RockiRider/csp/tree/main/apps/docs",
  useNextSeoProps() {
    return {
      titleTemplate: "%s | package-template",
      description: "package-template",
      openGraph: {
        description: "A vite plugin to handle your CSP",
        siteName: "package-template",
      },
      twitter: {},
    };
  },
  head: <></>,
  feedback: {
    content: null,
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{" "}
        <a href="https://package-template.tsotne.co.uk" target="_blank">
          package-template
        </a>
        .
      </span>
    ),
  },
  darkMode: true,
};
