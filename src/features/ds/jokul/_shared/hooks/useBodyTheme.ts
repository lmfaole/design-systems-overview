import { useEffect } from "react";

/**
 * Forces data-theme on <body> for the lifetime of the component.
 * Restores the previous value (or removes it) on unmount.
 */
export function useBodyTheme(theme: "dark" | "light" | "auto") {
    useEffect(() => {
        const prev = document.body.getAttribute("data-theme");
        document.body.setAttribute("data-theme", theme);
        return () => {
            if (prev === null) {
                document.body.removeAttribute("data-theme");
            } else {
                document.body.setAttribute("data-theme", prev);
            }
        };
    }, [theme]);
}
