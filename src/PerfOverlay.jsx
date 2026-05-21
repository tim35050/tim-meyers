// PerfOverlay.jsx — on-screen debug log. Activated by appending ?debug=1
// (or anything truthy) to the URL. Useful for diagnosing mobile-only
// issues where remote inspector isn't easy to set up.
import { useEffect, useState } from "react";
import { subscribePerfLog, clearPerfLog } from "./perfLog.js";

function isDebugEnabled() {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    return params.has("debug");
  } catch {
    return false;
  }
}

export function PerfOverlay() {
  const [enabled, setEnabled] = useState(() => isDebugEnabled());
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    if (!enabled) return;
    return subscribePerfLog(setEntries);
  }, [enabled]);

  if (!enabled) return null;

  const recent = entries.slice(-10);

  return (
    <div
      style={{
        position: "fixed",
        left: 8,
        right: 8,
        bottom: 8,
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.88)",
        color: "#7df9aa",
        font: "11px/1.4 ui-monospace, 'SF Mono', Menlo, monospace",
        borderRadius: 8,
        border: "1px solid rgba(125, 249, 170, 0.3)",
        padding: "10px 12px",
        maxHeight: "40vh",
        overflowY: "auto",
        pointerEvents: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
          color: "#fff",
          fontWeight: 600,
        }}
      >
        <span>perf log · last {recent.length}</span>
        <button
          onClick={() => {
            clearPerfLog();
            setEntries([]);
          }}
          style={{
            all: "unset",
            cursor: "pointer",
            color: "#ff6b6b",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: ".1em",
          }}
        >
          clear
        </button>
      </div>
      {recent.length === 0 ? (
        <div style={{ opacity: 0.5 }}>(no entries yet)</div>
      ) : (
        recent.map((e, i) => {
          const prev = i > 0 ? recent[i - 1].t : null;
          const delta = prev != null ? (e.t - prev).toFixed(0) : null;
          return (
            <div key={i} style={{ display: "flex", gap: 6 }}>
              <span style={{ opacity: 0.55, width: 64 }}>
                {e.t.toFixed(0)}ms
              </span>
              {delta != null && (
                <span style={{ opacity: 0.4, width: 44 }}>+{delta}ms</span>
              )}
              <span>{e.label}</span>
              {e.extra != null && (
                <span style={{ opacity: 0.55 }}>· {String(e.extra)}</span>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
