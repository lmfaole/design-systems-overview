import { redirect } from "next/navigation";

type SearchParams = {
    q?: string;
};

export default async function SearchRedirect({
    searchParams,
}: {
    searchParams?: Promise<SearchParams> | SearchParams;
}) {
    const resolvedSearchParams = await Promise.resolve(searchParams);
    const query = typeof resolvedSearchParams?.q === "string" ? resolvedSearchParams.q.trim() : "";

    redirect(query ? `/ds/sok?q=${encodeURIComponent(query)}` : "/ds/sok");
}
