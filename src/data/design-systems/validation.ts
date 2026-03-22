import type {
    DesignSystem,
    DesignSystemComponentAssetDoc,
    DesignSystemComponentProfile,
    DesignSystemComponentRecipe,
    DesignSystemComponentSubcomponentDoc,
    DesignSystemDocumentedAsset,
    DesignSystemExample,
    DesignSystemLocalDocs,
    DesignSystemLocalSectionDocs,
    DesignSystemPropRow,
    DesignSystemPropSource,
    DesignSystemPropTable,
} from "./types";

function getDuplicateValues(values: string[]): string[] {
    const seen = new Set<string>();
    const duplicates = new Set<string>();

    for (const value of values) {
        if (seen.has(value)) {
            duplicates.add(value);
        }

        seen.add(value);
    }

    return [...duplicates].sort((a, b) => a.localeCompare(b, "nb"));
}

function getAssetLabel(
    section: { slug: string },
    asset: { slug: string },
): string {
    return `${section.slug}/${asset.slug}`;
}

function getPropRowsBySource(
    propTables: DesignSystemPropTable[],
    source: DesignSystemPropSource,
): DesignSystemPropRow[] {
    return propTables
        ?.filter((table) => table.source === source)
        .flatMap((table) => table.rows) ?? [];
}

function getAllComponentPropTables(
    asset: DesignSystemComponentAssetDoc,
): DesignSystemPropTable[] {
    return [
        ...asset.propTables,
        ...(asset.subcomponents?.flatMap((subcomponent) => subcomponent.propTables) ?? []),
    ];
}

function hasRenderableExampleContent(example: DesignSystemExample): boolean {
    return Boolean(
        example.interactive ||
        example.previewHtml ||
        (example.codeExamples && example.codeExamples.length > 0),
    );
}

function validateProfileList(
    label: string,
    fieldName: string,
    values: string[],
): string[] {
    const errors: string[] = [];

    if (values.length === 0) {
        errors.push(`${label}: komponentprofilen må ha minst ett punkt i ${fieldName}.`);
    }

    const emptyValues = values.filter((value) => !value.trim());

    if (emptyValues.length > 0) {
        errors.push(`${label}: komponentprofilen har tomme verdier i ${fieldName}.`);
    }

    return errors;
}

function validateComponentProfile(
    label: string,
    profile: DesignSystemComponentProfile,
): string[] {
    const errors: string[] = [];
    const duplicateStyleImports = getDuplicateValues(profile.styleImports);
    const hasIconStyleImport = Boolean(
        profile.iconContract.styleImport &&
        profile.styleImports.includes(profile.iconContract.styleImport),
    );
    const hasIconFontStyleImport = Boolean(
        profile.iconContract.fontStyleImport &&
        profile.styleImports.includes(profile.iconContract.fontStyleImport),
    );

    errors.push(...validateProfileList(label, "styleImports", profile.styleImports));
    errors.push(...validateProfileList(label, "semantics", profile.semantics));
    errors.push(...validateProfileList(label, "automatedChecks", profile.automatedChecks));
    errors.push(...validateProfileList(label, "manualChecks", profile.manualChecks));
    errors.push(...validateProfileList(label, "performanceNotes", profile.performanceNotes));

    if (!profile.keyboardSupport.trim()) {
        errors.push(`${label}: komponentprofilen må beskrive tastaturstøtte.`);
    }

    if (duplicateStyleImports.length > 0) {
        errors.push(
            `${label}: komponentprofilen har dupliserte styleImports: ${duplicateStyleImports.join(", ")}.`,
        );
    }

    if (profile.iconContract.usage === "none") {
        if (
            profile.iconContract.importPath ||
            profile.iconContract.styleImport ||
            profile.iconContract.fontStyleImport
        ) {
            errors.push(`${label}: ikonkontrakt med usage=none kan ikke oppgi importPath, styleImport eller fontStyleImport.`);
        }

        if (profile.iconContract.notes.some((note) => !note.trim())) {
            errors.push(`${label}: ikonkontrakten kan ikke ha tomme notater.`);
        }
    } else {
        errors.push(...validateProfileList(label, "iconContract.notes", profile.iconContract.notes));

        if (
            !profile.iconContract.importPath?.trim() &&
            !profile.iconContract.styleImport?.trim() &&
            !profile.iconContract.fontStyleImport?.trim()
        ) {
            errors.push(`${label}: ikonkontrakt med ikoner må oppgi minst én konkret avhengighet.`);
        }

        if (profile.iconContract.styleImport && !hasIconStyleImport) {
            errors.push(`${label}: ikonkontrakten peker på en styleImport som mangler i komponentprofilen.`);
        }

        if (profile.iconContract.fontStyleImport && !hasIconFontStyleImport) {
            errors.push(`${label}: ikonkontrakten peker på en fontStyleImport som mangler i komponentprofilen.`);
        }
    }

    if (profile.iconContract.usage === "none" && profile.styleImports.some((value) =>
        value.includes("/components/icon/") || value.includes("/styles/fonts/")
    )) {
        errors.push(`${label}: komponentprofilen importerer ikon- eller fontstiler uten å dokumentere ikonkontrakt.`);
    }

    if (profile.clientRuntime === "none" && profile.hydration !== "none") {
        errors.push(`${label}: hydrering kan ikke være påkrevd eller valgfri når clientRuntime er none.`);
    }

    return errors;
}

function validateRelationshipGroups(
    label: string,
    groups: NonNullable<DesignSystemDocumentedAsset["relationships"]>,
): string[] {
    const errors: string[] = [];
    const duplicateKinds = getDuplicateValues(groups.map((group) => group.kind));

    if (duplicateKinds.length > 0) {
        errors.push(`${label}: dupliserte relasjonsgrupper: ${duplicateKinds.join(", ")}.`);
    }

    for (const group of groups) {
        if (group.links.length === 0) {
            errors.push(`${label}: relasjonsgruppen ${group.kind} må ha minst én lenke.`);
        }
    }

    return errors;
}

function validateComponentRecipes(
    label: string,
    recipes: DesignSystemComponentRecipe[],
    partNames: string[],
): string[] {
    const errors: string[] = [];
    const duplicateRecipeSlugs = getDuplicateValues(recipes.map((recipe) => recipe.slug));

    if (duplicateRecipeSlugs.length > 0) {
        errors.push(`${label}: dupliserte komposisjoner: ${duplicateRecipeSlugs.join(", ")}.`);
    }

    for (const recipe of recipes) {
        if (!hasRenderableExampleContent(recipe.example)) {
            errors.push(`${label}: komposisjonen ${recipe.slug} må ha et visbart eksempel.`);
        }

        if (recipe.requiredPartNames.length === 0) {
            errors.push(`${label}: komposisjonen ${recipe.slug} må peke på minst én del.`);
        }

        const unknownPartNames = recipe.requiredPartNames.filter((name) => !partNames.includes(name));

        if (unknownPartNames.length > 0) {
            errors.push(
                `${label}: komposisjonen ${recipe.slug} peker på ukjente deler: ${unknownPartNames.join(", ")}.`,
            );
        }
    }

    return errors;
}

function validatePropTables(
    label: string,
    propTables: DesignSystemPropTable[],
): string[] {
    const errors: string[] = [];
    const duplicateSources = getDuplicateValues(propTables.map((table) => table.source));
    const propRows = propTables.flatMap((table) => table.rows);
    const duplicatePropNames = getDuplicateValues(propRows.map((row) => row.name));

    if (duplicateSources.length > 0) {
        errors.push(`${label}: dupliserte prop-kilder: ${duplicateSources.join(", ")}.`);
    }

    if (duplicatePropNames.length > 0) {
        errors.push(`${label}: dupliserte props i prop-tabellene: ${duplicatePropNames.join(", ")}.`);
    }

    for (const table of propTables) {
        if (table.rows.length === 0) {
            errors.push(`${label}: prop-tabeller må ha minst én rad.`);
        }

        if (table.source === "framework" && !table.frameworkName.trim()) {
            errors.push(`${label}: framework-props må oppgi \`frameworkName\`.`);
        }
    }

    return errors;
}

function validateComponentSubcomponents(
    label: string,
    subcomponents: DesignSystemComponentSubcomponentDoc[],
    partNames: string[],
    recipeSlugs: string[],
): string[] {
    const errors: string[] = [];
    const duplicateSlugs = getDuplicateValues(subcomponents.map((subcomponent) => subcomponent.slug));

    if (duplicateSlugs.length > 0) {
        errors.push(`${label}: dupliserte delkomponenter: ${duplicateSlugs.join(", ")}.`);
    }

    for (const subcomponent of subcomponents) {
        const subcomponentLabel = `${label}: delkomponenten ${subcomponent.slug}`;

        if (!subcomponent.title.trim()) {
            errors.push(`${subcomponentLabel} må ha en tittel.`);
        }

        if (!subcomponent.sourceName.trim()) {
            errors.push(`${subcomponentLabel} må ha et sourceName.`);
        }

        if (!subcomponent.description.trim()) {
            errors.push(`${subcomponentLabel} må ha en beskrivelse.`);
        }

        if (subcomponent.selector !== undefined && !subcomponent.selector.trim()) {
            errors.push(`${subcomponentLabel} kan ikke ha tom selector.`);
        }

        if (subcomponent.propTables.length === 0) {
            errors.push(`${subcomponentLabel} må ha minst én prop-tabell.`);
        }

        errors.push(...validatePropTables(subcomponentLabel, subcomponent.propTables));

        const unknownPartNames = (subcomponent.relatedPartNames ?? []).filter((name) => !partNames.includes(name));

        if (unknownPartNames.length > 0) {
            errors.push(`${subcomponentLabel} peker på ukjente anatomideler: ${unknownPartNames.join(", ")}.`);
        }

        const unknownRecipeSlugs = (subcomponent.relatedRecipeSlugs ?? []).filter((slug) => !recipeSlugs.includes(slug));

        if (unknownRecipeSlugs.length > 0) {
            errors.push(`${subcomponentLabel} peker på ukjente komposisjoner: ${unknownRecipeSlugs.join(", ")}.`);
        }
    }

    return errors;
}

function validateComponentAsset(
    section: DesignSystemLocalSectionDocs<"component">,
    asset: DesignSystemComponentAssetDoc,
): string[] {
    const errors: string[] = [];
    const label = getAssetLabel(section, asset);
    const allPropTables = getAllComponentPropTables(asset);

    if (!asset.example) {
        errors.push(`${label}: komponentdocs må ha ett hovedeksempel.`);
    }

    if (asset.examples) {
        errors.push(`${label}: komponentdocs skal bruke \`example\`, ikke \`examples\`.`);
    }

    if (!asset.sections?.some((entry) => entry.id === "bruk")) {
        errors.push(`${label}: mangler seksjonen "bruk".`);
    }

    if (!asset.sections?.some((entry) => entry.id === "tilgjengelighet")) {
        errors.push(`${label}: mangler seksjonen "tilgjengelighet".`);
    }

    if (!asset.example.interactive) {
        errors.push(`${label}: komponentdocs må ha et interaktivt hovedeksempel.`);
    }

    errors.push(...validateComponentProfile(label, asset.componentProfile));

    if (asset.relationships) {
        errors.push(...validateRelationshipGroups(label, asset.relationships));
    }

    if (asset.propTables.length === 0) {
        errors.push(`${label}: komponentdocs må ha strukturerte prop-tabeller.`);
    }

    errors.push(...validatePropTables(label, asset.propTables));

    if (getPropRowsBySource(asset.propTables, "design-system").length === 0) {
        errors.push(`${label}: komponentdocs må ha en design system-prop-tabell.`);
    }

    if (asset.example.interactive) {
        const controlNames = asset.example.interactive.controls.map((control) => control.name);
        const propRows = allPropTables.flatMap((table) => table.rows);
        const duplicateControlNames = getDuplicateValues(controlNames);

        if (duplicateControlNames.length > 0) {
            errors.push(`${label}: dupliserte interaktive kontroller: ${duplicateControlNames.join(", ")}.`);
        }

        if (controlNames.length === 0) {
            errors.push(`${label}: interaktive komponenteksempler må ha minst én kontroll.`);
        }

        const documentedControlNames = propRows
            .map((row) => row.interactiveControlName)
            .filter((name): name is string => Boolean(name));
        const missingRowLinks = controlNames.filter((name) => !documentedControlNames.includes(name));

        if (missingRowLinks.length > 0) {
            errors.push(`${label}: interaktive kontroller mangler prop-rad: ${missingRowLinks.join(", ")}.`);
        }

        const undocumentedDesignSystemProps = getPropRowsBySource(allPropTables, "design-system")
            .filter((row) => !row.interactiveControlName)
            .map((row) => row.name);

        if (undocumentedDesignSystemProps.length > 0) {
            errors.push(
                `${label}: alle design system-props må kunne styres fra eksempelet: ${undocumentedDesignSystemProps.join(", ")}.`,
            );
        }

        const missingControls = documentedControlNames.filter((name) => !controlNames.includes(name));

        if (missingControls.length > 0) {
            errors.push(`${label}: prop-rader peker til ukjente kontroller: ${missingControls.join(", ")}.`);
        }
    }

    if (asset.parts || asset.recipes) {
        if (!asset.parts || asset.parts.length === 0) {
            errors.push(`${label}: komponentdocs med komposisjoner må ha en anatomiliste.`);
        }

        if (!asset.recipes || asset.recipes.length === 0) {
            errors.push(`${label}: komponentdocs med anatomi må ha minst én komposisjon.`);
        }
    }

    if (asset.parts && asset.parts.length > 0) {
        const partNames = asset.parts.map((part) => part.name);
        const recipeSlugs = asset.recipes?.map((recipe) => recipe.slug) ?? [];
        const duplicatePartNames = getDuplicateValues(partNames);
        const duplicatePartSelectors = getDuplicateValues(asset.parts.map((part) => part.selector));

        if (duplicatePartNames.length > 0) {
            errors.push(`${label}: dupliserte anatomideler: ${duplicatePartNames.join(", ")}.`);
        }

        if (duplicatePartSelectors.length > 0) {
            errors.push(`${label}: dupliserte anatomiselectors: ${duplicatePartSelectors.join(", ")}.`);
        }

        for (const part of asset.parts) {
            if (part.parentPartName && !partNames.includes(part.parentPartName)) {
                errors.push(
                    `${label}: anatomidelen ${part.name} peker på ukjent forelder ${part.parentPartName}.`,
                );
            }
        }

        if (!asset.parts.some((part) => part.required)) {
            errors.push(`${label}: minst én anatomidel må være markert som required.`);
        }

        if (asset.recipes) {
            errors.push(...validateComponentRecipes(label, asset.recipes, partNames));
        }

        if (asset.subcomponents && asset.subcomponents.length > 0) {
            errors.push(...validateComponentSubcomponents(
                label,
                asset.subcomponents,
                partNames,
                recipeSlugs,
            ));
        }
    } else if (asset.subcomponents && asset.subcomponents.length > 0) {
        errors.push(...validateComponentSubcomponents(label, asset.subcomponents, [], []));
    }

    if (asset.deprecatedPropMigrations && asset.deprecatedPropMigrations.length > 0) {
        const deprecatedRows = getPropRowsBySource(allPropTables, "deprecated").map((row) => row.name);
        const migrationNames = asset.deprecatedPropMigrations.map((migration) => migration.propName);

        if (deprecatedRows.length === 0) {
            errors.push(`${label}: utfasete props må også ligge i en \`deprecated\` prop-tabell.`);
        }

        const missingMigrationRows = deprecatedRows.filter((name) => !migrationNames.includes(name));

        if (missingMigrationRows.length > 0) {
            errors.push(`${label}: utfasete props mangler migreringsguide: ${missingMigrationRows.join(", ")}.`);
        }
    }

    return errors;
}

function validateReferenceAsset(
    section: DesignSystemLocalSectionDocs,
    asset: Exclude<DesignSystemDocumentedAsset, { kind: "component" }>,
): string[] {
    const errors: string[] = [];
    const label = getAssetLabel(section, asset);

    if (asset.relationships) {
        errors.push(...validateRelationshipGroups(label, asset.relationships));
    }

    if (asset.example && asset.examples) {
        errors.push(`${label}: bruk enten \`example\` eller \`examples\`, ikke begge.`);
    }

    if (!asset.example && (!asset.examples || asset.examples.length === 0)) {
        errors.push(`${label}: må ha minst ett eksempel eller én eksempelsamling.`);
    }

    if (asset.example && !hasRenderableExampleContent(asset.example)) {
        errors.push(`${label}: \`example\` må ha innhold som kan vises.`);
    }

    if (asset.examples) {
        for (const example of asset.examples) {
            if (!hasRenderableExampleContent(example)) {
                errors.push(`${label}: alle elementer i \`examples\` må ha innhold som kan vises.`);
            }
        }
    }

    return errors;
}

export function validateDesignSystemLocalDocs(
    system: DesignSystem,
    localDocs: DesignSystemLocalDocs,
): string[] {
    const errors: string[] = [];

    if (system.slug !== localDocs.systemSlug) {
        errors.push(`Systemslug ${system.slug} matcher ikke lokale docs ${localDocs.systemSlug}.`);
    }

    if (system.localDocumentation?.status !== "documented") {
        errors.push(`${system.slug}: lokale docs kan bare valideres når systemet er markert som documented.`);
    }

    const sectionSlugs = localDocs.sections.map((section) => section.slug);
    const duplicateSectionSlugs = getDuplicateValues(sectionSlugs);

    if (duplicateSectionSlugs.length > 0) {
        errors.push(`${system.slug}: dupliserte lokale seksjoner: ${duplicateSectionSlugs.join(", ")}.`);
    }

    const documentedCatalogSections = system.catalog
        .filter((section) => section.status === "documented" && section.localPath);
    const documentedSectionMap = new Map(
        documentedCatalogSections.map((section) => [section.slug, section]),
    );

    for (const section of localDocs.sections) {
        const catalogSection = documentedSectionMap.get(section.slug);

        if (!catalogSection) {
            errors.push(`${system.slug}: lokal seksjon ${section.slug} mangler dokumentert katalogseksjon.`);
            continue;
        }

        if (section.kind !== catalogSection.kind) {
            errors.push(
                `${system.slug}: seksjonen ${section.slug} har kind ${section.kind}, men katalogen sier ${catalogSection.kind}.`,
            );
        }

        if (
            system.localDocumentation?.basePath &&
            catalogSection.localPath !== `${system.localDocumentation.basePath}/${section.slug}`
        ) {
            errors.push(
                `${system.slug}: katalogseksjonen ${section.slug} har feil localPath ${catalogSection.localPath}.`,
            );
        }

        if (section.items.length === 0) {
            errors.push(`${system.slug}: seksjonen ${section.slug} må ha minst ett dokumentert asset.`);
        }

        const duplicateAssetSlugs = getDuplicateValues(section.items.map((item) => item.slug));

        if (duplicateAssetSlugs.length > 0) {
            errors.push(
                `${system.slug}: seksjonen ${section.slug} har dupliserte assets: ${duplicateAssetSlugs.join(", ")}.`,
            );
        }

        const documentedCatalogItems = catalogSection.items
            ?.filter((item) => item.status === "documented" && item.localPath) ?? [];
        const catalogItemMap = new Map(documentedCatalogItems.map((item) => [item.slug, item]));

        for (const asset of section.items) {
            if (asset.kind !== section.kind) {
                errors.push(
                    `${system.slug}: asset ${getAssetLabel(section, asset)} har kind ${asset.kind}, men seksjonen er ${section.kind}.`,
                );
            }

            if (asset.packageName && !system.packages.some((pkg) => pkg.name === asset.packageName)) {
                errors.push(
                    `${system.slug}: asset ${getAssetLabel(section, asset)} peker til ukjent pakke ${asset.packageName}.`,
                );
            }

            if (
                asset.installGuideSlug &&
                !system.installGuides.some((guide) => guide.slug === asset.installGuideSlug)
            ) {
                errors.push(
                    `${system.slug}: asset ${getAssetLabel(section, asset)} peker til ukjent installasjonsguide ${asset.installGuideSlug}.`,
                );
            }

            const catalogItem = catalogItemMap.get(asset.slug);

            if (!catalogItem) {
                errors.push(
                    `${system.slug}: asset ${getAssetLabel(section, asset)} mangler dokumentert katalogoppføring.`,
                );
            } else if (
                catalogSection.localPath &&
                catalogItem.localPath !== `${catalogSection.localPath}/${asset.slug}`
            ) {
                errors.push(
                    `${system.slug}: katalogoppføringen for ${getAssetLabel(section, asset)} har feil localPath ${catalogItem.localPath}.`,
                );
            }

            if (asset.kind === "component") {
                errors.push(...validateComponentAsset(
                    section as DesignSystemLocalSectionDocs<"component">,
                    asset,
                ));
            } else {
                errors.push(...validateReferenceAsset(section, asset));
            }
        }

        const localAssetSlugs = section.items.map((item) => item.slug);
        const missingLocalAssets = documentedCatalogItems
            .map((item) => item.slug)
            .filter((slug) => !localAssetSlugs.includes(slug));

        if (missingLocalAssets.length > 0) {
            errors.push(
                `${system.slug}: katalogen forventer lokale assets som mangler i seksjonen ${section.slug}: ${missingLocalAssets.join(", ")}.`,
            );
        }
    }

    const localSectionSet = new Set(localDocs.sections.map((section) => section.slug));
    const missingLocalSections = documentedCatalogSections
        .map((section) => section.slug)
        .filter((slug) => !localSectionSet.has(slug));

    if (missingLocalSections.length > 0) {
        errors.push(
            `${system.slug}: dokumenterte katalogseksjoner mangler lokale docs: ${missingLocalSections.join(", ")}.`,
        );
    }

    return errors;
}

export function assertValidDesignSystemLocalDocs(
    system: DesignSystem,
    localDocs: DesignSystemLocalDocs,
): void {
    const errors = validateDesignSystemLocalDocs(system, localDocs);

    if (errors.length > 0) {
        throw new Error(errors.join("\n"));
    }
}
