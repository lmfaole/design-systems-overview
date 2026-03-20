import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import "./site-header.scss";

export type SiteLink = {
    href: string;
    label: string;
};

interface SiteHeaderProps<
    LayoutComponent extends ElementType = "div",
    NavListComponent extends ElementType = "ul",
> {
    brand: SiteLink;
    links: SiteLink[];
    LayoutComponent?: LayoutComponent;
    layoutProps?: ComponentPropsWithoutRef<LayoutComponent>;
    NavListComponent?: NavListComponent;
    navListProps?: ComponentPropsWithoutRef<NavListComponent>;
    renderLink?: (link: SiteLink, className: string) => ReactNode;
}

export function SiteHeader<
    LayoutComponent extends ElementType = "div",
    NavListComponent extends ElementType = "ul",
>({
    brand,
    links,
    LayoutComponent,
    layoutProps,
    NavListComponent,
    navListProps,
    renderLink,
}: SiteHeaderProps<LayoutComponent, NavListComponent>) {
    const Layout = (LayoutComponent ?? "div") as ElementType;
    const NavList = (NavListComponent ?? "ul") as ElementType;
    const linkRenderer = renderLink ?? ((link, className) => (
        <a className={className} href={link.href}>{link.label}</a>
    ));

    return (
        <header className="site-header">
            <Layout className="page content" {...layoutProps}>
                {linkRenderer(brand, "brand")}
                {links.length > 0 && (
                    <nav aria-label="Primærnavigasjon" className="nav">
                        <NavList className="links" {...navListProps}>
                            {links.map((link) => (
                                <li key={link.href}>
                                    {linkRenderer(link, "link")}
                                </li>
                            ))}
                        </NavList>
                    </nav>
                )}
            </Layout>
        </header>
    );
}
