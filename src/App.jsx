// App.jsx — Tim Meyers · Reel portfolio
import { useLayoutEffect, useState } from "react";
import {
  PALETTES,
  DEFAULT_PALETTE,
  GRAIN_URL,
  PROJECTS,
  ARCHIVE,
  EXPERIENCE,
} from "./data.js";
import {
  CursorGlow,
  Reveal,
  Cover,
  Magnet,
  Clock,
  ParallaxTitle,
} from "./primitives.jsx";
import { Reel } from "./Reel.jsx";
import { ProjectModal } from "./ProjectModal.jsx";
import { CVModal } from "./CVModal.jsx";
import { TweaksPanel } from "./TweaksPanel.jsx";
import { PerfOverlay } from "./PerfOverlay.jsx";

export default function App() {
  const [palette, setPalette] = useState(DEFAULT_PALETTE);
  const [bg, surface, ink, accent, muted] = palette;
  const [openProject, setOpenProject] = useState(null);
  const [openExperience, setOpenExperience] = useState(null);

  const getProject = (idx) =>
    PROJECTS.find((p) => p.idx === idx) ||
    ARCHIVE.find((p) => p.idx === idx) ||
    null;

  useLayoutEffect(() => {
    const r = document.documentElement.style;
    r.setProperty("--bg", bg);
    r.setProperty("--ink", ink);
    r.setProperty("--accent", accent);
  }, [bg, ink, accent]);

  return (
    <div
      style={{
        background: bg,
        color: ink,
        minHeight: "100vh",
        position: "relative",
        overflowX: "clip",
      }}
    >
      <CursorGlow accent={accent} />

      {/* global grain */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
          backgroundImage: GRAIN_URL,
          backgroundSize: "240px 240px",
          opacity: 0.04,
          mixBlendMode: "overlay",
        }}
      />

      {/* status bar */}
      <header
        data-h-status
        className="mono"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "22px 36px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: ink,
          mixBlendMode: "difference",
          fontSize: 11,
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            letterSpacing: ".08em",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontWeight: 600 }}>TIM/MEYERS</span>
          <span data-h-hide-mobile style={{ opacity: 0.5 }}>
            —
          </span>
          <span data-h-hide-mobile style={{ opacity: 0.7 }}>
            portfolio · mmxxvi
          </span>
        </span>
        <span
          style={{
            letterSpacing: ".08em",
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <span
            data-h-hide-mobile
            style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#7df9aa",
                boxShadow: "0 0 8px #7df9aaaa",
              }}
            />
            open for work
          </span>
          <span data-h-hide-mobile style={{ opacity: 0.4 }}>
            ·
          </span>
          <span>
            Paris <Clock />
          </span>
        </span>
      </header>

      {/* ─── HERO ──────────────────────────────────────────────── */}
      <section
        data-h-hero-layout
        style={{
          position: "relative",
          zIndex: 2,
          padding: "160px 6vw 80px",
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1.35fr 1fr",
          gap: "5vw",
          alignItems: "stretch",
        }}
      >
        {/* Left: text content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minWidth: 0,
            gap: 48,
          }}
        >
          <Reveal>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: muted,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ color: accent, fontSize: 18 }}>✶</span>
              <span>Vol. xxvi · summer mmxxvi · paris</span>
            </div>
          </Reveal>

          <div>
            <Reveal delay={100}>
              <h1
                style={{
                  margin: 0,
                  marginTop: "clamp(24px, 3vw, 56px)",
                  fontSize: "clamp(64px, 11vw, 220px)",
                  lineHeight: 0.84,
                  letterSpacing: "-0.05em",
                  fontWeight: 800,
                  color: ink,
                }}
              >
                <ParallaxTitle text="Tim" color={ink} accent={accent} />
                <br />
                <ParallaxTitle
                  text={
                    <>
                      Meyers<span style={{ color: accent }}>.</span>
                    </>
                  }
                  color={ink}
                  accent={accent}
                />
              </h1>
            </Reveal>
            <Reveal delay={260}>
              <div
                data-h-hero-grid
                style={{
                  marginTop: 40,
                  display: "flex",
                  flexDirection: "column",
                  gap: 28,
                  alignItems: "flex-start",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: "clamp(17px, 1.4vw, 22px)",
                    lineHeight: 1.4,
                    color: ink,
                    fontWeight: 400,
                    maxWidth: "40ch",
                  }}
                >
                  French-American technology generalist. Fifteen years building
                  at the seams of{" "}
                  <span style={{ color: accent, fontWeight: 600 }}>data</span>,{" "}
                  <span style={{ color: accent, fontWeight: 600 }}>design</span>,{" "}
                  <span style={{ color: accent, fontWeight: 600 }}>code</span>{" "}
                  and{" "}
                  <span style={{ color: accent, fontWeight: 600 }}>impact</span>.
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 16,
                  }}
                >
                  <Magnet
                    href="#work"
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById("work");
                      if (el)
                        window.scrollTo({
                          top: el.offsetTop,
                          behavior: "smooth",
                        });
                    }}
                    className="mono"
                    style={{
                      padding: "18px 30px",
                      background: accent,
                      color: bg,
                      fontSize: 12,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      borderRadius: 99,
                    }}
                  >
                    Roll the reel ◯→
                  </Magnet>
                  <Magnet
                    href="mailto:tim@bello.art"
                    className="mono"
                    strength={12}
                    style={{
                      fontSize: 11,
                      color: ink,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
                      borderBottom: `1px solid ${ink}33`,
                      paddingBottom: 3,
                    }}
                  >
                    tim@bello.art
                  </Magnet>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={400}>
            <div
              data-h-hero-meta
              className="mono"
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 10,
                color: muted,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                paddingTop: 18,
                borderTop: `1px solid ${ink}14`,
              }}
            >
              <span>↓ scroll to begin</span>
              <span>{`${PROJECTS.length + ARCHIVE.length} works · 2009 → 2026`}</span>
              <span>open for work · paris</span>
            </div>
          </Reveal>
        </div>

        {/* Right: portrait */}
        <Reveal delay={200}>
          <div
            data-h-hero-photo
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              height: "100%",
              minHeight: 0,
            }}
          >
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: muted,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                display: "flex",
                gap: 14,
              }}
            >
              <span>◇ figure 01</span>
              <span style={{ opacity: 0.55 }}>—</span>
              <span>self portrait</span>
            </div>
            <img
              src="/tim-paris.jpg"
              alt="Tim Meyers, Paris"
              style={{
                width: "100%",
                aspectRatio: "0.78 / 1",
                objectFit: "cover",
                display: "block",
                background: "rgba(237, 237, 237, 0.063)",
                filter:
                  "grayscale(12%) contrast(104%) brightness(94%) saturate(92%)",
              }}
            />
          </div>
        </Reveal>
      </section>

      {/* ─── Currently ─────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          padding: "140px 6vw",
          borderTop: `1px solid ${ink}14`,
        }}
      >
        <div
          data-h-sec-head
          style={{
            display: "grid",
            gridTemplateColumns: "90px 1fr 90px",
            gap: 36,
            marginBottom: 72,
          }}
        >
          <Reveal>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: muted,
                letterSpacing: ".16em",
                textTransform: "uppercase",
              }}
            >
              § 01
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(40px, 5.4vw, 88px)",
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
                fontWeight: 700,
                color: ink,
                maxWidth: "15ch",
              }}
            >
              Currently founding{" "}
              <a
                href="https://bello.art"
                target="_blank"
                rel="noreferrer"
                style={{
                  color: accent,
                  borderBottom: `2px solid ${accent}66`,
                }}
              >
                bello.art
              </a>{" "}
              — a visual operating system for online sellers.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: muted,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                textAlign: "right",
              }}
            >
              {`{ now }`}
            </div>
          </Reveal>
        </div>

        <div
          data-h-currently-grid
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: "5vw",
            alignItems: "flex-start",
          }}
        >
          <Reveal delay={200}>
            <div
              style={{
                maxWidth: "62ch",
                fontSize: "clamp(15px, 1.2vw, 19px)",
                lineHeight: 1.62,
                color: `${ink}cc`,
              }}
            >
              <p style={{ margin: "0 0 22px" }}>
                Selling online demands an entire visual identity — listing
                images, lifestyle photos, mockups, videos, thumbnails, branding
                assets, sizing diagrams, packaging visuals, platform-specific
                content for marketplaces and social.
              </p>
              <p style={{ margin: "0 0 22px" }}>
                <b style={{ color: ink }}>bello</b> is the layer that sits
                between product creation and online distribution. We've shipped
                the first surface — high-end interior mockups for independent
                artists.{" "}
                <span style={{ color: accent, fontWeight: 600 }}>
                  10,000+ sold
                </span>
                .
              </p>
              <p
                style={{
                  margin: 0,
                  color: `${ink}99`,
                  paddingTop: 14,
                  borderTop: `1px solid ${ink}14`,
                }}
              >
                Before <b style={{ color: ink }}>bello</b>: two years as an
                Adobe-sponsored artist, seven years of data at Meta, three at
                DecisionTek simulating rail accidents for the FRA, and a
                master's at Berkeley shipping TIRO, an award-winning app for
                labor NGOs in Guangzhou.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div style={{ position: "relative" }}>
              <div
                role="button"
                tabIndex={0}
                aria-label="Open bello.art project"
                onClick={() => setOpenProject(getProject(1))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenProject(getProject(1));
                  }
                }}
                style={{
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <img
                  src="/bello-studio.jpg"
                  alt="bello.art studio — mockup editor"
                  loading="lazy"
                  style={{
                    width: "100%",
                    aspectRatio: "1.05 / 1",
                    objectFit: "cover",
                    display: "block",
                    background: "rgba(237, 237, 237, 0.063)",
                  }}
                />
                <div
                  className="mono"
                  style={{
                    position: "absolute",
                    inset: "16px 18px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    color: "#fff",
                    mixBlendMode: "difference",
                    fontSize: 10,
                    letterSpacing: ".14em",
                    textTransform: "uppercase",
                    pointerEvents: "none",
                  }}
                >
                  <span>bello.art · studio surface</span>
                  <span style={{ opacity: 0.85 }}>2024 → ongoing</span>
                </div>
              </div>
              <div
                className="mono"
                style={{
                  position: "absolute",
                  left: -2,
                  bottom: -22,
                  display: "flex",
                  gap: 14,
                  fontSize: 10,
                  color: muted,
                  letterSpacing: ".16em",
                  textTransform: "uppercase",
                }}
              >
                <span>◇ figure 02</span>
                <span style={{ opacity: 0.55 }}>—</span>
                <span>bello.art</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── REEL (horizontal scroll wow moment) ─────────────────── */}
      <Reel
        projects={PROJECTS}
        ink={ink}
        accent={accent}
        muted={muted}
        bg={bg}
        surface={surface}
        onOpen={setOpenProject}
      />

      {/* ─── Archive (§ 02·B — sub-section of the reel) ──────────── */}
      <section
        id="archive"
        style={{
          position: "relative",
          zIndex: 2,
          padding: "140px 6vw 60px",
          borderTop: `1px solid ${ink}14`,
        }}
      >
        <div
          data-h-sec-head
          style={{
            display: "grid",
            gridTemplateColumns: "90px 1fr 90px",
            gap: 36,
            marginBottom: 60,
          }}
        >
          <Reveal>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: muted,
                letterSpacing: ".16em",
                textTransform: "uppercase",
              }}
            >
              § 02 · b
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(34px, 4.6vw, 72px)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                fontWeight: 700,
                color: ink,
                maxWidth: "18ch",
              }}
            >
              From the <span style={{ color: accent }}>archive</span>.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: muted,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                textAlign: "right",
              }}
            >
              {`${ARCHIVE.filter((p) => !p.hidden).length} works`}
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <p
            style={{
              margin: "0 0 50px",
              maxWidth: "58ch",
              fontSize: "clamp(14px, 1.05vw, 17px)",
              lineHeight: 1.6,
              color: `${ink}99`,
            }}
          >
            Older work, research projects, and side efforts — kept here for the
            record. Click any card to read more.
          </p>
        </Reveal>

        <div
          data-h-archive-grid
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
          }}
        >
          {ARCHIVE.filter((p) => !p.hidden).map((p, i) => (
            <Reveal key={p.idx} delay={i * 60}>
              <button
                onClick={() => setOpenProject(p)}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: `${ink}06`,
                  border: `1px solid ${ink}14`,
                  transition:
                    "background .25s, border-color .25s, transform .25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${ink}10`;
                  e.currentTarget.style.borderColor = `${accent}66`;
                  e.currentTarget.style.transform = "translateY(-2px)";
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
                        position: "relative",
                        width: "100%",
                        aspectRatio: "1.45 / 1",
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
                      <div
                        className="mono"
                        style={{
                          position: "absolute",
                          inset: "16px 18px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          color: "#fff",
                          mixBlendMode: "difference",
                          fontSize: 10,
                          letterSpacing: ".14em",
                          textTransform: "uppercase",
                          pointerEvents: "none",
                        }}
                      >
                        <span>{p.kind}</span>
                        <span style={{ opacity: 0.85 }}>
                          № {String(p.idx).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <Cover
                      colors={p.colors}
                      seed={p.seed}
                      ratio={1.45}
                      label={p.kind}
                      meta={`№ ${String(p.idx).padStart(2, "0")}`}
                    />
                  )}
                </div>

                <div style={{ padding: "20px 22px 22px" }}>
                  <div
                    className="mono"
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      color: muted,
                      marginBottom: 10,
                      fontSize: 10,
                      letterSpacing: ".14em",
                      textTransform: "uppercase",
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
                      gap: 14,
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "clamp(20px, 1.8vw, 26px)",
                        lineHeight: 1.1,
                        letterSpacing: "-0.02em",
                        fontWeight: 700,
                        color: ink,
                      }}
                    >
                      {p.title}
                    </h3>
                    <span
                      data-arr
                      style={{
                        fontSize: 14,
                        color: accent,
                        flex: "0 0 auto",
                        marginTop: 4,
                        transition:
                          "transform .35s cubic-bezier(.2,.7,.3,1)",
                      }}
                    >
                      ↗
                    </span>
                  </div>
                  <p
                    style={{
                      margin: "12px 0 0",
                      fontSize: 13.5,
                      lineHeight: 1.55,
                      color: `${ink}aa`,
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {p.blurb}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ─── CV ────────────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          padding: "140px 6vw",
          borderTop: `1px solid ${ink}14`,
        }}
      >
        <div
          data-h-sec-head
          style={{
            display: "grid",
            gridTemplateColumns: "90px 1fr 90px",
            gap: 36,
            marginBottom: 72,
          }}
        >
          <Reveal>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: muted,
                letterSpacing: ".16em",
                textTransform: "uppercase",
              }}
            >
              § 03
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2
              style={{
                margin: 0,
                fontSize: "clamp(40px, 5.4vw, 88px)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                fontWeight: 700,
                color: ink,
              }}
            >
              Where I've <span style={{ color: accent }}>been</span>.
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div
              className="mono"
              style={{
                fontSize: 11,
                color: muted,
                letterSpacing: ".16em",
                textTransform: "uppercase",
                textAlign: "right",
              }}
            >
              cv / résumé
            </div>
          </Reveal>
        </div>

        <div>
          {EXPERIENCE.map((e, i) => (
            <Reveal key={i} delay={i * 40}>
              <button
                data-h-cv-row
                onClick={() => setOpenExperience(e)}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  width: "100%",
                  boxSizing: "border-box",
                  display: "grid",
                  gridTemplateColumns: "140px 1.4fr 1fr 50px",
                  alignItems: "baseline",
                  gap: 24,
                  padding: "28px 14px",
                  borderTop: `1px solid ${ink}14`,
                  transition: "background .25s, padding .25s",
                }}
                onMouseEnter={(el) => {
                  el.currentTarget.style.background = `${ink}08`;
                  el.currentTarget.style.paddingLeft = "26px";
                }}
                onMouseLeave={(el) => {
                  el.currentTarget.style.background = "transparent";
                  el.currentTarget.style.paddingLeft = "14px";
                }}
              >
                <span
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: muted,
                    letterSpacing: ".1em",
                  }}
                >
                  {e.dates}
                </span>
                <span
                  style={{
                    fontSize: "clamp(22px, 2.5vw, 36px)",
                    fontWeight: 700,
                    color: ink,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {e.org}
                </span>
                <span
                  style={{ fontSize: 15, color: `${ink}99`, fontWeight: 400 }}
                >
                  {e.role}
                </span>
                <span style={{ fontSize: 18, color: accent, textAlign: "right" }}>
                  →
                </span>
              </button>
            </Reveal>
          ))}
          <div style={{ borderTop: `1px solid ${ink}14` }} />
        </div>
      </section>

      {/* ─── Contact ───────────────────────────────────────────── */}
      <section
        style={{
          position: "relative",
          zIndex: 2,
          padding: "160px 6vw 100px",
          borderTop: `1px solid ${ink}14`,
        }}
      >
        <Reveal>
          <div
            className="mono"
            style={{
              fontSize: 11,
              color: muted,
              letterSpacing: ".16em",
              textTransform: "uppercase",
              marginBottom: 36,
            }}
          >
            § 04 / say hello
          </div>
        </Reveal>
        <Reveal delay={120}>
          <a
            data-h-contact-email
            href="mailto:tim@bello.art"
            style={{
              display: "inline-block",
              fontSize: "clamp(64px, 13vw, 220px)",
              lineHeight: 0.88,
              letterSpacing: "-0.05em",
              fontWeight: 800,
              color: ink,
            }}
          >
            tim@bello<span style={{ color: accent }}>.art</span>
          </a>
        </Reveal>
        <Reveal delay={240}>
          <div
            data-h-contact-grid
            style={{
              marginTop: 60,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 36,
              fontSize: 14,
              color: `${ink}aa`,
              paddingTop: 30,
              borderTop: `1px solid ${ink}14`,
            }}
          >
            <p style={{ margin: 0, maxWidth: "56ch" }}>
              Always open to talking with thoughtful builders working on data,
              design, code, or impact problems. Especially happy to advise
              founders.
            </p>
            <div
              data-h-contact-links
              className="mono"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                gap: 20,
                fontSize: 11,
                color: muted,
                letterSpacing: ".14em",
                textTransform: "uppercase",
              }}
            >
              {[
                { l: "bello.art", h: "https://bello.art" },
                { l: "linkedin", h: "#" },
                { l: "github", h: "#" },
              ].map((s) => (
                <a
                  key={s.l}
                  href={s.h}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    borderBottom: `1px solid ${muted}55`,
                    paddingBottom: 2,
                  }}
                >
                  {s.l} ↗
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <footer
        data-h-footer
        className="mono"
        style={{
          position: "relative",
          zIndex: 2,
          padding: "30px 6vw 40px",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 14,
          fontSize: 10.5,
          color: muted,
          letterSpacing: ".12em",
          textTransform: "uppercase",
          borderTop: `1px solid ${ink}14`,
        }}
      >
        <span>© tim meyers · mmxxvi</span>
        <span>portfolio v26 · reel</span>
        <span>paris, france</span>
      </footer>

      {/* Tweaks */}
      <TweaksPanel
        palettes={PALETTES}
        value={palette}
        onChange={setPalette}
      />

      {/* Project deep-dive modal */}
      <ProjectModal
        project={openProject}
        onClose={() => setOpenProject(null)}
        ink={ink}
        accent={accent}
        muted={muted}
        bg={bg}
        surface={surface}
      />

      {/* Debug perf overlay — only visible with ?debug=1 in URL */}
      <PerfOverlay />

      {/* CV row detail: bullets + project tiles */}
      <CVModal
        experience={openExperience}
        getProject={getProject}
        onClose={() => setOpenExperience(null)}
        onOpenProject={(p) => {
          setOpenExperience(null);
          setOpenProject(p);
        }}
        ink={ink}
        accent={accent}
        muted={muted}
        bg={bg}
      />
    </div>
  );
}
