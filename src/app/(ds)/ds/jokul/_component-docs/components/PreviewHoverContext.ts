"use client";

import { createContext, useContext } from "react";

export const PreviewHoverContext = createContext(false);

export function usePreviewHovered() {
    return useContext(PreviewHoverContext);
}
