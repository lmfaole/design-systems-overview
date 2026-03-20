import { SplitCard as SharedSplitCard, type SplitCardProps as SharedSplitCardProps } from "@/app/ds/_shared/components/SplitCard";

type SplitCardProps = Omit<SharedSplitCardProps, "separatorColor">;

export function SplitCard(props: SplitCardProps) {
    return (
        <SharedSplitCard
            separatorColor="var(--jkl-color-border-subdued)"
            {...props}
        />
    );
}
