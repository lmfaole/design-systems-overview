export const DESIGN_SYSTEM_ASSET_KINDS = [
    "component",
    "formatter",
    "hook",
    "mixin",
    "token",
    "icon",
    "utility",
    "theme",
    "pattern",
    "template",
    "tooling",
] as const;

export type DesignSystemAssetKind = (typeof DESIGN_SYSTEM_ASSET_KINDS)[number];

export const DESIGN_SYSTEM_DOCUMENTATION_STATUSES = [
    "external",
    "planned",
    "documented",
] as const;

export type DesignSystemDocumentationStatus =
    (typeof DESIGN_SYSTEM_DOCUMENTATION_STATUSES)[number];

export type DesignSystemCodeLanguage =
    | "sh"
    | "ts"
    | "tsx"
    | "js"
    | "json"
    | "css"
    | "scss"
    | "html";

export interface DesignSystemExternalLinks {
    frontPage: string;
    changelog: string;
    about: string;
}

export interface DesignSystemPackage {
    name: string;
    description: string;
    installName?: string;
}

export interface DesignSystemInstallStep {
    title: string;
    description: string;
    code?: string;
    language?: DesignSystemCodeLanguage;
}

export interface DesignSystemInstallGuide {
    slug: string;
    title: string;
    description: string;
    status: DesignSystemDocumentationStatus;
    packages: string[];
    steps: DesignSystemInstallStep[];
    localPath?: `/ds/${string}`;
    externalPath?: string;
}

export interface DesignSystemCatalogItem {
    slug: string;
    title: string;
    description: string;
    status: DesignSystemDocumentationStatus;
    packageNames?: string[];
    localPath?: `/ds/${string}`;
    externalPath?: string;
    examples?: string[];
}

export interface DesignSystemCatalogSection {
    slug: string;
    kind: DesignSystemAssetKind;
    title: string;
    description: string;
    status: DesignSystemDocumentationStatus;
    packageNames?: string[];
    localPath?: `/ds/${string}`;
    externalPath?: string;
    examples?: string[];
    items?: DesignSystemCatalogItem[];
}

export interface DesignSystemLocalDocumentationPlan {
    status: Exclude<DesignSystemDocumentationStatus, "external">;
    basePath: `/ds/${string}`;
    installPath: `/ds/${string}`;
    roadmap: string[];
}

export interface DesignSystem {
    slug: string;
    name: string;
    company: string;
    description: string;
    docs: string;
    packageName?: string;
    openSource: boolean;
    externalLinks: DesignSystemExternalLinks;
    packages: DesignSystemPackage[];
    installGuides: DesignSystemInstallGuide[];
    catalog: DesignSystemCatalogSection[];
    localDocumentation?: DesignSystemLocalDocumentationPlan;
    stats?: {
        components?: number;
        githubStars?: number;
        npmDownloads?: number;
    };
}

export interface DesignSystemExampleCode {
    label: string;
    language?: DesignSystemCodeLanguage;
    code: string;
}

export interface DesignSystemInteractiveExampleBooleanControl {
    kind: "boolean";
    name: string;
    label: string;
    defaultValue: boolean;
}

export interface DesignSystemInteractiveExampleSelectOption {
    value: string;
    label: string;
}

export interface DesignSystemInteractiveExampleSelectControl {
    kind: "select";
    name: string;
    label: string;
    defaultValue: string;
    options: DesignSystemInteractiveExampleSelectOption[];
}

export type DesignSystemInteractiveExampleControl =
    | DesignSystemInteractiveExampleBooleanControl
    | DesignSystemInteractiveExampleSelectControl;

export type DesignSystemInteractiveExampleValue = string | boolean;

export interface DesignSystemInteractiveExampleState {
    previewHtml: string;
    codeExamples: DesignSystemExampleCode[];
    notes?: string[];
}

export type DesignSystemInteractiveExampleRendererId = string;

export interface DesignSystemInteractiveExampleEventLog {
    events: string[];
    targetSelector?: string;
    emptyLabel?: string;
    maxEntries?: number;
}

export interface DesignSystemInteractiveExample {
    controls: DesignSystemInteractiveExampleControl[];
    rendererId: DesignSystemInteractiveExampleRendererId;
    initialState: DesignSystemInteractiveExampleState;
    eventLog?: DesignSystemInteractiveExampleEventLog;
}

export interface DesignSystemInteractiveExampleClientConfig {
    controls: DesignSystemInteractiveExampleControl[];
    rendererId: DesignSystemInteractiveExampleRendererId;
    eventLog?: DesignSystemInteractiveExampleEventLog;
}

export interface DesignSystemExample {
    slug: string;
    previewHtml?: string;
    codeExamples?: DesignSystemExampleCode[];
    notes?: string[];
    interactive?: DesignSystemInteractiveExample;
}

export interface DesignSystemComponentExample extends DesignSystemExample {
    interactive: DesignSystemInteractiveExample;
}

export interface DesignSystemContentSection {
    id: string;
    title: string;
    paragraphs: string[];
    items?: string[];
}

export interface DesignSystemTableColumn {
    key: string;
    label: string;
}

export interface DesignSystemDataTable {
    id: string;
    title: string;
    description?: string;
    columns: DesignSystemTableColumn[];
    rows: Array<Record<string, string>>;
}

export const DESIGN_SYSTEM_PROP_SOURCES = [
    "design-system",
    "framework",
    "native",
    "aria",
    "deprecated",
] as const;

export type DesignSystemPropSource =
    (typeof DESIGN_SYSTEM_PROP_SOURCES)[number];

export interface DesignSystemPropRow {
    name: string;
    type: string;
    defaultValue: string;
    description: string;
    interactiveControlName?: string;
}

interface DesignSystemBasePropTable {
    source: Exclude<DesignSystemPropSource, "framework">;
    description: string;
    rows: DesignSystemPropRow[];
}

interface DesignSystemFrameworkPropTable {
    source: "framework";
    frameworkName: string;
    description: string;
    rows: DesignSystemPropRow[];
}

export type DesignSystemPropTable =
    | DesignSystemBasePropTable
    | DesignSystemFrameworkPropTable;

export interface DesignSystemRelatedLink {
    title: string;
    href: string;
    description?: string;
}

export const DESIGN_SYSTEM_RELATIONSHIP_KINDS = [
    "parent",
    "child",
    "sibling",
    "alternative",
    "pattern",
] as const;

export type DesignSystemRelationshipKind =
    (typeof DESIGN_SYSTEM_RELATIONSHIP_KINDS)[number];

export interface DesignSystemRelationshipGroup {
    kind: DesignSystemRelationshipKind;
    description?: string;
    links: DesignSystemRelatedLink[];
}

export interface DesignSystemComponentPart {
    name: string;
    selector: string;
    description: string;
    required: boolean;
    repeats?: boolean;
    parentPartName?: string;
}

export interface DesignSystemComponentRecipe {
    slug: string;
    title: string;
    description: string;
    requiredPartNames: string[];
    example: DesignSystemExample;
}

export interface DesignSystemComponentSubcomponentDoc {
    slug: string;
    title: string;
    sourceName: string;
    description: string;
    selector?: string;
    propTables: DesignSystemPropTable[];
    relatedPartNames?: string[];
    relatedRecipeSlugs?: string[];
}

export const DESIGN_SYSTEM_COMPONENT_RUNTIME_LEVELS = [
    "none",
    "optional",
    "required",
] as const;

export type DesignSystemComponentRuntimeLevel =
    (typeof DESIGN_SYSTEM_COMPONENT_RUNTIME_LEVELS)[number];

export interface DesignSystemComponentIconContract {
    usage: DesignSystemComponentRuntimeLevel;
    importPath?: string;
    styleImport?: string;
    fontStyleImport?: string;
    notes: string[];
}

export const DESIGN_SYSTEM_COMPONENT_PROP_DOCUMENTATION_COVERAGES = [
    "complete",
] as const;

export type DesignSystemComponentPropDocumentationCoverage =
    (typeof DESIGN_SYSTEM_COMPONENT_PROP_DOCUMENTATION_COVERAGES)[number];

export const DESIGN_SYSTEM_COMPONENT_PROP_DOCUMENTATION_SCOPES = [
    "package-public-props",
] as const;

export type DesignSystemComponentPropDocumentationScope =
    (typeof DESIGN_SYSTEM_COMPONENT_PROP_DOCUMENTATION_SCOPES)[number];

export const DESIGN_SYSTEM_COMPONENT_PROP_DOCUMENTATION_OWNERS = [
    "root",
    "subcomponent",
] as const;

export type DesignSystemComponentPropDocumentationOwner =
    (typeof DESIGN_SYSTEM_COMPONENT_PROP_DOCUMENTATION_OWNERS)[number];

export interface DesignSystemComponentPropDocumentationEntry {
    owner: DesignSystemComponentPropDocumentationOwner;
    subcomponentSlug?: string;
    importPath: string;
    typeName: string;
    documentedProps: string[];
}

export interface DesignSystemComponentPropDocumentation {
    coverage: DesignSystemComponentPropDocumentationCoverage;
    scope: DesignSystemComponentPropDocumentationScope;
    notes: string[];
    entries: DesignSystemComponentPropDocumentationEntry[];
}

export interface DesignSystemComponentProfile {
    styleImports: string[];
    clientRuntime: DesignSystemComponentRuntimeLevel;
    hydration: DesignSystemComponentRuntimeLevel;
    iconContract: DesignSystemComponentIconContract;
    propDocumentation: DesignSystemComponentPropDocumentation;
    keyboardSupport: string;
    semantics: string[];
    automatedChecks: string[];
    manualChecks: string[];
    performanceNotes: string[];
}

export interface DesignSystemDeprecatedPropMigration {
    propName: string;
    warning: string;
    replacement: string;
    beforeCode: string;
    afterCode: string;
    replacementCode?: string;
    notes?: string[];
}

interface DesignSystemAssetDocBase {
    slug: string;
    kind: DesignSystemAssetKind;
    title: string;
    description: string;
    keywords: string[];
    packageName?: string;
    installGuideSlug?: string;
    intro: string[];
    sections?: DesignSystemContentSection[];
    tables?: DesignSystemDataTable[];
    relationships?: DesignSystemRelationshipGroup[];
    relatedLinks?: DesignSystemRelatedLink[];
}

export interface DesignSystemComponentAssetDoc extends DesignSystemAssetDocBase {
    kind: "component";
    packageName: string;
    installGuideSlug: string;
    example: DesignSystemComponentExample;
    examples?: never;
    componentProfile: DesignSystemComponentProfile;
    propTables: DesignSystemPropTable[];
    deprecatedPropMigrations?: DesignSystemDeprecatedPropMigration[];
    parts?: DesignSystemComponentPart[];
    recipes?: DesignSystemComponentRecipe[];
    subcomponents?: DesignSystemComponentSubcomponentDoc[];
}

export interface DesignSystemReferenceAssetDoc<
    TKind extends Exclude<DesignSystemAssetKind, "component"> = Exclude<
        DesignSystemAssetKind,
        "component"
    >,
> extends DesignSystemAssetDocBase {
    kind: TKind;
    example?: DesignSystemExample;
    examples?: DesignSystemExample[];
    componentProfile?: never;
    propTables?: never;
    deprecatedPropMigrations?: never;
    parts?: never;
    recipes?: never;
    subcomponents?: never;
}

type DesignSystemReferenceDocumentedAsset = {
    [TKind in Exclude<DesignSystemAssetKind, "component">]:
        DesignSystemReferenceAssetDoc<TKind>;
}[Exclude<DesignSystemAssetKind, "component">];

export type DesignSystemDocumentedAsset =
    | DesignSystemComponentAssetDoc
    | DesignSystemReferenceDocumentedAsset;

export type DesignSystemAssetDoc = DesignSystemDocumentedAsset;

type DesignSystemAssetByKind<TKind extends DesignSystemAssetKind> =
    TKind extends DesignSystemAssetKind
        ? Extract<DesignSystemDocumentedAsset, { kind: TKind }>
        : never;

export interface DesignSystemLocalSectionDocs<
    TKind extends DesignSystemAssetKind = DesignSystemAssetKind,
> {
    slug: string;
    kind: TKind;
    title: string;
    description: string;
    keywords: string[];
    items: DesignSystemAssetByKind<TKind>[];
}

export interface DesignSystemLocalDocs {
    systemSlug: string;
    overview: {
        title: string;
        description: string;
        intro: string[];
    };
    sections: DesignSystemLocalSectionDocs[];
}
