import { Flex } from "@fremtind/jokul/flex";
import { tokenPosts } from "@/features/ds/jokul/_token/data";
import { TokenFeature } from "@/features/ds/jokul/_shared/components/TokenFeature";
import { PageHeader } from "@/components/ds/PageHeader";
import { Grid } from "@/features/ds/jokul/_shared/components/Grid";

export default function TokenPage() {
    return (
        <Flex as="main" className="page" direction="column" gap="2xl">
            <PageHeader
                title="Designtokens"
                description="Fundamentene i Jøkul — typografi, farger og spacing. Les disse for å forstå designsystemets kjerneprinsipper."
            />
            <Grid columns={3} gap="m">
                {tokenPosts.map((post) => (
                    <TokenFeature key={post.id} post={post} />
                ))}
            </Grid>
        </Flex>
    );
}
