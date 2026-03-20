import { Select } from "@fremtind/jokul/select";

export function SelectStablePreview() {
    return (
        <Select
            label="Velg fylke"
            name="county-preview"
            items={["Oslo", "Viken", "Agder"]}
        />
    );
}
