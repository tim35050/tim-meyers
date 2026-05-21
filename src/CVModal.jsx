// CVModal.jsx — compact CV-row detail: bullets + clickable project tiles.
import { useEffect } from "react";
import { Cover } from "./primitives.jsx";
import { renderWithLinks } from "./ProjectModal.jsx";

export function CVModal({
  experience,
  getProject,
  onClose,
  onOpenProject,
  ink,
  accent,
  muted,
  bg,
}) {
  useEffect(() => {
    if (!experience) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [experience, onClose]);

  if (!experience) return null;

  const projects = (experience.projects || [])
    .map((idx) => getProject(idx))
    .filter(Boolean);

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,.7)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        overflowY: "auto",
        padding: "8vh 4vw",
        animation: "pm-fade-in .25s ease forwards",
      }}
    >
      <article
        onClick={(e) => e.stopPropagation()}
        data-h-modal
        style={{
          background: bg,
          color: ink,
          width: "100%",
          maxWidth: 760,
          margin: "0 auto",
          border: `1px solid ${ink}24`,
          boxShadow: "0 40px 100px rgba(0,0,0,.55)",
          position: "relative",
          animation: "pm-slide-up .35s cubic-bezier(.2,.7,.3,1) forwards",
        }}
      >
        {/* Close — fixed to viewport so it's always reachable while scrolling.
            IMPORTANT: `all: unset` must be the FIRST property so it doesn't
            wipe the positioning declared after it. */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            all: "unset",
            position: "fixed",
            top: "max(18px, env(safe-area-inset-top))",
            right: "max(18px, env(safe-area-inset-right))",
            zIndex: 210,
            cursor: "pointer",
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
            display: "flex",
            width: 44,
            height: 44,
            borderRadius: 99,
            background: `${bg}cc`,
            color: ink,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            lineHeight: 1,
            transition: "background .15s",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: `1px solid ${ink}22`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${ink}22`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = `${bg}cc`;
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{ padding: "44px 44px 24px" }}>
          <div
            className="mono"
            style={{
              display: "flex",
              gap: 14,
              alignItems: "baseline",
              fontSize: 11,
              color: muted,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              marginBottom: 18,
              paddingBottom: 14,
              borderBottom: `1px solid ${ink}1c`,
            }}
          >
            <span style={{ color: accent }}>●</span>
            <span>{experience.dates}</span>
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(28px, 3.4vw, 44px)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              fontWeight: 800,
              color: ink,
            }}
          >
            {experience.org}
          </h2>
          <div
            className="mono"
            style={{
              margin: "16px 0 0",
              fontSize: 11,
              color: muted,
              letterSpacing: ".14em",
              textTransform: "uppercase",
            }}
          >
            Role · {experience.role}
          </div>
        </div>

        {/* Bullets */}
        {experience.bullets && experience.bullets.length > 0 && (
          <div style={{ padding: "8px 44px 36px" }}>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              {experience.bullets.map((b, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    gap: 14,
                    fontSize: "clamp(14px, 1.05vw, 16px)",
                    lineHeight: 1.55,
                    color: i === 0 ? ink : `${ink}cc`,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      flex: "0 0 auto",
                      width: 5,
                      height: 5,
                      borderRadius: 99,
                      background: accent,
                      marginTop: 9,
                    }}
                  />
                  <span>{renderWithLinks(b, accent)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Project tiles */}
        {projects.length > 0 && (
          <div
            style={{
              padding: "28px 44px 44px",
              borderTop: `1px solid ${ink}1c`,
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 10.5,
                color: muted,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                marginBottom: 18,
              }}
            >
              <span style={{ color: accent }}>●</span>{" "}
              Related work · {projects.length}{" "}
              {projects.length === 1 ? "piece" : "pieces"}
            </div>
            <div
              data-h-cv-related
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
              }}
            >
              {projects.map((p) => (
                <button
                  key={p.idx}
                  onClick={() => onOpenProject(p)}
                  style={{
                    all: "unset",
                    cursor: "pointer",
                    display: "block",
                    width: "100%",
                    boxSizing: "border-box",
                    textAlign: "left",
                    background: `${ink}06`,
                    border: `1px solid ${ink}14`,
                    transition:
                      "background .2s, border-color .2s, transform .2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = `${ink}10`;
                    e.currentTarget.style.borderColor = `${accent}66`;
                    e.currentTarget.style.transform = "translateY(-1px)";
                    const arrow = e.currentTarget.querySelector("[data-arr]");
                    if (arrow) arrow.style.transform = "translate(2px, -2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = `${ink}06`;
                    e.currentTarget.style.borderColor = `${ink}14`;
                    e.currentTarget.style.transform = "translateY(0)";
                    const arrow = e.currentTarget.querySelector("[data-arr]");
                    if (arrow) arrow.style.transform = "translate(0, 0)";
                  }}
                >
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    {p.media ? (
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "1.7 / 1",
                          overflow: "hidden",
                          background: p.colors?.[0] || "#000",
                        }}
                      >
                        <img
                          src={p.media}
                          alt={p.title}
                          loading="lazy"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            display: "block",
                          }}
                        />
                      </div>
                    ) : (
                      <Cover colors={p.colors} seed={p.seed} ratio={1.7} />
                    )}
                  </div>
                  <div style={{ padding: "14px 16px 14px" }}>
                    <div
                      className="mono"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        color: muted,
                        fontSize: 10,
                        letterSpacing: ".14em",
                        textTransform: "uppercase",
                        marginBottom: 8,
                      }}
                    >
                      <span>{p.kind}</span>
                      <span>{p.year}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: 12,
                      }}
                    >
                      <h4
                        style={{
                          margin: 0,
                          fontSize: 16,
                          lineHeight: 1.2,
                          letterSpacing: "-0.01em",
                          fontWeight: 700,
                          color: ink,
                        }}
                      >
                        {p.title}
                      </h4>
                      <span
                        data-arr
                        style={{
                          fontSize: 13,
                          color: accent,
                          flex: "0 0 auto",
                          marginTop: 2,
                          transition:
                            "transform .35s cubic-bezier(.2,.7,.3,1)",
                        }}
                      >
                        ↗
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
