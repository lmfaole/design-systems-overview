"use client";
import { useState, useEffect } from "react";
import { Breadcrumb, BreadcrumbItem } from "@fremtind/jokul/breadcrumb";
import { usePreviewHovered } from "@/app/jokul/_component-docs/components/PreviewHoverContext";

const labels = ["Bilforsikring", "Kasko", "Skademelding"];

export function BreadcrumbItemPreview() {
    const isHovered = usePreviewHovered();
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        if (!isHovered) { setIdx(0); return; }
        const id = setInterval(() => setIdx(i => (i + 1) % labels.length), 1200);
        return () => clearInterval(id);
    }, [isHovered]);

    return (
        <Breadcrumb>
            <BreadcrumbItem><span>Hjem</span></BreadcrumbItem>
            <BreadcrumbItem><span>{labels[idx]}</span></BreadcrumbItem>
        </Breadcrumb>
    );
}

export function BreadcrumbPreview() {
    const isHovered = usePreviewHovered();
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        if (!isHovered) { setIdx(0); return; }
        const id = setInterval(() => setIdx(i => (i + 1) % labels.length), 1200);
        return () => clearInterval(id);
    }, [isHovered]);

    return (
        <Breadcrumb>
            <BreadcrumbItem><span>Hjem</span></BreadcrumbItem>
            <BreadcrumbItem><span>Forsikringer</span></BreadcrumbItem>
            <BreadcrumbItem><span>{labels[idx]}</span></BreadcrumbItem>
        </Breadcrumb>
    );
}
