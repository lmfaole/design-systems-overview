import process from "node:process";
import puppeteer from "puppeteer";

const baseUrl = process.argv[2] ?? "http://127.0.0.1:3001";

const routeChecks = [
    {
        path: "/ds",
        assert() {
            const searchForm = document.querySelector('form[role="search"][action="/ds/søk"]');

            if (!(searchForm instanceof HTMLFormElement)) {
                return "Expected /ds to expose the design-system search form.";
            }

            return document.querySelector('a[href="/ds/mønster"]')
                ? null
                : "Expected /ds to link to the pattern overview.";
        },
    },
    {
        path: "/ds/mønster",
        assert() {
            return document.querySelector('a[href="/ds/mønster/skjelettvisning"]')
                ? null
                : "Expected the pattern overview to link to the skeleton pattern.";
        },
    },
    {
        path: "/ds/mønster/skjelettvisning",
        assert() {
            const toc = document.querySelector('.mønster-toc a[href="#implementasjon"]');
            const implementationHeading = document.querySelector("#implementasjon");
            const liveExample = document.querySelector(".mønster-example-card");
            const codePanel = document.querySelector("[data-code-tab-panel], [data-copy-code-source]");

            if (!(implementationHeading instanceof HTMLElement)) {
                return "Expected the pattern detail page to render the implementation section.";
            }

            if (!(liveExample instanceof HTMLElement)) {
                return "Expected the pattern detail page to render at least one live example.";
            }

            if (!(codePanel instanceof HTMLElement)) {
                return "Expected the pattern detail page to render copyable code.";
            }

            return toc ? null : "Expected the pattern detail page table of contents to link to implementation.";
        },
    },
    {
        path: "/ds/søk?q=skjelettvisning",
        assert() {
            const input = document.querySelector('input[name="q"]');
            const result = document.querySelector('a[href="/ds/mønster/skjelettvisning"]');
            const summary = document.querySelector("main")?.textContent ?? "";

            if (!(input instanceof HTMLInputElement)) {
                return "Expected /ds/søk to expose a search field.";
            }

            if (input.value !== "skjelettvisning") {
                return `Expected the search field to preserve the query, got "${input.value}".`;
            }

            if (!result) {
                return "Expected the search page to render the skeleton pattern result.";
            }

            return summary.includes("treff totalt.")
                ? null
                : "Expected the search page to render a total-results summary.";
        },
    },
];

const browser = await puppeteer.launch({
    headless: true,
});

try {
    const page = await browser.newPage();

    for (const routeCheck of routeChecks) {
        const url = new URL(routeCheck.path, `${baseUrl}/`).toString();

        await page.goto(url, {
            waitUntil: "networkidle0",
        });

        const astroIslandCount = await page.evaluate(() => document.querySelectorAll("astro-island").length);

        if (astroIslandCount !== 0) {
            throw new Error(`Expected ${routeCheck.path} to render without hydrated islands, got ${astroIslandCount}.`);
        }

        const failure = await page.evaluate(routeCheck.assert);

        if (failure) {
            throw new Error(`${routeCheck.path}: ${failure}`);
        }
    }

    console.log(`Route smoke test passed for ${routeChecks.length} routes.`);
} finally {
    await browser.close();
}
