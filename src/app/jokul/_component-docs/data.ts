import { componentDocs } from "./docs";
import type { ComponentDoc, ComponentRelationship, PropDef, PropStatus, PropSource, Migration } from "./docs/types";

export type { ComponentDoc, ComponentRelationship, PropDef, PropStatus, PropSource, Migration };
export { componentDocs };

/**
 * Central lookup map so all relationship resolving uses a single source of truth.
 * This also lets us validate IDs and catch typos early in development.
 */
const componentDocById = new Map<ComponentDoc["id"], ComponentDoc>();
for (const doc of componentDocs) {
    const existing = componentDocById.get(doc.id);
    if (existing) {
        throw new Error(
            `Duplicate ComponentDoc id "${doc.id}". ` +
            `Docs "${existing.name}" (${existing.package}) and "${doc.name}" (${doc.package}) share the same id.`,
        );
    }
    componentDocById.set(doc.id, doc);
}

function countWords(text: string): number {
    return (text.match(/[\p{L}\p{N}][\p{L}\p{N}'’\-]*/gu) || []).length;
}

function startsWithCapitalLetter(text: string): boolean {
    const trimmed = text.trimStart();
    if (!trimmed) return false;
    const first = [...trimmed][0];
    const upper = first.toLocaleUpperCase("nb-NO");
    const lower = first.toLocaleLowerCase("nb-NO");
    const hasCase = upper !== lower;
    return !hasCase || first === upper;
}

if (process.env.NODE_ENV !== "production") {
    validateRelationshipIds(componentDocs);
}

export interface ResolvedRelationship {
    doc: ComponentDoc;
    description: string;
}

export function getComponentDoc(id: string): ComponentDoc | undefined {
    return componentDocById.get(id as ComponentDoc["id"]);
}

function resolveRelationships(entries: ComponentRelationship[] = []): ResolvedRelationship[] {
    return entries.flatMap((entry) => {
        const doc = getComponentDoc(entry.id);
        return doc ? [{ doc, description: entry.description }] : [];
    });
}

export function getRelationships(id: string): {
    requires: ResolvedRelationship[];
    alternatives: ResolvedRelationship[];
    subcomponents: ResolvedRelationship[];
    related: ResolvedRelationship[];
} {
    const doc = getComponentDoc(id);
    return {
        requires: resolveRelationships(doc?.relationships?.requires),
        alternatives: resolveRelationships(doc?.relationships?.alternatives),
        subcomponents: resolveRelationships(doc?.relationships?.subcomponents),
        related: resolveRelationships(doc?.relationships?.related),
    };
}

export function getParentAndSiblings(id: string): {
    parent?: ComponentDoc;
    siblings: ResolvedRelationship[];
    kind?: "subcomponents" | "requires";
} {
    const parent = componentDocs.find((doc) =>
        doc.relationships?.subcomponents?.some((sub) => sub.id === id),
    );

    if (!parent) {
        const doc = getComponentDoc(id);
        const requiredParentId = doc?.relationships?.requires?.[0]?.id;
        const requiredParent = requiredParentId ? getComponentDoc(requiredParentId) : undefined;

        if (!requiredParent) {
            return {siblings: []};
        }

        const siblings = componentDocs
            .filter((d) => d.id !== id)
            .filter((d) => d.relationships?.requires?.some((req) => req.id === requiredParent.id))
            .map((d) => ({doc: d, description: d.description.short}));

        return {parent: requiredParent, siblings, kind: "requires"};
    }

    const siblings = resolveRelationships(
        parent.relationships?.subcomponents?.filter((sub) => sub.id !== id),
    );

    return {parent, siblings, kind: "subcomponents"};
}

/** @deprecated use getRelationships(id).related */
export function getRelatedDocs(id: string): ComponentDoc[] {
    return getRelationships(id).related.map(({ doc }) => doc);
}

function validateRelationshipIds(docs: ComponentDoc[]) {
    const missing: Array<{
        from: ComponentDoc["id"];
        kind: keyof NonNullable<ComponentDoc["relationships"]>;
        to: string;
    }> = [];

    const kinds: Array<keyof NonNullable<ComponentDoc["relationships"]>> = [
        "requires",
        "alternatives",
        "subcomponents",
        "related",
    ];

    for (const doc of docs) {
        for (const kind of kinds) {
            const rels = doc.relationships?.[kind] ?? [];
            for (const rel of rels) {
                if (!componentDocById.has(rel.id)) {
                    missing.push({ from: doc.id, kind, to: rel.id });
                }
            }
        }
    }

    // A subcomponent is used as the breadcrumb "parent". Multiple parents makes the UI ambiguous.
    const subcomponentParents = new Map<ComponentDoc["id"], ComponentDoc["id"][]>();
    for (const doc of docs) {
        const subs = doc.relationships?.subcomponents ?? [];
        for (const sub of subs) {
            const parents = subcomponentParents.get(sub.id) ?? [];
            parents.push(doc.id);
            subcomponentParents.set(sub.id, parents);
        }
    }
    const multiParent = Array.from(subcomponentParents.entries())
        .filter(([, parents]) => parents.length > 1)
        .map(([child, parents]) => ({ child, parents }));

    if (missing.length === 0 && multiParent.length === 0) return;

    const missingLines = missing
        .slice(0, 30)
        .map((m) => `- ${m.from} -> relationships.${m.kind}: "${m.to}" not found in componentDocs`)
        .join("\n");

    const parentLines = multiParent
        .slice(0, 30)
        .map((m) => `- "${m.child}" listed as subcomponent by: ${m.parents.join(", ")}`)
        .join("\n");

    const parts = [
        missing.length > 0 ? `Invalid relationship ids:\n${missingLines}` : null,
        multiParent.length > 0 ? `Ambiguous subcomponent parents:\n${parentLines}` : null,
    ].filter(Boolean).join("\n\n");

    throw new Error(parts);
}
