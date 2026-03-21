import { LinkList } from "@fremtind/jokul/link-list";
import type { ComponentExampleProps } from "../types";

export function LinkListExample(props: ComponentExampleProps) {
    const label = typeof props.label === "string" ? props.label : "Forsikringer";
    const hideLabel = props.hideLabel === true;

    return (
        <LinkList label={label} hideLabel={hideLabel}>
            <LinkList.Link href="#">Bilforsikring</LinkList.Link>
            <LinkList.Link href="#">Reiseforsikring</LinkList.Link>
            <LinkList.Link href="#">Innboforsikring</LinkList.Link>
        </LinkList>
    );
}
