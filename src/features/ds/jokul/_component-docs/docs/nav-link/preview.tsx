import { NavLink } from "@fremtind/jokul/nav-link";
import { Flex } from "@fremtind/jokul/flex";
import type { ComponentExampleProps } from "../types";
const links = ["Oversikt", "Mine forsikringer", "Skademeldinger", "Profil"];

export function NavLinkPreview(props: ComponentExampleProps = {}) {
    const href = typeof props.href === "string" && props.href.trim() !== "" ? props.href : "#";
    const active = props.active !== false;
    const back = props.back === true;

    return (
        <Flex direction="column" gap="xs">
            {links.map((label, idx) => (
                <NavLink key={label} href={href} active={idx === 0 ? active : false} back={idx === 0 ? back : false}>
                    {label}
                </NavLink>
            ))}
        </Flex>
    );
}
