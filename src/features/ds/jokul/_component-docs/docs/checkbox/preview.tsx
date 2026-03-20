import { Checkbox } from "@fremtind/jokul/checkbox";

export function CheckboxPreview() {
    return (
        <Checkbox name="preview" value="x" defaultChecked={false}>
            Godta vilkårene
        </Checkbox>
    );
}
