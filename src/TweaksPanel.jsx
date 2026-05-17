// TweaksPanel.jsx — floating, draggable palette picker.
// Production port of the design-tool Tweaks shell: keeps the visual panel,
// curated color-chip picker and drag-to-move, drops the design-host
// postMessage protocol (not needed outside the design tool).
import { useCallback, useEffect, useRef, useState } from "react";

const TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:pointer;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}
  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:pointer;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
  .twk-toggle-btn{position:fixed;right:16px;bottom:16px;z-index:2147483645;
    appearance:none;border:.5px solid rgba(255,255,255,.5);cursor:pointer;
    background:rgba(20,20,20,.7);color:#fff;
    -webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px);
    font:600 11px/1 "Geist Mono",ui-monospace,monospace;letter-spacing:.12em;
    text-transform:uppercase;padding:11px 16px;border-radius:99px;
    box-shadow:0 8px 24px rgba(0,0,0,.3);transition:transform .15s}
  .twk-toggle-btn:hover{transform:translateY(-1px)}
`;

function isLight(hex) {
  const h = String(hex).replace("#", "");
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, "0");
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = (n >> 16) & 255,
    g = (n >> 8) & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}

const Check = ({ light }) => (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path
      d="M3 7.2 5.8 10 11 4.2"
      fill="none"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={light ? "rgba(0,0,0,.78)" : "#fff"}
    />
  </svg>
);

export function TweaksPanel({ palettes, value, onChange, title = "Tweaks" }) {
  const [open, setOpen] = useState(false);
  const dragRef = useRef(null);
  const offsetRef = useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + "px";
    panel.style.bottom = offsetRef.current.y + "px";
  }, []);

  useEffect(() => {
    if (!open) return;
    clampToViewport();
    window.addEventListener("resize", clampToViewport);
    return () => window.removeEventListener("resize", clampToViewport);
  }, [open, clampToViewport]);

  const onDragStart = (e) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  const key = (o) => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);

  return (
    <>
      <style>{TWEAKS_STYLE}</style>

      {!open && (
        <button
          className="twk-toggle-btn"
          onClick={() => setOpen(true)}
          aria-label="Open theme tweaks"
        >
          ◐ Tweaks
        </button>
      )}

      {open && (
        <div
          ref={dragRef}
          className="twk-panel"
          style={{ right: 16, bottom: 16 }}
        >
          <div className="twk-hd" onMouseDown={onDragStart}>
            <b>{title}</b>
            <button
              className="twk-x"
              aria-label="Close tweaks"
              onMouseDown={(e) => e.stopPropagation()}
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>
          <div className="twk-body">
            <div className="twk-sect">Palette</div>
            <div className="twk-row">
              <div className="twk-lbl">
                <span>Theme</span>
              </div>
              <div className="twk-chips" role="radiogroup">
                {palettes.map((o, i) => {
                  const colors = Array.isArray(o) ? o : [o];
                  const [hero, ...rest] = colors;
                  const sup = rest.slice(0, 4);
                  const on = key(o) === cur;
                  return (
                    <button
                      key={i}
                      type="button"
                      className="twk-chip"
                      role="radio"
                      aria-checked={on}
                      data-on={on ? "1" : "0"}
                      aria-label={colors.join(", ")}
                      title={colors.join(" · ")}
                      style={{ background: hero }}
                      onClick={() => onChange(o)}
                    >
                      {sup.length > 0 && (
                        <span>
                          {sup.map((c, j) => (
                            <i key={j} style={{ background: c }} />
                          ))}
                        </span>
                      )}
                      {on && <Check light={isLight(hero)} />}
                    </button>
                  );
                })}
              </div>
            </div>
            <div
              className="mono"
              style={{
                fontSize: 10,
                color: "rgba(0,0,0,.4)",
                letterSpacing: ".04em",
                padding: "6px 0 0",
                lineHeight: 1.5,
              }}
            >
              warm dark + amber · arctic + cyan · plum + lilac · black + signal
            </div>
          </div>
        </div>
      )}
    </>
  );
}
