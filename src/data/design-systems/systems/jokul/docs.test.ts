import { describe, expect, it } from "vitest";
import { getJokulAssetDoc, getJokulLocalSection } from "./docs";

describe("Jøkul button docs", () => {
    it("documents a concrete component profile", () => {
        const button = getJokulAssetDoc("komponenter", "button");

        expect(button?.kind).toBe("component");
        expect(button?.componentProfile).toEqual({
            styleImports: [
                "@fremtind/jokul/styles/core/core.min.css",
                "@fremtind/jokul/styles/components/button/button.min.css",
                "@fremtind/jokul/styles/components/loader/loader.min.css",
            ],
            clientRuntime: "none",
            hydration: "none",
            keyboardSupport: "Følger native tastaturstøtte for button og a; Enter aktiverer begge, og Space aktiverer knapper.",
            semantics: expect.arrayContaining([
                "Komponenten trenger et tilgjengelig navn, vanligvis synlig knappetekst.",
            ]),
            automatedChecks: expect.arrayContaining([
                "Dokssiden inngår i prosjektets route smoke og a11y-kjøring.",
            ]),
            manualChecks: expect.arrayContaining([
                "Bekreft at etiketten beskriver handlingen tydelig nok i konteksten.",
            ]),
            performanceNotes: expect.arrayContaining([
                "Grunnoppførselen er CSS-basert i docs og krever ikke klient-JS.",
            ]),
        });
    });

    it("keeps every Jøkul-defined prop controllable in the interactive example", () => {
        const button = getJokulAssetDoc("komponenter", "button");
        const propTables = button?.kind === "component" ? button.propTables ?? [] : [];
        const propRows = propTables.flatMap((table) => table.rows);
        const interactiveControls = button?.kind === "component"
            ? button.example.interactive?.controls ?? []
            : [];
        const rowsByName = new Map(propRows.map((row) => [row.name, row]));
        const interactiveControlNames = interactiveControls.map((control) => control.name);
        const jokulPropNames = propTables
            .find((table) => table.source === "design-system")
            ?.rows
            .map((row) => row.name) ?? [];

        expect(button).toBeDefined();
        expect(button?.kind).toBe("component");
        expect(button?.example).toBeDefined();
        expect(button?.examples).toBeUndefined();
        expect(propTables.map((table) => table.source)).toEqual([
            "design-system",
            "framework",
            "native",
            "aria",
            "deprecated",
        ]);

        expect(jokulPropNames.length).toBeGreaterThan(0);
        expect(interactiveControlNames).toEqual([
            "as",
            "variant",
            "density",
            "disabled",
            "type",
            "loader",
            "icon",
            "iconPosition",
        ]);
        expect(interactiveControlNames.filter((name) => jokulPropNames.includes(name))).toEqual(jokulPropNames);

        for (const control of interactiveControls) {
            const row = rowsByName.get(control.name);

            expect(row).toBeDefined();
            expect(row?.interactiveControlName).toBe(control.name);
        }

        expect(button?.kind === "component" ? button.example.interactive?.eventLog : undefined).toEqual({
            events: ["focus", "click", "blur"],
            targetSelector: "button, a",
            emptyLabel: "Ingen hendelser fra komponenteksempelet ennå.",
            maxEntries: 6,
        });
    });

    it("renders a combined design-system state in both preview and code", () => {
        const button = getJokulAssetDoc("komponenter", "button");
        const interactive = button?.kind === "component"
            ? button.example.interactive
            : undefined;
        const state = interactive?.states.find((entry) =>
            entry.values.as === "a" &&
            entry.values.variant === "ghost" &&
            entry.values.density === "compact" &&
            entry.values.loader === "sending" &&
            entry.values.icon === "download" &&
            entry.values.iconPosition === "right");

        expect(state).toBeDefined();
        expect(state?.previewHtml).toContain('href="/ds/jokul/installasjon/react-og-core"');
        expect(state?.previewHtml).toContain('data-loading="true"');
        expect(state?.previewHtml).toContain('class="jkl-loader jkl-loader--inline"');
        expect(state?.previewHtml).toContain('icon="download"');
        expect(state?.previewHtml).toContain('iconPosition="right"');
        expect(state?.previewHtml).toContain('class="jkl-icon"');
        expect(state?.codeExamples[0]?.code).toContain(
            'import "@fremtind/jokul/styles/components/loader/loader.min.css";',
        );
        expect(state?.codeExamples[0]?.code).toContain('from "@fremtind/jokul/button"');
        expect(state?.codeExamples[0]?.code).toContain('as="a"');
        expect(state?.codeExamples[0]?.code).toContain('href="/ds/jokul/installasjon/react-og-core"');
        expect(state?.codeExamples[0]?.code).toContain('variant="ghost"');
        expect(state?.codeExamples[0]?.code).toContain('density="compact"');
        expect(state?.codeExamples[0]?.code).toContain('loader={{ showLoader: true, textDescription: "Sender inn" }}');
        expect(state?.codeExamples[0]?.code).toContain("icon={icon}");
        expect(state?.codeExamples[0]?.code).toContain('iconPosition="right"');
    });

    it("documents a migration guide for every deprecated prop", () => {
        const button = getJokulAssetDoc("komponenter", "button");
        const legacyRows = button?.kind === "component"
            ? button.propTables?.find((table) => table.source === "deprecated")?.rows ?? []
            : [];
        const migrations = button?.kind === "component"
            ? button.deprecatedPropMigrations ?? []
            : [];

        expect(legacyRows.map((row) => row.name)).toEqual(["iconLeft", "iconRight"]);
        expect(migrations).toHaveLength(legacyRows.length);

        for (const migration of migrations) {
            const row = legacyRows.find((entry) => entry.name === migration.propName);

            expect(row?.description).toBe(migration.warning);
            expect(migration.beforeCode).toContain(migration.propName);

            if (migration.replacementCode) {
                expect(migration.afterCode).toContain(migration.replacementCode);
            }
        }
    });
});

describe("Jøkul loader docs", () => {
    it("keeps loader aligned with the shared component-doc contract", () => {
        const componentSection = getJokulLocalSection("komponenter");
        const loader = getJokulAssetDoc("komponenter", "loader");
        const propTables = loader?.kind === "component" ? loader.propTables : [];
        const interactiveControls = loader?.kind === "component"
            ? loader.example.interactive.controls
            : [];
        const defaultState = loader?.kind === "component"
            ? loader.example.interactive.states.find((state) => state.key === "size:large|inline:false|role:status|ariaLive:polite")
            : undefined;

        expect(componentSection?.items.map((item) => item.slug)).toEqual([
            "button",
            "loader",
            "skeleton-loader",
            "table",
        ]);
        expect(loader?.kind).toBe("component");
        expect(loader?.packageName).toBe("@fremtind/jokul");
        expect(loader?.componentProfile).toEqual(expect.objectContaining({
            styleImports: [
                "@fremtind/jokul/styles/core/core.min.css",
                "@fremtind/jokul/styles/components/loader/loader.min.css",
            ],
            clientRuntime: "none",
            hydration: "none",
            keyboardSupport: "Ingen egen tastaturmodell; loaderen er ikke en interaktiv kontroll.",
        }));
        expect(propTables.map((table) => table.source)).toEqual([
            "design-system",
            "native",
            "aria",
        ]);
        expect(interactiveControls.map((control) => control.name)).toEqual([
            "size",
            "inline",
            "role",
            "ariaLive",
        ]);
        expect(defaultState?.previewHtml).toContain('class="jkl-loader"');
        expect(defaultState?.previewHtml).toContain('role="status"');
        expect(defaultState?.codeExamples[0]?.code).toContain('aria-live="polite"');
        expect(defaultState?.codeExamples[1]?.code).toContain(
            'import "@fremtind/jokul/styles/components/loader/loader.min.css";',
        );
    });
});

describe("Jøkul skeleton loader docs", () => {
    it("keeps skeleton loader aligned with the shared component-doc contract", () => {
        const skeletonLoader = getJokulAssetDoc("komponenter", "skeleton-loader");
        const propTables = skeletonLoader?.kind === "component" ? skeletonLoader.propTables : [];
        const interactiveControls = skeletonLoader?.kind === "component"
            ? skeletonLoader.example.interactive.controls
            : [];
        const defaultState = skeletonLoader?.kind === "component"
            ? skeletonLoader.example.interactive.states.find(
                (state) => state.key === "pattern:element|compact:false|shape:rectangle",
            )
            : undefined;
        const tableState = skeletonLoader?.kind === "component"
            ? skeletonLoader.example.interactive.states.find(
                (state) => state.key === "pattern:table|compact:true|shape:circle",
            )
            : undefined;

        expect(skeletonLoader?.kind).toBe("component");
        expect(skeletonLoader?.packageName).toBe("@fremtind/jokul");
        expect(skeletonLoader?.componentProfile).toEqual(expect.objectContaining({
            styleImports: [
                "@fremtind/jokul/styles/core/core.min.css",
                "@fremtind/jokul/styles/components/loader/skeleton-loader.min.css",
            ],
            clientRuntime: "none",
            hydration: "none",
            keyboardSupport: "Ingen egen tastaturmodell; skeleton loader er dekorativ og skal ikke være fokusbar.",
        }));
        expect(propTables.map((table) => table.source)).toEqual(["design-system"]);
        expect(interactiveControls.map((control) => control.name)).toEqual([
            "pattern",
            "compact",
            "shape",
        ]);
        expect(skeletonLoader?.relationships?.map((group) => group.kind)).toEqual([
            "parent",
            "sibling",
        ]);
        expect(skeletonLoader?.parts?.map((part) => part.name)).toEqual([
            "Animation wrapper",
            "Element placeholder",
            "Input container",
            "Checkbox row",
            "Table container",
            "Table header",
            "Table row",
        ]);
        expect(skeletonLoader?.recipes?.map((recipe) => recipe.slug)).toEqual([
            "element",
            "input",
            "table",
        ]);
        expect(defaultState?.previewHtml).toContain('class="jkl-skeleton-element"');
        expect(defaultState?.codeExamples[1]?.code).toContain(
            'import "@fremtind/jokul/styles/components/loader/skeleton-loader.min.css";',
        );
        expect(tableState?.previewHtml).toContain('class="jkl-skeleton-table jkl-skeleton-table--compact"');
        expect(tableState?.codeExamples[0]?.code).toContain('class="jkl-skeleton-table__row"');
        expect(skeletonLoader?.recipes?.[2]?.requiredPartNames).toEqual([
            "Table container",
            "Table header",
            "Table row",
            "Animation wrapper",
            "Element placeholder",
        ]);
        expect(tableState?.notes).toContain(
            "`shape` påvirker bare `element`-varianten. Input- og table-mønstrene bruker sine egne ferdige strukturer.",
        );
    });
});

describe("Jøkul table docs", () => {
    it("keeps table aligned with the shared component-doc contract", () => {
        const table = getJokulAssetDoc("komponenter", "table");
        const propTables = table?.kind === "component" ? table.propTables : [];
        const interactiveControls = table?.kind === "component"
            ? table.example.interactive.controls
            : [];
        const collapseState = table?.kind === "component"
            ? table.example.interactive.states.find(
                (state) =>
                    state.key ===
                    "density:compact|fullWidth:true|collapseToList:true|captionSrOnly:true|amountAlign:right",
            )
            : undefined;

        expect(table?.kind).toBe("component");
        expect(table?.packageName).toBe("@fremtind/jokul");
        expect(table?.componentProfile).toEqual(expect.objectContaining({
            styleImports: [
                "@fremtind/jokul/styles/core/core.min.css",
                "@fremtind/jokul/styles/components/table/table.min.css",
            ],
            clientRuntime: "none",
            hydration: "none",
            keyboardSupport: "Bruker native tabellsemantikk; tastaturnavigasjon skjer via eventuelle interaktive elementer inni cellene.",
        }));
        expect(propTables.map((propTable) => propTable.source)).toEqual([
            "design-system",
            "framework",
        ]);
        expect(interactiveControls.map((control) => control.name)).toEqual([
            "density",
            "fullWidth",
            "collapseToList",
            "captionSrOnly",
            "amountAlign",
        ]);
        expect(table?.subcomponents?.map((subcomponent) => subcomponent.slug)).toEqual([
            "table-caption",
            "table-head",
            "table-header",
            "table-cell",
        ]);
        expect(table?.subcomponents?.find((subcomponent) => subcomponent.slug === "table-caption")?.propTables
            .map((table) => table.source)).toEqual(["framework"]);
        expect(table?.subcomponents?.find((subcomponent) => subcomponent.slug === "table-caption")?.propTables[0]?.rows
            .map((row) => row.name)).toEqual(["srOnly", "children"]);
        expect(table?.subcomponents?.find((subcomponent) => subcomponent.slug === "table-head")?.propTables
            .map((table) => table.source)).toEqual(["framework"]);
        expect(table?.subcomponents?.find((subcomponent) => subcomponent.slug === "table-head")?.propTables[0]?.rows
            .map((row) => row.name)).toEqual(["sticky"]);
        expect(table?.subcomponents?.find((subcomponent) => subcomponent.slug === "table-header")?.propTables
            .map((table) => table.source)).toEqual(["framework", "native"]);
        expect(table?.subcomponents?.find((subcomponent) => subcomponent.slug === "table-header")?.propTables[0]?.rows
            .map((row) => row.name)).toEqual(["align"]);
        expect(table?.subcomponents?.find((subcomponent) => subcomponent.slug === "table-cell")?.propTables
            .map((table) => table.source)).toEqual(["framework", "native"]);
        expect(table?.subcomponents?.find((subcomponent) => subcomponent.slug === "table-cell")?.propTables[0]?.rows
            .map((row) => row.name)).toEqual(["align"]);
        expect(table?.parts?.map((part) => part.name)).toEqual([
            "Table root",
            "Caption",
            "Head section",
            "Header cell",
            "Body row",
            "Data cell",
        ]);
        expect(table?.recipes?.map((recipe) => recipe.slug)).toEqual([
            "standard",
            "collapse-to-list",
            "sticky-head",
        ]);
        expect(collapseState?.previewHtml).toContain(
            'class="jkl-table jkl-table--full-width jkl-table--collapse-to-list"',
        );
        expect(collapseState?.previewHtml).toContain("data-collapse");
        expect(collapseState?.codeExamples[0]?.code).toContain(
            'import "@fremtind/jokul/styles/components/table/table.min.css";',
        );
        expect(collapseState?.codeExamples[0]?.code).toContain('from "@fremtind/jokul/table"');
        expect(collapseState?.notes).toContain(
            "Forhåndsvisningen setter også `data-collapse` for å vise listevisningen i docs. I vanlig bruk håndterer komponenten dette responsivt.",
        );
    });
});

describe("Jøkul component profiles", () => {
    it("requires a component profile for every documented Jøkul component page", () => {
        const componentSection = getJokulLocalSection("komponenter");

        expect(componentSection).toBeDefined();
        expect(componentSection?.items.every((item) =>
            item.kind === "component" &&
            item.componentProfile.styleImports.length > 0 &&
            item.componentProfile.semantics.length > 0 &&
            item.componentProfile.automatedChecks.length > 0 &&
            item.componentProfile.manualChecks.length > 0 &&
            item.componentProfile.performanceNotes.length > 0)).toBe(true);
    });
});
