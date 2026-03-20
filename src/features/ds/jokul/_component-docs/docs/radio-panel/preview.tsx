import { RadioPanel } from "@fremtind/jokul/radio-panel";
import { FieldGroup } from "@fremtind/jokul/input-group";

export function RadioPanelPreview() {
    return (
        <FieldGroup legend="Velg produkt">
            <RadioPanel name="rp-preview" value="bil" label="Bil" checked={true} />
            <RadioPanel name="rp-preview" value="bat" label="Båt" checked={false} />
        </FieldGroup>
    );
}
