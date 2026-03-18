import type { Migration } from "../types";

export const migrations: Migration[] = [
    {
        title: "iconPosition",
        description: "Tekst vises ikke lenger ved siden av Help-ikonet, så posisjonen har ingen effekt.",
        deprecates: { name: "iconPosition" },
        before: `<Help buttonText="Hjelp" iconPosition="right">
    Hjelpetekst her.
</Help>`,
        after: `<Help buttonText="Hjelp">
    Hjelpetekst her.
</Help>`,
    },
    {
        title: "showButtonText",
        description: "Tekst vises ikke lenger ved siden av Help-ikonet. Bruk en vanlig Button om du trenger synlig tekst.",
        deprecates: { name: "showButtonText" },
        replacedBy: [{ name: "Button" }],
        before: `<Help buttonText="Hjelp" showButtonText>
    Hjelpetekst her.
</Help>`,
        after: `<Flex gap="xs" alignItems="center">
    <Button variant="ghost" onClick={() => openHelpPanel()}>
        Åpne hjelpepanel
    </Button>
</Flex>`,
    },
];
