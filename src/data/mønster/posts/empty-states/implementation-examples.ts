export const vanillaCollectionEmptyStateHtmlCode = `
<section class="mønster-empty-demo">
    <div class="mønster-empty-card">
        <p class="mønster-empty-kicker">Tom mottakerliste</p>
        <h3>Ingen mottakere enda</h3>
        <p>Legg til første mottaker for å komme i gang med utsendelsen.</p>
        <div class="mønster-empty-actions">
            <button type="button" class="mønster-empty-button" data-empty-add-first>
                Legg til første mottaker
            </button>
            <a href="#" class="mønster-empty-link">Se et eksempel</a>
        </div>
    </div>
    <ul class="mønster-empty-results" data-empty-results hidden>
        <li>Ola Nordmann</li>
    </ul>
</section>
`;

export const vanillaCollectionEmptyStateCssCode = `
.mønster-empty-card {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid var(--site-border-color);
    border-radius: 1rem;
}

.mønster-empty-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
}

.mønster-empty-button,
.mønster-empty-link {
    display: inline-flex;
    min-block-size: 2.75rem;
    padding-inline: 1rem;
    align-items: center;
    border-radius: 999px;
}
`;

export const vanillaCollectionEmptyStateJsCode = `
const addButton = document.querySelector("[data-empty-add-first]");
const results = document.querySelector("[data-empty-results]");

addButton?.addEventListener("click", () => {
    results?.removeAttribute("hidden");
});
`;

export const vanillaFilteredEmptyStateHtmlCode = `
<section class="mønster-empty-demo">
    <div class="mønster-empty-filter-bar" data-empty-filters>
        <span class="mønster-empty-chip">Status: Ubetalt</span>
        <span class="mønster-empty-chip">Periode: April</span>
    </div>
    <div class="mønster-empty-card">
        <h3>Ingen treff på filtrene</h3>
        <p>Prøv et bredere utvalg eller nullstill filtrene for å se flere fakturaer.</p>
        <div class="mønster-empty-actions">
            <button type="button" class="mønster-empty-button" data-empty-reset>
                Nullstill filter
            </button>
        </div>
    </div>
    <ul class="mønster-empty-results" data-empty-filter-results hidden>
        <li>Aprilfaktura</li>
        <li>Maifaktura</li>
    </ul>
</section>
`;

export const vanillaFilteredEmptyStateCssCode = `
.mønster-empty-filter-bar {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.mønster-empty-chip {
    padding: 0.35rem 0.75rem;
    border-radius: 999px;
    background: color-mix(in srgb, var(--site-hint-color) 14%, var(--site-page-background) 86%);
}
`;

export const vanillaFilteredEmptyStateJsCode = `
const resetButton = document.querySelector("[data-empty-reset]");
const filters = document.querySelector("[data-empty-filters]");
const results = document.querySelector("[data-empty-filter-results]");

resetButton?.addEventListener("click", () => {
    filters?.setAttribute("hidden", "true");
    results?.removeAttribute("hidden");
});
`;

export const vanillaGuidedEmptyStateHtmlCode = `
<section class="mønster-empty-demo">
    <div class="mønster-empty-card">
        <p class="mønster-empty-kicker">Førstegangsflate</p>
        <h3>Ingen rapporter delt ennå</h3>
        <p>Når du deler en rapport, dukker den opp her sammen med siste aktivitet.</p>
        <ol class="mønster-empty-steps">
            <li>Velg rapporten du vil dele</li>
            <li>Legg til mottakere</li>
            <li>Send og følg status her</li>
        </ol>
        <div class="mønster-empty-actions">
            <button type="button" class="mønster-empty-button">Del første rapport</button>
        </div>
    </div>
</section>
`;

export const vanillaGuidedEmptyStateCssCode = `
.mønster-empty-steps {
    display: grid;
    gap: 0.5rem;
    padding-inline-start: 1.2rem;
}
`;

export const vanillaCollectionEmptyStatePreviewHtml = `
<section class="mønster-empty-demo">
    <div class="mønster-empty-card">
        <p class="mønster-empty-kicker">Tom mottakerliste</p>
        <h3>Ingen mottakere enda</h3>
        <p>Legg til første mottaker for å komme i gang med utsendelsen.</p>
        <div class="mønster-empty-actions">
            <button type="button" class="mønster-empty-button">Legg til første mottaker</button>
            <a href="#" class="mønster-empty-link">Se et eksempel</a>
        </div>
    </div>
</section>
`;

export const vanillaFilteredEmptyStatePreviewHtml = `
<section class="mønster-empty-demo">
    <div class="mønster-empty-filter-bar">
        <span class="mønster-empty-chip">Status: Ubetalt</span>
        <span class="mønster-empty-chip">Periode: April</span>
    </div>
    <div class="mønster-empty-card">
        <h3>Ingen treff på filtrene</h3>
        <p>Prøv et bredere utvalg eller nullstill filtrene for å se flere fakturaer.</p>
        <div class="mønster-empty-actions">
            <button type="button" class="mønster-empty-button">Nullstill filter</button>
        </div>
    </div>
</section>
`;

export const vanillaGuidedEmptyStatePreviewHtml = `
<section class="mønster-empty-demo">
    <div class="mønster-empty-card">
        <p class="mønster-empty-kicker">Førstegangsflate</p>
        <h3>Ingen rapporter delt ennå</h3>
        <p>Når du deler en rapport, dukker den opp her sammen med siste aktivitet.</p>
        <ol class="mønster-empty-steps">
            <li>Velg rapporten du vil dele</li>
            <li>Legg til mottakere</li>
            <li>Send og følg status her</li>
        </ol>
        <div class="mønster-empty-actions">
            <button type="button" class="mønster-empty-button">Del første rapport</button>
        </div>
    </div>
</section>
`;
