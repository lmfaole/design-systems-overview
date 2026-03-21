import { Menu, MenuItem, MenuItemCheckbox, MenuDivider } from "@fremtind/jokul/menu";
import { Button } from "@fremtind/jokul/button";
import { Icon } from "@fremtind/jokul/icon";
import type { ComponentExampleProps } from "../types";

const menuPlacements = [
    "top",
    "top-start",
    "top-end",
    "bottom",
    "bottom-start",
    "bottom-end",
    "left",
    "left-start",
    "left-end",
    "right",
    "right-start",
    "right-end",
] as const;

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

export function MenuPreview(props: ComponentExampleProps = {}) {
    const initialPlacement =
        typeof props.initialPlacement === "string" && menuPlacements.includes(props.initialPlacement as (typeof menuPlacements)[number])
            ? (props.initialPlacement as (typeof menuPlacements)[number])
            : "bottom-start";
    const openOnHover = props.openOnHover === true;
    const keepOpenOnClickOutside = props.keepOpenOnClickOutside === true;

    return (
        <Menu
            initialPlacement={initialPlacement}
            openOnHover={openOnHover}
            keepOpenOnClickOutside={keepOpenOnClickOutside}
            triggerElement={<Button variant="secondary" icon={<Icon>more_vert</Icon>}>Handlinger</Button>}
        >
            <MenuItem>Rediger</MenuItem>
            <MenuItem>Dupliser</MenuItem>
            <MenuDivider />
            <MenuItem>Slett</MenuItem>
        </Menu>
    );
}
