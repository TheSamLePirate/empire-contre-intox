import { useId, useMemo, useState } from "react";

export interface SearchItem {
  id: string;
  label: string;
  searchText: string;
}

interface SearchFieldProps {
  items: readonly SearchItem[];
  onResults?: (results: readonly SearchItem[]) => void;
}

export function SearchField({ items, onResults }: SearchFieldProps) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("fr");
    if (!normalized) return items;
    return items.filter((item) => item.searchText.toLocaleLowerCase("fr").includes(normalized));
  }, [items, query]);

  const updateQuery = (value: string) => {
    setQuery(value);
    const normalized = value.trim().toLocaleLowerCase("fr");
    const nextResults = normalized
      ? items.filter((item) => item.searchText.toLocaleLowerCase("fr").includes(normalized))
      : items;
    onResults?.(nextResults);
  };

  return (
    <div className="eci-search">
      <label htmlFor={inputId}>Rechercher dans les dossiers</label>
      <input
        id={inputId}
        type="search"
        value={query}
        onChange={(event) => updateQuery(event.currentTarget.value)}
        placeholder="Sujet, auteur ou mot-clé…"
      />
      <p aria-live="polite">{results.length} résultat{results.length === 1 ? "" : "s"}</p>
    </div>
  );
}
