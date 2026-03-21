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

.overview-card[data-static-illustration] .overview-card-illustration .token-mini__specimen {
    animation: none;
    transform: none;
}

.token-mini {
    position: relative;
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    padding: var(--jkl-spacing-l);
    overflow: hidden;
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

.token-mini::before {
    content: "";
    position: absolute;
    inset: var(--jkl-spacing-m);
    border-radius: var(--jkl-border-radius-l);
    background: var(--token-mini-guide, none);
    opacity: 0.8;
}

.token-mini__specimen {
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    inline-size: min(62%, 10rem);
    block-size: min(48%, 7rem);
    border: 1px solid var(--jkl-color-border-subdued);
    border-radius: var(--jkl-border-radius-m);
    background-color: var(--token-mini-fill, var(--jkl-color-background-container-high));
    color: var(--token-mini-ink, var(--jkl-color-text-default));
    box-shadow: var(--token-mini-shadow, none);
    font-weight: 700;
    line-height: 1;
    transform-origin: center;
    animation: var(--token-mini-animation, token-mini-float) var(--token-mini-duration, 4.8s) var(--token-mini-ease, ease-in-out) infinite;
}

.token-mini[data-token-card-illustration="animasjon"] {
    --token-mini-guide:
        linear-gradient(
            180deg,
            transparent 0%,
            color-mix(in srgb, var(--jkl-color-border-subdued) 65%, transparent) 16%,
            transparent 16% 84%,
            color-mix(in srgb, var(--jkl-color-border-subdued) 65%, transparent) 84%,
            transparent 84% 100%
        );
}

.token-mini[data-token-card-illustration="animasjon"] .token-mini__specimen {
    inline-size: min(38%, 5rem);
    block-size: min(38%, 5rem);
    --token-mini-animation: token-mini-motion;
    --token-mini-duration: 3.2s;
}

.token-mini[data-token-card-illustration="breakpoints"] {
    justify-items: start;
    --token-mini-guide:
        repeating-linear-gradient(
            180deg,
            transparent 0 1.4rem,
            color-mix(in srgb, var(--jkl-color-border-subdued) 55%, transparent) 1.4rem 1.48rem
        );
}

.token-mini[data-token-card-illustration="breakpoints"] .token-mini__specimen {
    inline-size: min(30%, 4.75rem);
    block-size: 1rem;
    border-radius: var(--jkl-border-radius-full);
    --token-mini-animation: token-mini-breakpoints;
    --token-mini-duration: 4.4s;
}

.token-mini[data-token-card-illustration="farger"] {
    --token-mini-guide:
        radial-gradient(
            circle at 18% 18%,
            color-mix(in srgb, var(--jkl-color-brand-snohvit) 82%, transparent),
            transparent 30%
        ),
        radial-gradient(
            circle at 82% 28%,
            color-mix(in srgb, var(--jkl-color-brand-sand) 82%, transparent),
            transparent 34%
        ),
        radial-gradient(
            circle at 34% 82%,
            color-mix(in srgb, var(--jkl-color-brand-varde) 76%, transparent),
            transparent 36%
        );
}

.token-mini[data-token-card-illustration="farger"] .token-mini__specimen {
    inline-size: min(40%, 5.5rem);
    block-size: min(40%, 5.5rem);
    border-radius: var(--jkl-border-radius-l);
    background-color: var(--jkl-color-brand-snohvit);
    --token-mini-animation: token-mini-colors;
    --token-mini-duration: 5.2s;
}

.token-mini[data-token-card-illustration="kantradiuser"] {
    --token-mini-guide:
        linear-gradient(
            135deg,
            transparent 0 18%,
            color-mix(in srgb, var(--jkl-color-border-subdued) 55%, transparent) 18% 22%,
            transparent 22% 78%,
            color-mix(in srgb, var(--jkl-color-border-subdued) 55%, transparent) 78% 82%,
            transparent 82% 100%
        );
}

.token-mini[data-token-card-illustration="kantradiuser"] .token-mini__specimen {
    inline-size: min(54%, 7.5rem);
    block-size: min(40%, 5.25rem);
    --token-mini-animation: token-mini-radius;
    --token-mini-duration: 4.8s;
}

.token-mini[data-token-card-illustration="skygger"] {
    --token-mini-guide:
        radial-gradient(
            circle at center,
            color-mix(in srgb, var(--jkl-color-background-container-high) 86%, transparent),
            transparent 60%
        );
}

.token-mini[data-token-card-illustration="skygger"] .token-mini__specimen {
    inline-size: min(52%, 7rem);
    block-size: min(34%, 4.5rem);
    --token-mini-shadow: 0 0.25rem 0.75rem rgb(37 42 49 / 6%);
    --token-mini-animation: token-mini-shadows;
    --token-mini-duration: 4.8s;
}

.token-mini[data-token-card-illustration="spacing"] {
    --token-mini-guide:
        linear-gradient(
            90deg,
            transparent 0 20%,
            color-mix(in srgb, var(--jkl-color-border-subdued) 55%, transparent) 20% 22%,
            transparent 22% 78%,
            color-mix(in srgb, var(--jkl-color-border-subdued) 55%, transparent) 78% 80%,
            transparent 80% 100%
        ),
        linear-gradient(
            180deg,
            transparent 0 20%,
            color-mix(in srgb, var(--jkl-color-border-subdued) 55%, transparent) 20% 22%,
            transparent 22% 78%,
            color-mix(in srgb, var(--jkl-color-border-subdued) 55%, transparent) 78% 80%,
            transparent 80% 100%
        );
}

.token-mini[data-token-card-illustration="spacing"] .token-mini__specimen {
    inline-size: calc(var(--jkl-spacing-xl) * 1.75);
    block-size: calc(var(--jkl-spacing-xl) * 1.75);
    --token-mini-animation: token-mini-spacing;
    --token-mini-duration: 4.6s;
}

.token-mini[data-token-card-illustration="typografi"] {
    --token-mini-guide:
        repeating-linear-gradient(
            180deg,
            transparent 0 1.2rem,
            color-mix(in srgb, var(--jkl-color-border-subdued) 55%, transparent) 1.2rem 1.28rem
        );
}

.token-mini[data-token-card-illustration="typografi"] .token-mini__specimen {
    inline-size: auto;
    block-size: auto;
    padding-inline: 0.04em;
    border: 0;
    background: none;
    box-shadow: none;
    font-size: var(--jkl-font-size-6);
    line-height: var(--jkl-line-height-tight);
    letter-spacing: -0.04em;
    --token-mini-animation: token-mini-type;
    --token-mini-duration: 4.8s;
}

@keyframes token-mini-float {
    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-4%);
    }
}

@keyframes token-mini-motion {
    0%,
    100% {
        transform: translateY(18%) scale(0.9) rotate(-4deg);
    }

    45% {
        transform: translateY(-18%) scale(1.04) rotate(0deg);
    }

    70% {
        transform: translateY(0) scale(1);
    }
}

@keyframes token-mini-breakpoints {
    0%,
    100% {
        inline-size: min(30%, 4.75rem);
    }

    30% {
        inline-size: min(48%, 7rem);
    }

    65% {
        inline-size: min(68%, 9.5rem);
    }

    85% {
        inline-size: min(82%, 11rem);
    }
}

@keyframes token-mini-colors {
    0%,
    100% {
        background-color: var(--jkl-color-brand-snohvit);
        transform: rotate(0deg) scale(0.92);
    }

    33% {
        background-color: var(--jkl-color-brand-sand);
        transform: rotate(-6deg) scale(1);
    }

    66% {
        background-color: var(--jkl-color-brand-varde);
        transform: rotate(6deg) scale(1.04);
    }

    82% {
        background-color: var(--jkl-color-brand-svaberg);
        transform: rotate(0deg) scale(0.98);
    }
}

@keyframes token-mini-radius {
    0%,
    100% {
        border-radius: var(--jkl-border-radius-none);
        transform: scale(0.96);
    }

    28% {
        border-radius: var(--jkl-border-radius-s);
    }

    56% {
        border-radius: var(--jkl-border-radius-m);
    }

    82% {
        border-radius: var(--jkl-border-radius-full);
        transform: scale(1.02);
    }
}

@keyframes token-mini-shadows {
    0%,
    100% {
        box-shadow: 0 0.25rem 0.75rem rgb(37 42 49 / 3%);
        transform: translateY(0);
    }

    35% {
        box-shadow: 0 0.25rem 0.9375rem rgb(37 42 49 / 10%);
        transform: translateY(-4%);
    }

    68% {
        box-shadow: 0 0.375rem 1.5625rem rgb(37 42 49 / 12%);
        transform: translateY(-8%);
    }
}

@keyframes token-mini-spacing {
    0%,
    100% {
        inline-size: calc(var(--jkl-spacing-s) * 3);
        block-size: calc(var(--jkl-spacing-s) * 3);
    }

    30% {
        inline-size: calc(var(--jkl-spacing-m) * 2.5);
        block-size: calc(var(--jkl-spacing-m) * 2.5);
    }

    65% {
        inline-size: calc(var(--jkl-spacing-l) * 2.1);
        block-size: calc(var(--jkl-spacing-l) * 2.1);
    }

    85% {
        inline-size: calc(var(--jkl-spacing-xl) * 1.75);
        block-size: calc(var(--jkl-spacing-xl) * 1.75);
    }
}

@keyframes token-mini-type {
    0%,
    100% {
        font-size: var(--jkl-font-size-3);
        line-height: var(--jkl-line-height-relaxed);
        transform: translateY(8%);
    }

    35% {
        font-size: var(--jkl-font-size-5);
        line-height: var(--jkl-line-height-tight);
        transform: translateY(0);
    }

    70% {
        font-size: var(--jkl-font-size-7);
        line-height: var(--jkl-line-height-tight);
        transform: translateY(-8%);
    }
}

@media (prefers-reduced-motion: reduce) {
    .token-mini__specimen {
        animation: none;
        transform: none;
    }
}
`;
