export const jokulOverviewThemeStyles = `
:root {
  color-scheme: light dark;
  --site-page-background: Canvas;
  --site-body-margin: 0;
  --site-breadcrumb-block-size: calc(1lh + (var(--site-space-xs) * 2));
  --site-border-color: light-dark(#e5e7eb, #4b5563);
  --site-text-color: CanvasText;
  --site-text-muted: GrayText;
  --site-success-color: light-dark(#166534, #86efac);
  --site-error-color: light-dark(#991b1b, #fca5a5);
  --site-info-color: light-dark(#1d4ed8, #93c5fd);
  --site-hint-color: light-dark(#4b5563, #9ca3af);
  --site-font-family: "Fremtind Grotesk", "Adjusted Arial Fallback", arial, sans-serif;
  --site-max-width: 90rem;
  --page-max-width: var(--site-max-width);
  --site-space-xxs: 0.5rem;
  --site-space-xs: 0.75rem;
  --site-space-s: 1rem;
  --site-space-m: 1.5rem;
  --site-space-l: 2rem;
  --site-space-xl: 3rem;
  --site-page-padding-inline: var(--site-space-s);
  --site-section-min-width: 12rem;
  --site-copy-max-width: 65ch;
  --jkl-color-background-page: light-dark(oklch(96% 0.004 67), oklch(10% 0.007 67));
  --jkl-color-background-container-low: light-dark(oklch(96% 0.004 67), oklch(10% 0.007 67));
  --jkl-color-background-container: light-dark(oklch(92% 0.008 67), oklch(25% 0.007 67));
  --jkl-color-background-container-high: light-dark(oklch(100% 0.001 67), oklch(35% 0.007 67));
  --jkl-color-border-subdued: light-dark(oklch(80% 0.008 67), oklch(50% 0.007 67));
  --jkl-color-border-strong: light-dark(oklch(50% 0.007 67), oklch(80% 0.008 67));
  --jkl-color-border-action: light-dark(#1b1917, #f9f9f9);
  --jkl-color-text-default: light-dark(oklch(0% 0.007 64), oklch(100% 0.001 67));
  --jkl-color-text-subdued: light-dark(oklch(50% 0.007 67), oklch(80% 0.008 67));
  --jkl-unit-base: 0.5rem;
  --jkl-spacing-xxs: calc(var(--jkl-unit-base) * 0.5);
  --jkl-spacing-xs: var(--jkl-unit-base);
  --jkl-spacing-s: calc(var(--jkl-unit-base) * 2);
  --jkl-spacing-m: calc(var(--jkl-unit-base) * 3);
  --jkl-spacing-l: calc(var(--jkl-unit-base) * 5);
  --jkl-spacing-xl: calc(var(--jkl-unit-base) * 8);
  --jkl-spacing-2xl: calc(var(--jkl-unit-base) * 13);
  --jkl-border-radius-m: 0.75rem;
  --jkl-line-height-tight: 1.3;
  --jkl-line-height-relaxed: 1.6;
  --jkl-font-size-1: 0.875rem;
  --jkl-font-size-2: 1rem;
  --jkl-font-size-3: 1.125rem;
  --jkl-font-size-4: 1.25rem;
  --jkl-font-size-5: 1.5rem;
  --jkl-font-size-6: 1.75rem;
  --jkl-font-size-7: 2rem;
  --jkl-font-size-8: 2.5rem;
}

body {
  margin: var(--site-body-margin);
  background-color: var(--site-page-background);
  color: var(--site-text-color);
  font-family: var(--site-font-family);
}

.page {
  box-sizing: border-box;
  inline-size: min(100%, var(--site-max-width));
  margin-inline: auto;
  padding-inline: var(--site-page-padding-inline);
}

.bare-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

body:has(.jkl-site) {
  --site-page-background: var(--jkl-color-background-page);
  --site-border-color: var(--jkl-color-border-subdued);
  --site-text-color: var(--jkl-color-text-default);
  --site-text-muted: var(--jkl-color-text-subdued);
  --site-success-color: var(--jkl-color-text-default);
  --site-error-color: var(--jkl-color-text-default);
  --site-info-color: var(--jkl-color-text-default);
  --site-hint-color: var(--jkl-color-text-subdued);
  --site-font-family: "Fremtind Grotesk", "Adjusted Arial Fallback", arial, sans-serif;
  --site-max-width: 180ch;
  --page-max-width: var(--site-max-width);
  --site-space-xxs: var(--jkl-spacing-xxs);
  --site-space-xs: var(--jkl-spacing-xs);
  --site-space-s: var(--jkl-spacing-s);
  --site-space-m: var(--jkl-spacing-m);
  --site-space-l: var(--jkl-spacing-l);
  --site-space-xl: var(--jkl-spacing-xl);
  margin: 0;
  padding: 0;
}

.jkl-site {
  --site-max-width: 180ch;
  --page-max-width: var(--site-max-width);
  --site-border-color: var(--jkl-color-border-subdued);
  --site-text-color: var(--jkl-color-text-default);
  --site-text-muted: var(--jkl-color-text-subdued);
  --site-space-xxs: var(--jkl-spacing-xxs);
  --site-space-xs: var(--jkl-spacing-xs);
  --site-space-s: var(--jkl-spacing-s);
  --site-space-m: var(--jkl-spacing-m);
  --site-space-l: var(--jkl-spacing-l);
  --site-space-xl: var(--jkl-spacing-xl);
  --site-copy-max-width: 65ch;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: clip;
  background-color: var(--jkl-color-background-page);
  color: var(--jkl-color-text-default);
}

.jkl-site.site-layout {
  padding-inline: 0;
  padding-block: var(--jkl-spacing-xl);
  padding-block-end: 0;
  flex: 1;
  --content-max-width: var(--site-max-width);
}
`;
