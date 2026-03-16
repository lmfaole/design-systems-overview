"use client";
import { BETA_Select as Select } from "@fremtind/jokul/select";

export function SelectPreview() {
    return (
        <Select
            label="Velg fylke"
            name="county-beta"
        >
            <option value="">Velg</option>
            <option value="oslo">Oslo</option>
            <option value="viken">Viken</option>
        </Select>
    );
}
