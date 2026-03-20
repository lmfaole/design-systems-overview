import "./typography-scale-demo.scss";
import {
    fontSizeSteps,
    namedStyles,
    weightSteps,
    lineHeightSteps,
    LINE_HEIGHT_SAMPLE,
} from "./typography-scale.data";
import {
    Section,
    FontSizeRow,
    NamedStyleRow,
    WeightRow,
    LineHeightCard,
} from "./TypographyScalePrimitives";

export function TypographyScaleDemo() {
    return (
        <div className="ty-scale-demo">
            <Section
                heading="Størrelseskala"
                description={<>Ti trinn fra <code>--jkl-font-size-1</code> (minst) til <code>--jkl-font-size-10</code> (størst). Responsive kontekster bruker ett hakk ned.</>}
            >
                <div className="scale">
                    {fontSizeSteps.map((step) => <FontSizeRow key={step.token} {...step} />)}
                </div>
            </Section>

            <Section
                heading="Navngitte tekststiler"
                description="Jøkul kombinerer størrelse, linjehøyde og vekt i navngitte stilroller. Bruk tokenene direkte i CSS — ikke hardkod verdiene."
            >
                <div className="styles">
                    {namedStyles.map((style) => <NamedStyleRow key={style.name} {...style} />)}
                </div>
            </Section>

            <Section
                heading="Skriftvekt"
                description="Jøkul eksponerer to vektnivåer. Bruk aldri hardkodede tallverdier — benytt tokens."
            >
                <div className="weights">
                    {weightSteps.map((step) => <WeightRow key={step.token} {...step} />)}
                </div>
            </Section>

            <Section
                heading="Linjehøyde"
                description="Tre nivåer dekker alle brukstilfeller — fra tett displaytekst til luftig brødtekst."
            >
                <div className="line-height-grid">
                    {lineHeightSteps.map((step) => (
                        <LineHeightCard key={step.token} {...step} sampleText={LINE_HEIGHT_SAMPLE} />
                    ))}
                </div>
            </Section>
        </div>
    );
}
