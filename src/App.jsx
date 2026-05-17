// App.jsx — Tim Meyers · Reel portfolio
import { useLayoutEffect, useState } from "react";
import {
  PALETTES,
  DEFAULT_PALETTE,
  GRAIN_URL,
  PROJECTS,
  EXPERIENCE,
} from "./data.js";
import {
  CursorGlow,
  Reveal,
  Cover,
  ParallaxTitle,
  Magnet,
  Clock,
} from "./primitives.jsx";
import { Reel } from "./Reel.jsx";
import { ProjectModal } from "./ProjectModal.jsx";
import { TweaksPanel } from "./TweaksPanel.jsx";

export default function App() {
  const [palette, setPalette] = useState(DEFAULT_PALETTE);
  const [bg, surface, ink, accent, muted] = palette;
  const [openProject, setOpenProject] = useState(null);

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
        style={{
          position: "relative",
          zIndex: 2,
          padding: "160px 6vw 80px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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
                fontSize: "clamp(80px, 16vw, 280px)",
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
                marginTop: 46,
                display: "grid",
                gridTemplateColumns: "1.4fr 1fr",
                gap: "6vw",
                alignItems: "flex-end",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "clamp(18px, 1.6vw, 26px)",
                  lineHeight: 1.4,
                  color: ink,
                  fontWeight: 400,
                  maxWidth: "40ch",
                }}
              >
                French-American technology generalist. Fifteen years building at
                the seams of{" "}
                <span style={{ color: accent, fontWeight: 600 }}>data</span>,{" "}
                <span style={{ color: accent, fontWeight: 600 }}>design</span>,{" "}
                <span style={{ color: accent, fontWeight: 600 }}>code</span> and{" "}
                <span style={{ color: accent, fontWeight: 600 }}>impact</span>.
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 18,
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
              marginTop: 96,
              paddingTop: 18,
              borderTop: `1px solid ${ink}14`,
            }}
          >
            <span>↓ scroll to begin</span>
            <span>{`${PROJECTS.length} works · 2009 → 2026`}</span>
            <span>open for work · paris</span>
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
                Before <b style={{ color: ink }}>bello</b>: eight years at Meta,
                three at DecisionTek simulating rail accidents for the FRA, a
                master's at Berkeley with field research on labor NGOs in
                Guangzhou, a homelessness nonprofit in 2012, three months in
                Vietnam in 2009.
              </p>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div style={{ position: "relative" }}>
              <Cover
                colors={["#1a1815", accent, `${accent}55`, "#2a2520"]}
                seed={29}
                ratio={1.05}
                label="bello.art · studio surface"
                meta="2024 → ongoing"
              />
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
              <a
                data-h-cv-row
                href="#"
                style={{
                  display: "grid",
                  gridTemplateColumns: "140px 1.4fr 1fr 50px",
                  alignItems: "baseline",
                  gap: 24,
                  padding: "28px 14px",
                  borderTop: `1px solid ${ink}14`,
                  transition: "background .25s, padding .25s",
                }}
                onClick={(ev) => ev.preventDefault()}
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
              </a>
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
    </div>
  );
}
