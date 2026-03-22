import process from "node:process";
import puppeteer from "puppeteer";

const baseUrl = process.argv[2] ?? "http://127.0.0.1:3001";
const url = new URL("/ds/søk?q=button", `${baseUrl}/`).toString();

const browser = await puppeteer.launch({
    headless: true,
});

try {
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: "networkidle0",
    });

    await page.waitForSelector('input[name="q"]');

    const state = await page.evaluate(() => {
        const input = document.querySelector('input[name="q"]');
        const resultLink = document.querySelector('a[href="/ds/jokul/komponenter/button"]');
        const pageText = document.querySelector("main")?.textContent ?? "";

        return {
            inputValue: input instanceof HTMLInputElement ? input.value : "",
            hasButtonResult: Boolean(resultLink),
            hasAstroIsland: Boolean(document.querySelector("astro-island")),
            pageText,
        };
    });

    if (!state.hasButtonResult) {
        throw new Error(`Expected a button result on ${url}, but none was rendered.`);
    }

    if (state.inputValue !== "button") {
        throw new Error(`Expected search input value to be "button", got "${state.inputValue}".`);
    }

    if (state.hasAstroIsland) {
        throw new Error(`Expected ${url} to render without hydrated islands.`);
    }

    if (!state.pageText.includes("treff totalt.")) {
        throw new Error(`Expected a total-results summary on ${url}, got "${state.pageText}".`);
    }

    if (state.pageText.includes("Skriv inn et søk for å se resultater.")) {
        throw new Error(`Expected rendered results on ${url}, but the empty-search state was still present.`);
    }

    console.log(`Search page smoke test passed: ${url}`);
} finally {
    await browser.close();
}
