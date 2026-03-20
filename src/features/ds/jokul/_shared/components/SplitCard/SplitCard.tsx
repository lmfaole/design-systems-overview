import { SplitCard as SharedSplitCard, type SplitCardProps as SharedSplitCardProps } from "@/components/ds/cards/SplitCard";

type SplitCardProps = SharedSplitCardProps;

export function SplitCard(props: SplitCardProps) {
    return <SharedSplitCard {...props} />;
}
