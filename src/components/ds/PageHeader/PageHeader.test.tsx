import type { ImageMetadata } from "astro";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { PageHeader } from "./PageHeader";

function BackgroundGraphic() {
    return <svg data-background-graphic="true" />;
}

describe("PageHeader", () => {
    it("renders a plain header when no background is provided", () => {
        const html = renderToStaticMarkup(
            <PageHeader title="Sidehode" description="Kort beskrivelse" />,
        );

        expect(html).toContain('<header class="ds-page-header">');
        expect(html).toContain("<h1");
        expect(html).toContain("Sidehode");
        expect(html).toContain("Kort beskrivelse");
        expect(html).not.toContain('data-variant="hero"');
    });

    it("renders string backgrounds as eager images in the hero wrapper", () => {
        const html = renderToStaticMarkup(
            <PageHeader title="Hero" background="/images/hero.jpg" />,
        );

        expect(html).toContain('data-variant="hero"');
        expect(html).toContain('src="/images/hero.jpg"');
        expect(html).toContain('alt=""');
        expect(html).toContain('loading="eager"');
        expect(html).toContain('decoding="async"');
    });

    it("renders component backgrounds by invoking the component type", () => {
        const html = renderToStaticMarkup(
            <PageHeader title="Hero" background={BackgroundGraphic} />,
        );

        expect(html).toContain('data-variant="hero"');
        expect(html).toContain('data-background-graphic="true"');
    });

    it("renders background image configs with metadata dimensions and custom image props", () => {
        const image = {
            src: "/images/hero-meta.jpg",
            width: 1440,
            height: 810,
        } as ImageMetadata;

        const html = renderToStaticMarkup(
            <PageHeader
                title="Hero"
                background={{
                    src: image,
                    alt: "Bakgrunn",
                    loading: "lazy",
                    className: "hero-image",
                }}
            />,
        );

        expect(html).toContain('src="/images/hero-meta.jpg"');
        expect(html).toContain('width="1440"');
        expect(html).toContain('height="810"');
        expect(html).toContain('alt="Bakgrunn"');
        expect(html).toContain('loading="lazy"');
        expect(html).toContain('class="hero-image"');
    });
});
