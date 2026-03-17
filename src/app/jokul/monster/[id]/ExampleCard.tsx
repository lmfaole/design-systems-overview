"use client";

import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@fremtind/jokul/button";
import { Card } from "@fremtind/jokul/card";
import { Flex } from "@fremtind/jokul/flex";
import {
    Modal,
    ModalActions,
    ModalBody,
    ModalCloseButton,
    ModalContainer,
    ModalHeader,
    ModalOverlay,
    ModalTitle,
    useModal,
} from "@fremtind/jokul/modal";
import { ProseCodeBlock } from "@/shared/components/CodeBlock/ProseCodeBlock";
import { SplitCard } from "@/shared/components/SplitCard";
import "./ExampleCard.scss";

interface ExampleCardProps {
    title: string;
    description?: React.ReactNode;
    code: string;
    children: React.ReactNode;
}

export function ExampleCard({ title, description, code, children }: ExampleCardProps) {
    const modalTitle = useMemo(() => `Kode: ${title}`, [title]);
    const [instance, { title: titleProps, overlay, container, modal, closeButton }] = useModal({
        title: modalTitle,
    });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <Card padding="s" variant="outlined">
            <SplitCard
                previewClassName="example-card__preview"
                contentClassName="example-card__content"
                preview={(
                    <Flex alignItems="center" justifyContent="center">
                        {children}
                    </Flex>
                )}
                content={(
                    <Flex direction="column" gap="s" alignItems="start">
                        <div>
                            <p>{title}</p>
                            {description && <p className="muted">{description}</p>}
                        </div>

                        <Button
                            variant="ghost"
                            type="button"
                            disabled={!isMounted}
                            onClick={() => instance?.show()}
                            data-size="small"
                        >
                            Vis kode
                        </Button>
                    </Flex>
                )}
            />

            {isMounted &&
                createPortal(
                    <ModalContainer {...container}>
                        <ModalOverlay {...overlay} />
                        <Modal {...modal}>
                            <ModalHeader>
                                <ModalTitle {...titleProps}>{modalTitle}</ModalTitle>
                                <ModalCloseButton {...closeButton} />
                            </ModalHeader>
                            <ModalBody>
                                <ProseCodeBlock code={code} />
                            </ModalBody>
                            <ModalActions>
                                <Button variant="secondary" type="button" onClick={() => instance?.hide()}>
                                    Lukk
                                </Button>
                            </ModalActions>
                        </Modal>
                    </ModalContainer>,
                    document.body,
                )}
        </Card>
    );
}
