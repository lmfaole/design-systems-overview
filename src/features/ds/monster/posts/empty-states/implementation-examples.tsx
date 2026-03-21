import "./implementation-examples.scss";
import { Button } from "@fremtind/jokul/button";
import { Card } from "@fremtind/jokul/card";
import { Flex } from "@fremtind/jokul/flex";
import { Message } from "@fremtind/jokul/message";

export const vanillaCollectionEmptyStateHtmlCode = `
<section class="monster-empty-demo">
    <div class="monster-empty-card">
        <p class="monster-empty-kicker">Tom mottakerliste</p>
        <h3>Ingen mottakere enda</h3>
        <p>Legg til første mottaker for å komme i gang med utsendelsen.</p>
        <div class="monster-empty-actions">
            <button type="button" class="monster-empty-button" data-empty-add-first>
                Legg til første mottaker
            </button>
            <a href="#" class="monster-empty-link">Se et eksempel</a>
        </div>
    </div>
    <ul class="monster-empty-results" data-empty-results hidden>
        <li>Ola Nordmann</li>
    </ul>
</section>
`;

export const vanillaCollectionEmptyStateCssCode = `
.monster-empty-card {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid var(--site-border-color);
    border-radius: 1rem;
}

.monster-empty-actions {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
}

.monster-empty-button,
.monster-empty-link {
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
<section class="monster-empty-demo">
    <div class="monster-empty-filter-bar" data-empty-filters>
        <span class="monster-empty-chip">Status: Ubetalt</span>
        <span class="monster-empty-chip">Periode: April</span>
    </div>
    <div class="monster-empty-card">
        <h3>Ingen treff på filtrene</h3>
        <p>Prøv et bredere utvalg eller nullstill filtrene for å se flere fakturaer.</p>
        <div class="monster-empty-actions">
            <button type="button" class="monster-empty-button" data-empty-reset>
                Nullstill filter
            </button>
        </div>
    </div>
    <ul class="monster-empty-results" data-empty-filter-results hidden>
        <li>Aprilfaktura</li>
        <li>Maifaktura</li>
    </ul>
</section>
`;

export const vanillaFilteredEmptyStateCssCode = `
.monster-empty-filter-bar {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
}

.monster-empty-chip {
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
<section class="monster-empty-demo">
    <div class="monster-empty-card">
        <p class="monster-empty-kicker">Førstegangsflate</p>
        <h3>Ingen rapporter delt ennå</h3>
        <p>Når du deler en rapport, dukker den opp her sammen med siste aktivitet.</p>
        <ol class="monster-empty-steps">
            <li>Velg rapporten du vil dele</li>
            <li>Legg til mottakere</li>
            <li>Send og følg status her</li>
        </ol>
        <div class="monster-empty-actions">
            <button type="button" class="monster-empty-button">Del første rapport</button>
        </div>
    </div>
</section>
`;

export const vanillaGuidedEmptyStateCssCode = `
.monster-empty-steps {
    display: grid;
    gap: 0.5rem;
    padding-inline-start: 1.2rem;
}
`;

export const jokulCollectionEmptyStateCode = `
import "./implementation-examples.scss";
import { Button } from "@fremtind/jokul/button";
import { Card } from "@fremtind/jokul/card";
import { Flex } from "@fremtind/jokul/flex";

export function JokulCollectionEmptyStateExample() {
    return (
        <Card padding="l">
            <Flex direction="column" gap="s">
                <p><strong>Tom mottakerliste</strong></p>
                <h3>Ingen mottakere enda</h3>
                <p>Legg til første mottaker for å komme i gang med utsendelsen.</p>
                <Button>Legg til første mottaker</Button>
            </Flex>
        </Card>
    );
}
`;

export const jokulFilteredEmptyStateCode = `
import "./implementation-examples.scss";
import { Button } from "@fremtind/jokul/button";
import { Card } from "@fremtind/jokul/card";
import { Flex } from "@fremtind/jokul/flex";
import { Message } from "@fremtind/jokul/message";

export function JokulFilteredEmptyStateExample() {
    return (
        <Card padding="l">
            <Flex direction="column" gap="s">
                <p><strong>Aktive filtre:</strong> Ubetalt, April</p>
                <Message variant="info">
                    Ingen fakturaer matcher filtrene dine akkurat nå.
                </Message>
                <Button variant="secondary">Nullstill filter</Button>
            </Flex>
        </Card>
    );
}
`;

export const jokulGuidedEmptyStateCode = `
import "./implementation-examples.scss";
import { Button } from "@fremtind/jokul/button";
import { Card } from "@fremtind/jokul/card";
import { Flex } from "@fremtind/jokul/flex";

export function JokulGuidedEmptyStateExample() {
    return (
        <Card padding="l">
            <Flex direction="column" gap="s">
                <h3>Ingen rapporter delt ennå</h3>
                <p>Del første rapport for å samle aktivitet og status på ett sted.</p>
                <ul className="monster-empty-jokul-list">
                    <li>Velg rapporten du vil dele</li>
                    <li>Legg til mottakere</li>
                    <li>Følg status her etterpå</li>
                </ul>
                <Button>Del første rapport</Button>
            </Flex>
        </Card>
    );
}
`;

export function VanillaCollectionEmptyStateExample() {
    return (
        <section className="monster-empty-demo">
            <div className="monster-empty-card">
                <p className="monster-empty-kicker">Tom mottakerliste</p>
                <h3>Ingen mottakere enda</h3>
                <p>Legg til første mottaker for å komme i gang med utsendelsen.</p>
                <div className="monster-empty-actions">
                    <button type="button" className="monster-empty-button">
                        Legg til første mottaker
                    </button>
                    <a href="#" className="monster-empty-link">Se et eksempel</a>
                </div>
            </div>
        </section>
    );
}

export function VanillaFilteredEmptyStateExample() {
    return (
        <section className="monster-empty-demo">
            <div className="monster-empty-filter-bar">
                <span className="monster-empty-chip">Status: Ubetalt</span>
                <span className="monster-empty-chip">Periode: April</span>
            </div>
            <div className="monster-empty-card">
                <h3>Ingen treff på filtrene</h3>
                <p>Prøv et bredere utvalg eller nullstill filtrene for å se flere fakturaer.</p>
                <div className="monster-empty-actions">
                    <button type="button" className="monster-empty-button">
                        Nullstill filter
                    </button>
                </div>
            </div>
        </section>
    );
}

export function VanillaGuidedEmptyStateExample() {
    return (
        <section className="monster-empty-demo">
            <div className="monster-empty-card">
                <p className="monster-empty-kicker">Førstegangsflate</p>
                <h3>Ingen rapporter delt ennå</h3>
                <p>Når du deler en rapport, dukker den opp her sammen med siste aktivitet.</p>
                <ol className="monster-empty-steps">
                    <li>Velg rapporten du vil dele</li>
                    <li>Legg til mottakere</li>
                    <li>Send og følg status her</li>
                </ol>
                <div className="monster-empty-actions">
                    <button type="button" className="monster-empty-button">
                        Del første rapport
                    </button>
                </div>
            </div>
        </section>
    );
}

export function JokulCollectionEmptyStateExample() {
    return (
        <Card padding="l">
            <Flex direction="column" gap="s">
                <p><strong>Tom mottakerliste</strong></p>
                <h3>Ingen mottakere enda</h3>
                <p>Legg til første mottaker for å komme i gang med utsendelsen.</p>
                <Button>Legg til første mottaker</Button>
            </Flex>
        </Card>
    );
}

export function JokulFilteredEmptyStateExample() {
    return (
        <Card padding="l">
            <Flex direction="column" gap="s">
                <p><strong>Aktive filtre:</strong> Ubetalt, April</p>
                <Message variant="info">
                    Ingen fakturaer matcher filtrene dine akkurat nå.
                </Message>
                <Button variant="secondary">Nullstill filter</Button>
            </Flex>
        </Card>
    );
}

export function JokulGuidedEmptyStateExample() {
    return (
        <Card padding="l">
            <Flex direction="column" gap="s">
                <h3>Ingen rapporter delt ennå</h3>
                <p>Del første rapport for å samle aktivitet og status på ett sted.</p>
                <ul className="monster-empty-jokul-list">
                    <li>Velg rapporten du vil dele</li>
                    <li>Legg til mottakere</li>
                    <li>Følg status her etterpå</li>
                </ul>
                <Button>Del første rapport</Button>
            </Flex>
        </Card>
    );
}
