export const vanillaInlineConfirmationHtmlCode = `
<section class="mønster-confirmation-demo">
    <div class="mønster-confirmation-card">
        <p><strong>Varsler</strong></p>
        <p>E-postvarsler er slått på for prosjektet.</p>
        <div class="mønster-confirmation-actions">
            <button type="button" class="mønster-confirmation-button" data-confirm-save>
                Lagre endringer
            </button>
        </div>
        <p class="mønster-confirmation-banner" data-confirm-status role="status" hidden>
            Innstillingene ble lagret.
        </p>
    </div>
</section>
`;

export const vanillaInlineConfirmationCssCode = `
.mønster-confirmation-card {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid var(--site-border-color);
    border-radius: 1rem;
}

.mønster-confirmation-banner {
    padding: 0.85rem 1rem;
    border-radius: 1rem;
    background: color-mix(in srgb, var(--site-success-color) 14%, var(--site-page-background) 86%);
}
`;

export const vanillaInlineConfirmationJsCode = `
const saveButton = document.querySelector("[data-confirm-save]");
const status = document.querySelector("[data-confirm-status]");

saveButton?.addEventListener("click", () => {
    status?.removeAttribute("hidden");
});
`;

export const vanillaToastConfirmationHtmlCode = `
<section class="mønster-confirmation-demo">
    <div class="mønster-confirmation-actions">
        <button type="button" class="mønster-confirmation-button" data-confirm-copy>
            Kopier lenke
        </button>
    </div>
    <div class="mønster-confirmation-toast" data-confirm-toast role="status" hidden>
        Lenke kopiert til utklippstavlen.
    </div>
</section>
`;

export const vanillaToastConfirmationCssCode = `
.mønster-confirmation-toast {
    inline-size: fit-content;
    max-inline-size: 24rem;
    margin-inline-start: auto;
}
`;

export const vanillaToastConfirmationJsCode = `
const copyButton = document.querySelector("[data-confirm-copy]");
const toast = document.querySelector("[data-confirm-toast]");

copyButton?.addEventListener("click", () => {
    toast?.removeAttribute("hidden");

    window.setTimeout(() => {
        toast?.setAttribute("hidden", "true");
    }, 2500);
});
`;

export const vanillaReceiptConfirmationHtmlCode = `
<section class="mønster-confirmation-demo">
    <div class="mønster-confirmation-card">
        <p class="mønster-confirmation-kicker">Kvittering</p>
        <h3>Søknaden er sendt</h3>
        <p>Vi har mottatt innsendingen din og sender kopi til postkassen.</p>
        <dl class="mønster-confirmation-meta">
            <dt>Referanse</dt>
            <dd>BNK-4821</dd>
            <dt>Sendt</dt>
            <dd>20. mars 2026 kl. 14:20</dd>
        </dl>
        <div class="mønster-confirmation-actions">
            <a href="#" class="mønster-confirmation-link">Se innsendingen</a>
            <a href="#" class="mønster-confirmation-link">Til oversikten</a>
        </div>
    </div>
</section>
`;

export const vanillaReceiptConfirmationCssCode = `
.mønster-confirmation-meta {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.4rem 0.75rem;
}
`;

export const vanillaInlineConfirmationPreviewHtml = `
<section class="mønster-confirmation-demo">
    <div class="mønster-confirmation-card">
        <p><strong>Varsler</strong></p>
        <p>E-postvarsler er slått på for prosjektet.</p>
        <div class="mønster-confirmation-actions">
            <button type="button" class="mønster-confirmation-button">
                Lagre endringer
            </button>
        </div>
        <p class="mønster-confirmation-banner" role="status">
            Innstillingene ble lagret.
        </p>
    </div>
</section>
`;

export const vanillaToastConfirmationPreviewHtml = `
<section class="mønster-confirmation-demo">
    <div class="mønster-confirmation-actions">
        <button type="button" class="mønster-confirmation-button">
            Kopier lenke
        </button>
    </div>
    <div class="mønster-confirmation-toast" role="status">
        Lenke kopiert til utklippstavlen.
    </div>
</section>
`;

export const vanillaReceiptConfirmationPreviewHtml = `
<section class="mønster-confirmation-demo">
    <div class="mønster-confirmation-card">
        <p class="mønster-confirmation-kicker">Kvittering</p>
        <h3>Søknaden er sendt</h3>
        <p>Vi har mottatt innsendingen din og sender kopi til postkassen.</p>
        <dl class="mønster-confirmation-meta">
            <dt>Referanse</dt>
            <dd>BNK-4821</dd>
            <dt>Sendt</dt>
            <dd>20. mars 2026 kl. 14:20</dd>
        </dl>
        <div class="mønster-confirmation-actions">
            <a href="#" class="mønster-confirmation-link">Se innsendingen</a>
            <a href="#" class="mønster-confirmation-link">Til oversikten</a>
        </div>
    </div>
</section>
`;
