import {readdirSync, readFileSync} from "node:fs";
import path from "node:path";
import {compileString} from "sass";
import {describe, expect, it} from "vitest";
import {getComponentDoc} from "@/features/ds/jokul/_component-docs/data";
import { renderTokenIllustrationHtml } from "@/features/ds/jokul/_shared/components/TokenIllustration/shared";
import {borderRadiusTokens, borderWidthTokens} from "@/features/ds/jokul/_token/posts/border-radius/tokens";
import {breakpointMixins} from "@/features/ds/jokul/_token/posts/breakpoints/mixins";
import {breakpointTokens, exportedBreakpointTokens} from "@/features/ds/jokul/_token/posts/breakpoints/tokens";
import {colorMixins} from "@/features/ds/jokul/_token/posts/colors/mixins";
import {
    backgroundTokens,
    borderTokens,
    exportedAlertBackgroundTokens,
    exportedBackgroundTokens,
    exportedBorderTokens,
    exportedFunctionalColorTokens,
    exportedPrimitiveColorTokens,
    exportedTextTokens,
    feedbackSurfaceTokens,
    primitiveColorTokens,
    textTokens,
} from "@/features/ds/jokul/_token/posts/colors/tokens";
import {motionMixins} from "@/features/ds/jokul/_token/posts/motion/mixins";
import {easingTokens, timingTokens} from "@/features/ds/jokul/_token/posts/motion/tokens";
import {spacingMixins} from "@/features/ds/jokul/_token/posts/spacing/mixins";
import {
    exportedSemanticSpacingTokens,
    exportedSpacingScaleTokens,
    spacingTokens,
    unitTokens,
} from "@/features/ds/jokul/_token/posts/spacing/tokens";
import {shadowTokens} from "@/features/ds/jokul/_token/posts/shadows/tokens";
import {getTokenPost, getTokenPostById, getTokenSlug, tokenPosts} from "./data";
import {typographyMixins} from "@/features/ds/jokul/_token/posts/typography/mixins";
import {
    exportedFontSizeTokens,
    exportedFontWeightTokens,
    exportedIconWeightTokens,
    exportedLineHeightStepTokens,
    exportedSemanticLineHeightTokens,
    exportedTypographyStyleTokens,
    fontSizeReference,
    fontWeightReference,
    lineHeightReference,
} from "@/features/ds/jokul/_token/posts/typography/tokens";
import {publicTokenExportPaths} from "@/features/ds/jokul/_token/posts/_shared/public-tokens";

function collectFiles(dir: string, predicate: (file: string) => boolean, files: string[] = []): string[] {
    for (const entry of readdirSync(dir, {withFileTypes: true})) {
        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
            collectFiles(fullPath, predicate, files);
            continue;
        }

        if (predicate(fullPath)) {
            files.push(fullPath);
        }
    }

    return files;
}

const jokulStylesRoot = path.resolve(process.cwd(), "node_modules/@fremtind/jokul/styles");
const jokulStylesSource = collectFiles(
    jokulStylesRoot,
    (file) => file.endsWith(".scss") || file.endsWith(".css"),
).map((file) => readFileSync(file, "utf8")).join("\n");
const jokulCoreScssSource = collectFiles(
    path.join(jokulStylesRoot, "core", "jkl"),
    (file) => file.endsWith(".scss"),
).map((file) => readFileSync(file, "utf8")).join("\n");
const jokulShadowScssSource = readFileSync(
    path.join(jokulStylesRoot, "core", "jkl", "_shadows.scss"),
    "utf8",
);
const jokulThemeSpacingScssSource = readFileSync(
    path.join(jokulStylesRoot, "core", "theme", "_spacing.scss"),
    "utf8",
);
const validJokulCssCustomProperties = new Set(
    Array.from(jokulStylesSource.matchAll(/--jkl-[a-z0-9-]+/gi), (match) => match[0]),
);
const validJokulSemanticSpacingCustomProperties = Array.from(
    new Set(Array.from(jokulThemeSpacingScssSource.matchAll(/(--jkl-spacing-[a-z0-9-]+)(?=:)/gi), (match) => match[1])),
).filter((token) => /[a-z]/i.test(token.replace("--jkl-spacing-", ""))).sort((a, b) => a.localeCompare(b, "nb"));
const validJokulUnitCustomProperties = Array.from(
    new Set(Array.from(jokulThemeSpacingScssSource.matchAll(/(--jkl-unit-[a-z0-9-]+)(?=:)/gi), (match) => match[1])),
).sort((a, b) => a.localeCompare(b, "nb"));

const documentedCssCustomProperties = [
    ...primitiveColorTokens.map(({token}) => token),
    ...backgroundTokens.map(({token}) => token),
    ...textTokens.map(({token}) => token),
    ...borderTokens.map(({token}) => token),
    ...feedbackSurfaceTokens.map(({token}) => token),
    ...fontSizeReference.map(({token}) => token),
    ...lineHeightReference.map(({token}) => token),
    ...fontWeightReference.map(({token}) => token),
    ...spacingTokens.map(({token}) => token),
    ...unitTokens.map(({token}) => token),
    ...timingTokens.map(({token}) => token),
    ...easingTokens.map(({token}) => token),
    ...borderRadiusTokens.map(({token}) => token),
];

const documentedScssVariables = [
    ...breakpointTokens.map(({variable}) => variable),
    ...shadowTokens.map(({variable}) => variable),
];

const documentedMixins = [
    ...colorMixins,
    ...typographyMixins,
    ...breakpointMixins,
    ...spacingMixins,
    ...motionMixins,
];

const documentedPublicTokenExportPaths = Array.from(new Set([
    ...exportedPrimitiveColorTokens.flatMap(({exportPaths}) => exportPaths),
    ...exportedFunctionalColorTokens.flatMap(({exportPaths}) => exportPaths),
    ...exportedBackgroundTokens.flatMap(({exportPaths}) => exportPaths),
    ...exportedAlertBackgroundTokens.flatMap(({exportPaths}) => exportPaths),
    ...exportedTextTokens.flatMap(({exportPaths}) => exportPaths),
    ...exportedBorderTokens.flatMap(({exportPaths}) => exportPaths),
    ...timingTokens.flatMap(({exportPaths}) => exportPaths),
    ...easingTokens.flatMap(({exportPaths}) => exportPaths),
    ...exportedSpacingScaleTokens.flatMap(({exportPaths}) => exportPaths),
    ...exportedSemanticSpacingTokens.flatMap(({exportPaths}) => exportPaths),
    ...borderRadiusTokens.flatMap(({exportPaths}) => exportPaths),
    ...borderWidthTokens.flatMap(({exportPaths}) => exportPaths),
    ...exportedBreakpointTokens.flatMap(({exportPaths}) => exportPaths),
    ...exportedFontSizeTokens.flatMap(({exportPaths}) => exportPaths),
    ...exportedLineHeightStepTokens.flatMap(({exportPaths}) => exportPaths),
    ...exportedSemanticLineHeightTokens.flatMap(({exportPaths}) => exportPaths),
    ...exportedFontWeightTokens.flatMap(({exportPaths}) => exportPaths),
    ...exportedIconWeightTokens.flatMap(({exportPaths}) => exportPaths),
    ...exportedTypographyStyleTokens.flatMap(({exportPaths}) => exportPaths),
])).sort((a, b) => a.localeCompare(b, "nb"));

describe("Jokul token docs integrity", () => {
    it("keeps token pages complete, unique, and routable", () => {
        const issues: string[] = [];
        const seenIds = new Set<number>();
        const seenSlugs = new Set<string>();

        for (const post of tokenPosts) {
            const slug = getTokenSlug(post);

            if (seenIds.has(post.id)) {
                issues.push(`${post.title}: duplicate id ${post.id}`);
            }
            seenIds.add(post.id);

            if (seenSlugs.has(slug)) {
                issues.push(`${post.title}: duplicate slug ${slug}`);
            }
            seenSlugs.add(slug);

            if (!post.title.trim()) issues.push(`${post.id}: missing title`);
            if (!post.excerpt.trim()) issues.push(`${post.id}: missing excerpt`);
            if (!post.illustration) issues.push(`${post.id}: missing illustration`);
            if (!getTokenPost(slug)) issues.push(`${post.id}: getTokenPost(${slug}) did not resolve`);
            if (!getTokenPostById(post.id)) issues.push(`${post.id}: getTokenPostById(${post.id}) did not resolve`);

            const hasTokens = Boolean(post.tokenOverview && post.tokenOverview.length > 0);
            const hasMixins = Boolean(post.scssSection && post.scssSection.length > 0);

            if (!hasTokens && !hasMixins) {
                issues.push(`${post.id}: missing both tokenOverview and scssSection`);
            }

            for (const table of post.tokenOverview ?? []) {
                if (!table.caption.trim()) issues.push(`${post.id}: table missing caption`);
                if (table.columns.length === 0) issues.push(`${post.id}: ${table.caption} has no columns`);
                if (table.rows.length === 0) issues.push(`${post.id}: ${table.caption} has no rows`);

                for (const [rowIndex, row] of table.rows.entries()) {
                    if (row.length !== table.columns.length) {
                        issues.push(
                            `${post.id}: ${table.caption} row ${rowIndex + 1} has ${row.length} cells for ${table.columns.length} columns`,
                        );
                    }
                }
            }

            for (const mixin of post.scssSection ?? []) {
                if (!mixin.name.trim()) issues.push(`${post.id}: mixin missing name`);
                if (!mixin.description.trim()) issues.push(`${post.id}: ${mixin.name} missing description`);
                if (!mixin.example.trim()) issues.push(`${post.id}: ${mixin.name} missing example`);
                if (!mixin.example.includes('@fremtind/jokul/styles/core/jkl')) {
                    issues.push(`${post.id}: ${mixin.name} example does not import Jøkul`);
                }
                if (!mixin.example.includes(`jkl.${mixin.name}`)) {
                    issues.push(`${post.id}: ${mixin.name} example does not demonstrate the documented mixin`);
                }
            }

            for (const relatedComponentId of post.relatedComponents ?? []) {
                if (!getComponentDoc(relatedComponentId)) {
                    issues.push(`${post.id}: related component "${relatedComponentId}" does not exist`);
                }
            }

            for (const resource of post.resources ?? []) {
                if (!resource.title.trim()) issues.push(`${post.id}: resource missing title`);
                if (!resource.url.startsWith("https://")) {
                    issues.push(`${post.id}: resource "${resource.title}" must use https`);
                }
            }
        }

        expect(issues).toEqual([]);
    });

    it("uses the shared single-specimen illustration system for token page headers", () => {
        const issues: string[] = [];

        for (const post of tokenPosts) {
            if (!post.illustration) {
                issues.push(`${post.id}: missing illustration slug`);
                continue;
            }

            const slug = getTokenSlug(post);
            const illustrationMarkup = renderTokenIllustrationHtml(post.illustration);
            const specimenMatches = illustrationMarkup.match(/data-token-specimen="[^"]+"/g) ?? [];

            if (!illustrationMarkup.includes('data-token-illustration-bleed="true"')) {
                issues.push(`${post.id}: illustration does not enable bleed`);
            }

            if (!illustrationMarkup.includes(`data-token-illustration="${slug}"`)) {
                issues.push(`${post.id}: illustration marker does not match slug "${slug}"`);
            }

            if (specimenMatches.length !== 1) {
                issues.push(`${post.id}: expected exactly one token specimen, got ${specimenMatches.length}`);
            }

            if (!illustrationMarkup.includes(`data-token-specimen="${slug}"`)) {
                issues.push(`${post.id}: illustration specimen does not match slug "${slug}"`);
            }
        }

        expect(issues).toEqual([]);
    });

    it("keeps every token table populated with a rendered example of the token value", () => {
        const issues: string[] = [];

        for (const post of tokenPosts) {
            for (const table of post.tokenOverview ?? []) {
                if (!Number.isInteger(table.exampleColumnIndex)) {
                    issues.push(`${post.id}: ${table.caption} missing exampleColumnIndex`);
                    continue;
                }

                if (table.exampleColumnIndex < 0 || table.exampleColumnIndex >= table.columns.length) {
                    issues.push(
                        `${post.id}: ${table.caption} exampleColumnIndex ${table.exampleColumnIndex} is outside the table columns`,
                    );
                    continue;
                }

                for (const [rowIndex, row] of table.rows.entries()) {
                    if (row.length !== table.columns.length) {
                        continue;
                    }

                    const exampleMarkup = row[table.exampleColumnIndex]?.trim() ?? "";

                    if (!exampleMarkup) {
                        issues.push(
                            `${post.id}: ${table.caption} row ${rowIndex + 1} has an empty example cell`,
                        );
                    }

                    if (!exampleMarkup.includes("data-token-table-example=")) {
                        issues.push(
                            `${post.id}: ${table.caption} row ${rowIndex + 1} example cell is missing a rendered token example`,
                        );
                    }
                }
            }
        }

        expect(issues).toEqual([]);
    });

    it("documents only CSS custom properties that exist in the installed Jøkul styles", () => {
        const missingTokens = Array.from(new Set(documentedCssCustomProperties))
            .filter((token) => !jokulStylesSource.includes(token));

        expect(missingTokens).toEqual([]);
    });

    it("documents only SCSS variables and mixins that exist in the installed Jøkul styles", () => {
        const missingVariables = documentedScssVariables
            .filter((variable) => !jokulCoreScssSource.includes(`${variable}:`))
            .map((variable) => `variable:${variable}`);
        const missingMixins = documentedMixins
            .map(({name}) => name)
            .filter((name) => !jokulCoreScssSource.includes(`@mixin ${name}`))
            .map((name) => `mixin:${name}`);

        expect([...missingVariables, ...missingMixins]).toEqual([]);
    });

    it("documents every exported shadow variable from core/jkl/_shadows.scss", () => {
        const exportedShadowVariables = Array.from(
            new Set(Array.from(jokulShadowScssSource.matchAll(/\$[a-z0-9-]+(?=:)/gi), (match) => match[0])),
        ).sort((a, b) => a.localeCompare(b, "nb"));
        const documentedShadowVariables = Array.from(
            new Set(shadowTokens.map(({variable}) => variable)),
        ).sort((a, b) => a.localeCompare(b, "nb"));

        expect(documentedShadowVariables).toEqual(exportedShadowVariables);
    });

    it("documents every public token export from @fremtind/jokul/core", () => {
        expect(documentedPublicTokenExportPaths).toEqual(publicTokenExportPaths);
    });

    it("documents the complete spacing token set from the installed Jøkul theme", () => {
        const spacingPost = getTokenPost("spacing");

        expect(spacingPost).toBeDefined();
        expect(spacingPost?.tokenOverview).toHaveLength(4);
        expect(spacingPost?.tokenOverview?.[0]?.rows).toHaveLength(exportedSpacingScaleTokens.length);
        expect(spacingPost?.tokenOverview?.[1]?.rows).toHaveLength(exportedSemanticSpacingTokens.length);
        expect(spacingPost?.tokenOverview?.[2]?.rows).toHaveLength(validJokulSemanticSpacingCustomProperties.length);
        expect(spacingPost?.tokenOverview?.[3]?.rows).toHaveLength(validJokulUnitCustomProperties.length);

        const documentedSemanticSpacingCustomProperties = Array.from(
            new Set(spacingTokens.map(({token}) => token)),
        ).sort((a, b) => a.localeCompare(b, "nb"));
        const documentedUnitCustomProperties = Array.from(
            new Set(unitTokens.map(({token}) => token)),
        ).sort((a, b) => a.localeCompare(b, "nb"));

        expect(documentedSemanticSpacingCustomProperties).toEqual(validJokulSemanticSpacingCustomProperties);
        expect(documentedUnitCustomProperties).toEqual(validJokulUnitCustomProperties);
    });

    it("keeps a bespoke illustration assigned to every token page", () => {
        const issues: string[] = [];
        const postsByIllustration = new Map<string, string[]>();

        for (const post of tokenPosts) {
            if (!post.illustration) {
                issues.push(`${post.title}: illustration is missing`);
                continue;
            }

            const posts = postsByIllustration.get(post.illustration) ?? [];
            posts.push(post.title);
            postsByIllustration.set(post.illustration, posts);
        }

        for (const [illustrationName, posts] of postsByIllustration.entries()) {
            if (posts.length > 1) {
                issues.push(`${illustrationName}: reused by ${posts.join(", ")}`);
            }
        }

        expect(issues).toEqual([]);
    });

    it("keeps every token-page illustration constrained to valid Jøkul tokens", () => {
        const invalidIllustrationTokens: string[] = [];

        for (const post of tokenPosts) {
            if (!post.illustration) {
                continue;
            }

            const markup = renderTokenIllustrationHtml(post.illustration);
            const referencedTokens = Array.from(
                new Set(Array.from(markup.matchAll(/var\((--jkl-[a-z0-9-]+)\)/gi), (match) => match[1])),
            );

            for (const token of referencedTokens) {
                if (!validJokulCssCustomProperties.has(token)) {
                    invalidIllustrationTokens.push(`${post.title}: ${token}`);
                }
            }
        }

        expect(invalidIllustrationTokens).toEqual([]);
    });

    it("keeps every documented Jøkul mixin example compilable", () => {
        const failedExamples: string[] = [];

        for (const mixin of documentedMixins) {
            try {
                compileString(mixin.example, {
                    loadPaths: [path.resolve(process.cwd(), "node_modules")],
                });
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                failedExamples.push(`${mixin.name}: ${message}`);
            }
        }

        expect(failedExamples).toEqual([]);
    });
});
