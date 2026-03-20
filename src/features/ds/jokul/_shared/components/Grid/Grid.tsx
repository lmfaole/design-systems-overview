import { Grid as SharedGrid, type GridProps as SharedGridProps } from "@/components/ds/Grid";

export type SemanticSpacing = "none" | "xxs" | "xs" | "s" | "m" | "l" | "xl";

interface GridProps extends Omit<SharedGridProps, "gap"> {
    gap?: SemanticSpacing;
}

function toJokulGap(gap: SemanticSpacing) {
    return gap === "none" ? "0" : `var(--jkl-spacing-${gap})`;
}

export function Grid({ gap = "m", ...rest }: GridProps) {
    return <SharedGrid gap={toJokulGap(gap)} {...rest} />;
}
