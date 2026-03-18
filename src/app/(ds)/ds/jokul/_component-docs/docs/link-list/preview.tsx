"use client";
import { LinkList } from "@fremtind/jokul/link-list";

export function LinkListLinkPreview() { return <LinkListPreview />; }

export function LinkListPreview() {
    return (
        <LinkList label="Forsikringer">
            <LinkList.Link href="#">Bilforsikring</LinkList.Link>
            <LinkList.Link href="#">Reiseforsikring</LinkList.Link>
            <LinkList.Link href="#">Innboforsikring</LinkList.Link>
        </LinkList>
    );
}
