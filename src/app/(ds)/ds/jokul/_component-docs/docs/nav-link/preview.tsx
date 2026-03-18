"use client";
import { NavLink } from "@fremtind/jokul/nav-link";
import { Flex } from "@fremtind/jokul/flex";
const links = ["Oversikt", "Mine forsikringer", "Skademeldinger", "Profil"];

export function NavLinkPreview() {
    return (
        <Flex direction="column" gap="xs">
            {links.map((label, idx) => <NavLink key={label} href="#" active={idx === 0}>{label}</NavLink>)}
        </Flex>
    );
}
