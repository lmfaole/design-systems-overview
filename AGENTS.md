# AGENTS.md

## Project Intent

This repo is a learning resource that collects UI patterns, design tokens, and documentation for design systems. Build
patterns in the Monster feature and data modules, with Astro routes under `src/pages/ds/monster`, and keep
design-system-specific pages under `src/pages/ds/<system>` with implementation in `src/features/ds/<system>`.
Patterns should be focused on the design systems in scope, but also include general UI patterns that can be applied
across systems. The goal is to create a comprehensive resource for designers and developers working with design systems,
with a strong emphasis on accessibility and performance.

## Structure And Scope

- Repo-wide rules apply everywhere.
- Astro routes belong in `src/pages`, layouts in `src/layouts`, shared UI in `src/components`, content/data in
  `src/data`, and route implementation in `src/features`.
- When adding broad logic, prefer splitting into small files to keep cognitive load low.
- Make reusable components whenever possible.
- When working inside a design system, follow the conventions and patterns of that system as closely as possible.
- Focus on patterns that are relevant to the design systems in scope, but also include general UI patterns that can be
  applied across systems.
- Prioritize accessibility and performance in all patterns and components.
- Document patterns clearly, including usage guidelines, examples, and any relevant design considerations.

## Commands

- Install deps: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Typecheck: `npm run typecheck`
- Tests (full): `npm test`
- A11y (direct): `npm run test:a11y`
- Cloudflare Pages build: `npm run pages:build`

## Code Style And Architecture

- General rules:
    - Write no more code than necessary.
    - Prefer the newest available native browser APIs (CSS, HTML, JS) over custom workarounds.
    - Keep components reusable and composable.
    - Break down logic into small, focused files to improve readability and maintenance.
    - When working inside a design system, follow the conventions and patterns of that system as closely as possible.
    - Prioritize making it possible to use the design systems in scope to build patterns, and avoid adding custom styles
      or logic that would not be applicable across systems.
    - Commit messages should be clear and descriptive, following the format of `<type>: <description>`, where `<type>`
      is one of
      `feat`, `fix`, `docs`, `style`, `refactor`, `test`, or `chore`, and `<description>` is a brief summary of the
      changes made in the commit.
    - Commit at a logical level of granularity, with each commit representing a single, cohesive change to the codebase
      that can be
      easily understood and reviewed by others.
    - Separate commits for different types of changes, such as bug fixes, new features, documentation updates, and
      refactoring, to improve the clarity and organization of the commit history.
- CSS rules:
    - Use nesting where it improves readability and maintainability, and use it to avoid repeating text in class names
      or selectors, but avoid excessive nesting that can lead to specificity issues and make the code harder to
      understand and maintain.
    - Prefer using data attributes rather than classes for styling when the styles are specific to a particular state or
      behavior, as this can improve readability and maintainability by separating styling concerns from structural
      concerns.
    - Use short and descriptive class names that convey the purpose and meaning of the element, rather than its
      appearance or implementation details, to improve readability and maintainability.
    - Use logical properties.
    - Avoid using utility classes for styling, and instead prefer semantic class names that describe the purpose of
      the element.
    - Use media, feature queries, and container queries to create responsive designs that adapt to different screen
      sizes and contexts.
    - Avoid using CSS frameworks or libraries that add unnecessary bloat and complexity to the codebase, and instead
      prefer writing custom CSS that is tailored to the specific needs of the project.
    - Use CSS preprocessors or postprocessors if necessary to improve the maintainability and organization of CSS
      code, but avoid adding unnecessary complexity or dependencies to the project.
- JavaScript rules:
    - Favor server-side solutions where possible.
    - Use modern JavaScript features and syntax to improve readability and maintainability, while ensuring compatibility
      with target browsers.
    - Avoid using JavaScript frameworks or libraries that add unnecessary bloat and complexity to the codebase, and
      instead prefer writing custom JavaScript that is tailored to the specific needs of the project.
    - Use JavaScript only for behavior that cannot be achieved with CSS alone, and avoid using JavaScript for styling or
      layout purposes to improve performance and maintainability.
- HTML rules:
    - Use semantic HTML elements to improve accessibility and SEO, and avoid using non-semantic elements for layout or
      styling purposes.
    - Use ARIA attributes only when necessary to enhance accessibility, and avoid using them as a substitute for
      semantic HTML elements to improve maintainability and performance.
    - Avoid using inline event handlers in HTML, and instead prefer using JavaScript to attach event listeners to
      improve separation of concerns and maintainability.
    - Use proper nesting and structure in HTML to improve readability and maintainability, and avoid using deeply nested
      or complex structures that can be difficult to understand and maintain.
    - Avoid unnecessary divs or other elements in HTML, and instead prefer using semantic elements that convey the
      meaning and purpose of the content to improve accessibility and maintainability.
    - Avoid using unnecessary amounts of elements in HTML, and instead prefer using a minimal number of elements that
      are necessary to achieve the desired layout and functionality to improve performance and maintainability.

## Testing Expectations

- Run the full test suite for changes, including a11y where relevant.
- Write tests for new features, bug fixes, and any significant changes to existing patterns.
- Use descriptive test names that clearly indicate what is being tested and the expected outcome.
- Ensure tests cover edge cases and potential failure points to maintain robustness.

## Tooling

- Use `gh` for issue management and PRs.
- Use the repo scripts and checked-in config files as the source of truth for linting, testing, and deployment tooling.

## Issue Reporting

- Always file issues in the designsystems for any gaps, bugs, missing or unclear docs, a11y, SSR, performance, API
  limitations, or workarounds.
- File issues in `lmfaole/lmfaole` using `gh issue create`.
- Write issues in Norwegian with a scan-friendly title and include labels for the issue type.
- Issue body must include:
    - Why the issue happens
    - Why a user would want to do what they tried when the issue occurred
    - Normal conventions for the pattern
    - How to fix it
    - The cost of not fixing it
    - Any relevant links to docs, code, or other resources
    - Screenshots or gifs if relevant
    - A clear, actionable title that summarizes the issue and its impact on users.
