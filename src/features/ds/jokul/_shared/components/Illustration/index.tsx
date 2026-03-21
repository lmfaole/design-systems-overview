import { DotsIllustration as SharedDotsIllustration } from "@/components/ds/illustrations";
import { TokenPageIllustration } from "../TokenIllustration/TokenIllustration";

export function TypographyIllustration() {
    return <TokenPageIllustration slug="typografi" />;
}

export function ColorIllustration() {
    return <TokenPageIllustration slug="farger" />;
}

export function SpacingIllustration() {
    return <TokenPageIllustration slug="spacing" />;
}

export function MotionIllustration() {
    return <TokenPageIllustration slug="animasjon" />;
}

export function BreakpointsIllustration() {
    return <TokenPageIllustration slug="breakpoints" />;
}

export function DotsIllustration() {
    return (
        <SharedDotsIllustration
            dotColor="var(--jkl-color-border-separator)"
            dotSubduedColor="var(--jkl-color-border-subdued)"
        />
    );
}

export function BorderRadiusIllustration() {
    return <TokenPageIllustration slug="kantradiuser" />;
}
