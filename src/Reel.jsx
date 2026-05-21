// Reel.jsx — horizontal-scroll project reel + mobile vertical fallback
import { useEffect, useRef, useState } from "react";
import { Cover, useIsMobile } from "./primitives.jsx";

export function Reel({ projects, ink, accent, muted, bg, onOpen }) {
  // Use the stacked layout on tablets and landscape phones too — the desktop
  // horizontal scroll-jack feels too fast on anything smaller than a real
  // desktop viewport.
  const isMobile = useIsMobile(1024);
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (isMobile) return; // disable scroll-jack on mobile
    const onScroll = () => {
      if (!sectionRef.current || !trackRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const total = sectionRef.current.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const p = Math.max(0, Math.min(1, scrolled / total));

      const trackEl = trackRef.current;
      const overflow = trackEl.scrollWidth - window.innerWidth;
      trackEl.style.transform = `translate3d(${-p * overflow}px, 0, 0)`;

      const idx = Math.min(
        projects.length - 1,
        Math.floor(p * projects.length * 0.9999),
      );
      setActive(idx);

      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [projects.length, isMobile]);

  // ─── Mobile: stacked vertical layout ───
  if (isMobile) {
    return (
      <section
        id="work"
        style={{
          position: "relative",
          borderTop: `1px solid ${ink}14`,
          padding: "70px 0 40px",
        }}
      >
        <div
          className="mono"
          style={{
            padding: "0 6vw 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            fontSize: 11,
            color: muted,
            letterSpacing: ".14em",
            textTransform: "uppercase",
          }}
        >
          <span>
            <span style={{ color: accent }}>●</span> § 02 / selected work
          </span>
          <span>{`${String(projects.length).padStart(2, "0")} works`}</span>
        </div>
        {projects.map((p) => (
          <MobileSlide
            key={p.idx}
            p={p}
            ink={ink}
            accent={accent}
            muted={muted}
            bg={bg}
            onOpen={onOpen}
          />
        ))}
      </section>
    );
  }

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        position: "relative",
        height: `${projects.length * 110}vh`,
        borderTop: `1px solid ${ink}14`,
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: bg,
        }}
      >
        {/* Reel chrome — counter + title. Pushed below the global status bar. */}
        <div
          className="mono"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10,
            padding: "66px 6vw 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 11,
              color: muted,
              letterSpacing: ".14em",
              textTransform: "uppercase",
            }}
          >
            <span style={{ color: accent }}>●</span>
            <span>§ 02 / selected work</span>
          </div>
          <div
            style={{
              fontSize: 11,
              color: ink,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "baseline",
              gap: 6,
            }}
          >
            <span
              style={{
                fontSize: 40,
                fontWeight: 800,
                lineHeight: 1,
                color: ink,
                fontFamily: "'Schibsted Grotesk',sans-serif",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {String(active + 1).padStart(2, "0")}
            </span>
            <span style={{ color: muted }}>
              / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            height: "100vh",
            willChange: "transform",
            transition: "transform .12s linear",
          }}
        >
          {projects.map((p, i) => (
            <ReelSlide
              key={p.idx}
              p={p}
              ink={ink}
              accent={accent}
              muted={muted}
              bg={bg}
              isActive={i === active}
              onOpen={onOpen}
            />
          ))}
        </div>

        {/* Progress bar bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background: `${ink}14`,
            zIndex: 10,
          }}
        >
          <div
            ref={progressRef}
            style={{
              position: "absolute",
              inset: 0,
              transformOrigin: "left",
              transform: "scaleX(0)",
              background: accent,
              transition: "transform .12s linear",
            }}
          />
        </div>

        {/* Tip */}
        <div
          className="mono"
          style={{
            position: "absolute",
            bottom: 22,
            right: "6vw",
            zIndex: 11,
            fontSize: 10,
            color: muted,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            pointerEvents: "none",
          }}
        >
          ↓ scroll · the reel pans →
        </div>
      </div>
    </section>
  );
}

function ReelSlide({ p, ink, accent, muted, bg, onOpen }) {
  return (
    <div
      style={{
        flex: "0 0 100vw",
        height: "100vh",
        position: "relative",
        display: "grid",
        gridTemplateColumns: "1.35fr 1fr",
        gap: "4vw",
        padding: "150px 6vw 80px",
        alignItems: "center",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute",
          right: "6vw",
          top: 74,
          fontSize: "min(28vh, 16vw)",
          fontWeight: 800,
          color: ink,
          opacity: 0.06,
          letterSpacing: "-0.04em",
          lineHeight: 0.85,
          pointerEvents: "none",
        }}
      >
        {String(p.idx).padStart(2, "0")}
      </span>

      <div style={{ height: "72vh", position: "relative" }}>
        {p.media ? (
          <MediaCover
            src={p.media}
            bg={p.colors?.[0]}
            label={p.kind}
            meta={`№ 0${p.idx}`}
            fill
            big
          />
        ) : (
          <Cover
            colors={p.colors}
            seed={p.seed}
            fill
            big
            label={p.kind}
            meta={`№ 0${p.idx}`}
          />
        )}
        <div
          className="mono"
          style={{
            position: "absolute",
            left: 0,
            bottom: -26,
            fontSize: 10,
            color: muted,
            letterSpacing: ".16em",
            textTransform: "uppercase",
            display: "flex",
            gap: 14,
          }}
        >
          <span>◇ figure 0{p.idx}</span>
          <span style={{ opacity: 0.55 }}>—</span>
          <span>{p.title.toLowerCase()}</span>
        </div>
      </div>

      <div>
        <div
          className="mono"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            color: muted,
            marginBottom: 20,
            fontSize: 11,
            letterSpacing: ".16em",
            textTransform: "uppercase",
          }}
        >
          <span>{p.year}</span>
          <span>{p.role}</span>
        </div>
        <h3
          style={{
            margin: "0 0 26px",
            fontSize: "clamp(34px, 4.6vw, 64px)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            fontWeight: 700,
            color: ink,
          }}
        >
          {p.title}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: "clamp(14px, 1.1vw, 17px)",
            lineHeight: 1.65,
            color: `${ink}cc`,
            maxWidth: "46ch",
          }}
        >
          {p.blurb}
        </p>
        <div
          className="mono"
          style={{
            marginTop: 30,
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
          }}
        >
          {p.tags.map((tag) => (
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
        </div>
        <div
          className="mono"
          style={{
            marginTop: 24,
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
          }}
        >
          <button
            onClick={() => onOpen && onOpen(p)}
            style={{
              all: "unset",
              cursor: "pointer",
              padding: "12px 20px",
              background: accent,
              color: bg,
              fontSize: 11,
              letterSpacing: ".14em",
              textTransform: "uppercase",
              fontWeight: 600,
              borderRadius: 99,
              transition: "transform .25s cubic-bezier(.2,.7,.3,1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Read more →
          </button>
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: 11,
                color: `${ink}cc`,
                borderBottom: `1px solid ${ink}33`,
                paddingBottom: 2,
                letterSpacing: ".1em",
                textTransform: "uppercase",
              }}
            >
              {new URL(p.link).hostname.replace("www.", "")} ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function MediaCover({ src, bg, label, meta, ratio, fill = false, big = false }) {
  const isVideo = /\.(mp4|webm|mov|m4v)$/i.test(src);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        ...(fill ? { height: "100%" } : { aspectRatio: `${ratio || 1}` }),
        overflow: "hidden",
        background: bg || "#000",
      }}
    >
      {isVideo ? (
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <img
          src={src}
          alt={label || ""}
          loading="lazy"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}
      {(label || meta) && (
        <div
          className="mono"
          style={{
            position: "absolute",
            inset: big ? "28px 30px" : "16px 18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#fff",
            mixBlendMode: "difference",
            fontSize: big ? 11 : 10,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            pointerEvents: "none",
          }}
        >
          <span>{label}</span>
          {meta && <span style={{ opacity: 0.85 }}>{meta}</span>}
        </div>
      )}
    </div>
  );
}

function MobileSlide({ p, ink, accent, muted, bg, onOpen }) {
  return (
    <article
      style={{ padding: "40px 6vw 60px", borderTop: `1px solid ${ink}14` }}
    >
      <div
        className="mono"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          color: muted,
          marginBottom: 16,
          fontSize: 10,
          letterSpacing: ".14em",
          textTransform: "uppercase",
        }}
      >
        <span>
          № 0{p.idx} · {p.kind}
        </span>
        <span>{p.year}</span>
      </div>
      <h3
        style={{
          margin: "0 0 18px",
          fontSize: "clamp(28px, 7vw, 44px)",
          lineHeight: 1.04,
          letterSpacing: "-0.025em",
          fontWeight: 700,
          color: ink,
        }}
      >
        {p.title}
      </h3>
      <div style={{ marginBottom: 18 }}>
        {p.media ? (
          <MediaCover
            src={p.media}
            bg={p.colors?.[0]}
            label={p.kind}
            meta={`№ 0${p.idx}`}
            ratio={1.5}
          />
        ) : (
          <Cover
            colors={p.colors}
            seed={p.seed}
            ratio={1.5}
            label={p.kind}
            meta={`№ 0${p.idx}`}
          />
        )}
      </div>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: `${ink}cc` }}>
        {p.blurb}
      </p>
      <div
        className="mono"
        style={{
          marginTop: 20,
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          alignItems: "center",
        }}
      >
        {p.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 10,
              padding: "4px 9px",
              borderRadius: 99,
              border: `1px solid ${ink}22`,
              color: `${ink}aa`,
              letterSpacing: ".04em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <div
        className="mono"
        style={{
          marginTop: 18,
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          alignItems: "center",
        }}
      >
        <button
          onClick={() => onOpen && onOpen(p)}
          style={{
            all: "unset",
            cursor: "pointer",
            padding: "11px 18px",
            background: accent,
            color: bg,
            fontSize: 11,
            letterSpacing: ".14em",
            textTransform: "uppercase",
            fontWeight: 600,
            borderRadius: 99,
          }}
        >
          Read more →
        </button>
        {p.link && (
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: 11,
              color: `${ink}cc`,
              borderBottom: `1px solid ${ink}33`,
              paddingBottom: 2,
              letterSpacing: ".1em",
              textTransform: "uppercase",
            }}
          >
            {new URL(p.link).hostname.replace("www.", "")} ↗
          </a>
        )}
      </div>
    </article>
  );
}
