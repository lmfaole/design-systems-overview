"use client";

import { useEffect, useRef, useState } from "react";
import { resolveSiteBreadcrumbItems } from "./resolveItems";
import "./site-breadcrumb.scss";

export function SiteBreadcrumb() {
    const [pathname, setPathname] = useState("/");
    const rootRef = useRef<HTMLElement | null>(null);
    const items = resolveSiteBreadcrumbItems(pathname);

    useEffect(() => {
        setPathname(window.location.pathname);

        const element = rootRef.current;

        if (!element) return;

        const updateHeight = () => {
            document.documentElement.style.setProperty(
                "--site-breadcrumb-block-size",
                `${element.getBoundingClientRect().height}px`,
            );
        };

        updateHeight();

        const observer = new ResizeObserver(updateHeight);
        observer.observe(element);

        return () => {
            observer.disconnect();
            document.documentElement.style.removeProperty("--site-breadcrumb-block-size");
        };
    }, []);

    return (
        <nav className="site-breadcrumb" aria-label="Brødsmulesti" ref={rootRef}>
            <div className="page">
                <ol className="list">
                    {items.map((item) => (
                        <li className="item" key={`${item.href ?? "current"}:${item.label}`}>
                            {item.current ? (
                                <span aria-current="page" className="current">{item.label}</span>
                            ) : (
                                <a className="link" href={item.href}>{item.label}</a>
                            )}
                        </li>
                    ))}
                </ol>
            </div>
        </nav>
    );
}
