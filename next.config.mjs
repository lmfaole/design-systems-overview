/** @type {import("next").NextConfig} */
const nextConfig = {
    pageExtensions: ["ts", "tsx"],
    async redirects() {
        // We moved from `/jokul/mønster` → `/jokul/monster` because the `ø` caused URL issues.
        // Keep a redirect so old links/bookmarks don't break.
        return [
            {
                source: "/jokul/monster/ikonknapper",
                destination: "/jokul/monster/1",
                permanent: false,
            },
            {
                source: "/jokul/m\u00f8nster",
                destination: "/jokul/monster",
                permanent: false,
            },
            {
                source: "/jokul/m\u00f8nster/:path*",
                destination: "/jokul/monster/:path*",
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
