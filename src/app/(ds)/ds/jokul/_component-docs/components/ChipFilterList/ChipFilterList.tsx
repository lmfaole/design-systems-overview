"use client";
import { Flex } from "@fremtind/jokul/flex";
import { Chip } from "@fremtind/jokul/chip";

interface ChipFilterListProps {
    items: string[];
    selected: string | null;
    onChange: (value: string | null) => void;
    /** Optional label transform, defaults to identity */
    getLabel?: (item: string) => string;
    /** Label for the "show all" chip, defaults to "Se alle" */
    allLabel?: string;
}

export function ChipFilterList({ items, selected, onChange, getLabel, allLabel = "Se alle" }: ChipFilterListProps) {
    return (
        <Flex as="ul" className="list-bare" gap="xs" wrap="wrap">
            <li>
                <Chip
                    variant="filter"
                    selected={selected === null}
                    onClick={() => onChange(null)}
                >
                    {allLabel}
                </Chip>
            </li>
            {items.map((item) => (
                <li key={item}>
                    <Chip
                        variant="filter"
                        selected={selected === item}
                        onClick={() => onChange(selected === item ? null : item)}
                    >
                        {getLabel ? getLabel(item) : item}
                    </Chip>
                </li>
            ))}
        </Flex>
    );
}
