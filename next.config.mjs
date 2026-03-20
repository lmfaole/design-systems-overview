/** @type {import("next").NextConfig} */
const nextConfig = {
    pageExtensions: ["ts", "tsx"],
    async redirects() {
        // We moved from `/jokul/mønster` → `/monster` because the `ø` caused URL issues.
        // Keep a redirect so old links/bookmarks don't break.
        return [
            {
                source: "/monster",
                destination: "/ds/monster",
                permanent: false,
            },
            {
                source: "/monster/:id",
                destination: "/ds/monster/:id",
                permanent: false,
            },
            {
                source: "/sok",
                destination: "/ds/sok",
                permanent: false,
            },
            {
                source: "/jokul/monster",
                destination: "/monster",
                permanent: false,
            },
            {
                source: "/jokul/monster/:path*",
                destination: "/monster/:path*",
                permanent: false,
            },
            {
                source: "/jokul/monster/ikonknapper",
                destination: "/monster/1",
                permanent: false,
            },
            {
                source: "/jokul/m\u00f8nster",
                destination: "/monster",
                permanent: false,
            },
            {
                source: "/jokul/m\u00f8nster/:path*",
                destination: "/monster/:path*",
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
