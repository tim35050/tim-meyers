// Lightbox.jsx — full-screen viewer with prev/next nav over a gallery.
// Rendered via portal into document.body so it isn't scoped by any ancestor
// that establishes a containing block (e.g. ProjectModal's backdrop-filter).
import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { renderWithLinks } from "./renderWithLinks.js";

export function Lightbox({ items, index, onClose, onIndexChange, accent }) {
  const count = items?.length || 0;
  const item = index != null ? items[index] : null;

  const goPrev = useCallback(() => {
    if (count < 2) return;
    onIndexChange((index - 1 + count) % count);
  }, [index, count, onIndexChange]);

  const goNext = useCallback(() => {
    if (count < 2) return;
    onIndexChange((index + 1) % count);
  }, [index, count, onIndexChange]);

  useEffect(() => {
    if (index == null) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [index, onClose, goPrev, goNext]);

  // Lock body scroll while open — depends on the boolean open-state, NOT on
  // `index` (which changes on every prev/next nav and would needlessly
  // re-capture `prev` mid-session).
  const isOpen = index != null;
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  if (index == null || !item) return null;

  const navBtnStyle = {
    all: "unset",
    cursor: "pointer",
    position: "absolute",
    zIndex: 5,
    display: "flex",
    width: 48,
    height: 48,
    borderRadius: 99,
    background: "rgba(255,255,255,.08)",
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 26,
    lineHeight: 1,
    border: "1px solid rgba(255,255,255,.18)",
    transition: "background .2s, transform .2s",
    backdropFilter: "blur(8px)",
  };

  return createPortal(
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(0,0,0,.92)",
        WebkitBackdropFilter: "blur(20px)",
        backdropFilter: "blur(20px)",
        display: "flex",
        flexDirection: "column",
        animation: "pm-fade-in .2s ease forwards",
      }}
    >
      {/* Close */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        style={{ ...navBtnStyle, top: 18, right: 18, width: 38, height: 38, fontSize: 18 }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,.18)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,.08)";
        }}
      >
        ×
      </button>

      {count > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            aria-label="Previous"
            style={{ ...navBtnStyle, left: 22, top: "50%", transform: "translateY(-50%)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,.08)";
            }}
          >
            ‹
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            aria-label="Next"
            style={{ ...navBtnStyle, right: 22, top: "50%", transform: "translateY(-50%)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,.18)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,.08)";
            }}
          >
            ›
          </button>
        </>
      )}

      {/* Media — click on the media itself does not close */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 92px 24px",
          minHeight: 0,
        }}
      >
        {item.type === "video" ? (
          <video
            key={item.src}
            src={item.src}
            controls
            autoPlay
            playsInline
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              display: "block",
              animation: "pm-slide-up .25s cubic-bezier(.2,.7,.3,1)",
            }}
          />
        ) : (
          <img
            key={item.src}
            src={item.src}
            alt={item.alt || item.caption || ""}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              display: "block",
              animation: "pm-slide-up .25s cubic-bezier(.2,.7,.3,1)",
            }}
          />
        )}
      </div>

      {/* Caption + counter */}
      <div
        className="mono"
        onClick={(e) => e.stopPropagation()}
        style={{
          padding: "0 32px 28px",
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 18,
          fontSize: 11,
          letterSpacing: ".14em",
          textTransform: "uppercase",
        }}
      >
        <span style={{ opacity: 0.75 }}>
          {renderWithLinks(item.caption || "", accent || "#fff")}
        </span>
        <span style={{ opacity: 0.9, whiteSpace: "nowrap" }}>
          {`${index + 1} / ${count}`}
        </span>
      </div>
    </div>,
    document.body,
  );
}
