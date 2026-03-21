export const lighthouseCategories = [
    "performance",
    "best-practices",
    "seo",
];

export const lighthouseFlags = {
    output: "json",
    logLevel: "error",
    formFactor: "desktop",
    maxWaitForLoad: 45_000,
    onlyCategories: lighthouseCategories,
    screenEmulation: {
        mobile: false,
        width: 1350,
        height: 940,
        deviceScaleFactor: 1,
        disabled: false,
    },
};

export const lighthousePages = [
    {
        name: "Front page",
        path: "/",
        thresholds: {
            performance: 0.9,
            "best-practices": 0.9,
            seo: 0.9,
        },
    },
    {
        name: "Jokul overview",
        path: "/ds/jokul",
        thresholds: {
            performance: 0.9,
            "best-practices": 0.9,
            seo: 0.9,
        },
    },
    {
        name: "Menu component",
        path: "/ds/jokul/component/menu",
        thresholds: {
            performance: 0.62,
            "best-practices": 0.9,
            seo: 0.9,
        },
    },
    {
        name: "Token index",
        path: "/ds/jokul/token",
        thresholds: {
            performance: 0.9,
            "best-practices": 0.9,
            seo: 0.9,
        },
    },
];
