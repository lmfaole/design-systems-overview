"use client";

import { Breadcrumb, BreadcrumbItem } from "@fremtind/jokul/breadcrumb";
import { Link } from "@fremtind/jokul/link";

const WRAP_STYLE = { width: "100%", maxWidth: "20rem" };

export function BreadcrumbWithCurrentExample() {
    return (
        <div style={WRAP_STYLE}>
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link href="#">Hjem</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link href="#">Forsikringer</Link>
                </BreadcrumbItem>
                <BreadcrumbItem aria-current="page">
                    <span>Skademelding</span>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
    );
}

export function BreadcrumbCurrentLinkExample() {
    return (
        <div style={WRAP_STYLE}>
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link href="#">Hjem</Link>
                </BreadcrumbItem>
                <BreadcrumbItem aria-current="page">
                    <Link href="#">Mønstre</Link>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
    );
}

export function BreadcrumbAllLinksExample() {
    return (
        <div style={WRAP_STYLE}>
            <Breadcrumb>
                <BreadcrumbItem>
                    <Link href="#">Hjem</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link href="#">Forsikringer</Link>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <Link href="#">Skademelding</Link>
                </BreadcrumbItem>
            </Breadcrumb>
        </div>
    );
}
