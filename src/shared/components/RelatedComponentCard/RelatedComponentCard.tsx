"use client";

import React, {useState} from "react";
import {Flex} from "@fremtind/jokul/flex";
import type {ComponentDoc} from "@/app/jokul/_component-docs/docs/types";
import {PreviewHoverContext} from "@/app/jokul/_component-docs/components/PreviewHoverContext";
import {Card} from "@fremtind/jokul/card";
import Link from "next/link";
import {SplitCard} from "@/shared/components/SplitCard";
import "./related-component-card.scss";

export type RelatedComponentDoc = Pick<ComponentDoc, "id" | "name" | "preview">;

interface RelatedComponentCardProps {
    doc: RelatedComponentDoc;
    description: string;
    layout?: "auto" | "horizontal";
}

export function RelatedComponentCard({doc, description, layout = "auto"}: RelatedComponentCardProps) {
    const preview = doc.preview;
    const [hovered, setHovered] = useState(false);

    return (
        <Card
            clickable
            as={Link}
            href={`/jokul/component/${doc.id}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            padding="s"
            variant="outlined"
            className="related-component-card"
        >
            <SplitCard
                minWidth="36rem"
                layout={layout === "horizontal" ? "horizontal" : "auto"}
                previewClassName="related-component-card__preview"
                contentClassName="related-component-card__content"
                preview={
                    preview ? (
                        <Flex alignItems="center" justifyContent="center">
                            <PreviewHoverContext value={hovered}>
                                <div className="related-component-card__preview-inner">
                                    {preview}
                                </div>
                            </PreviewHoverContext>
                        </Flex>
                    ) : null
                }
                content={(
                    <Flex direction="column" gap="xs">
                        <p className="h5">{doc.name}</p>
                        <p className="related-component-card__description">{description}</p>
                    </Flex>
                )}
            />
        </Card>
    );
}
