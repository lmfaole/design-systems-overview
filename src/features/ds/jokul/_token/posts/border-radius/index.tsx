import {BorderRadiusIllustration} from "@/features/ds/jokul/_shared/components/Illustration";
import {borderRadiusTokens, borderWidthTokens, formatPublicBorderTokenPath} from "./tokens";
import {createLengthBarExample, createTableExampleFrame} from "../_shared/table-examples";
import type {TokenPost} from "../types";

const post: TokenPost = {
    id: 20,
    title: "Kantradiuser",
    excerpt: "Seks trinn fra ingen avrunding til full pille-form — konsekvent form på tvers av alle Jøkul-komponenter.",
    tokenOverview: [
        {
            description:
                "Kantradiuser definerer graden av avrunding på hjørnene til komponenter. Skalaen går fra skarpe kanter til fullstendig rundede former, og hvert trinn har et definert bruksområde.",
            caption: "Alle eksporterte border-radius-tokens",
            exampleColumnIndex: 0,
            columns: ["Forhåndsvisning", "Eksport", "CSS-variabel", "Verdi", "Rem", "Bruksområde"],
            rows: borderRadiusTokens.map(({path, token, value, rem, usage}) => [
                createTableExampleFrame(
                    "border-radius",
                    <span
                        style={{
                            display: "block",
                            inlineSize: "100%",
                            blockSize: "100%",
                            background: "var(--jkl-color-background-action)",
                            borderRadius: `var(${token})`,
                        }}
                    />,
                    {padding: "0.375rem"},
                ),
                <code key={`${path}-public`}>{formatPublicBorderTokenPath(path)}</code>,
                <code key={`${token}-name`}>{token}</code>,
                value,
                rem,
                usage,
            ]),
        },
        {
            heading: "Kantbredder",
            description:
                "Jøkul eksporterer også kantbredder som egne tokens i `@fremtind/jokul/core`.",
            caption: "Eksporterte border-width-tokens",
            exampleColumnIndex: 0,
            columns: ["Eksempel", "Eksport", "Verdi", "Bruksområde"],
            rows: borderWidthTokens.map(({path, value, usage}) => [
                createLengthBarExample("100%", {
                    kind: "border-width",
                    thickness: value,
                    color: "var(--jkl-color-border-action)",
                }),
                <code key={`${path}-public`}>{formatPublicBorderTokenPath(path)}</code>,
                value,
                usage,
            ]),
        },
    ],
    illustration: <BorderRadiusIllustration/>,
    relatedComponents: ["button", "card", "chip", "modal", "popover"],
    resources: [
        {
            title: "MDN: border-radius",
            url: "https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius",
            publisher: "MDN",
            relevance: 4,
            description: "CSS-egenskapen som styrer avrunding i hjørner.",
        },
    ],
};

export default post;
