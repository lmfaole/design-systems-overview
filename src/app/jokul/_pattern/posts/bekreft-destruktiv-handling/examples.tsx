"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@fremtind/jokul/button";
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

export function ConfirmDeleteExample() {
    const [deleted, setDeleted] = useState(false);
    const [instance, { title: titleProps, overlay, container, modal, closeButton }] = useModal({
        title: "Bekreft sletting",
    });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleConfirm = () => {
        setDeleted(true);
        instance?.hide();
    };

    return (
        <Flex direction="column" gap="s">
            <Button type="button" variant="primary" disabled={deleted} onClick={() => instance?.show()}>
                Slett profil
            </Button>
            <div aria-live="polite">
                <small className="muted">{deleted ? "Profil slettet." : "Ingen endringer ennå."}</small>
            </div>

            {isMounted &&
                createPortal(
                    <ModalContainer {...container}>
                        <ModalOverlay {...overlay} />
                        <Modal {...modal}>
                            <ModalHeader>
                                <ModalTitle {...titleProps}>Bekreft sletting</ModalTitle>
                                <ModalCloseButton {...closeButton} />
                            </ModalHeader>
                            <ModalBody>
                                <p>Sletting kan ikke angres.</p>
                            </ModalBody>
                            <ModalActions>
                                <Button type="button" variant="secondary" onClick={() => instance?.hide()}>
                                    Avbryt
                                </Button>
                                <Button type="button" variant="primary" onClick={handleConfirm}>
                                    Slett
                                </Button>
                            </ModalActions>
                        </Modal>
                    </ModalContainer>,
                    document.body,
                )}
        </Flex>
    );
}

export function DeleteWithoutConfirmExample() {
    const [deleted, setDeleted] = useState(false);

    return (
        <Flex direction="column" gap="s">
            <Button type="button" variant="primary" disabled={deleted} onClick={() => setDeleted(true)}>
                Slett profil
            </Button>
            <div aria-live="polite">
                <small className="muted">
                    {deleted ? "Profil slettet." : "Slettes umiddelbart uten bekreftelse."}
                </small>
            </div>
        </Flex>
    );
}
