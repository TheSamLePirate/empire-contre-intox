import { useEffect, useMemo, useRef, useState } from "react";
import { entropyVisualizations } from "../registry";

export function EntropyVisualizationsGallery() {
  const galleryRef = useRef<HTMLElement>(null);
  const [selectedId, setSelectedId] = useState("V1");
  const groups = useMemo(
    () =>
      Array.from(new Set(entropyVisualizations.map((item) => item.act))).map(
        (act) => ({
          act,
          items: entropyVisualizations.filter((item) => item.act === act),
        }),
      ),
    [],
  );
  const selected = useMemo(
    () =>
      entropyVisualizations.find((item) => item.id === selectedId) ??
      entropyVisualizations[0]!,
    [selectedId],
  );
  const selectedIndex = entropyVisualizations.indexOf(selected);
  const Visualization = selected.component;
  useEffect(() => {
    galleryRef.current?.scrollIntoView({ block: "start" });
  }, [selectedId]);
  return (
    <main ref={galleryRef} className="entropy-gallery">
      <nav
        className="entropy-viz__controls"
        aria-label="Choisir une visualisation"
      >
        <label htmlFor="entropy-gallery-select">Visualisation</label>
        <select
          id="entropy-gallery-select"
          value={selectedId}
          onChange={(event) => setSelectedId(event.currentTarget.value)}
        >
          {groups.map((group) => (
            <optgroup key={group.act} label={group.act}>
              {group.items.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.id} — {item.title}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <span className="entropy-gallery__position" aria-live="polite">
          {selectedIndex + 1} / {entropyVisualizations.length} · {selected.act}
        </span>
        <div
          className="entropy-gallery__paging"
          aria-label="Parcourir les visualisations"
        >
          <button
            type="button"
            aria-label="Visualisation précédente"
            disabled={selectedIndex === 0}
            onClick={() =>
              setSelectedId(entropyVisualizations[selectedIndex - 1]!.id)
            }
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Visualisation suivante"
            disabled={selectedIndex === entropyVisualizations.length - 1}
            onClick={() =>
              setSelectedId(entropyVisualizations[selectedIndex + 1]!.id)
            }
          >
            →
          </button>
        </div>
      </nav>
      <Visualization />
    </main>
  );
}

export default EntropyVisualizationsGallery;
