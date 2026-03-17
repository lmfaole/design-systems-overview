import "../../styles/jokul.scss";
import { SiteFooter } from "@/shared/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/shared/components/SiteHeader";
import { SiteContainer } from "@/shared/components/SiteContainer/SiteContainer";

export default function JokulLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="jkl" data-theme="auto">
            <SiteHeader />
            <div className="site-layout">
                <SiteContainer>{children}</SiteContainer>
            </div>
            <SiteFooter />
        </div>
    );
}
