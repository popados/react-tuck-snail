/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Emotional Check used to live here; it is the check-in page at /calm now.
    return [{ source: '/emotional-check', destination: '/calm', permanent: true }]
  },
}

export default nextConfig
