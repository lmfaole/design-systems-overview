import type { PropSource, PropStatus } from "./data";
import { componentDocs } from "./data";

export type PropEntry = {
    propName: string;
    source: PropSource;
    status: PropStatus;
    usedBy: { id: string; name: string; status: PropStatus }[];
};

const STATUS_RANK: Record<PropStatus, number> = { deprecated: 2, experimental: 1, stable: 0 };

export const ALL_PROP_ENTRIES: PropEntry[] = (() => {
    const map = new Map<string, { source: PropSource; usedBy: { id: string; name: string; status: PropStatus }[] }>();
    for (const doc of componentDocs) {
        for (const prop of doc.props) {
            const existing = map.get(prop.name) ?? { source: prop.source, usedBy: [] };
            if (!existing.usedBy.find((e) => e.id === doc.id)) {
                existing.usedBy.push({ id: doc.id, name: doc.name, status: prop.status });
            }
            if (prop.source === "custom") existing.source = "custom";
            else if (prop.source === "native" && existing.source == null) existing.source = "native";
            map.set(prop.name, existing);
        }
    }
    return Array.from(map.entries())
        .map(([propName, { source, usedBy }]) => {
            const status = usedBy.reduce<PropStatus>(
                (worst, c) => STATUS_RANK[c.status] > STATUS_RANK[worst] ? c.status : worst,
                "stable"
            );
            return { propName, source, status, usedBy };
        })
        .sort((a, b) => a.propName.localeCompare(b.propName, "nb"));
})();
