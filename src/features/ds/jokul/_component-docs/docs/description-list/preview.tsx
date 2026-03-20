import { DescriptionList, DescriptionTerm, DescriptionDetail } from "@fremtind/jokul/description-list";

export function DescriptionTermPreview() { return <DescriptionListPreview />; }
export function DescriptionDetailPreview() { return <DescriptionListPreview />; }

export function DescriptionListPreview() {
    return (
        <DescriptionList>
            <DescriptionTerm>Navn</DescriptionTerm>
            <DescriptionDetail>Ola Nordmann</DescriptionDetail>
            <DescriptionTerm>Adresse</DescriptionTerm>
            <DescriptionDetail>Storgata 1, 0001 Oslo</DescriptionDetail>
        </DescriptionList>
    );
}
