
import { tokenPosts } from "@/features/ds/jokul/_token/data";
import { componentDocs } from "@/features/ds/jokul/_component-docs/data";
import { TokenFeature } from "@/features/ds/jokul/_shared/components/TokenFeature";
import { ComponentCard } from "@/features/ds/jokul/_shared/components/ComponentCard";
import { Grid } from "@/features/ds/jokul/_shared/components/Grid";
import { PageHeader } from "@/components/ds/PageHeader";
import { Link } from "@fremtind/jokul/link";
import { Flex } from "@fremtind/jokul/flex";
import "../_styles/home.scss";

export default function Home() {
    return (
        <Flex as="main" className="page home" direction="column" gap="2xl">
            <div className="hero">
                <PageHeader
                    title={<>Bygg bedre<br />med Jøkul</>}
                    description={(
                        <>
                            Artikler, veiledninger og komponentdokumentasjon for deg som bygger
                            med Fremtinds designsystem.
                        </>
                    )}
                />
            </div>

            <Flex as="section" className="section" direction="column" gap="l">
                <Flex className="section-header" direction="column" gap="xs">
                    <h2><Link href="/ds/jokul/component">Komponenter</Link></h2>
                    <p>Prop-tabeller og kodeeksempler for alle Jøkul-komponenter.</p>
                </Flex>
                <Grid columns={3} gap="m">
                    {componentDocs.filter((d) => d.showOnOverview !== false).slice(0, 8).map((doc) => (
                        <ComponentCard key={doc.id} doc={doc} />
                    ))}
                </Grid>
                <Link href="/ds/jokul/component">Se
                    alle {componentDocs.filter((d) => d.showOnOverview !== false).length} komponenter</Link>
            </Flex>

            <Flex as="section" className="section" direction="column" gap="l">
                <Flex className="section-header" direction="column" gap="xs">
                    <h2><Link href="/ds/jokul/token">Designtokens</Link></h2>
                    <p>Fundamentene i Jøkul — typografi, farger og designtokens.</p>
                </Flex>
                <Grid columns={3} gap="m">
                    {tokenPosts.map((post) => (
                        <TokenFeature key={post.id} post={post} />
                    ))}
                </Grid>
            </Flex>
        </Flex>
    );
}
