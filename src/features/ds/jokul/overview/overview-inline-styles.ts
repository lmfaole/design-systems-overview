export const overviewInlineStyles = `
.overview-page {
    display: grid;
    gap: var(--jkl-spacing-2xl);
}

.overview-nav-page {
    align-content: start;
    padding-block: var(--jkl-spacing-xl);
}

.overview-nav-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--jkl-spacing-l);
}

.overview-section {
    display: grid;
    gap: var(--jkl-spacing-l);
}

.overview-section-header {
    display: grid;
    gap: var(--jkl-spacing-xs);
}

.overview-section-link,
.overview-inline-link,
.overview-card {
    color: inherit;
    text-decoration: none;
}

.overview-section-link,
.overview-inline-link {
    text-underline-offset: 0.16em;
    text-decoration-thickness: 0.08em;
}

.overview-card {
    display: grid;
    gap: var(--jkl-spacing-s);
    align-content: start;
    min-block-size: 100%;
    padding: var(--jkl-spacing-m);
    border: 1px solid var(--jkl-color-border-subdued);
    border-radius: var(--jkl-border-radius-m);
    background: linear-gradient(
        180deg,
        var(--jkl-color-background-container-low),
        var(--jkl-color-background-container)
    );
    transition:
        border-color 150ms ease,
        background-color 150ms ease,
        transform 150ms ease;
}

.overview-card:hover {
    background: var(--jkl-color-background-container-high);
    border-color: var(--jkl-color-border-strong);
    transform: translateY(-1px);
}

.overview-card[data-layout="feature"] {
    position: relative;
    min-block-size: 18rem;
    padding: var(--jkl-spacing-xl);
    align-content: end;
    justify-items: start;
    text-align: left;
    gap: var(--jkl-spacing-m);
    background:
        radial-gradient(
            circle at top right,
            color-mix(in srgb, var(--overview-card-accent, var(--jkl-color-background-container-high)) 65%, transparent),
            transparent 58%
        ),
        linear-gradient(
            180deg,
            var(--jkl-color-background-container-low),
            var(--jkl-color-background-container)
        );
}

.overview-card[data-layout="illustrated"] {
    position: relative;
    min-block-size: clamp(15rem, 28svh, 21rem);
    padding: 0;
    overflow: hidden;
}

.overview-card:focus-visible,
.overview-section-link:focus-visible,
.overview-inline-link:focus-visible {
    outline: 3px solid var(--jkl-color-border-action);
    outline-offset: 3px;
}

.overview-card[data-kind="token"][data-layout="illustrated"] {
    align-content: center;
    min-block-size: 16rem;
    text-align: center;
    background:
        radial-gradient(
            circle at top,
            color-mix(in srgb, var(--jkl-color-background-container-high) 75%, transparent),
            transparent 55%
        ),
        linear-gradient(
            180deg,
            var(--jkl-color-background-container),
            var(--jkl-color-background-container-low)
        );
}

.overview-card[data-layout="illustrated"][data-kind="token"] {
    align-content: stretch;
    min-block-size: clamp(15rem, 28svh, 21rem);
    text-align: left;
}

.overview-card[data-layout="feature"][data-kind="component"] {
    --overview-card-accent: var(--jkl-color-background-container-high);
}

.overview-card[data-layout="feature"][data-kind="token"] {
    --overview-card-accent: var(--jkl-color-background-alert-info);
}

.overview-card-title {
    font-size: var(--jkl-font-size-5);
    line-height: var(--jkl-line-height-tight);
    font-weight: 700;
}

.overview-card-meta {
    color: var(--jkl-color-text-subdued);
    font-size: var(--jkl-font-size-2);
    line-height: var(--jkl-line-height-relaxed);
}

.overview-card[data-kind="token"] .overview-card-title {
    font-size: var(--jkl-font-size-6);
}

.overview-card[data-layout="feature"] .overview-card-title {
    font-size: clamp(var(--jkl-font-size-6), 4vw, var(--jkl-font-size-8));
}

.overview-card[data-layout="illustrated"] .overview-card-title {
    max-inline-size: 14ch;
}

.overview-card-description {
    color: var(--jkl-color-text-subdued);
    font-size: var(--jkl-font-size-2);
    line-height: var(--jkl-line-height-relaxed);
}

.overview-card[data-layout="feature"] .overview-card-description {
    max-inline-size: 42rem;
    font-size: var(--jkl-font-size-3);
}

@media (max-width: 59.99rem) {
    .overview-nav-grid {
        grid-template-columns: minmax(0, 1fr);
    }
}

.overview-card-illustration {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
}

.overview-card-illustration::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
        180deg,
        transparent 0%,
        color-mix(in srgb, var(--jkl-color-background-page) 72%, transparent) 72%,
        var(--jkl-color-background-page) 100%
    );
}

.overview-card-illustration > * {
    width: 100%;
    height: 100%;
}

.overview-card-copy {
    position: relative;
    z-index: 1;
    display: grid;
    align-content: end;
    min-block-size: inherit;
    padding: var(--jkl-spacing-l);
}

.overview-card[data-static-illustration] .overview-card-illustration :where(.swatch, .motion-card, .breakpoint-bar, .shape, .type-inner, .dot, .space-grid, .shadow-surface) {
    animation: none;
}

.overview-card[data-static-illustration] .overview-card-illustration :where(.swatch, .motion-card, .breakpoint-bar, .shape, .shadow-surface) {
    opacity: 1;
    transform: none;
}

.overview-card[data-static-illustration] .overview-card-illustration :where(.space-grid, .type-inner) {
    transform: none;
}

.overview-card[data-static-illustration] .overview-card-illustration .dot {
    opacity: 0.7;
    transform: rotate(45deg);
}

.token-mini {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    padding: var(--jkl-spacing-l);
    background:
        radial-gradient(
            circle at top,
            color-mix(in srgb, var(--jkl-color-background-container-high) 75%, transparent),
            transparent 58%
        ),
        linear-gradient(
            180deg,
            color-mix(in srgb, var(--jkl-color-background-container-low) 92%, transparent),
            var(--jkl-color-background-container)
        );
}

.token-mini__palette,
.token-mini__radii,
.token-mini__spacing,
.token-mini__motion,
.token-mini__breakpoints,
.token-mini__type,
.token-mini__shadows {
    width: min(100%, 15rem);
}

.token-mini__palette {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--jkl-spacing-s);
}

.token-mini__swatch {
    aspect-ratio: 1;
    border-radius: var(--jkl-border-radius-m);
    border: 1px solid var(--jkl-color-border-subdued);
    background: var(--token-mini-swatch);
}

.token-mini__swatch[data-swatch="snohvit"] {
    --token-mini-swatch: var(--jkl-color-brand-snohvit);
}

.token-mini__swatch[data-swatch="sand"] {
    --token-mini-swatch: var(--jkl-color-brand-sand);
}

.token-mini__swatch[data-swatch="varde"] {
    --token-mini-swatch: var(--jkl-color-brand-varde);
}

.token-mini__swatch[data-swatch="svaberg"] {
    --token-mini-swatch: var(--jkl-color-brand-svaberg);
}

.token-mini__motion {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--jkl-spacing-s);
}

.token-mini__motion-card {
    aspect-ratio: 0.85;
    border: 1px solid var(--jkl-color-border-subdued);
    border-radius: var(--jkl-border-radius-m);
    background: var(--jkl-color-background-container-high);
}

.token-mini__motion-card:nth-child(1),
.token-mini__motion-card:nth-child(4) {
    transform: translateY(10%);
}

.token-mini__motion-card:nth-child(3),
.token-mini__motion-card:nth-child(6) {
    transform: translateY(-10%);
}

.token-mini__breakpoints {
    display: grid;
    gap: var(--jkl-spacing-s);
}

.token-mini__breakpoint-bar {
    display: block;
    height: 1rem;
    border: 1px solid var(--jkl-color-border-subdued);
    border-radius: var(--jkl-border-radius-full);
    background: var(--jkl-color-background-container-high);
}

.token-mini__breakpoint-bar[data-size="xs"] {
    width: 34%;
}

.token-mini__breakpoint-bar[data-size="s"] {
    width: 52%;
}

.token-mini__breakpoint-bar[data-size="m"] {
    width: 74%;
}

.token-mini__breakpoint-bar[data-size="l"] {
    width: 100%;
}

.token-mini__radii {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--jkl-spacing-s);
}

.token-mini__shape {
    aspect-ratio: 1.2;
    border: 1px solid var(--jkl-color-border-subdued);
    background: var(--jkl-color-background-container-high);
}

.token-mini__shape[data-radius="none"] {
    border-radius: var(--jkl-border-radius-none);
}

.token-mini__shape[data-radius="s"] {
    border-radius: var(--jkl-border-radius-s);
}

.token-mini__shape[data-radius="m"] {
    border-radius: var(--jkl-border-radius-m);
}

.token-mini__shape[data-radius="full"] {
    border-radius: var(--jkl-border-radius-full);
}

.token-mini__shadows {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    align-items: end;
    gap: var(--jkl-spacing-s);
}

.token-mini__shadow-surface {
    display: block;
    min-height: 4.5rem;
    border: 1px solid var(--jkl-color-border-subdued);
    border-radius: var(--jkl-border-radius-m);
    background: var(--jkl-color-background-container-high);
}

.token-mini__shadow-surface[data-shadow="navigation"] {
    min-height: 4rem;
    box-shadow: 0 0.25rem 0.9375rem rgb(37 42 49 / 10%);
}

.token-mini__shadow-surface[data-shadow="task"] {
    min-height: 5rem;
    box-shadow: 0 0.25rem 0.75rem rgb(37 42 49 / 3%);
}

.token-mini__shadow-surface[data-shadow="hover"] {
    min-height: 6rem;
    box-shadow: 0 0.375rem 1.5625rem rgb(37 42 49 / 12%);
}

.token-mini__spacing {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--jkl-spacing-l);
}

.token-mini__spacing-box {
    aspect-ratio: 1;
    border: 1px solid var(--jkl-color-border-subdued);
    border-radius: var(--jkl-border-radius-m);
    background: var(--jkl-color-background-container-high);
}

.token-mini__spacing-box[data-size="xs"] {
    transform: scale(0.74);
}

.token-mini__spacing-box[data-size="s"] {
    transform: scale(0.88);
}

.token-mini__spacing-box[data-size="m"] {
    transform: scale(1);
}

.token-mini__spacing-box[data-size="l"] {
    transform: scale(1.14);
}

.token-mini__type {
    display: grid;
    gap: var(--jkl-spacing-xs);
}

.token-mini__type-row {
    display: block;
    overflow: hidden;
    color: var(--jkl-color-text-default);
    white-space: nowrap;
    text-overflow: clip;
}

.token-mini__type-row[data-size="s"] {
    font-size: var(--jkl-font-size-2);
    line-height: var(--jkl-line-height-relaxed);
}

.token-mini__type-row[data-size="m"] {
    font-size: var(--jkl-font-size-4);
    line-height: var(--jkl-line-height-tight);
}

.token-mini__type-row[data-size="l"] {
    font-size: var(--jkl-font-size-6);
    line-height: var(--jkl-line-height-tight);
    font-weight: 700;
}
`;
