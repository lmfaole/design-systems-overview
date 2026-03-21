import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import type { SiteFooterSection, SiteLink } from "../types";
import "./site-footer.scss";

interface SiteFooterProps<
    LayoutComponent extends ElementType = "div",
    NavGroupComponent extends ElementType = "section",
    NavListComponent extends ElementType = "ul",
> {
    links?: SiteLink[];
    sections?: SiteFooterSection[];
    rootLink?: SiteLink;
    note: string;
    LayoutComponent?: LayoutComponent;
    layoutProps?: ComponentPropsWithoutRef<LayoutComponent>;
    NavGroupComponent?: NavGroupComponent;
    navGroupProps?: ComponentPropsWithoutRef<NavGroupComponent>;
    NavListComponent?: NavListComponent;
    navListProps?: ComponentPropsWithoutRef<NavListComponent>;
    renderLink?: (link: SiteLink, className: string) => ReactNode;
}

export function SiteFooter<
    LayoutComponent extends ElementType = "div",
    NavGroupComponent extends ElementType = "section",
    NavListComponent extends ElementType = "ul",
>({
    links = [],
    sections,
    rootLink = { href: "/", label: "Til forsiden" },
    note,
    LayoutComponent,
    layoutProps,
    NavGroupComponent,
    navGroupProps,
    NavListComponent,
    navListProps,
    renderLink,
}: SiteFooterProps<LayoutComponent, NavGroupComponent, NavListComponent>) {
    const Layout = (LayoutComponent ?? "div") as ElementType;
    const NavGroup = (NavGroupComponent ?? "section") as ElementType;
    const NavList = (NavListComponent ?? "ul") as ElementType;
    const linkRenderer = renderLink ?? ((link, className) => (
        <a className={className} href={link.href}>{link.label}</a>
    ));
    const footerSections = sections && sections.length > 0
        ? sections
        : [{ title: "Navigasjon", links }];
    const [firstSection, ...restSections] = footerSections;
    const firstSectionLinks = firstSection.links.some((link) => link.href === rootLink.href)
        ? firstSection.links
        : [rootLink, ...firstSection.links];
    const normalizedSections = [
        { ...firstSection, links: firstSectionLinks },
        ...restSections,
    ].filter((section) => section.links.length > 0);

    return (
        <footer className="site-footer">
            <Layout className="page content" {...layoutProps}>
                {normalizedSections.length > 0 && (
                    <NavGroup className="nav" {...navGroupProps}>
                        {normalizedSections.map((section) => (
                            <nav aria-label={section.title} className="section" key={section.title}>
                                <small className="title">
                                    <strong>{section.title}</strong>
                                </small>
                                <NavList className="links" {...navListProps}>
                                    {section.links.map((link) => (
                                        <li key={link.href}>
                                            {linkRenderer(link, "link")}
                                        </li>
                                    ))}
                                </NavList>
                            </nav>
                        ))}
                    </NavGroup>
                )}
                <small className="note">{note}</small>
            </Layout>
        </footer>
    );
}
