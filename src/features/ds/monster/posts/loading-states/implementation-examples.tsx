import "./implementation-examples.scss";
import { Flex } from "@fremtind/jokul/flex";
import { Loader, SkeletonAnimation, SkeletonElement } from "@fremtind/jokul/loader";
import { Message } from "@fremtind/jokul/message";
import { ProgressBar } from "@fremtind/jokul/progress-bar";

export const vanillaInlineStatusExampleHtmlCode = `
<section
    class="monster-vanilla-demo"
    data-loading-example="inline-status"
    aria-live="polite"
    aria-busy="true"
>
    <div class="monster-vanilla-stack">
        <p><strong>Oppdaterer betalingsoversikt</strong></p>
        <p>Vi henter siste status for betalingene dine.</p>
        <div class="monster-vanilla-status" role="status">
            <span class="monster-vanilla-spinner" aria-hidden="true"></span>
            <span class="monster-vanilla-status-label">Laster betalingsoversikt...</span>
        </div>
    </div>
</section>
`;

export const vanillaInlineStatusExampleCssCode = `
.monster-vanilla-demo {
    border: 1px solid var(--site-border-color);
    border-radius: 1rem;
    padding: 1rem;
}

.monster-vanilla-stack {
    display: grid;
    gap: 0.75rem;
}

.monster-vanilla-status {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    color: var(--site-info-color);
}

.monster-vanilla-spinner {
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
    class="monster-vanilla-demo"
    data-loading-example="skeleton"
    aria-busy="true"
    aria-live="polite"
>
    <div class="monster-vanilla-stack monster-vanilla-skeleton">
        <span class="monster-vanilla-skeleton-line title"></span>
        <span class="monster-vanilla-skeleton-line body"></span>
        <span class="monster-vanilla-skeleton-line body short"></span>
    </div>
</section>
`;

export const vanillaSkeletonExampleCssCode = `
.monster-vanilla-skeleton-line {
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

.monster-vanilla-skeleton-line.title {
    block-size: 1.25rem;
    inline-size: 55%;
}

.monster-vanilla-skeleton-line.body {
    inline-size: 100%;
}

.monster-vanilla-skeleton-line.body.short {
    inline-size: 72%;
}

@keyframes shimmer {
    to {
        background-position: -200% 0;
    }
}
`;

export const vanillaProgressExampleHtmlCode = `
<section class="monster-vanilla-demo" data-loading-example="progress">
    <div class="monster-vanilla-stack">
        <div class="monster-vanilla-progress-header">
            <strong>Sender søknad</strong>
            <span data-loading-progress-label>45 % fullført</span>
        </div>
        <progress
            class="monster-vanilla-progress"
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
.monster-vanilla-progress-header {
    display: flex;
    gap: 0.75rem;
    justify-content: space-between;
}

.monster-vanilla-progress {
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

export const contextualLoaderExampleCode = `
import "./implementation-examples.scss";
import { Flex } from "@fremtind/jokul/flex";
import { Loader } from "@fremtind/jokul/loader";

export function ContextualLoaderExample() {
    return (
        <div aria-live="polite">
            <Flex direction="column" gap="s">
                <p><strong>Oppdaterer betalingsoversikt</strong></p>
                <p>Vi henter siste status for betalingene dine.</p>
                <Loader textDescription="Laster betalingsoversikt" />
            </Flex>
        </div>
    );
}
`;

export const skeletonRegionExampleCode = `
import "./implementation-examples.scss";
import { Flex } from "@fremtind/jokul/flex";
import { SkeletonAnimation, SkeletonElement } from "@fremtind/jokul/loader";

export function SkeletonRegionExample() {
    return (
        <div aria-busy="true" aria-live="polite">
            <SkeletonAnimation textDescription="Laster innhold">
                <Flex direction="column" gap="s">
                    <SkeletonElement height="1.5rem" width="12rem" />
                    <SkeletonElement height="1rem" width="18rem" />
                    <SkeletonElement height="1rem" width="14rem" />
                </Flex>
            </SkeletonAnimation>
        </div>
    );
}
`;

export const accessibleStatusExampleCode = `
import "./implementation-examples.scss";
import { Flex } from "@fremtind/jokul/flex";
import { Loader } from "@fremtind/jokul/loader";
import { Message } from "@fremtind/jokul/message";

export function AccessibleStatusExample() {
    return (
        <div aria-busy="true" aria-live="polite">
            <Flex direction="column" gap="s">
                <Message variant="info">
                    Vi oppdaterer innholdet uten å flytte deg bort fra der du jobber.
                </Message>
                <Loader textDescription="Laster oppdatert innhold" />
            </Flex>
        </div>
    );
}
`;

export const escalatedWaitExampleCode = `
import "./implementation-examples.scss";
import { Flex } from "@fremtind/jokul/flex";
import { Message } from "@fremtind/jokul/message";
import { ProgressBar } from "@fremtind/jokul/progress-bar";

export function EscalatedWaitExample() {
    return (
        <Flex direction="column" gap="s">
            <ProgressBar
                title="Sender søknad"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={45}
                aria-valuetext="45 prosent fullført"
            />
            <Message variant="info">
                Dette tar litt lenger tid enn normalt. Du kan vente her mens vi fullfører sendingen.
            </Message>
        </Flex>
    );
}
`;

export function VanillaInlineStatusExample() {
    return (
        <section className="monster-vanilla-demo" aria-live="polite" aria-busy="true">
            <div className="monster-vanilla-stack">
                <p><strong>Oppdaterer betalingsoversikt</strong></p>
                <p>Vi henter siste status for betalingene dine.</p>
                <div className="monster-vanilla-status" role="status">
                    <span className="monster-vanilla-spinner" aria-hidden="true"></span>
                    <span className="monster-vanilla-status-label">Laster betalingsoversikt...</span>
                </div>
            </div>
        </section>
    );
}

export function VanillaSkeletonExample() {
    return (
        <section className="monster-vanilla-demo" aria-busy="true" aria-live="polite">
            <div className="monster-vanilla-stack monster-vanilla-skeleton">
                <span className="monster-vanilla-skeleton-line title"></span>
                <span className="monster-vanilla-skeleton-line body"></span>
                <span className="monster-vanilla-skeleton-line body short"></span>
            </div>
        </section>
    );
}

export function VanillaProgressExample() {
    return (
        <section className="monster-vanilla-demo">
            <div className="monster-vanilla-stack">
                <div className="monster-vanilla-progress-header">
                    <strong>Sender søknad</strong>
                    <span id="progress-label">45 % fullført</span>
                </div>
                <progress
                    className="monster-vanilla-progress"
                    max={100}
                    value={45}
                    aria-describedby="progress-label"
                >
                    45 %
                </progress>
                <p>Dette tar litt lenger tid enn normalt. Du kan vente her mens vi fullfører sendingen.</p>
            </div>
        </section>
    );
}

export function ContextualLoaderExample() {
    return (
        <div aria-live="polite">
            <Flex direction="column" gap="s">
                <p><strong>Oppdaterer betalingsoversikt</strong></p>
                <p>Vi henter siste status for betalingene dine.</p>
                <Loader textDescription="Laster betalingsoversikt" />
            </Flex>
        </div>
    );
}

export function SkeletonRegionExample() {
    return (
        <div aria-busy="true" aria-live="polite">
            <SkeletonAnimation textDescription="Laster innhold">
                <Flex direction="column" gap="s">
                    <SkeletonElement height="1.5rem" width="12rem" />
                    <SkeletonElement height="1rem" width="18rem" />
                    <SkeletonElement height="1rem" width="14rem" />
                </Flex>
            </SkeletonAnimation>
        </div>
    );
}

export function AccessibleStatusExample() {
    return (
        <div aria-busy="true" aria-live="polite">
            <Flex direction="column" gap="s">
                <Message variant="info">Vi oppdaterer innholdet uten å flytte deg bort fra der du jobber.</Message>
                <Loader textDescription="Laster oppdatert innhold" />
            </Flex>
        </div>
    );
}

export function EscalatedWaitExample() {
    return (
        <Flex direction="column" gap="s">
            <ProgressBar
                title="Sender søknad"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={45}
                aria-valuetext="45 prosent fullført"
            />
            <Message variant="info">Dette tar litt lenger tid enn normalt. Du kan vente her mens vi fullfører sendingen.</Message>
        </Flex>
    );
}
