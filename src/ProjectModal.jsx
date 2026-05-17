// ProjectModal.jsx — deep-dive scrollable article with media gallery
import { useEffect } from "react";
import { Cover } from "./primitives.jsx";

// ─── Media item — image / video / generative placeholder ───────────────
function MediaItem({ item, ink, muted, big = false, ratio }) {
  const r = ratio || item.ratio || 1.5;
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
      <span>{item.caption}</span>
      {item.figure && (
        <span style={{ whiteSpace: "nowrap", color: ink, fontWeight: 600 }}>
          {item.figure}
        </span>
      )}
    </figcaption>
  );

  if (item.type === "image") {
    return (
      <figure style={{ margin: 0 }}>
        <img
          src={item.src}
          alt={item.alt || ""}
          style={{
            width: "100%",
            aspectRatio: String(r),
            objectFit: "cover",
            display: "block",
            background: `${ink}10`,
          }}
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
          style={{
            width: "100%",
            aspectRatio: String(r),
            objectFit: "cover",
            display: "block",
            background: `${ink}10`,
          }}
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
  useEffect(() => {
    if (!project) return;
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
  }, [project, onClose]);

  if (!project) return null;

  const paras = project.details || [project.blurb];

  // Default gallery: 4 placeholder slots tuned to the project's palette.
  // Replace by setting `gallery: [{type:'image'|'video', src, caption, figure}, ...]`
  // on the project.
  const gallery = project.gallery || [
    {
      type: "placeholder",
      colors: project.colors,
      seed: project.seed + 17,
      ratio: 1.5,
      caption: "drop image / video — overview",
      figure: "Fig. 01",
    },
    {
      type: "placeholder",
      colors: project.colors,
      seed: project.seed + 31,
      ratio: 1.5,
      caption: "drop image / video — detail",
      figure: "Fig. 02",
    },
    {
      type: "placeholder",
      colors: project.colors,
      seed: project.seed + 47,
      ratio: 1.5,
      caption: "drop image / video — process",
      figure: "Fig. 03",
    },
    {
      type: "placeholder",
      colors: project.colors,
      seed: project.seed + 59,
      ratio: 1.5,
      caption: "drop image / video — outcome",
      figure: "Fig. 04",
    },
  ];

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
        {/* sticky close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "sticky",
            top: 18,
            marginLeft: "auto",
            marginRight: 18,
            marginTop: 18,
            zIndex: 5,
            all: "unset",
            cursor: "pointer",
            display: "flex",
            width: 38,
            height: 38,
            borderRadius: 99,
            background: `${bg}cc`,
            color: ink,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 18,
            lineHeight: 1,
            transition: "background .2s",
            backdropFilter: "blur(8px)",
            border: `1px solid ${ink}22`,
            float: "right",
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

        {/* Hero figure */}
        <div style={{ padding: 0, marginTop: -56 }}>
          <MediaItem
            item={{
              type: "placeholder",
              colors: project.colors,
              seed: project.seed,
              label: project.kind,
              figure: `№ ${String(project.idx).padStart(2, "0")}`,
            }}
            ink={ink}
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

        {/* Body */}
        <div style={{ padding: "32px 8% 16px", maxWidth: 760, margin: "0 auto" }}>
          {paras.map((para, i) => (
            <p
              key={i}
              style={{
                margin: "0 0 18px",
                fontSize: "clamp(15px, 1.15vw, 17.5px)",
                lineHeight: 1.65,
                color: i === 0 ? ink : `${ink}cc`,
              }}
            >
              {para}
            </p>
          ))}
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
              {gallery.map((m, i) => (
                <MediaItem key={i} item={m} ink={ink} muted={muted} />
              ))}
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
    </div>
  );
}
