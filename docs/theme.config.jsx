export default {
  logo: <span style={{ fontWeight: 600 }}>csp-toolkit</span>,
  project: {
    link: "https://github.com/tsotimus/csp-toolkit",
  },
  docsRepositoryBase: "https://github.com/tsotimus/csp-toolkit/tree/main/apps/docs",
  useNextSeoProps() {
    return {
      titleTemplate: "%s | csp-toolkit",
      description: "csp-toolkit",
      openGraph: {
        description: "A comprehensive toolkit for working with Content Security Policy (CSP) directives in TypeScript.",
        siteName: "csp-toolkit",
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
        <a href="https://csp-toolkit.tsotne.co.uk" target="_blank">
          csp-toolkit
        </a>
        .
      </span>
    ),
  },
  darkMode: true,
};
