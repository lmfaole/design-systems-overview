import type { PatternImplementation, PatternPost } from "@/data/mønster/patterns";
import { escapeHtml } from "@/lib/html";
import { slugify } from "@/lib/format";

export interface SerializedPatternImplementation {
    designSystem: string;
    title: string;
    descriptionHtml: string;
    liveExamplesHtml: string[];
    components: PatternImplementation["components"];
}

export interface SerializedPatternPost {
    title: string;
    description: string;
    doAndDonts: PatternPost["doAndDonts"];
    accessibilityConcerns: PatternPost["accessibilityConcerns"];
    implementation: SerializedPatternImplementation[];
    furtherReading: Array<{
        title: string;
        href: string;
        descriptionHtml?: string;
    }>;
}

function namespaceHtmlIds(html: string, prefix: string): string {
    const ids = Array.from(html.matchAll(/\sid="([^"]+)"/g), (match) => match[1]);

    if (ids.length === 0) {
        return html;
    }

    const idMap = new Map(ids.map((id) => [id, `${prefix}-${id}`]));

    const replaceTokenListAttribute = (source: string, attribute: string) =>
        source.replace(
            new RegExp(`${attribute}="([^"]+)"`, "g"),
            (_, value: string) => {
                const namespacedValue = value
                    .split(/\s+/u)
                    .map((token) => idMap.get(token) ?? token)
                    .join(" ");

                return `${attribute}="${namespacedValue}"`;
            },
        );

    let result = html;

    for (const [id, namespacedId] of idMap) {
        result = result.replaceAll(`id="${id}"`, `id="${namespacedId}"`);
    }

    result = replaceTokenListAttribute(result, "for");
    result = replaceTokenListAttribute(result, "aria-labelledby");
    result = replaceTokenListAttribute(result, "aria-describedby");
    result = replaceTokenListAttribute(result, "aria-controls");
    result = replaceTokenListAttribute(result, "aria-owns");
    result = replaceTokenListAttribute(result, "data-code-tab-target");

    return result.replace(/href="#([^"]+)"/g, (_, value: string) => `href="#${idMap.get(value) ?? value}"`);
}

export function serializePatternPost(post: PatternPost): SerializedPatternPost {
    return {
        title: post.title,
        description: post.description,
        doAndDonts: post.doAndDonts,
        accessibilityConcerns: post.accessibilityConcerns,
        implementation: post.implementation.map((implementation) => ({
            designSystem: implementation.designSystem,
            title: implementation.title,
            descriptionHtml: implementation.descriptionHtml,
            liveExamplesHtml: implementation.liveExamples.map((example, exampleIndex) =>
                namespaceHtmlIds(
                    example,
                    `mønster-example-${slugify(post.title)}-${slugify(implementation.title)}-${exampleIndex}`,
                ),
            ),
            components: implementation.components,
        })),
        furtherReading: post.furtherReading.map((item) => ({
            title: item.title,
            href: item.href,
            descriptionHtml: item.description ? escapeHtml(item.description) : undefined,
        })),
    };
}
