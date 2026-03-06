import type { NextConfig } from "next";

const codespaceName = process.env.CODESPACE_NAME;
const portForwardingDomain = process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN;

const codespacesHosts = [
  "*.app.github.dev",
  "*.github.dev",
  "*.githubpreview.dev",
  codespaceName && portForwardingDomain
    ? `${codespaceName}-3000.${portForwardingDomain}`
    : undefined,
].filter((host): host is string => Boolean(host));

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Required when the app is accessed behind Codespaces/GitHub port forwarding
      // where Origin and X-Forwarded-Host differ.
      allowedOrigins: ["localhost:3000", "127.0.0.1:3000", ...codespacesHosts],
    },
  },
};

export default nextConfig;
