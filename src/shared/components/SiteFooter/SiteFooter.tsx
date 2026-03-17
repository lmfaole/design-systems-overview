"use client";

import { Flex } from "@fremtind/jokul/flex";
import { FullBleed } from "@/shared/components/FullBleed/FullBleed";
import { SiteContainer } from "@/shared/components/SiteContainer/SiteContainer";
import "./site-footer.scss";

const CURRENT_YEAR = new Date().getFullYear();

export function SiteFooter() {
    return (
        <FullBleed as="footer" dots="fade-top" className="site-footer">
            <SiteContainer className="site-footer__inner" data-size="small">
                <Flex alignItems="center" justifyContent="space-between" wrap="wrap" gap="l">
                    <p className="muted">En uoffisiell læringsressurs for Jøkul — Fremtinds designsystem.</p>
                    <small className="muted">
                        © {CURRENT_YEAR} — Ikke tilknyttet Fremtind eller det offisielle Jøkul-prosjektet.
                    </small>
                </Flex>
            </SiteContainer>
        </FullBleed>
    );
}

