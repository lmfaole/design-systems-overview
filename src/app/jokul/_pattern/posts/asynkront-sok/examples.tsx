"use client";

import { useEffect, useRef, useState } from "react";
import { Flex } from "@fremtind/jokul/flex";
import { Loader } from "@fremtind/jokul/loader";
import { TextInput } from "@fremtind/jokul/text-input";
import { ListItem, UnorderedList } from "@fremtind/jokul/list";

type SearchResponse = {
    query: string;
    results: string[];
};

function fakeSearch(query: string): Promise<SearchResponse> {
    // Deterministic delays to make "stale response wins" easy to reproduce:
    // shorter queries resolve slower than longer ones.
    const ms = Math.max(0, 3 - query.length) * 450 + 250;

    return new Promise((resolve) => {
        const id = setTimeout(() => {
            clearTimeout(id);
            resolve({
                query,
                results: query
                    ? [`${query} - treff 1`, `${query} - treff 2`]
                    : [],
            });
        }, ms);
    });
}

export function StaleResponsesExample() {
    const [query, setQuery] = useState("a");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<SearchResponse>({ query: "", results: [] });
    const mounted = useRef(true);

    useEffect(() => {
        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        setLoading(true);
        fakeSearch(query).then((r) => {
            if (!mounted.current) return;
            setResponse(r);
            setLoading(false);
        });
    }, [query]);

    return <SearchExample query={query} onQueryChange={setQuery} loading={loading} response={response} />;
}

export function IgnoreStaleResponsesExample() {
    const [query, setQuery] = useState("a");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<SearchResponse>({ query: "", results: [] });
    const requestId = useRef(0);

    useEffect(() => {
        const id = ++requestId.current;

        setLoading(true);
        fakeSearch(query).then((r) => {
            if (id !== requestId.current) return; // Ignore stale responses.
            setResponse(r);
            setLoading(false);
        });
    }, [query]);

    return <SearchExample query={query} onQueryChange={setQuery} loading={loading} response={response} />;
}

function SearchExample({
    query,
    onQueryChange,
    loading,
    response,
}: {
    query: string;
    onQueryChange: (next: string) => void;
    loading: boolean;
    response: SearchResponse;
}) {
    return (
        <div style={{ width: "100%", maxWidth: "20rem" }}>
            <Flex direction="column" gap="xs">
                <TextInput
                    label="Sok"
                    value={query}
                    onChange={(e) => onQueryChange(e.target.value)}
                    helpLabel={`Prov a skrive "ab" raskt etter "a".`}
                />

                <Flex alignItems="center" gap="xs">
                    {loading ? <Loader textDescription="Soker" /> : <strong>Resultat</strong>}
                    <small className="muted">for: {response.query || "–"}</small>
                </Flex>

                {response.results.length > 0 ? (
                    <UnorderedList>
                        {response.results.map((r) => (
                            <ListItem key={r}>{r}</ListItem>
                        ))}
                    </UnorderedList>
                ) : (
                    <small className="muted">Ingen treff</small>
                )}
            </Flex>
        </div>
    );
}
