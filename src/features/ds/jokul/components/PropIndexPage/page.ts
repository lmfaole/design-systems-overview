export type PropSort = "name-asc" | "name-desc" | "source-asc" | "used-by-desc";
export type PropSource = "custom" | "native" | "aria" | "react";

export interface PropIndexItem {
    propName: string;
    source: PropSource;
    usedByCount: number;
    search: string;
}

export const SOURCE_LABEL: Record<PropSource, string> = {
    custom: "Egendefinert",
    native: "Native HTML",
    aria: "ARIA",
    react: "React",
};

export function normalizePropSort(value?: string | null): PropSort {
    if (value === "name-desc" || value === "source-asc" || value === "used-by-desc") {
        return value;
    }

    return "name-asc";
}

export function filterPropItems(items: PropIndexItem[], query: string): PropIndexItem[] {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return items;
    }

    return items.filter((item) => item.search.includes(normalizedQuery));
}

export function sortPropItems(items: PropIndexItem[], sort: PropSort): PropIndexItem[] {
    return [...items].sort((left, right) => {
        switch (sort) {
            case "name-desc":
                return right.propName.localeCompare(left.propName, "nb");
            case "source-asc":
                return SOURCE_LABEL[left.source].localeCompare(SOURCE_LABEL[right.source], "nb") ||
                    left.propName.localeCompare(right.propName, "nb");
            case "used-by-desc":
                return right.usedByCount - left.usedByCount ||
                    left.propName.localeCompare(right.propName, "nb");
            case "name-asc":
            default:
                return left.propName.localeCompare(right.propName, "nb");
        }
    });
}

export function formatPropCount(count: number): string {
    return `${count} prop${count === 1 ? "" : "s"}`;
}

export function initPropIndexPage(root: ParentNode = document): void {
    if (typeof window === "undefined") return;

    const form = root.querySelector<HTMLElement>("[data-prop-index-form]");
    const tbody = root.querySelector<HTMLElement>("[data-prop-index-body]");
    const count = root.querySelector<HTMLElement>("[data-prop-index-count]");
    const empty = root.querySelector<HTMLElement>("[data-prop-index-empty]");

    if (!form || !tbody || !count || !empty) {
        return;
    }

    const queryInput = form.querySelector<HTMLInputElement>("[data-prop-index-query]");
    const sortSelect = form.querySelector<HTMLSelectElement>("[data-prop-index-sort]");

    if (!queryInput || !sortSelect) {
        return;
    }

    const items = Array.from(tbody.querySelectorAll<HTMLElement>("[data-prop-entry]"))
        .map((element) => {
            const propName = element.dataset.propName;
            const source = element.dataset.propSource;
            const usedByCount = Number(element.dataset.propUsedByCount);
            const search = element.dataset.propSearch;

            if (!propName || !source || !search || Number.isNaN(usedByCount)) {
                return null;
            }

            return {
                element,
                item: {
                    propName,
                    source: source as PropSource,
                    usedByCount,
                    search,
                } satisfies PropIndexItem,
            };
        })
        .filter((entry): entry is { element: HTMLElement; item: PropIndexItem } => Boolean(entry));

    const apply = () => {
        const visibleNames = new Set(sortPropItems(
            filterPropItems(items.map(({ item }) => item), queryInput.value),
            normalizePropSort(sortSelect.value),
        ).map((item) => item.propName));
        const sortedItems = sortPropItems(items.map(({ item }) => item), normalizePropSort(sortSelect.value));

        for (const sortedItem of sortedItems) {
            const match = items.find(({ item }) => item.propName === sortedItem.propName);

            if (!match) continue;

            const isVisible = visibleNames.has(sortedItem.propName);
            match.element.hidden = !isVisible;
            tbody.append(match.element);
        }

        const visibleCount = visibleNames.size;
        count.textContent = formatPropCount(visibleCount);
        empty.hidden = visibleCount !== 0;

        const searchParams = new URLSearchParams();
        const query = queryInput.value.trim();
        const sort = normalizePropSort(sortSelect.value);

        if (query) searchParams.set("q", query);
        if (sort !== "name-asc") searchParams.set("sort", sort);

        const search = searchParams.toString();
        const nextUrl = `${window.location.pathname}${search ? `?${search}` : ""}`;

        window.history.replaceState({}, "", nextUrl);
    };

    const syncFromLocation = () => {
        const params = new URLSearchParams(window.location.search);
        queryInput.value = params.get("q")?.trim() ?? "";
        sortSelect.value = normalizePropSort(params.get("sort"));
        apply();
    };

    queryInput.addEventListener("input", apply);
    sortSelect.addEventListener("change", apply);

    syncFromLocation();
    window.addEventListener("pageshow", syncFromLocation);
}
