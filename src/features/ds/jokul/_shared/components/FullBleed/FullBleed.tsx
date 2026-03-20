import type { ElementType } from "react";
import { FullBleed as SharedFullBleed, type FullBleedProps as SharedFullBleedProps } from "@/components/ds/FullBleed";

export type FullBleedProps<E extends ElementType = "div"> = Omit<SharedFullBleedProps<E>, "dotColor">;

export function FullBleed<E extends ElementType = "div">(props: FullBleedProps<E>) {
    return (
        <SharedFullBleed
            {...(props as SharedFullBleedProps<E>)}
            dotColor="var(--jkl-color-border-subdued)"
        />
    );
}
