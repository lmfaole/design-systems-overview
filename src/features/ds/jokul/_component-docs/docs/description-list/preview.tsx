import { DescriptionList, DescriptionTerm, DescriptionDetail } from "@fremtind/jokul/description-list";
import type { ComponentExampleProps } from "../types";

export function DescriptionTermPreview() { return <DescriptionListPreview />; }
export function DescriptionDetailPreview() { return <DescriptionListPreview />; }

export function DescriptionListPreview(props: ComponentExampleProps = {}) {
    const separators = props.separators === true;
    const alignment =
        props.alignment === "horizontal" || props.alignment === "justified" ? props.alignment : "vertical";

    return (
        <DescriptionList separators={separators} alignment={alignment}>
            <DescriptionTerm>Navn</DescriptionTerm>
            <DescriptionDetail>Ola Nordmann</DescriptionDetail>
            <DescriptionTerm>Adresse</DescriptionTerm>
            <DescriptionDetail>Storgata 1, 0001 Oslo</DescriptionDetail>
        </DescriptionList>
    );
}
