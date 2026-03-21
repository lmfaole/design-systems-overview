
import { resolveSiteBreadcrumbItems } from "./resolveItems";
import "./site-breadcrumb.scss";

interface SiteBreadcrumbProps {
    pathname?: string;
}

export function SiteBreadcrumb({ pathname = "/" }: SiteBreadcrumbProps) {
    const items = resolveSiteBreadcrumbItems(pathname);

    return (
        <nav className="site-breadcrumb" aria-label="Brødsmulesti">
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
