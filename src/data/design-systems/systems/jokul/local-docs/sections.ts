import type { DesignSystemLocalSectionDocs } from "../../../types";
import { buttonDoc } from "./components/button";
import { loaderDoc } from "./components/loader";
import { skeletonLoaderDoc } from "./components/skeleton-loader";
import { tableDoc } from "./components/table";
import { spacingDoc } from "./tokens/spacing";

const jokulComponentSection = {
    slug: "komponenter",
    kind: "component",
    title: "Komponenter",
    description: "Lokale oppslag for konkrete Jøkul-komponenter med eksempler, API-utvalg og relasjoner til andre assets.",
    keywords: [
        "komponenter",
        "react",
        "jokul komponenter",
        "button",
        "loader",
        "skeleton loader",
        "table",
    ],
    items: [buttonDoc, loaderDoc, skeletonLoaderDoc, tableDoc],
} satisfies DesignSystemLocalSectionDocs<"component">;

const jokulTokenSection = {
    slug: "tokens",
    kind: "token",
    title: "Designtokens",
    description: "Lokale oppslag for token-grupper som kan brukes på tvers av komponenter og mønstre.",
    keywords: [
        "tokens",
        "designtokens",
        "spacing",
        "css-variabler",
    ],
    items: [spacingDoc],
} satisfies DesignSystemLocalSectionDocs<"token">;

export const jokulLocalSections: DesignSystemLocalSectionDocs[] = [
    jokulComponentSection,
    jokulTokenSection,
];
