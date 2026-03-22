import type { DesignSystemLocalSectionDocs } from "../../../types";
import { buttonDoc } from "./components/button";
import { cardDoc } from "./components/card";
import { checkboxDoc } from "./components/checkbox";
import { descriptionListDoc } from "./components/description-list";
import { loaderDoc } from "./components/loader";
import { messageDoc } from "./components/message";
import { radioButtonDoc } from "./components/radio-button";
import { selectDoc } from "./components/select";
import { skeletonLoaderDoc } from "./components/skeleton-loader";
import { summaryTableDoc } from "./components/summary-table";
import { tableDoc } from "./components/table";
import { tagDoc } from "./components/tag";
import { textAreaDoc } from "./components/text-area";
import { textInputDoc } from "./components/text-input";
import { jokulIconDocs } from "./icons";
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
        "card",
        "checkbox",
        "description list",
        "loader",
        "message",
        "radio button",
        "select",
        "skeleton loader",
        "summary table",
        "tag",
        "table",
        "text area",
        "text input",
    ],
    items: [
        buttonDoc,
        cardDoc,
        checkboxDoc,
        descriptionListDoc,
        loaderDoc,
        messageDoc,
        radioButtonDoc,
        selectDoc,
        skeletonLoaderDoc,
        summaryTableDoc,
        tableDoc,
        tagDoc,
        textAreaDoc,
        textInputDoc,
    ],
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

const jokulIconSection = {
    slug: "ikoner",
    kind: "icon",
    title: "Ikoner",
    description: "Lokale oppslag for Jøkul sine statiske ikoner som går igjen i komponenter, statusmeldinger, menyer og navigasjonsmønstre.",
    keywords: [
        "ikoner",
        "icon",
        "material symbols",
        "statusikoner",
        "navigasjonsikoner",
    ],
    items: jokulIconDocs,
} satisfies DesignSystemLocalSectionDocs<"icon">;

export const jokulLocalSections: DesignSystemLocalSectionDocs[] = [
    jokulComponentSection,
    jokulIconSection,
    jokulTokenSection,
];
