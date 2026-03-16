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
        <Card padding="l" variant="outlined">
            <Flex direction="column" gap="s">
                <Flex alignItems="center" justifyContent="center" style={{ minHeight: "6rem" }}>
                    {children}
                </Flex>
                <strong>{title}</strong>
                {description && <p className="muted">{description}</p>}

                <Flex justifyContent="start">
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
            </Flex>

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
