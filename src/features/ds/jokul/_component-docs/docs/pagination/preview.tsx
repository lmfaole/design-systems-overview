import { Pagination } from "@fremtind/jokul/pagination";

export function PaginationPreview() {
    return <Pagination currentPage={3} numberOfPages={10} onPageChange={() => undefined} />;
}
