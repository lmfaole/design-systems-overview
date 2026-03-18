import type { Migration } from "../types";

export const migrations: Migration[] = [
    {
        title: "IconButton",
        description: "IconButton er deprecated fordi Button dekker samme behov med en felles API. Bruk Button med ghost-variant og icon-prop.",
        deprecates: { name: "IconButton" },
        replacedBy: [{ name: "Button" }, { name: 'variant="ghost"' }, { name: "icon" }],
        before: `import { IconButton } from "@fremtind/jokul/icon-button";
import { Icon } from "@fremtind/jokul/icon";

<IconButton aria-label="Søk" onClick={handleSearch}>
    <Icon>search</Icon>
</IconButton>`,
        after: `import { Button } from "@fremtind/jokul/button";
import { Icon } from "@fremtind/jokul/icon";

<Button
    variant="ghost"
    aria-label="Søk"
    icon={<Icon>search</Icon>}
    onClick={handleSearch}
/>`,
    },
];

