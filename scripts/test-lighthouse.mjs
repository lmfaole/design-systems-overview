import process from "node:process";
import lighthouse from "lighthouse";
import puppeteer from "puppeteer";
import {
    lighthouseCategories,
    lighthouseFlags,
    lighthousePages,
} from "./lighthouse.config.mjs";

function formatScore(score) {
    return `${Math.round(score * 100)}%`;
}

function getPageUrl(baseUrl, path) {
    return new URL(path, `${baseUrl}/`).toString();
}

function getFailingAudits(lhr, category) {
    const auditRefs = lhr.categories[category]?.auditRefs ?? [];

    return auditRefs
        .map(({ id }) => lhr.audits[id])
        .filter(
            (audit) =>
                audit &&
                audit.scoreDisplayMode !== "notApplicable" &&
                audit.scoreDisplayMode !== "informative" &&
                audit.scoreDisplayMode !== "manual" &&
                audit.score !== 1,
        )
        .slice(0, 3)
        .map((audit) => audit.title);
}

const baseUrl = process.argv[2] ?? "http://127.0.0.1:3001";
const failures = [];

const browser = await puppeteer.launch({
    headless: true,
    args: ["--remote-debugging-port=0"],
});

try {
    const debuggingUrl = new URL(browser.wsEndpoint());
    const port = Number(debuggingUrl.port);

    for (const page of lighthousePages) {
        const url = getPageUrl(baseUrl, page.path);
        const result = await lighthouse(url, {
            ...lighthouseFlags,
            port,
        });

        if (!result?.lhr) {
            throw new Error(`Missing Lighthouse result for ${url}`);
        }

        const scores = Object.fromEntries(
            lighthouseCategories.map((category) => [
                category,
                result.lhr.categories[category]?.score ?? 0,
            ]),
        );

        console.log(
            `${page.name} ${page.path} ${lighthouseCategories
                .map((category) => `${category}=${formatScore(scores[category])}`)
                .join(" ")}`,
        );

        for (const category of lighthouseCategories) {
            const threshold = page.thresholds[category];
            if (scores[category] < threshold) {
                const failingAudits = getFailingAudits(result.lhr, category);
                failures.push(
                    `${page.path} ${category} scored ${formatScore(scores[category])} below ${formatScore(threshold)}${
                        failingAudits.length > 0 ? ` (${failingAudits.join(", ")})` : ""
                    }`,
                );
            }
        }
    }
} finally {
    await browser.close();
}

if (failures.length > 0) {
    console.error("\nLighthouse thresholds failed:");
    for (const failure of failures) {
        console.error(`- ${failure}`);
    }
    process.exit(1);
}

console.log("\nAll Lighthouse thresholds passed.");
