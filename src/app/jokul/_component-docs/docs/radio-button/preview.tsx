"use client";
import { RadioButton, RadioButtonGroup } from "@fremtind/jokul/radio-button";

export function RadioButtonPreview() {
    return (
        <RadioButtonGroup legend="Velg betaling" name="pay-preview" value="card" onChange={() => undefined}>
            <RadioButton value="card">Bankkort</RadioButton>
            <RadioButton value="invoice">Faktura</RadioButton>
        </RadioButtonGroup>
    );
}
