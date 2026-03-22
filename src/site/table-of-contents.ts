export interface TableOfContentsHeading {
    id: string;
    text: string;
    level: number;
}

export interface TableOfContentsItem extends TableOfContentsHeading {
    children: TableOfContentsItem[];
}

export function normalizeHeadingText(text: string): string {
    return text.replace(/\s+/g, " ").trim();
}

export function slugifyHeading(text: string): string {
    const normalized = normalizeHeadingText(text)
        .toLocaleLowerCase("nb")
        .replace(/['’"]/g, "")
        .replace(/[^\p{Letter}\p{Number}\s-]/gu, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

    return normalized || "overskrift";
}

export function createUniqueHeadingId(baseText: string, usedIds: Set<string>): string {
    const baseId = slugifyHeading(baseText);
    let nextId = baseId;
    let suffix = 2;

    while (usedIds.has(nextId)) {
        nextId = `${baseId}-${suffix}`;
        suffix += 1;
    }

    usedIds.add(nextId);
    return nextId;
}

export function buildTableOfContentsTree(
    headings: TableOfContentsHeading[],
): TableOfContentsItem[] {
    const root: TableOfContentsItem[] = [];
    const stack: TableOfContentsItem[] = [];

    for (const heading of headings) {
        const item: TableOfContentsItem = {
            ...heading,
            children: [],
        };

        while (stack.length > 0 && stack[stack.length - 1].level >= item.level) {
            stack.pop();
        }

        const parent = stack[stack.length - 1];

        if (parent) {
            parent.children.push(item);
        } else {
            root.push(item);
        }

        stack.push(item);
    }

    return root;
}
