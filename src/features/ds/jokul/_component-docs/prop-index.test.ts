import {describe, expect, it} from "vitest";
import {componentDocs, getComponentDoc} from "./data";
import {ALL_PROP_ENTRIES} from "./prop-index";

const STATUS_RANK = {
    stable: 0,
    experimental: 1,
    deprecated: 2,
} as const;

describe("Jokul prop index integrity", () => {
    it("indexes every documented prop once with correct source, status, and component references", () => {
        const issues: string[] = [];
        const expectedEntries = new Map<
            string,
            {
                source: string;
                usedBy: Array<{ id: string; name: string; status: "stable" | "experimental" | "deprecated" }>;
            }
        >();

        for (const doc of componentDocs) {
            for (const prop of doc.props) {
                const existing = expectedEntries.get(prop.name) ?? {source: prop.source, usedBy: []};

                if (!existing.usedBy.some((entry) => entry.id === doc.id)) {
                    existing.usedBy.push({id: doc.id, name: doc.name, status: prop.status});
                }

                if (prop.source === "custom") {
                    existing.source = "custom";
                }

                expectedEntries.set(prop.name, existing);
            }
        }

        const sortedPropNames = [...ALL_PROP_ENTRIES].map((entry) => entry.propName);
        const uniquePropNames = new Set(sortedPropNames);

        if (uniquePropNames.size !== ALL_PROP_ENTRIES.length) {
            issues.push("duplicate propName entries in ALL_PROP_ENTRIES");
        }

        const expectedOrder = [...sortedPropNames].sort((a, b) => a.localeCompare(b, "nb"));
        if (expectedOrder.join("\n") !== sortedPropNames.join("\n")) {
            issues.push("ALL_PROP_ENTRIES is not sorted by propName");
        }

        for (const entry of ALL_PROP_ENTRIES) {
            const expected = expectedEntries.get(entry.propName);

            if (!expected) {
                issues.push(`${entry.propName}: appears in prop index but not in component docs`);
                continue;
            }

            if (entry.source !== expected.source) {
                issues.push(`${entry.propName}: expected source ${expected.source}, got ${entry.source}`);
            }

            const expectedStatus = expected.usedBy.reduce<"stable" | "experimental" | "deprecated">(
                (worst, component) =>
                    STATUS_RANK[component.status] > STATUS_RANK[worst] ? component.status : worst,
                "stable",
            );

            if (entry.status !== expectedStatus) {
                issues.push(`${entry.propName}: expected status ${expectedStatus}, got ${entry.status}`);
            }

            const usedByIds = entry.usedBy.map((component) => component.id);
            const expectedIds = expected.usedBy.map((component) => component.id);

            if (usedByIds.length !== expectedIds.length) {
                issues.push(`${entry.propName}: expected ${expectedIds.length} usedBy entries, got ${usedByIds.length}`);
            }

            if (usedByIds.join("\n") !== expectedIds.join("\n")) {
                issues.push(`${entry.propName}: usedBy components are out of sync with component docs`);
            }

            for (const component of entry.usedBy) {
                const target = getComponentDoc(component.id);

                if (!target) {
                    issues.push(`${entry.propName}: usedBy target "${component.id}" does not exist`);
                    continue;
                }

                if (target.name !== component.name) {
                    issues.push(`${entry.propName}: usedBy name for "${component.id}" is out of sync`);
                }

                if (!target.props.some((prop) => prop.name === entry.propName)) {
                    issues.push(`${entry.propName}: "${component.id}" is listed in usedBy but does not define the prop`);
                }
            }
        }

        for (const propName of expectedEntries.keys()) {
            if (!ALL_PROP_ENTRIES.some((entry) => entry.propName === propName)) {
                issues.push(`${propName}: missing from ALL_PROP_ENTRIES`);
            }
        }

        expect(issues).toEqual([]);
    });
});
