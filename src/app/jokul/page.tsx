"use client";

import {tokenPosts} from "@/app/jokul/_token/data";
import {componentDocs} from "@/app/jokul/_component-docs/data";
import {TokenFeature} from "@/shared/components/TokenFeature";
import {ComponentCard} from "@/shared/components/ComponentCard";
import {Grid} from "@/shared/components/Grid";
import {Link} from "@fremtind/jokul/link";
import {Flex} from "@fremtind/jokul/flex";
import "./home.scss";

export default function Home() {
    return (
        <Flex as="main" className="home" direction="column" gap="2xl">
            <header className="home__hero">
                <h1 className="home__headline">Bygg bedre<br/>med Jøkul</h1>
                <p className="home__intro lead muted">
                    Artikler, veiledninger og komponentdokumentasjon for deg som bygger
                    med Fremtinds designsystem.
                </p>
            </header>

            <Flex as="section" className="home__section" direction="column" gap="l">
                <Flex className="home__section-header" direction="column" gap="xs">
                    <h2><Link href="/jokul/component">Komponenter</Link></h2>
                    <p>Prop-tabeller og kodeeksempler for alle Jøkul-komponenter.</p>
                </Flex>
                <Grid columns={3} gap="m">
                    {componentDocs.filter((d) => d.showOnOverview !== false).slice(0, 8).map((doc) => (
                        <ComponentCard key={doc.id} doc={doc} />
                    ))}
                </Grid>
                <Link href="/jokul/component">Se
                    alle {componentDocs.filter((d) => d.showOnOverview !== false).length} komponenter</Link>
            </Flex>

            <Flex as="section" className="home__section" direction="column" gap="l">
                <Flex className="home__section-header" direction="column" gap="xs">
                    <h2><Link href="/jokul/token">Designtokens</Link></h2>
                    <p>Fundamentene i Jøkul — typografi, farger og designtokens.</p>
                </Flex>
                <Grid columns={3} gap="m">
                    {tokenPosts.map((post) => (
                        <TokenFeature key={post.id} post={post}/>
                    ))}
                </Grid>
            </Flex>
        </Flex>
    );
}
