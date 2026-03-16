"use client";

import { Button } from "@fremtind/jokul/button";
import { Flex } from "@fremtind/jokul/flex";
import { Icon } from "@fremtind/jokul/icon";
import { Menu, MenuItem } from "@fremtind/jokul/menu";
import "./site-header.scss";

export function SiteHeader() {
    return (
        <header className="site-header" role="banner">
            <Flex className="site-header__inner" alignItems="center" justifyContent="space-between">
                <Button as="a" href="/jokul" variant="ghost">Jøkul</Button>
                <Flex as="nav" aria-label="Primærnavigasjon" className="site-header__nav">
                    <Button as="a" href="/jokul/token" variant="ghost">Designtokens</Button>
                    <Button as="a" href="/jokul/monster" variant="ghost">Mønster</Button>
                    <Button as="a" href="/jokul/component" variant="ghost">Komponenter</Button>
                </Flex>
                <div className="site-header__menu">
                    <Menu
                        triggerElement={
                            <Button
                                variant="ghost"
                                type="button"
                                aria-label="Meny"
                                icon={<Icon>menu</Icon>}
                            />
                        }
                        initialPlacement="bottom-end"
                    >
                        <MenuItem as="a" href="/jokul/token">Designtokens</MenuItem>
                        <MenuItem as="a" href="/jokul/monster">Mønster</MenuItem>
                        <MenuItem as="a" href="/jokul/component">Komponenter</MenuItem>
                    </Menu>
                </div>
            </Flex>
        </header>
    );
}
