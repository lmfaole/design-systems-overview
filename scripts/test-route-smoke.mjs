import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import puppeteer from "puppeteer";

const baseUrl = process.argv[2] ?? "http://127.0.0.1:3001";
const componentDistDir = path.resolve("dist/ds/jokul/component");

function getComponentExampleRoutes() {
    if (!fs.existsSync(componentDistDir)) {
        throw new Error(`Expected built component pages at ${componentDistDir}.`);
    }

    return fs.readdirSync(componentDistDir, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && entry.name !== "props")
        .map((entry) => {
            const htmlPath = path.join(componentDistDir, entry.name, "index.html");
            if (!fs.existsSync(htmlPath)) {
                return null;
            }

            const html = fs.readFileSync(htmlPath, "utf8");

            return html.includes("component-example-section")
                ? `/ds/jokul/component/${entry.name}`
                : null;
        })
        .filter(Boolean);
}

function assertBuiltExampleMarkup() {
    const buttonHtmlPath = path.join(componentDistDir, "button", "index.html");

    if (!fs.existsSync(buttonHtmlPath)) {
        throw new Error(`Expected built component detail page at ${buttonHtmlPath}.`);
    }

    const buttonHtml = fs.readFileSync(buttonHtmlPath, "utf8");

    if (!buttonHtml.includes('client="load"')) {
        throw new Error("Expected the built Button detail page to server-render its example island with client:load.");
    }

    if (!buttonHtml.includes('class="component-page-example"')) {
        throw new Error("Expected the built Button detail page HTML to include the rendered example UI.");
    }

    if (!buttonHtml.includes("Send inn")) {
        throw new Error('Expected the built Button detail page HTML to include the "Send inn" example content.');
    }
}

const routeChecks = [
    {
        path: "/ds",
        expectedAstroIslandCount: 0,
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
        expectedAstroIslandCount: 0,
        assert() {
            return document.querySelector('a[href="/ds/jokul/formatter"]')
                ? null
                : "Expected /ds/jokul to link to formatter documentation.";
        },
    },
    {
        path: "/ds/jokul/formatter",
        expectedAstroIslandCount: 0,
        assert() {
            return document.querySelector('a[href="/ds/jokul/formatter/format-valuta"]')
                ? null
                : "Expected formatter index to link to the valuta formatter page.";
        },
    },
    {
        path: "/ds/jokul/token",
        expectedAstroIslandCount: 0,
        assert() {
            return document.querySelector('a[href="/ds/jokul/token/farger"]')
                ? null
                : "Expected token index to link to the Farger token page.";
        },
    },
    {
        path: "/ds/jokul/token/farger",
        expectedAstroIslandCount: 0,
        assert() {
            const tokenTable = document.querySelector(".token-article table.site-table");
            const toc = document.querySelector('.token-article nav[aria-labelledby="token-toc-title"]');

            if (!(tokenTable instanceof HTMLTableElement)) {
                return "Expected token detail pages to render native token tables.";
            }

            return toc ? null : "Expected token detail pages to render a table of contents.";
        },
    },
    {
        path: "/ds/jokul/component",
        expectedAstroIslandCount: 0,
        async run(page) {
            const hiddenStateBeforeToggle = await page.evaluate(() => {
                const card = document.querySelector('[data-component-id="table-cell"]');
                if (!(card instanceof HTMLElement)) {
                    return null;
                }

                const styles = window.getComputedStyle(card);
                return styles.display === "none" || styles.visibility === "hidden";
            });

            if (hiddenStateBeforeToggle !== true) {
                return "Expected table-cell to stay hidden before the show-all toggle is enabled.";
            }

            await page.click("[data-component-index-show-all]");

            const hiddenStateAfterToggle = await page.evaluate(() => {
                const card = document.querySelector('[data-component-id="table-cell"]');
                if (!(card instanceof HTMLElement)) {
                    return null;
                }

                const styles = window.getComputedStyle(card);
                return styles.display === "none" || styles.visibility === "hidden";
            });

            if (hiddenStateAfterToggle !== false) {
                return "Expected show-all toggle to reveal components hidden from the overview by default.";
            }

            await page.select("[data-component-index-status]", "deprecated");

            const state = await page.evaluate(() => {
                const countText = document.querySelector("[data-component-index-count]")?.textContent?.trim() ?? "";
                const visibleCards = Array.from(document.querySelectorAll("[data-component-card]"))
                    .filter((card) => {
                        if (!(card instanceof HTMLElement)) {
                            return false;
                        }

                        const styles = window.getComputedStyle(card);
                        return styles.display !== "none" && styles.visibility !== "hidden";
                    })
                    .map((card) => ({
                        id: card.getAttribute("data-component-id") ?? "",
                        status: card.getAttribute("data-component-status") ?? "",
                    }));

                return {
                    count: Number.parseInt(countText, 10),
                    visibleCards,
                };
            });

            if (!Number.isFinite(state.count)) {
                return "Expected component index to keep a numeric visible result count after filtering.";
            }

            if (state.visibleCards.length === 0) {
                return "Expected component index filtering to leave at least one visible card.";
            }

            if (state.count !== state.visibleCards.length) {
                return `Expected count ${state.count} to match ${state.visibleCards.length} visible cards.`;
            }

            return state.visibleCards.every((card) => card.status === "deprecated")
                ? null
                : `Expected only deprecated cards to remain visible, got ${state.visibleCards.map((card) => `${card.id}:${card.status}`).join(", ")}.`;
        },
        assert() {
            const queryInput = document.querySelector('[data-component-index-query]');
            const buttonCard = document.querySelector('[data-component-id="button"]');

            if (!(queryInput instanceof HTMLInputElement)) {
                return "Expected component index to expose a search input.";
            }

            return buttonCard ? null : "Expected component index to render the Button card.";
        },
    },
    {
        path: "/ds/jokul/component/props",
        expectedAstroIslandCount: 0,
        assert() {
            const table = document.querySelector(".component-index table.site-table");
            const caption = table?.querySelector("caption")?.textContent?.trim();
            const headers = Array.from(table?.querySelectorAll('th[scope="col"]') ?? [])
                .map((header) => header.textContent?.trim())
                .filter(Boolean);

            if (!(table instanceof HTMLTableElement)) {
                return "Expected prop index to render a native props table.";
            }

            if (caption !== "Props-oversikt") {
                return `Expected prop index table caption to be "Props-oversikt", got "${caption ?? ""}".`;
            }

            if (headers.join("|") !== "Prop|Kilde|Brukt i") {
                return `Expected prop index table headers to be Prop, Kilde, Brukt i; got ${headers.join(", ")}.`;
            }

            return document.querySelector("[data-prop-entry]")
                ? null
                : "Expected prop index to render at least one prop row.";
        },
    },
    {
        path: "/ds/jokul/component/button",
        expectedAstroIslandCount: 1,
        async run(page) {
            const hiddenPopoverState = await page.evaluate(() =>
                Array.from(document.querySelectorAll(".component-type-popover"))
                    .map((popover) => ({
                        id: popover.id,
                        open: popover.matches(":popover-open"),
                        display: window.getComputedStyle(popover).display,
                    }))
            );

            if (hiddenPopoverState.length === 0) {
                return "Expected component detail pages to render at least one prop type popover.";
            }

            const visibleClosedPopover = hiddenPopoverState.find((popover) => popover.open || popover.display !== "none");

            if (visibleClosedPopover) {
                return `Expected closed popovers to stay hidden before interaction, but ${visibleClosedPopover.id} was ${visibleClosedPopover.display}.`;
            }

            await page.click(".component-type-button");

            const popoverState = await page.evaluate(() => {
                const popover = document.querySelector(".component-type-popover");

                if (!(popover instanceof HTMLElement)) {
                    return null;
                }

                const styles = window.getComputedStyle(popover);
                const labelledBy = popover.getAttribute("aria-labelledby");
                const title = labelledBy ? document.getElementById(labelledBy) : null;

                return {
                    open: styles.display !== "none" && styles.visibility !== "hidden",
                    hasTable: Boolean(popover.querySelector("table")),
                    role: popover.getAttribute("role"),
                    labelled: Boolean(title?.textContent?.trim()),
                    triggerHasPopup: document.querySelector(".component-type-button")?.getAttribute("aria-haspopup"),
                };
            });

            if (!popoverState) {
                return "Expected component detail pages to render a prop type popover.";
            }

            if (!popoverState.open) {
                return "Expected component detail prop type button to open its popover.";
            }

            if (popoverState.role !== "dialog") {
                return `Expected component detail prop type popover to expose role="dialog", got "${popoverState.role ?? ""}".`;
            }

            if (popoverState.triggerHasPopup !== "dialog") {
                return `Expected component detail prop type trigger to expose aria-haspopup="dialog", got "${popoverState.triggerHasPopup ?? ""}".`;
            }

            if (!popoverState.labelled) {
                return "Expected component detail prop type popover to have an accessible title.";
            }

            return popoverState.hasTable
                ? null
                : "Expected component detail prop type popover to render nested type details in a table.";
        },
        assert() {
            const exampleHeading = Array.from(document.querySelectorAll("h2")).find((heading) =>
                heading.textContent?.trim() === "Eksempel",
            );
            const propSection = document.getElementById("props");
            const exampleButton = document.querySelector(".component-example-section button:not([data-copy-code])");

            if (!exampleHeading) {
                return "Expected component detail pages to render an example section.";
            }

            if (!(exampleButton instanceof HTMLButtonElement)) {
                return "Expected component detail pages to render live example content inside the example island.";
            }

            return propSection ? null : "Expected component detail pages to render a props section.";
        },
    },
    {
        path: "/ds/monster",
        expectedAstroIslandCount: 0,
        assert() {
            return document.querySelector('a[href="/ds/monster/lastetilstander"]')
                ? null
                : "Expected /ds/monster to link to the lastetilstander pattern.";
        },
    },
    {
        path: "/ds/monster/lastetilstander",
        expectedAstroIslandCount: 0,
        assert() {
            return document.querySelector('nav[aria-label], nav[aria-labelledby]')
                ? null
                : "Expected pattern detail pages to expose labeled navigation.";
        },
    },
    {
        path: "/ds/sok?q=button",
        expectedAstroIslandCount: 0,
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
    assertBuiltExampleMarkup();

    const page = await browser.newPage();

    for (const routeCheck of routeChecks) {
        const url = new URL(routeCheck.path, `${baseUrl}/`).toString();

        await page.goto(url, {
            waitUntil: "networkidle0",
        });

        const state = await page.evaluate(() => {
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
                astroIslandCount: document.querySelectorAll("astro-island").length,
            };
        });

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

        if (state.astroIslandCount !== routeCheck.expectedAstroIslandCount) {
            throw new Error(
                `Expected ${url} to render ${routeCheck.expectedAstroIslandCount} hydrated island(s), got ${state.astroIslandCount}.`,
            );
        }

        if (routeCheck.run) {
            const routeRunFailure = await routeCheck.run(page);
            if (routeRunFailure) {
                throw new Error(`${routeRunFailure} (${url})`);
            }
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

    for (const route of getComponentExampleRoutes()) {
        const url = new URL(route, `${baseUrl}/`).toString();

        await page.goto(url, {
            waitUntil: "networkidle0",
        });

        await page.waitForSelector(".component-example-section", { timeout: 10000 });

        const exampleState = await page.evaluate(() => {
            const exampleRoot = document.querySelector(".component-page-example");
            const exampleArea = document.querySelector(".component-page-example .area .inner");

            return {
                hasExampleRoot: exampleRoot instanceof HTMLElement,
                hasExampleContent:
                    exampleArea instanceof HTMLElement &&
                    (exampleArea.children.length > 0 || exampleArea.textContent?.trim().length > 0),
            };
        });

        if (!exampleState.hasExampleRoot) {
            throw new Error(`Expected ${url} to hydrate the component example UI.`);
        }

        if (!exampleState.hasExampleContent) {
            throw new Error(`Expected ${url} to render live example content inside the component example UI.`);
        }

        console.log(`Component example smoke test passed: ${url}`);
    }
} finally {
    await browser.close();
}
