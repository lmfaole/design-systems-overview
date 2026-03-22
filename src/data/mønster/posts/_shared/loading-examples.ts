export const vanillaInlineStatusExampleHtmlCode = `
<section
    class="mønster-vanilla-demo"
    data-loading-example="inline-status"
    aria-live="polite"
    aria-busy="true"
>
    <div class="mønster-vanilla-stack">
        <p><strong>Oppdaterer betalingsoversikt</strong></p>
        <p>Vi henter siste status for betalingene dine.</p>
        <div class="mønster-vanilla-status" role="status">
            <span class="mønster-vanilla-spinner" aria-hidden="true"></span>
            <span class="mønster-vanilla-status-label">Laster betalingsoversikt...</span>
        </div>
    </div>
</section>
`;

export const vanillaInlineStatusExampleCssCode = `
.mønster-vanilla-demo {
    border: 1px solid var(--site-border-color);
    border-radius: 1rem;
    padding: 1rem;
}

.mønster-vanilla-stack {
    display: grid;
    gap: 0.75rem;
}

.mønster-vanilla-status {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    color: var(--site-info-color);
}

.mønster-vanilla-spinner {
    inline-size: 1rem;
    block-size: 1rem;
    border: 2px solid color-mix(in srgb, var(--site-info-color) 28%, var(--site-border-color) 72%);
    border-top-color: currentColor;
    border-radius: 999px;
    animation: spin 0.9s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
`;

export const vanillaInlineStatusExampleJsCode = `
const region = document.querySelector('[data-loading-example="inline-status"]');

window.setTimeout(() => {
    region?.setAttribute("aria-busy", "false");
}, 1200);
`;

export const vanillaSkeletonExampleHtmlCode = `
<section
    class="mønster-vanilla-demo"
    data-loading-example="skeleton"
    aria-busy="true"
    aria-live="polite"
>
    <div class="mønster-vanilla-stack mønster-vanilla-skeleton">
        <span class="mønster-vanilla-skeleton-line title"></span>
        <span class="mønster-vanilla-skeleton-line body"></span>
        <span class="mønster-vanilla-skeleton-line body short"></span>
    </div>
</section>
`;

export const vanillaSkeletonExampleCssCode = `
.mønster-vanilla-skeleton-line {
    display: block;
    block-size: 0.875rem;
    border-radius: 999px;
    background:
        linear-gradient(
            90deg,
            color-mix(in srgb, var(--site-hint-color) 14%, var(--site-page-background) 86%) 25%,
            color-mix(in srgb, var(--site-info-color) 18%, var(--site-page-background) 82%) 50%,
            color-mix(in srgb, var(--site-hint-color) 14%, var(--site-page-background) 86%) 75%
        );
    background-size: 200% 100%;
    animation: shimmer 1.4s linear infinite;
}

.mønster-vanilla-skeleton-line.title {
    block-size: 1.25rem;
    inline-size: 55%;
}

.mønster-vanilla-skeleton-line.body {
    inline-size: 100%;
}

.mønster-vanilla-skeleton-line.body.short {
    inline-size: 72%;
}

@keyframes shimmer {
    to {
        background-position: -200% 0;
    }
}
`;

export const vanillaProgressExampleHtmlCode = `
<section class="mønster-vanilla-demo" data-loading-example="progress">
    <div class="mønster-vanilla-stack">
        <div class="mønster-vanilla-progress-header">
            <strong>Sender søknad</strong>
            <span data-loading-progress-label>45 % fullført</span>
        </div>
        <progress
            class="mønster-vanilla-progress"
            data-loading-progress
            max="100"
            value="45"
            aria-label="Fremdrift for søknad"
        >45 %</progress>
        <p>Dette tar litt lenger tid enn normalt. Du kan vente her mens vi fullfører sendingen.</p>
    </div>
</section>
`;

export const vanillaProgressExampleCssCode = `
.mønster-vanilla-progress-header {
    display: flex;
    gap: 0.75rem;
    justify-content: space-between;
}

.mønster-vanilla-progress {
    inline-size: 100%;
    block-size: 0.875rem;
    accent-color: var(--site-info-color);
}
`;

export const vanillaProgressExampleJsCode = `
const region = document.querySelector('[data-loading-example="progress"]');
const progress = region?.querySelector("[data-loading-progress]");
const label = region?.querySelector("[data-loading-progress-label]");

window.setTimeout(() => {
    if (!(progress instanceof HTMLProgressElement) || !(label instanceof HTMLElement)) {
        return;
    }

    progress.value = 72;
    progress.textContent = "72 %";
    label.textContent = "72 % fullført";
}, 1200);
`;

export const vanillaInlineStatusPreviewHtml = `
<section class="mønster-vanilla-demo" aria-live="polite" aria-busy="true">
    <div class="mønster-vanilla-stack">
        <p><strong>Oppdaterer betalingsoversikt</strong></p>
        <p>Vi henter siste status for betalingene dine.</p>
        <div class="mønster-vanilla-status" role="status">
            <span class="mønster-vanilla-spinner" aria-hidden="true"></span>
            <span class="mønster-vanilla-status-label">Laster betalingsoversikt...</span>
        </div>
    </div>
</section>
`;

export const vanillaSkeletonPreviewHtml = `
<section class="mønster-vanilla-demo" aria-busy="true" aria-live="polite">
    <div class="mønster-vanilla-stack mønster-vanilla-skeleton">
        <span class="mønster-vanilla-skeleton-line title"></span>
        <span class="mønster-vanilla-skeleton-line body"></span>
        <span class="mønster-vanilla-skeleton-line body short"></span>
    </div>
</section>
`;

export const vanillaProgressPreviewHtml = `
<section class="mønster-vanilla-demo">
    <div class="mønster-vanilla-stack">
        <div class="mønster-vanilla-progress-header">
            <strong>Sender søknad</strong>
            <span id="progress-label">45 % fullført</span>
        </div>
        <progress
            class="mønster-vanilla-progress"
            max="100"
            value="45"
            aria-describedby="progress-label"
        >45 %</progress>
        <p>Dette tar litt lenger tid enn normalt. Du kan vente her mens vi fullfører sendingen.</p>
    </div>
</section>
`;
