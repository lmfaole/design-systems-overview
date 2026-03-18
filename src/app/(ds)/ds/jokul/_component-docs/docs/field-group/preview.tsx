"use client";
import { FieldGroup } from "@fremtind/jokul/input-group";
import { Checkbox } from "@fremtind/jokul/checkbox";

export function FieldGroupPreview() {
    return (
        <FieldGroup legend="Velg produkt">
            <Checkbox name="fg" value="bil" defaultChecked>Bil</Checkbox>
            <Checkbox name="fg" value="bat">Båt</Checkbox>
        </FieldGroup>
    );
}
