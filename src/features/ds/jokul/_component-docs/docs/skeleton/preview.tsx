import { SkeletonAnimation, SkeletonInput, SkeletonButton, SkeletonElement, SkeletonCheckboxGroup, SkeletonRadioButtonGroup, SkeletonTextArea } from "@fremtind/jokul/loader";
import { Flex } from "@fremtind/jokul/flex";

export function SkeletonInputPreview() {
    return <SkeletonAnimation textDescription="Laster…"><SkeletonInput /></SkeletonAnimation>;
}

export function SkeletonButtonPreview() {
    return <SkeletonAnimation textDescription="Laster…"><SkeletonButton width="8rem" /></SkeletonAnimation>;
}

export function SkeletonElementPreview() {
    return <SkeletonAnimation textDescription="Laster…"><SkeletonElement height="2rem" width="12rem" /></SkeletonAnimation>;
}

export function SkeletonCheckboxGroupPreview() {
    return <SkeletonAnimation textDescription="Laster…"><SkeletonCheckboxGroup checkboxes={3} /></SkeletonAnimation>;
}

export function SkeletonRadioButtonGroupPreview() {
    return <SkeletonAnimation textDescription="Laster…"><SkeletonRadioButtonGroup radioButtons={3} /></SkeletonAnimation>;
}

export function SkeletonTextAreaPreview() {
    return <SkeletonAnimation textDescription="Laster…"><SkeletonTextArea /></SkeletonAnimation>;
}

export function SkeletonPreview() {
    return (
        <SkeletonAnimation textDescription="Laster innhold…" style={{ maxWidth: "320px" }}>
            <Flex direction="column" gap="m">
                <SkeletonInput />
                <SkeletonInput />
                <SkeletonButton width="8rem" />
            </Flex>
        </SkeletonAnimation>
    );
}
