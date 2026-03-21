export type ComponentStatus = "stable" | "beta" | "deprecated";
export type ComponentSort = "az" | "za" | "most-props";

export interface ComponentIndexItem {
    id: string;
    name: string;
    search: string;
    category: string;
    status: ComponentStatus;
    propsCount: number;
    showOnOverview: boolean;
}

export interface ComponentIndexFilters {
    query: string;
    category: string | null;
    status: ComponentStatus | null;
    showAll: boolean;
}

export function normalizeComponentSort(value?: string | null): ComponentSort {
    if (value === "za" || value === "most-props") {
        return value;
    }

    return "az";
}

export function normalizeComponentStatus(value?: string | null): ComponentStatus | null {
    if (value === "stable" || value === "beta" || value === "deprecated") {
        return value;
    }

    return null;
}

export function normalizeShowAllComponents(value?: string | null): boolean {
    return value === "1" || value === "true" || value === "all";
}

export function normalizeComponentFilters(
    filters: { query?: string | null; category?: string | null; status?: string | null; all?: string | null },
): ComponentIndexFilters {
    return {
        query: filters.query?.trim().toLowerCase() ?? "",
        category: filters.category?.trim() || null,
        status: normalizeComponentStatus(filters.status),
        showAll: normalizeShowAllComponents(filters.all),
    };
}

export function filterComponentItems(items: ComponentIndexItem[], filters: ComponentIndexFilters): ComponentIndexItem[] {
    return items.filter((item) => {
        const matchesQuery = !filters.query || item.search.includes(filters.query);
        const matchesCategory = !filters.category || item.category === filters.category;
        const matchesStatus = !filters.status || item.status === filters.status;
        const matchesOverview = filters.showAll || item.showOnOverview;

        return matchesQuery && matchesCategory && matchesStatus && matchesOverview;
    });
}

export function sortComponentItems(items: ComponentIndexItem[], sort: ComponentSort): ComponentIndexItem[] {
    return [...items].sort((left, right) => {
        if (sort === "most-props") {
            return right.propsCount - left.propsCount || left.name.localeCompare(right.name, "nb");
        }

        if (sort === "za") {
            return right.name.localeCompare(left.name, "nb");
        }

        return left.name.localeCompare(right.name, "nb");
    });
}

export function formatComponentCount(count: number): string {
    return `${count} komponent${count === 1 ? "" : "er"}`;
}

export function initComponentIndexPage(root: ParentNode = document): void {
    if (typeof window === "undefined") return;

    const form = root.querySelector<HTMLFormElement>("[data-component-index-form]");
    const results = root.querySelector<HTMLElement>("[data-component-index-results]");
    const count = root.querySelector<HTMLElement>("[data-component-index-count]");
    const empty = root.querySelector<HTMLElement>("[data-component-index-empty]");

    if (!form || !results || !count || !empty) {
        return;
    }

    const queryInput = form.querySelector<HTMLInputElement>("[data-component-index-query]");
    const categorySelect = form.querySelector<HTMLSelectElement>("[data-component-index-category]");
    const statusSelect = form.querySelector<HTMLSelectElement>("[data-component-index-status]");
    const sortSelect = form.querySelector<HTMLSelectElement>("[data-component-index-sort]");
    const showAllInput = form.querySelector<HTMLInputElement>("[data-component-index-show-all]");

    if (!queryInput || !categorySelect || !statusSelect || !sortSelect || !showAllInput) {
        return;
    }

    const items = Array.from(results.querySelectorAll<HTMLElement>("[data-component-card]"))
        .map((element) => {
            const id = element.dataset.componentId;
            const name = element.dataset.componentName;
            const search = element.dataset.componentSearch;
            const category = element.dataset.componentCategory;
            const status = element.dataset.componentStatus;
            const propsCount = Number(element.dataset.componentPropsCount);
            const showOnOverview = element.dataset.componentShowOnOverview;

            if (!id || !name || !search || !category || !status || !showOnOverview || Number.isNaN(propsCount)) {
                return null;
            }

            return {
                element,
                item: {
                    id,
                    name,
                    search,
                    category,
                    status: normalizeComponentStatus(status) ?? "stable",
                    propsCount,
                    showOnOverview: showOnOverview !== "false",
                } satisfies ComponentIndexItem,
            };
        })
        .filter((entry): entry is { element: HTMLElement; item: ComponentIndexItem } => Boolean(entry));

    const apply = () => {
        const filters = normalizeComponentFilters({
            query: queryInput.value,
            category: categorySelect.value,
            status: statusSelect.value,
            all: showAllInput.checked ? showAllInput.value : null,
        });
        const sort = normalizeComponentSort(sortSelect.value);
        const visibleIds = new Set(sortComponentItems(filterComponentItems(
            items.map(({ item }) => item),
            filters,
        ), sort).map((item) => item.id));
        const sortedEntries = sortComponentItems(items.map(({ item }) => item), sort);

        for (const sortedItem of sortedEntries) {
            const match = items.find(({ item }) => item.id === sortedItem.id);

            if (!match) continue;

            const isVisible = visibleIds.has(sortedItem.id);
            match.element.hidden = !isVisible;
            results.append(match.element);
        }

        const visibleCount = visibleIds.size;
        count.textContent = formatComponentCount(visibleCount);
        empty.hidden = visibleCount !== 0;

        const searchParams = new URLSearchParams();
        if (filters.query) searchParams.set("q", filters.query);
        if (filters.category) searchParams.set("category", filters.category);
        if (filters.status) searchParams.set("status", filters.status);
        if (filters.showAll) searchParams.set("all", "1");
        if (sort !== "az") searchParams.set("sort", sort);
        const search = searchParams.toString();
        const nextUrl = `${window.location.pathname}${search ? `?${search}` : ""}`;

        window.history.replaceState({}, "", nextUrl);
    };

    const syncFromLocation = () => {
        const params = new URLSearchParams(window.location.search);
        queryInput.value = params.get("q")?.trim() ?? "";
        categorySelect.value = params.get("category") ?? "";
        statusSelect.value = normalizeComponentStatus(params.get("status")) ?? "";
        showAllInput.checked = normalizeShowAllComponents(params.get("all"));
        sortSelect.value = normalizeComponentSort(params.get("sort"));
        apply();
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        apply();
    });

    queryInput.addEventListener("input", apply);
    categorySelect.addEventListener("change", apply);
    statusSelect.addEventListener("change", apply);
    sortSelect.addEventListener("change", apply);
    showAllInput.addEventListener("change", apply);

    syncFromLocation();
    window.addEventListener("pageshow", syncFromLocation);
}
