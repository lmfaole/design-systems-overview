"use client";
import { TableOfContents } from "@fremtind/jokul/table-of-contents";

const tocLinks = [
    { href: "#intro", label: "Introduksjon" },
    { href: "#usage", label: "Bruk" },
    { href: "#props", label: "Props" },
    { href: "#examples", label: "Eksempler" },
];

export function TableOfContentsLinkPreview() { return <TableOfContentsPreview />; }

export function TableOfContentsPreview() {
    const activeIdx = 0;
    return (
        <TableOfContents label="Innhold">
            {tocLinks.map((link, idx) => (
                <TableOfContents.Link
                    key={link.href}
                    href={link.href}
                    style={idx === activeIdx ? { fontWeight: "bold", color: "var(--jkl-color-text-default)" } : undefined}
                >
                    {link.label}
                </TableOfContents.Link>
            ))}
        </TableOfContents>
    );
}
