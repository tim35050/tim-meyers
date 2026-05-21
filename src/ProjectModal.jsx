// ProjectModal.jsx — deep-dive scrollable article with media gallery
import { useEffect, useState } from "react";
import { Cover } from "./primitives.jsx";
import { Lightbox } from "./Lightbox.jsx";

// Renders a paragraph string with markdown-style links: [text](url).
// The URL pattern allows one level of nested parens so Wikipedia URLs
// like `(rail)` resolve correctly. Exported so the Lightbox can reuse it
// on figure captions.
export function renderWithLinks(text, accent) {
  const parts = [];
  const regex = /\[([^\]]+)\]\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g;
  let lastIdx = 0;
  let key = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIdx) {
      parts.push(text.slice(lastIdx, match.index));
    }
    parts.push(
      <a
        key={key++}
        href={match[2]}
        target="_blank"
        rel="noreferrer"
        style={{
          color: "inherit",
          borderBottom: `1px solid ${accent}88`,
          transition: "border-color .2s, color .2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderBottomColor = accent;
          e.currentTarget.style.color = accent;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderBottomColor = `${accent}88`;
          e.currentTarget.style.color = "inherit";
        }}
      >
        {match[1]}
      </a>,
    );
    lastIdx = regex.lastIndex;
  }
  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }
  return parts;
}

// ─── Media item — image / video / generative placeholder ───────────────
function MediaItem({ item, ink, accent, muted, big = false, ratio, onClick }) {
  const r = ratio || item.ratio || 1.5;
  const clickable = typeof onClick === "function";
  const figcap = (item.caption || item.figure) && (
    <figcaption
      className="mono"
      style={{
        marginTop: 10,
        fontSize: 10.5,
        color: muted,
        letterSpacing: ".1em",
        textTransform: "uppercase",
        display: "flex",
        justifyContent: "space-between",
        gap: 14,
      }}
    >
      <span>{renderWithLinks(item.caption || "", accent)}</span>
      {item.figure && (
        <span style={{ whiteSpace: "nowrap", color: ink, fontWeight: 600 }}>
          {item.figure}
        </span>
      )}
    </figcaption>
  );

  const mediaStyle = {
    width: "100%",
    aspectRatio: String(r),
    objectFit: "cover",
    display: "block",
    background: `${ink}10`,
    cursor: clickable ? "zoom-in" : "default",
  };

  if (item.type === "image") {
    return (
      <figure style={{ margin: 0 }}>
        <img
          src={item.src}
          alt={item.alt || ""}
          onClick={onClick}
          style={mediaStyle}
        />
        {figcap}
      </figure>
    );
  }
  if (item.type === "video") {
    return (
      <figure style={{ margin: 0 }}>
        <video
          src={item.src}
          autoPlay
          muted
          loop
          playsInline
          onClick={onClick}
          style={mediaStyle}
        />
        {figcap}
      </figure>
    );
  }
  // placeholder
  return (
    <figure style={{ margin: 0 }}>
      <Cover
        colors={item.colors}
        seed={item.seed}
        ratio={r}
        label={item.label || "drop image / video"}
        meta={item.figure || ""}
        big={big}
      />
      {figcap}
    </figure>
  );
}

export function ProjectModal({ project, onClose, ink, accent, muted, bg }) {
  const [lightboxIdx, setLightboxIdx] = useState(null);

  // Scroll lock — only captures/restores body overflow on open/close.
  // Kept separate from the Escape-key effect so it doesn't re-run when
  // lightboxIdx changes (which would re-capture `prev` after the Lightbox
  // had already overwritten it, corrupting the restored value).
  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [project]);

  // Escape key — gated so it doesn't close the project modal while the
  // lightbox is open (the lightbox handles its own Escape).
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => {
      if (e.key === "Escape" && lightboxIdx == null) onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [project, onClose, lightboxIdx]);

  // Reset lightbox when the underlying project changes
  useEffect(() => {
    setLightboxIdx(null);
  }, [project]);

  if (!project) return null;

  const paras = project.details || [project.blurb];

  // Only image/video items are lightbox-eligible (placeholders are skipped).
  const lightboxMedia = (project.gallery || []).filter(
    (g) => g.type === "image" || g.type === "video",
  );

  // Set `gallery: [{type:'image'|'video', src, caption, figure}, ...]` on a
  // project to render a Gallery section. Projects without a gallery skip the
  // section entirely (no auto-generated placeholders).
  const gallery = project.gallery || [];

  return (
    <div
      data-h-modal-backdrop
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
        padding: "4vh 4vw",
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
          maxWidth: 1180,
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
          data-h-modal-close
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

        {/* Hero figure — use project.media when available, otherwise generative cover */}
        <div style={{ padding: 0, marginTop: -56 }}>
          <MediaItem
            item={
              project.media
                ? {
                    type: /\.(mp4|webm|mov|m4v)$/i.test(project.media)
                      ? "video"
                      : "image",
                    src: project.media,
                    alt: project.title,
                  }
                : {
                    type: "placeholder",
                    colors: project.colors,
                    seed: project.seed,
                    label: project.kind,
                    figure: `№ ${String(project.idx).padStart(2, "0")}`,
                  }
            }
            ink={ink}
            accent={accent}
            muted={muted}
            ratio={1.85}
            big
          />
        </div>

        {/* Title block */}
        <div style={{ padding: "48px 8% 8px", maxWidth: 920, margin: "0 auto" }}>
          <div
            className="mono"
            style={{
              fontSize: 11,
              color: muted,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              display: "flex",
              gap: 14,
              alignItems: "baseline",
              marginBottom: 18,
              paddingBottom: 14,
              borderBottom: `1px solid ${ink}1c`,
            }}
          >
            <span style={{ color: accent }}>●</span>
            <span>{project.kind}</span>
            <span style={{ marginLeft: "auto" }}>{project.year}</span>
          </div>
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(34px, 4vw, 64px)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              fontWeight: 800,
              color: ink,
            }}
          >
            {project.title}
          </h2>
          <div
            className="mono"
            style={{
              margin: "18px 0 0",
              fontSize: 11,
              color: muted,
              letterSpacing: ".14em",
              textTransform: "uppercase",
            }}
          >
            Role · {project.role}
          </div>
        </div>

        {/* Body — strings render as paragraphs, { h: "..." } render as headings */}
        <div style={{ padding: "32px 8% 16px", maxWidth: 760, margin: "0 auto" }}>
          {paras.map((para, i) => {
            if (typeof para === "object" && para && para.h) {
              return (
                <h3
                  key={i}
                  style={{
                    margin: "36px 0 14px",
                    fontSize: "clamp(20px, 1.8vw, 28px)",
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    fontWeight: 700,
                    color: ink,
                  }}
                >
                  {para.h}
                </h3>
              );
            }
            return (
              <p
                key={i}
                style={{
                  margin: "0 0 18px",
                  fontSize: "clamp(15px, 1.15vw, 17.5px)",
                  lineHeight: 1.65,
                  color: i === 0 ? ink : `${ink}cc`,
                }}
              >
                {renderWithLinks(para, accent)}
              </p>
            );
          })}
        </div>

        {/* Gallery */}
        {gallery.length > 0 && (
          <div
            style={{ padding: "40px 8% 16px", maxWidth: 1080, margin: "0 auto" }}
          >
            <div
              className="mono"
              style={{
                fontSize: 10.5,
                color: muted,
                letterSpacing: ".18em",
                textTransform: "uppercase",
                paddingBottom: 14,
                marginBottom: 24,
                borderBottom: `1px solid ${ink}1c`,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                <span style={{ color: accent }}>●</span> Gallery ·{" "}
                {gallery.length} {gallery.length === 1 ? "figure" : "figures"}
              </span>
              <span>{`${project.title.toLowerCase()} · plates`}</span>
            </div>
            <div
              data-h-gallery
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "28px 24px",
              }}
            >
              {gallery.map((m, i) => {
                const isMedia = m.type === "image" || m.type === "video";
                const lbIdx = isMedia
                  ? lightboxMedia.findIndex((lm) => lm === m)
                  : -1;
                return (
                  <MediaItem
                    key={i}
                    item={m}
                    ink={ink}
                    accent={accent}
                    muted={muted}
                    onClick={
                      isMedia && lbIdx >= 0
                        ? () => setLightboxIdx(lbIdx)
                        : undefined
                    }
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          className="mono"
          style={{
            padding: "40px 8% 56px",
            maxWidth: 1080,
            margin: "0 auto",
            borderTop: `1px solid ${ink}1c`,
            marginTop: 30,
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10.5,
                padding: "5px 11px",
                borderRadius: 99,
                border: `1px solid ${ink}22`,
                color: `${ink}aa`,
                letterSpacing: ".04em",
              }}
            >
              {tag}
            </span>
          ))}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: 11,
                color: accent,
                marginLeft: "auto",
                borderBottom: `1px solid ${accent}66`,
                paddingBottom: 1,
                letterSpacing: ".08em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {new URL(project.link).hostname.replace("www.", "")} ↗
            </a>
          )}
        </div>
      </article>

      <Lightbox
        items={lightboxMedia}
        index={lightboxIdx}
        onIndexChange={setLightboxIdx}
        onClose={() => setLightboxIdx(null)}
        accent={accent}
      />
    </div>
  );
}
