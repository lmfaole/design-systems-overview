"use client";

import React, {useState} from "react";
import {Flex} from "@fremtind/jokul/flex";
import type {ComponentDoc} from "@/app/ds/jokul/_component-docs/docs/types";
import {PreviewHoverContext} from "@/app/ds/jokul/_component-docs/components/PreviewHoverContext";
import {Card} from "@fremtind/jokul/card";
import {SplitCard} from "@/app/ds/jokul/_shared/components/SplitCard";
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
            as="a"
            href={`/ds/jokul/component/${doc.id}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            padding="s"
            variant="outlined"
            className="related-component-card"
        >
            <SplitCard
                minWidth="36rem"
                layout={layout === "horizontal" ? "horizontal" : "auto"}
                preview={
                    preview ? (
                        <Flex alignItems="center" justifyContent="center">
                            <PreviewHoverContext value={hovered}>
                                <div className="inner">
                                    {preview}
                                </div>
                            </PreviewHoverContext>
                        </Flex>
                    ) : null
                }
                content={(
                    <Flex direction="column" gap="xs">
                        <p className="h5">{doc.name}</p>
                        <p className="description">{description}</p>
                    </Flex>
                )}
            />
        </Card>
    );
}
