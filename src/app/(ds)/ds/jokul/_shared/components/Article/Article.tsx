import React from "react";
import { Flex, type FlexProps } from "@fremtind/jokul/flex";

type ArticleProps = Omit<FlexProps<"article">, "as" | "direction" | "gap">;

/**
 * Shared article wrapper that keeps vertical rhythm consistent across pages.
 * Uses Jøkul spacing tokens via `gap="xl"` (var(--jkl-spacing-xl)).
 */
export function Article({ children, ...rest }: ArticleProps) {
    return (
        <Flex as="article" direction="column" gap="xl" {...rest}>
            {children}
        </Flex>
    );
}

