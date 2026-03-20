import { SplitCard as SharedSplitCard, type SplitCardProps as SharedSplitCardProps } from "@/app/ds/_shared/components/cards/SplitCard";

type SplitCardProps = SharedSplitCardProps;

export function SplitCard(props: SplitCardProps) {
    return <SharedSplitCard {...props} />;
}
