import "./implementation-examples.scss";
import { Button } from "@fremtind/jokul/button";
import { Card } from "@fremtind/jokul/card";
import { Flex } from "@fremtind/jokul/flex";
import { Message } from "@fremtind/jokul/message";

export const vanillaInlineConfirmationHtmlCode = `
<section class="monster-confirmation-demo">
    <div class="monster-confirmation-card">
        <p><strong>Varsler</strong></p>
        <p>E-postvarsler er slått på for prosjektet.</p>
        <div class="monster-confirmation-actions">
            <button type="button" class="monster-confirmation-button" data-confirm-save>
                Lagre endringer
            </button>
        </div>
        <p class="monster-confirmation-banner" data-confirm-status role="status" hidden>
            Innstillingene ble lagret.
        </p>
    </div>
</section>
`;

export const vanillaInlineConfirmationCssCode = `
.monster-confirmation-card {
    display: grid;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid var(--site-border-color);
    border-radius: 1rem;
}

.monster-confirmation-banner {
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
<section class="monster-confirmation-demo">
    <div class="monster-confirmation-actions">
        <button type="button" class="monster-confirmation-button" data-confirm-copy>
            Kopier lenke
        </button>
    </div>
    <div class="monster-confirmation-toast" data-confirm-toast role="status" hidden>
        Lenke kopiert til utklippstavlen.
    </div>
</section>
`;

export const vanillaToastConfirmationCssCode = `
.monster-confirmation-toast {
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
<section class="monster-confirmation-demo">
    <div class="monster-confirmation-card">
        <p class="monster-confirmation-kicker">Kvittering</p>
        <h3>Søknaden er sendt</h3>
        <p>Vi har mottatt innsendingen din og sender kopi til postkassen.</p>
        <dl class="monster-confirmation-meta">
            <dt>Referanse</dt>
            <dd>BNK-4821</dd>
            <dt>Sendt</dt>
            <dd>20. mars 2026 kl. 14:20</dd>
        </dl>
        <div class="monster-confirmation-actions">
            <a href="#" class="monster-confirmation-link">Se innsendingen</a>
            <a href="#" class="monster-confirmation-link">Til oversikten</a>
        </div>
    </div>
</section>
`;

export const vanillaReceiptConfirmationCssCode = `
.monster-confirmation-meta {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.4rem 0.75rem;
}
`;

export const jokulInlineConfirmationCode = `
import "./implementation-examples.scss";
import { Button } from "@fremtind/jokul/button";
import { Card } from "@fremtind/jokul/card";
import { Flex } from "@fremtind/jokul/flex";
import { Message } from "@fremtind/jokul/message";

export function JokulInlineConfirmationExample() {
    return (
        <Card padding="l">
            <Flex direction="column" gap="s">
                <p><strong>Varsler</strong></p>
                <Message variant="success">Innstillingene ble lagret.</Message>
                <Button variant="secondary">Endre igjen</Button>
            </Flex>
        </Card>
    );
}
`;

export const jokulReceiptConfirmationCode = `
import "./implementation-examples.scss";
import { Card } from "@fremtind/jokul/card";
import { Flex } from "@fremtind/jokul/flex";
import { Message } from "@fremtind/jokul/message";

export function JokulReceiptConfirmationExample() {
    return (
        <Card padding="l">
            <Flex direction="column" gap="s">
                <p><strong>Kvittering</strong></p>
                <h3>Søknaden er sendt</h3>
                <Message variant="success">
                    Vi har mottatt søknaden din og sender kopi til postkassen.
                </Message>
                <dl className="monster-confirmation-jokul-meta">
                    <dt>Referanse</dt>
                    <dd>BNK-4821</dd>
                    <dt>Sendt</dt>
                    <dd>20. mars 2026 kl. 14:20</dd>
                </dl>
            </Flex>
        </Card>
    );
}
`;

export const jokulNextStepConfirmationCode = `
import "./implementation-examples.scss";
import { Button } from "@fremtind/jokul/button";
import { Card } from "@fremtind/jokul/card";
import { Flex } from "@fremtind/jokul/flex";
import { Message } from "@fremtind/jokul/message";

export function JokulNextStepConfirmationExample() {
    return (
        <Card padding="l">
            <Flex direction="column" gap="s">
                <Message variant="success">Betalingen er registrert.</Message>
                <p>Du kan laste ned kvittering nå eller gå tilbake til oversikten.</p>
                <Flex gap="s" alignItems="center">
                    <Button variant="secondary">Last ned kvittering</Button>
                    <Button>Til oversikten</Button>
                </Flex>
            </Flex>
        </Card>
    );
}
`;

export function VanillaInlineConfirmationExample() {
    return (
        <section className="monster-confirmation-demo">
            <div className="monster-confirmation-card">
                <p><strong>Varsler</strong></p>
                <p>E-postvarsler er slått på for prosjektet.</p>
                <div className="monster-confirmation-actions">
                    <button type="button" className="monster-confirmation-button">
                        Lagre endringer
                    </button>
                </div>
                <p className="monster-confirmation-banner" role="status">
                    Innstillingene ble lagret.
                </p>
            </div>
        </section>
    );
}

export function VanillaToastConfirmationExample() {
    return (
        <section className="monster-confirmation-demo">
            <div className="monster-confirmation-actions">
                <button type="button" className="monster-confirmation-button">
                    Kopier lenke
                </button>
            </div>
            <div className="monster-confirmation-toast" role="status">
                Lenke kopiert til utklippstavlen.
            </div>
        </section>
    );
}

export function VanillaReceiptConfirmationExample() {
    return (
        <section className="monster-confirmation-demo">
            <div className="monster-confirmation-card">
                <p className="monster-confirmation-kicker">Kvittering</p>
                <h3>Søknaden er sendt</h3>
                <p>Vi har mottatt innsendingen din og sender kopi til postkassen.</p>
                <dl className="monster-confirmation-meta">
                    <dt>Referanse</dt>
                    <dd>BNK-4821</dd>
                    <dt>Sendt</dt>
                    <dd>20. mars 2026 kl. 14:20</dd>
                </dl>
                <div className="monster-confirmation-actions">
                    <a href="#" className="monster-confirmation-link">Se innsendingen</a>
                    <a href="#" className="monster-confirmation-link">Til oversikten</a>
                </div>
            </div>
        </section>
    );
}

export function JokulInlineConfirmationExample() {
    return (
        <Card padding="l">
            <Flex direction="column" gap="s">
                <p><strong>Varsler</strong></p>
                <Message variant="success">Innstillingene ble lagret.</Message>
                <Button variant="secondary">Endre igjen</Button>
            </Flex>
        </Card>
    );
}

export function JokulReceiptConfirmationExample() {
    return (
        <Card padding="l">
            <Flex direction="column" gap="s">
                <p><strong>Kvittering</strong></p>
                <h3>Søknaden er sendt</h3>
                <Message variant="success">
                    Vi har mottatt søknaden din og sender kopi til postkassen.
                </Message>
                <dl className="monster-confirmation-jokul-meta">
                    <dt>Referanse</dt>
                    <dd>BNK-4821</dd>
                    <dt>Sendt</dt>
                    <dd>20. mars 2026 kl. 14:20</dd>
                </dl>
            </Flex>
        </Card>
    );
}

export function JokulNextStepConfirmationExample() {
    return (
        <Card padding="l">
            <Flex direction="column" gap="s">
                <Message variant="success">Betalingen er registrert.</Message>
                <p>Du kan laste ned kvittering nå eller gå tilbake til oversikten.</p>
                <Flex gap="s" alignItems="center">
                    <Button variant="secondary">Last ned kvittering</Button>
                    <Button>Til oversikten</Button>
                </Flex>
            </Flex>
        </Card>
    );
}
