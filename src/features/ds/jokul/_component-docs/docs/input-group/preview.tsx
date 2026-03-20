import { InputGroup } from "@fremtind/jokul/input-group";
import { TextInput } from "@fremtind/jokul/text-input";

export function InputGroupPreview() {
    const supportLabelProps = { label: "Skriv inn bilens registreringsnummer", labelType: "help" as const };
    return (
        <InputGroup
            label="Registreringsnummer"
            supportLabelProps={supportLabelProps}
            render={inputProps => (
                <TextInput
                    {...inputProps}
                    label="Registreringsnummer"
                    labelProps={{ srOnly: true }}
                />
            )}
        />
    );
}
