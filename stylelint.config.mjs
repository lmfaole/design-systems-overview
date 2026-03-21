const tokenColorValue =
    /^(?:var\(--[^)]+\)|currentColor|transparent|inherit|initial|unset|Canvas|CanvasText|GrayText|light-dark\(.+\)|color-mix\(.+\))$/;
const designTokenValue =
    /^(?:0|auto|inherit|initial|unset|normal|var\(--[^)]+\)|(?:min|max|clamp|calc)\(.+\))(?:\s+(?:0|auto|inherit|initial|unset|normal|var\(--[^)]+\)|(?:min|max|clamp|calc)\(.+\))){0,3}$/;
const designFontFamilyValue =
    /^(?:var\(--[^)]+\)|"Fremtind Grotesk"(?:,\s*.+)?|"Fremtind Grotesk Mono"(?:,\s*.+)?|inherit|initial|unset)$/;

/** @type {import("stylelint").Config} */
export default {
    customSyntax: "postcss-scss",
    ignoreFiles: [
        "dist/**",
        "node_modules/**",
        "public/**",
    ],
    extends: ["stylelint-config-standard-scss"],
    rules: {
        "at-rule-empty-line-before": [
            "always",
            {
                except: ["blockless-after-same-name-blockless", "first-nested"],
                ignore: ["after-comment"],
            },
        ],
        "custom-property-empty-line-before": [
            "always",
            {
                except: ["after-custom-property", "first-nested"],
                ignore: ["after-comment"],
            },
        ],
        "declaration-block-single-line-max-declarations": 1,
        "declaration-empty-line-before": [
            "always",
            {
                except: ["after-declaration", "first-nested"],
                ignore: ["after-comment"],
            },
        ],
        "length-zero-no-unit": true,
        "media-feature-range-notation": null,
        "declaration-property-value-disallowed-list": {
            "text-align": ["left", "right"],
        },
        "no-descending-specificity": true,
        "no-empty-source": null,
        "property-disallowed-list": [
            /^(margin|padding)-(left|right)$/,
            /^border-(top|right|bottom|left)(?:-(color|style|width))?$/,
            /^(top|right|bottom|left)$/,
        ],
        "property-no-vendor-prefix": true,
        "scss/at-mixin-argumentless-call-parentheses": null,
        "scss/double-slash-comment-empty-line-before": null,
        "scss/load-partial-extension": null,
        "selector-class-pattern": [
            "^(?!.*(__|--))[a-z0-9]+(?:-[a-z0-9]+)*$",
            {
                resolveNestedSelectors: true,
            },
        ],
        "selector-not-notation": null,
        "selector-pseudo-class-no-unknown": [true, { ignorePseudoClasses: ["global"] }],
        "value-keyword-case": "lower",
    },
    overrides: [
        {
            files: ["src/features/ds/jokul/_styles/patches/select-beta.scss"],
            rules: {
                "selector-class-pattern": null,
            },
        },
        {
            files: [
                "src/components/ds/FullBleed/**/*.{css,scss}",
                "src/components/ds/Grid/**/*.{css,scss}",
                "src/components/ds/PageHeader/**/*.{css,scss}",
                "src/components/ds/Toolbar/**/*.{css,scss}",
                "src/components/ds/cards/**/*.{css,scss}",
                "src/features/ds/jokul/_shared/components/**/*.{css,scss}",
                "src/features/ds/jokul/components/**/*.{css,scss}",
                "src/features/ds/jokul/_styles/**/*.scss",
            ],
            rules: {
                "declaration-property-value-allowed-list": {
                    "/^(color|background-color|border-color|outline-color|text-decoration-color|fill|stroke|caret-color)$/": [
                        tokenColorValue,
                    ],
                    "/^font-family$/": [designFontFamilyValue],
                    "/^(gap|column-gap|row-gap|margin|margin-block|margin-inline|margin-block-start|margin-block-end|margin-inline-start|margin-inline-end|padding|padding-block|padding-inline|padding-block-start|padding-block-end|padding-inline-start|padding-inline-end|border-radius)$/": [
                        designTokenValue,
                    ],
                },
            },
        },
    ],
};
