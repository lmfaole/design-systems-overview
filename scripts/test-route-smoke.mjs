import process from "node:process";
import puppeteer from "puppeteer";

const baseUrl = process.argv[2] ?? "http://127.0.0.1:3001";

const routeChecks = [
    {
        path: "/ds",
        expectNoIslands: true,
        assert() {
            const searchForm = document.querySelector('form[role="search"][action="/ds/sok"]');

            if (!(searchForm instanceof HTMLFormElement)) {
                return "Expected /ds to expose the design-system search form.";
            }

            return null;
        },
    },
    {
        path: "/ds/jokul",
        expectNoIslands: true,
        assert() {
            return document.querySelector('a[href="/ds/jokul/formatter"]')
                ? null
                : "Expected /ds/jokul to link to formatter documentation.";
        },
    },
    {
        path: "/ds/jokul/formatter",
        expectNoIslands: true,
        assert() {
            return document.querySelector('a[href="/ds/jokul/formatter/format-valuta"]')
                ? null
                : "Expected formatter index to link to the valuta formatter page.";
        },
    },
    {
        path: "/ds/monster",
        expectNoIslands: true,
        assert() {
            return document.querySelector('a[href="/ds/monster/lastetilstander"]')
                ? null
                : "Expected /ds/monster to link to the lastetilstander pattern.";
        },
    },
    {
        path: "/ds/monster/lastetilstander",
        expectNoIslands: true,
        assert() {
            return document.querySelector('nav[aria-label], nav[aria-labelledby]')
                ? null
                : "Expected pattern detail pages to expose labeled navigation.";
        },
    },
    {
        path: "/ds/sok?q=button",
        expectNoIslands: true,
        assert() {
            const input = document.querySelector('input[name="q"]');
            const resultLink = document.querySelector('a[href="/ds/jokul/component/button"]');

            if (!(input instanceof HTMLInputElement)) {
                return "Expected search page to render a query input.";
            }

            if (input.value !== "button") {
                return `Expected search field to contain "button", got "${input.value}".`;
            }

            return resultLink ? null : "Expected /ds/sok?q=button to render the Button result.";
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

        const state = await page.evaluate(({ expectNoIslands }) => {
            const main = document.querySelector("main");
            const h1s = Array.from(document.querySelectorAll("h1"));
            const unlabeledNavCount = Array.from(document.querySelectorAll("nav")).filter((nav) => {
                const ariaLabel = nav.getAttribute("aria-label")?.trim();
                const labelledBy = nav.getAttribute("aria-labelledby")?.trim();

                if (ariaLabel) {
                    return false;
                }

                if (!labelledBy) {
                    return true;
                }

                return labelledBy
                    .split(/\s+/u)
                    .every((id) => !(document.getElementById(id)?.textContent?.trim()));
            }).length;

            return {
                title: document.title,
                hasMain: Boolean(main),
                mainText: main?.textContent?.trim() ?? "",
                h1Count: h1s.length,
                unlabeledNavCount,
                hasAstroIsland: Boolean(document.querySelector("astro-island")),
            };
        }, { expectNoIslands: routeCheck.expectNoIslands });

        if (!state.title.trim()) {
            throw new Error(`Expected ${url} to render a document title.`);
        }

        if (!state.hasMain) {
            throw new Error(`Expected ${url} to render a <main> landmark.`);
        }

        if (!state.mainText) {
            throw new Error(`Expected ${url} to render non-empty main content.`);
        }

        if (state.h1Count !== 1) {
            throw new Error(`Expected ${url} to render exactly one h1, got ${state.h1Count}.`);
        }

        if (state.unlabeledNavCount > 0) {
            throw new Error(`Expected ${url} to avoid unlabeled navigation landmarks, found ${state.unlabeledNavCount}.`);
        }

        if (routeCheck.expectNoIslands && state.hasAstroIsland) {
            throw new Error(`Expected ${url} to render without hydrated islands.`);
        }

        const routeSpecificFailure = await page.evaluate(routeCheck.assert);
        if (routeSpecificFailure) {
            throw new Error(`${routeSpecificFailure} (${url})`);
        }

        const navLabels = await page.evaluate(() =>
            Array.from(document.querySelectorAll("nav"))
                .map((nav) => {
                    const ariaLabel = nav.getAttribute("aria-label")?.trim();
                    if (ariaLabel) return ariaLabel;

                    const labelledBy = nav.getAttribute("aria-labelledby")?.trim();
                    if (!labelledBy) return "";

                    return labelledBy
                        .split(/\s+/u)
                        .map((id) => document.getElementById(id)?.textContent?.trim() ?? "")
                        .join(" ")
                        .trim();
                })
                .filter(Boolean),
        );

        console.log(`Route smoke test passed: ${url} (${navLabels.join(", ") || "no navs"})`);
    }
} finally {
    await browser.close();
}
