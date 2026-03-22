import {
    createJokulComponentProfile,
    createJokulComponentPropDocumentation,
} from "../component-profile";

export const skeletonLoaderComponentProfile = createJokulComponentProfile({
    styleImports: [
        "@fremtind/jokul/styles/components/loader/skeleton-loader.min.css",
    ],
    propDocumentation: createJokulComponentPropDocumentation([
        {
            owner: "root",
            importPath: "@fremtind/jokul/loader",
            typeName: "SkeletonAnimationProps",
            documentedProps: [
                "className",
                "children",
                "textDescription",
                "role",
                "delay",
            ],
        },
        {
            owner: "root",
            importPath: "@fremtind/jokul/loader",
            typeName: "SkeletonElementProps",
            documentedProps: [
                "className",
                "shape",
                "width",
                "height",
            ],
        },
        {
            owner: "root",
            importPath: "@fremtind/jokul/loader",
            typeName: "SkeletonButtonProps",
            documentedProps: [
                "className",
                "shape",
                "width",
            ],
        },
        {
            owner: "root",
            importPath: "@fremtind/jokul/loader",
            typeName: "SkeletonCheckboxGroupProps",
            documentedProps: [
                "className",
                "checkboxes",
                "labelProps",
                "inputProps",
            ],
        },
        {
            owner: "root",
            importPath: "@fremtind/jokul/loader",
            typeName: "SkeletonInputProps",
            documentedProps: [
                "className",
                "labelProps",
                "inputProps",
            ],
        },
        {
            owner: "root",
            importPath: "@fremtind/jokul/loader",
            typeName: "SkeletonRadioButtonGroupProps",
            documentedProps: [
                "className",
                "labelProps",
                "inputProps",
                "radioButtons",
            ],
        },
        {
            owner: "root",
            importPath: "@fremtind/jokul/loader",
            typeName: "SkeletonTableProps",
            documentedProps: [
                "className",
                "children",
                "width",
            ],
        },
        {
            owner: "root",
            importPath: "@fremtind/jokul/loader",
            typeName: "SkeletonTableHeaderProps",
            documentedProps: [
                "className",
                "children",
            ],
        },
        {
            owner: "root",
            importPath: "@fremtind/jokul/loader",
            typeName: "SkeletonTableRowProps",
            documentedProps: [
                "className",
                "children",
            ],
        },
        {
            owner: "root",
            importPath: "@fremtind/jokul/loader",
            typeName: "SkeletonTextAreaProps",
            documentedProps: [
                "className",
                "labelProps",
                "inputProps",
            ],
        },
    ]),
    keyboardSupport: "Ingen egen tastaturmodell; skeleton loader er dekorativ og skal ikke være fokusbar.",
    semantics: [
        "Skeleton-markupen må være dekorativ og skjules med aria-hidden=\"true\".",
        "Bruk separat status eller konteksttekst når ventetilstanden er viktig å forstå.",
        "Velg en plassholderstruktur som faktisk matcher det ferdige innholdet.",
    ],
    manualChecks: [
        "Bekreft at skjelettet ligner nok på sluttresultatet til å sette riktige forventninger.",
        "Bekreft at plassholderen forsvinner raskt når dataene er klare.",
    ],
    performanceNotes: [
        "Sweep-animasjonen er CSS-basert og krever ikke klient-JS.",
        "Hold antall samtidige plassholdere nede for å begrense visuell støy.",
    ],
});
