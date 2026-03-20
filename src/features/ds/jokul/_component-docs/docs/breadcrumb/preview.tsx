import { Breadcrumb, BreadcrumbItem } from "@fremtind/jokul/breadcrumb";

export function BreadcrumbItemPreview() {
    return (
        <Breadcrumb>
            <BreadcrumbItem><span>Hjem</span></BreadcrumbItem>
            <BreadcrumbItem><span>Bilforsikring</span></BreadcrumbItem>
        </Breadcrumb>
    );
}

export function BreadcrumbPreview() {
    return (
        <Breadcrumb>
            <BreadcrumbItem><span>Hjem</span></BreadcrumbItem>
            <BreadcrumbItem><span>Forsikringer</span></BreadcrumbItem>
            <BreadcrumbItem><span>Skademelding</span></BreadcrumbItem>
        </Breadcrumb>
    );
}
