import { useState, useEffect, useCallback } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [ready, setReady] = useState(false);
    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        try {
            const stored = window.localStorage.getItem(key);
            if (stored !== null) setValue(JSON.parse(stored) as T);
        } catch {
            // unavailable — keep initialValue
        }
        setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    useEffect(() => {
        if (!ready) return;
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // storage full or unavailable — fail silently
        }
    }, [key, value, ready]);

    const set = useCallback((next: T | ((prev: T) => T)) => {
        setValue(next);
    }, []);

    return [value, set, ready] as const;
}
