import { useEffect, useState } from "react";
import { Pagination } from "@fremtind/jokul/pagination";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";

export function PaginationExample(props: ComponentExampleProps) {
    const rawPages = typeof props.numberOfPages === "number" ? props.numberOfPages : 8;
    const numberOfPages = Math.max(1, Math.round(rawPages));
    const rawCurrent = typeof props.currentPage === "number" ? props.currentPage : 1;
    const controlledCurrent = Math.min(Math.max(1, Math.round(rawCurrent)), numberOfPages);
    const [currentPage, setCurrentPage] = useState(controlledCurrent);

    const labels = typeof props.labels === "object" && props.labels !== null && !Array.isArray(props.labels)
        ? (props.labels as Record<string, unknown>)
        : undefined;
    const previous = typeof labels?.previous === "string" && labels.previous.trim() !== "" ? labels.previous : undefined;
    const next = typeof labels?.next === "string" && labels.next.trim() !== "" ? labels.next : undefined;
    const resolvedLabels = previous || next ? { previous: previous ?? "Forrige side", next: next ?? "Neste side" } : undefined;

    useEffect(() => {
        setCurrentPage(controlledCurrent);
    }, [controlledCurrent]);

    return (
        <Flex direction="column" gap="s">
            <Pagination
                currentPage={currentPage}
                numberOfPages={numberOfPages}
                labels={resolvedLabels}
                onPageChange={(toPage) => {
                    setCurrentPage(Math.min(Math.max(1, Math.round(toPage)), numberOfPages));
                }}
            />
        </Flex>
    );
}
