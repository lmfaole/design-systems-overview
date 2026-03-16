"use client";
import { Menu, MenuItem, MenuItemCheckbox, MenuDivider } from "@fremtind/jokul/menu";
import { Button } from "@fremtind/jokul/button";
import { Icon } from "@fremtind/jokul/icon";

export function MenuItemPreview() { return <MenuPreview />; }

export function MenuItemCheckboxPreview() {
    return (
        <Menu
            isOpen={false}
            onToggle={() => undefined}
            triggerElement={<Button variant="secondary" icon={<Icon>more_vert</Icon>}>Vis</Button>}
        >
            <MenuItemCheckbox aria-checked={true}>Kasko</MenuItemCheckbox>
            <MenuItemCheckbox aria-checked={false}>Ansvar</MenuItemCheckbox>
        </Menu>
    );
}

export function MenuPreview() {
    return (
        <Menu
            isOpen={false}
            onToggle={() => undefined}
            triggerElement={<Button variant="secondary" icon={<Icon>more_vert</Icon>}>Handlinger</Button>}
        >
            <MenuItem>Rediger</MenuItem>
            <MenuItem>Dupliser</MenuItem>
            <MenuDivider />
            <MenuItem>Slett</MenuItem>
        </Menu>
    );
}
