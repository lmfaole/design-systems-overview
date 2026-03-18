"use client";
import { CheckboxPanel } from "@fremtind/jokul/checkbox-panel";
import { FieldGroup } from "@fremtind/jokul/input-group";

export function CheckboxPanelPreview() {
    return (
        <FieldGroup legend="Velg tillegg">
            <CheckboxPanel name="preview" value="bil" label="Bilforsikring" defaultChecked />
            <CheckboxPanel name="preview" value="bat" label="Båtforsikring" />
        </FieldGroup>
    );
}
