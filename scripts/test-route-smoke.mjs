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
            const modelHeading = document.querySelector("#grunnmodell");
            const designSystemLinksHeading = document.querySelector("#koblinger-designsystem");
            const skeletonLink = document.querySelector('a[href="/ds/jokul/komponenter/skeleton-loader"]');
            const sitemapLink = document.querySelector('a[href="/sitemap"]');

            if (
                !(modelHeading instanceof HTMLElement) ||
                !(designSystemLinksHeading instanceof HTMLElement)
            ) {
                return "Expected the pattern overview to render the new restart-plan sections.";
            }

            return skeletonLink instanceof HTMLAnchorElement && sitemapLink instanceof HTMLAnchorElement
                ? null
                : "Expected the pattern overview to link to connected docs surfaces.";
        },
    },
    {
        path: "/ds/jokul",
        assert() {
            return document.querySelector('a[href="/ds/jokul/komponenter/button"]') &&
                document.querySelector('a[href="/ds/jokul/komponenter/loader"]') &&
                document.querySelector('a[href="/ds/jokul/komponenter/skeleton-loader"]') &&
                document.querySelector('a[href="/ds/jokul/komponenter/table"]')
                ? null
                : "Expected the Jøkul overview to link to the documented Button, Loader, Skeleton loader, and Table pages.";
        },
    },
    {
        path: "/ds/jokul/komponenter/button",
        async prepare(page) {
            await page.select('select[data-ds-interactive-control="variant"]', "ghost");
            await page.select('select[data-ds-interactive-control="density"]', "compact");
            await page.select('select[data-ds-interactive-control="type"]', "submit");
            await page.select('select[data-ds-interactive-control="loader"]', "sending");
            await page.select('select[data-ds-interactive-control="icon"]', "download");
            await page.select('select[data-ds-interactive-control="iconPosition"]', "right");
            await page.click('[data-ds-interactive-preview] button');
            await page.waitForFunction(() => {
                const eventLog = document.querySelector('[data-ds-interactive-events-list]')?.textContent ?? "";
                return eventLog.includes("click");
            });
            await page.click('input[data-ds-interactive-control="disabled"]');
            await page.waitForFunction(() => {
                const code = document.querySelector("pre code")?.textContent ?? "";
                return code.includes('variant="ghost"') &&
                    code.includes('density="compact"') &&
                    code.includes('type="submit"') &&
                    code.includes('loader={{ showLoader: true, textDescription: "Sender inn" }}') &&
                    code.includes("icon={icon}") &&
                    code.includes('iconPosition="right"') &&
                    code.includes("disabled");
            });
        },
        assert() {
            const exampleHeading = document.querySelector("#asset-eksempel");
            const profileHeading = document.querySelector("#asset-komponentprofil");
            const profileStylesHeading = document.querySelector("#asset-komponentprofil-stiler");
            const profileAccessibilityHeading = document.querySelector("#asset-komponentprofil-tilgjengelighet");
            const profilePerformanceHeading = document.querySelector("#asset-komponentprofil-ytelse");
            const controlsMenu = document.querySelector('[data-ds-interactive-example] fieldset > menu');
            const codeBlock = document.querySelector("pre code");
            const codeFigure = document.querySelector('[data-ds-interactive-code] figure');
            const notesAside = document.querySelector('[data-ds-interactive-notes]');
            const eventsSection = document.querySelector('[data-ds-interactive-events]');
            const eventsList = document.querySelector('[data-ds-interactive-events-list]');
            const propsHeading = document.querySelector("#asset-props");
            const propsCategoryHeading = document.querySelector("h3#props-design-system");
            const relatedTokenLink = document.querySelector('a[href="/ds/jokul/tokens/spacing"]');
            const previewButton = document.querySelector('[data-ds-interactive-preview] button');
            const previewLoader = document.querySelector('[data-ds-interactive-preview] .jkl-loader');
            const previewTrailingIcon = document.querySelector(
                '[data-ds-interactive-preview] .jkl-button__label > .jkl-icon:last-child',
            );
            const migrationHeading = document.querySelector("#asset-deprecated-props");
            const migrationSection = document.querySelector('[aria-labelledby="asset-deprecated-props"]');
            const migrationReplacement = Array.from(
                document.querySelectorAll('[aria-labelledby="asset-deprecated-props"] code'),
            ).find((element) => element.textContent?.includes('icon={icon} iconPosition="left"'));
            const previewSummary = document.querySelector('[data-ds-interactive-preview]')?.textContent ?? "";
            const renderedCode = codeBlock?.textContent ?? "";
            const profileText = document.querySelector('[aria-labelledby="asset-komponentprofil"]')?.textContent ?? "";
            const previewStyles = previewButton instanceof HTMLButtonElement
                ? window.getComputedStyle(previewButton)
                : null;

            if (!(exampleHeading instanceof HTMLElement) || exampleHeading.textContent?.trim() !== "Eksempel") {
                return "Expected the Jøkul Button page to render an example section.";
            }

            if (
                !(profileHeading instanceof HTMLElement) ||
                !(profileStylesHeading instanceof HTMLElement) ||
                !(profileAccessibilityHeading instanceof HTMLElement) ||
                !(profilePerformanceHeading instanceof HTMLElement)
            ) {
                return "Expected the Jøkul Button page to render the shared component profile section.";
            }

            if (
                exampleHeading.compareDocumentPosition(propsHeading) !== Node.DOCUMENT_POSITION_FOLLOWING ||
                propsHeading.compareDocumentPosition(profileHeading) !== Node.DOCUMENT_POSITION_FOLLOWING
            ) {
                return "Expected the Button page to prioritize example and props before the component profile.";
            }

            if (!(controlsMenu instanceof HTMLMenuElement)) {
                return "Expected the interactive Button controls to use a menu element.";
            }

            if (!(codeBlock instanceof HTMLElement)) {
                return "Expected the Jøkul Button page to render code examples.";
            }

            if (!(codeFigure instanceof HTMLElement) || codeFigure.tagName !== "FIGURE") {
                return "Expected the interactive Button code examples to use figure elements.";
            }

            if (!(notesAside instanceof HTMLElement) || notesAside.tagName !== "ASIDE") {
                return "Expected the interactive Button notes to use an aside element.";
            }

            if (!(eventsSection instanceof HTMLElement) || !(eventsList instanceof HTMLOListElement)) {
                return "Expected the interactive Button example to render an event log section.";
            }

            if (!eventsList.textContent?.includes("click")) {
                return "Expected the interactive Button event log to show fired events.";
            }

            if (
                !(propsHeading instanceof HTMLElement) ||
                propsHeading.tagName !== "H2" ||
                !(propsCategoryHeading instanceof HTMLElement) ||
                propsCategoryHeading.tagName !== "H3"
            ) {
                return "Expected the Button prop tables to sit under a shared Props heading.";
            }

            if (!(previewButton instanceof HTMLButtonElement) || !previewButton.disabled) {
                return "Expected the interactive Button preview to react to the disabled prop.";
            }

            if (!(previewLoader instanceof HTMLElement)) {
                return "Expected the interactive Button preview to render the real Jøkul loader markup.";
            }

            if (!(previewTrailingIcon instanceof SVGElement)) {
                return "Expected the interactive Button preview to render the icon on the selected side.";
            }

            if (
                !(migrationHeading instanceof HTMLElement) ||
                !(migrationSection instanceof HTMLElement) ||
                !(migrationReplacement instanceof HTMLElement)
            ) {
                return "Expected the Jøkul Button page to render migration guides for deprecated props.";
            }

            if (
                !previewStyles ||
                previewStyles.borderRadius === "0px" ||
                previewStyles.fontWeight !== "700" ||
                previewStyles.paddingInlineStart === "0px"
            ) {
                return "Expected the interactive Button preview to include component-specific styles.";
            }

            if (
                !profileText.includes("Klient-JS") ||
                !profileText.includes("Hydrering") ||
                !profileText.includes("@fremtind/jokul/styles/components/button/button.min.css") ||
                !profileText.includes("tilgjengelig navn")
            ) {
                return "Expected the Jøkul Button page to expose concrete component profile data.";
            }

            if (
                !previewSummary.includes('variant="ghost"') ||
                !previewSummary.includes('density="compact"') ||
                !previewSummary.includes('loader="Sender inn"') ||
                !previewSummary.includes('icon="download"') ||
                !previewSummary.includes('iconPosition="right"') ||
                !previewSummary.includes('type="submit"')
            ) {
                return "Expected the interactive Button preview summary to reflect the selected props.";
            }

            if (
                !renderedCode.includes('variant="ghost"') ||
                !renderedCode.includes('density="compact"') ||
                !renderedCode.includes('type="submit"') ||
                !renderedCode.includes('loader={{ showLoader: true, textDescription: "Sender inn" }}') ||
                !renderedCode.includes("icon={icon}") ||
                !renderedCode.includes('iconPosition="right"') ||
                !renderedCode.includes("disabled")
            ) {
                return "Expected the interactive Button code example to update when props change.";
            }

            return relatedTokenLink
                ? null
                : "Expected the Jøkul Button page to link to the spacing token page.";
        },
    },
    {
        path: "/ds/jokul/komponenter/loader",
        async prepare(page) {
            await page.select('select[data-ds-interactive-control="size"]', "small");
            await page.click('input[data-ds-interactive-control="inline"]');
            await page.select('select[data-ds-interactive-control="role"]', "none");
            await page.waitForFunction(() => {
                const preview = document.querySelector('[data-ds-interactive-preview]');
                const code = document.querySelector("pre code")?.textContent ?? "";

                return Boolean(preview?.querySelector(".jkl-loader--small")) &&
                    Boolean(preview?.querySelector(".jkl-loader--inline")) &&
                    !preview?.querySelector('[role="status"]') &&
                    code.includes('jkl-loader jkl-loader--inline jkl-loader--small') &&
                    !code.includes('role="status"');
            });
        },
        assert() {
            const exampleHeading = document.querySelector("#asset-eksempel");
            const controlsMenu = document.querySelector('[data-ds-interactive-example] fieldset > menu');
            const propsHeading = document.querySelector("#asset-props");
            const propsCategoryHeading = document.querySelector("h3#props-design-system");
            const previewRoot = document.querySelector('[data-ds-interactive-preview]');
            const smallLoader = document.querySelector('[data-ds-interactive-preview] .jkl-loader--small');
            const inlineLoader = document.querySelector('[data-ds-interactive-preview] .jkl-loader--inline');
            const liveRegion = document.querySelector('[data-ds-interactive-preview] [role="status"]');
            const codeBlocks = Array.from(document.querySelectorAll("pre code"));
            const packageLabel = document.querySelector("main")?.textContent ?? "";
            const buttonLink = document.querySelector('a[href="/ds/jokul/komponenter/button"]');

            if (!(exampleHeading instanceof HTMLElement) || exampleHeading.textContent?.trim() !== "Eksempel") {
                return "Expected the Jøkul Loader page to render an example section.";
            }

            if (!(controlsMenu instanceof HTMLElement)) {
                return "Expected the Loader page to render interactive controls.";
            }

            if (!(propsHeading instanceof HTMLElement) || !(propsCategoryHeading instanceof HTMLElement)) {
                return "Expected the Loader page to render the shared props section.";
            }

            if (!(previewRoot instanceof HTMLElement)) {
                return "Expected the Loader page to render an interactive preview.";
            }

            if (!(smallLoader instanceof HTMLElement) || !(inlineLoader instanceof HTMLElement)) {
                return "Expected the Loader page to let the preview switch to small inline loader variants.";
            }

            if (liveRegion) {
                return "Expected the Loader page preview to remove the status role when the control omits it.";
            }

            if (
                !codeBlocks.some((block) =>
                    block.textContent?.includes('@fremtind/jokul/styles/components/loader/loader.min.css'))
            ) {
                return "Expected the Loader page to render code examples with the real loader CSS import.";
            }

            if (!packageLabel.includes("@fremtind/jokul")) {
                return "Expected the Loader page to show the loader package name.";
            }

            return buttonLink
                ? null
                : "Expected the Loader page to link back to the Button page.";
        },
    },
    {
        path: "/ds/jokul/komponenter/skeleton-loader",
        async prepare(page) {
            await page.select('select[data-ds-interactive-control="pattern"]', "table");
            await page.click('input[data-ds-interactive-control="compact"]');
            await page.waitForFunction(() => {
                const preview = document.querySelector('[data-ds-interactive-preview]');
                const code = document.querySelector("pre code")?.textContent ?? "";

                return Boolean(preview?.querySelector(".jkl-skeleton-table")) &&
                    Boolean(preview?.querySelector(".jkl-skeleton-table--compact")) &&
                    code.includes('class="jkl-skeleton-table jkl-skeleton-table--compact"') &&
                    code.includes('class="jkl-skeleton-table__row"');
            });
        },
        assert() {
            const exampleHeading = document.querySelector("#asset-eksempel");
            const controlsMenu = document.querySelector('[data-ds-interactive-example] fieldset > menu');
            const propsHeading = document.querySelector("#asset-props");
            const propsCategoryHeading = document.querySelector("h3#props-design-system");
            const relationshipsHeading = document.querySelector("#asset-relasjoner");
            const parentRelationships = document.querySelector("#asset-relasjoner-parent");
            const siblingRelationships = document.querySelector("#asset-relasjoner-sibling");
            const anatomyHeading = document.querySelector("#asset-anatomi");
            const partRow = document.querySelector("#part-animation-wrapper");
            const recipesHeading = document.querySelector("#asset-komposisjoner");
            const tableRecipe = document.querySelector("#recipe-table");
            const patternControl = document.querySelector('select[data-ds-interactive-control="pattern"]');
            const shapeControl = document.querySelector('select[data-ds-interactive-control="shape"]');
            const previewRoot = document.querySelector('[data-ds-interactive-preview]');
            const previewTable = document.querySelector('[data-ds-interactive-preview] .jkl-skeleton-table');
            const previewCompactTable = document.querySelector(
                '[data-ds-interactive-preview] .jkl-skeleton-table--compact',
            );
            const codeBlocks = Array.from(document.querySelectorAll("pre code"));
            const packageLabel = document.querySelector("main")?.textContent ?? "";

            if (!(exampleHeading instanceof HTMLElement) || exampleHeading.textContent?.trim() !== "Eksempel") {
                return "Expected the Jøkul Skeleton loader page to render an example section.";
            }

            if (!(controlsMenu instanceof HTMLElement)) {
                return "Expected the Skeleton loader page to render interactive controls.";
            }

            if (
                !(propsHeading instanceof HTMLElement) ||
                !(propsCategoryHeading instanceof HTMLElement) ||
                !(relationshipsHeading instanceof HTMLElement) ||
                !(parentRelationships instanceof HTMLElement) ||
                !(siblingRelationships instanceof HTMLElement) ||
                !(anatomyHeading instanceof HTMLElement) ||
                !(partRow instanceof HTMLElement) ||
                !(recipesHeading instanceof HTMLElement) ||
                !(tableRecipe instanceof HTMLElement) ||
                !(patternControl instanceof HTMLSelectElement) ||
                !(shapeControl instanceof HTMLSelectElement)
            ) {
                return "Expected the Skeleton loader page to render relationships, anatomy, recipes, and all documented controls.";
            }

            if (!(previewRoot instanceof HTMLElement)) {
                return "Expected the Skeleton loader page to render an interactive preview.";
            }

            if (!(previewTable instanceof HTMLElement) || !(previewCompactTable instanceof HTMLElement)) {
                return "Expected the Skeleton loader preview to switch to the compact table variant.";
            }

            if (
                !codeBlocks.some((block) =>
                    block.textContent?.includes(
                        '@fremtind/jokul/styles/components/loader/skeleton-loader.min.css',
                    ))
            ) {
                return "Expected the Skeleton loader page to render code examples with the real skeleton CSS import.";
            }

            if (!packageLabel.includes("@fremtind/jokul")) {
                return "Expected the Skeleton loader page to show the loader package name.";
            }

            return null;
        },
    },
    {
        path: "/ds/jokul/komponenter/table",
        async prepare(page) {
            await page.select('select[data-ds-interactive-control="density"]', "compact");
            await page.click('input[data-ds-interactive-control="fullWidth"]');
            await page.click('input[data-ds-interactive-control="collapseToList"]');
            await page.click('input[data-ds-interactive-control="captionSrOnly"]');
            await page.waitForFunction(() => {
                const preview = document.querySelector('[data-ds-interactive-preview]');
                const code = document.querySelector("pre code")?.textContent ?? "";

                return Boolean(preview?.querySelector(".jkl-table--full-width")) &&
                    Boolean(preview?.querySelector(".jkl-table--collapse-to-list")) &&
                    Boolean(preview?.querySelector(".jkl-table[data-collapse]")) &&
                    Boolean(preview?.querySelector(".jkl-table-caption--sr-only")) &&
                    code.includes('import "@fremtind/jokul/styles/components/table/table.min.css";') &&
                    code.includes('from "@fremtind/jokul/table"');
            });
        },
        assert() {
            const exampleHeading = document.querySelector("#asset-eksempel");
            const profileHeading = document.querySelector("#asset-komponentprofil");
            const controlsMenu = document.querySelector('[data-ds-interactive-example] fieldset > menu');
            const propsHeading = document.querySelector("#asset-props");
            const anatomyHeading = document.querySelector("#asset-anatomi");
            const recipesHeading = document.querySelector("#asset-komposisjoner");
            const subcomponentsHeading = document.querySelector("#asset-delkomponenter");
            const tableCaptionHeading = document.querySelector("#subcomponent-table-caption");
            const tableHeaderHeading = document.querySelector("#subcomponent-table-header");
            const tableCellHeading = document.querySelector("#subcomponent-table-cell");
            const stickyRecipe = document.querySelector("#recipe-sticky-head");
            const previewTable = document.querySelector('[data-ds-interactive-preview] .jkl-table');
            const previewFullWidth = document.querySelector('[data-ds-interactive-preview] .jkl-table--full-width');
            const previewCollapse = document.querySelector('[data-ds-interactive-preview] .jkl-table--collapse-to-list[data-collapse]');
            const previewCaption = document.querySelector('[data-ds-interactive-preview] .jkl-table-caption--sr-only');
            const compactPreview = document.querySelector('[data-ds-interactive-preview] [data-density="compact"]');
            const codeBlocks = Array.from(document.querySelectorAll("pre code"));
            const packageLabel = document.querySelector("main")?.textContent ?? "";
            const skeletonLink = document.querySelector('a[href="/ds/jokul/komponenter/skeleton-loader"]');

            if (
                !(exampleHeading instanceof HTMLElement) ||
                !(profileHeading instanceof HTMLElement) ||
                !(controlsMenu instanceof HTMLElement) ||
                !(propsHeading instanceof HTMLElement) ||
                !(anatomyHeading instanceof HTMLElement) ||
                !(recipesHeading instanceof HTMLElement) ||
                !(subcomponentsHeading instanceof HTMLElement) ||
                !(tableCaptionHeading instanceof HTMLElement) ||
                !(tableHeaderHeading instanceof HTMLElement) ||
                !(tableCellHeading instanceof HTMLElement) ||
                !(stickyRecipe instanceof HTMLElement)
            ) {
                return "Expected the Table page to render the component profile, example, anatomy, recipe, and subcomponent sections.";
            }

            if (
                exampleHeading.compareDocumentPosition(propsHeading) !== Node.DOCUMENT_POSITION_FOLLOWING ||
                propsHeading.compareDocumentPosition(subcomponentsHeading) !== Node.DOCUMENT_POSITION_FOLLOWING ||
                subcomponentsHeading.compareDocumentPosition(profileHeading) !== Node.DOCUMENT_POSITION_FOLLOWING
            ) {
                return "Expected the Table page to prioritize example, props, and subcomponents before the component profile.";
            }

            if (
                !(previewTable instanceof HTMLElement) ||
                !(previewFullWidth instanceof HTMLElement) ||
                !(previewCollapse instanceof HTMLElement) ||
                !(previewCaption instanceof HTMLElement) ||
                !(compactPreview instanceof HTMLElement)
            ) {
                return "Expected the Table preview to react to the selected full-width, collapse, caption, and density controls.";
            }

            if (!codeBlocks.some((block) => block.textContent?.includes('from "@fremtind/jokul/table"'))) {
                return "Expected the Table page to render code examples with the Jøkul table import path.";
            }

            if (!packageLabel.includes("@fremtind/jokul")) {
                return "Expected the Table page to show the monopackage name.";
            }

            if (!(document.querySelector('[aria-labelledby="asset-komponentprofil"]')?.textContent ?? "").includes("data-th")) {
                return "Expected the Table page component profile to mention the responsive data-th requirement.";
            }

            if (!(document.querySelector('[aria-labelledby="asset-delkomponenter"]')?.textContent ?? "").includes("sticky")) {
                return "Expected the Table page to document subcomponent prop tables with local prop names such as sticky.";
            }

            return skeletonLink
                ? null
                : "Expected the Table page to link to Skeleton loader as related guidance.";
        },
    },
    {
        path: "/ds/søk?q=button",
        assert() {
            const input = document.querySelector('input[name="q"]');
            const result = document.querySelector('a[href="/ds/jokul/komponenter/button"]');
            const summary = document.querySelector("main")?.textContent ?? "";

            if (!(input instanceof HTMLInputElement)) {
                return "Expected /ds/søk to expose a search field.";
            }

            if (input.value !== "button") {
                return `Expected the search field to preserve the query, got "${input.value}".`;
            }

            if (!result) {
                return "Expected the search page to render the Button result.";
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

        if (typeof routeCheck.prepare === "function") {
            await routeCheck.prepare(page);
        }

        const astroIslandCount = await page.evaluate(() => document.querySelectorAll("astro-island").length);

        if (astroIslandCount !== 0) {
            throw new Error(`Expected ${routeCheck.path} to render without hydrated islands, got ${astroIslandCount}.`);
        }

        const missingSharedToc = await page.evaluate(() => {
            const main = document.querySelector("main");
            const toc = main?.querySelector("[data-page-toc]");
            const tocLinks = main?.querySelectorAll("[data-page-toc-nav] a").length ?? 0;

            if (!(main instanceof HTMLElement)) {
                return null;
            }

            if (!(toc instanceof HTMLDetailsElement)) {
                return "Expected the page to render the shared table of contents as a details element.";
            }

            if (!toc.open) {
                return "Expected the shared table of contents details element to be open by default.";
            }

            return tocLinks > 0
                ? null
                : "Expected the shared table of contents to include at least one heading link.";
        });

        if (missingSharedToc) {
            throw new Error(`${routeCheck.path}: ${missingSharedToc}`);
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
