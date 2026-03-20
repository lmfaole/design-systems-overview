import type { DsSearchMatchField, DsSearchResult } from "@/app/ds/_data/search";
import "./search-result-card.scss";

interface SearchResultCardProps {
    result: DsSearchResult;
}

export function SearchResultCard({ result }: SearchResultCardProps) {
    return (
        <li className="ds-search-result-card-item">
            <article className="ds-search-result-card" data-kind={result.doc.kind}>
                <p className="eyebrow">{result.doc.meta}</p>
                <h3 className="title">
                    <a href={result.doc.href}>{result.doc.title}</a>
                </h3>
                <p className="description">{result.doc.description}</p>
                <p className="match">
                    <small>
                        Treff i {getMatchLabel(result.match.field)}: {result.match.excerpt}
                    </small>
                </p>
            </article>
        </li>
    );
}

function getMatchLabel(field: DsSearchMatchField) {
    switch (field) {
        case "title":
            return "tittel";
        case "description":
            return "beskrivelse";
        case "keyword":
            return "nøkkelord";
        case "meta":
            return "metadata";
    }
}
