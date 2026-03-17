import "../../styles/globals.scss";
import { SiteFooter } from "@/shared/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/shared/components/SiteHeader";

export default function JokulLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="jkl" data-theme="auto">
            <SiteHeader />
            <div className="site-layout">
                {children}
            </div>
            <SiteFooter />
        </div>
    );
}
