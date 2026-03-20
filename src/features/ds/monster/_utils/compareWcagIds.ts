export function compareWcagIds(a: string, b: string) {
    const aParts = a.split(".").map((p) => Number.parseInt(p, 10));
    const bParts = b.split(".").map((p) => Number.parseInt(p, 10));
    const len = Math.max(aParts.length, bParts.length);

    for (let i = 0; i < len; i++) {
        const av = aParts[i] ?? -1;
        const bv = bParts[i] ?? -1;
        if (av !== bv) return av - bv;
    }

    return 0;
}
