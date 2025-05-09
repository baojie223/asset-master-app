import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  rewrites: async () => {
    return [
      {
        source: "/api/:path*",
        destination: "https://rzjeoeljpbdgxmlohlos.supabase.co/:path*",
      },
    ];
  },
};

export default nextConfig;
