import { redirect } from "next/navigation";

type Awaitable<T> = T | Promise<T>;

export default async function MonsterPatternRedirect({
    params,
}: {
    params: Awaitable<{ id: string }>;
}) {
    const resolvedParams = await params;
    redirect(`/ds/monster/${resolvedParams.id}`);
}
