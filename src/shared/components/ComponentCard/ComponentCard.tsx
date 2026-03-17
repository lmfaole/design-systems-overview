"use client";

import React, {useState} from "react";
import {Card} from "@fremtind/jokul/card";
import {Flex} from "@fremtind/jokul/flex";
import type {ComponentDoc} from "@/app/jokul/_component-docs/docs/types";
import {PreviewHoverContext} from "@/app/jokul/_component-docs/components/PreviewHoverContext";
import {SplitCard} from "@/shared/components/SplitCard";
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
            href={`/jokul/component/${doc.id}`}
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
                contentClassName="component-card__content"
                preview={
                    preview ? (
                        <Flex alignItems="center" justifyContent="center">
                            <PreviewHoverContext value={hovered}>
                                <div className="component-card-preview__inner">
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
