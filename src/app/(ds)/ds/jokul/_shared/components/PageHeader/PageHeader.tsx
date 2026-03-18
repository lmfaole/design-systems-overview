"use client";

import React from "react";
import { Flex } from "@fremtind/jokul/flex";
import "./page-header.scss";

interface PageHeaderProps {
    title: string;
    description: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
    return (
        <Flex as="header" direction="column" gap="s" className="page-header">
            <h1 className="page-header__title">{title}</h1>
            <p className="page-header__description lead">{description}</p>
        </Flex>
    );
}
