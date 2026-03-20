import { Combobox } from "@fremtind/jokul/combobox";

export function ComboboxBasicPreview() {
    const items = [
        { value: "bil", label: "Bilforsikring" },
        { value: "bat", label: "Båtforsikring" },
        { value: "hjem", label: "Hjemforsikring" },
        { value: "reise", label: "Reiseforsikring" },
    ];
    return (
        <Combobox
            label="Velg forsikringer"
            name="forsikringer"
            items={items}
            onChange={() => undefined}
        />
    );
}
