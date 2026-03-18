"use client";

import { Link } from "@fremtind/jokul/link";
import type { PropDef } from "@/app/ds/jokul/_component-docs/data";
import { inlineCodeStyle } from "./constants";

export function PropNameCell({
    name,
    status,
    migrationAnchor,
}: Pick<PropDef, "name" | "status"> & { migrationAnchor?: string }) {
    return migrationAnchor && status === "deprecated" ? (
        <Link href={migrationAnchor}>
            <code style={inlineCodeStyle}>{name}</code>
        </Link>
    ) : (
        <code style={inlineCodeStyle}>{name}</code>
    );
}

