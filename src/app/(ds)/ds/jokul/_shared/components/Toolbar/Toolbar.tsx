import { Toolbar as SharedToolbar, type ToolbarProps as SharedToolbarProps } from "@/app/ds/_shared/components/Toolbar";

type ToolbarProps = Omit<SharedToolbarProps, "gap" | "marginBlockEnd">;

export function Toolbar(props: ToolbarProps) {
    return (
        <SharedToolbar
            gap="var(--jkl-spacing-m)"
            marginBlockEnd="var(--jkl-spacing-l)"
            {...props}
        />
    );
}
