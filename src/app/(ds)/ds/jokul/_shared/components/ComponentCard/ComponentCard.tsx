"use client";

import React, {useState} from "react";
import {Card} from "@fremtind/jokul/card";
import {Flex} from "@fremtind/jokul/flex";
import type {ComponentDoc} from "@/app/ds/jokul/_component-docs/docs/types";
import {PreviewHoverContext} from "@/app/ds/jokul/_component-docs/components/PreviewHoverContext";
import {SplitCard} from "@/app/ds/jokul/_shared/components/SplitCard";
import "./component-card.scss";

interface ComponentCardProps {
    doc: ComponentDoc;
}

export function ComponentCard({doc}: ComponentCardProps) {
    const preview = doc.preview;
    const [hovered, setHovered] = useState(false);
    const description = doc.description.short;

    return (
        <Card
            as="a"
            href={`/ds/jokul/component/${doc.id}`}
            aria-label={doc.name}
            clickable
            padding="s"
            variant="outlined"
            className="component-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <SplitCard
                previewClassName="component-card-preview"
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
                        <strong>{doc.name}</strong>
                        <small className="muted">{description}</small>
                    </Flex>
                )}
            />
        </Card>
    );
}
