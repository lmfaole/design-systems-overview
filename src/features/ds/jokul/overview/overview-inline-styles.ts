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
`;
