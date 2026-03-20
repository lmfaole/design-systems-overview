import { UnorderedList, ListItem } from "@fremtind/jokul/list";

export function ListPreview() {
    const baseItems = ["Bilforsikring dekker skader", "Reiseforsikring gjelder i Norden"];
    return (
        <UnorderedList>
            {baseItems.map(item => <ListItem key={item}>{item}</ListItem>)}
            <ListItem>Innboforsikring inkluderer tyveri</ListItem>
        </UnorderedList>
    );
}
