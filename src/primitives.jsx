// primitives.jsx — shared interactive building blocks
import { useEffect, useMemo, useRef, useState } from "react";
import { GRAIN_URL } from "./data.js";

// ─── Cursor-follow soft glow ─────────────────────────────────────────────
export function CursorGlow({ accent }) {
  const ref = useRef(null);
  const target = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    let raf;
    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.06;
      pos.current.y += (target.current.y - pos.current.y) * 0.06;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.current.x - 380}px, ${
          pos.current.y - 380
        }px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 760,
        height: 760,
        borderRadius: "50%",
        background: accent,
        filter: "blur(170px)",
        opacity: 0.15,
        pointerEvents: "none",
        zIndex: 1,
        willChange: "transform",
        mixBlendMode: "screen",
      }}
    />
  );
}

// ─── Reveal-on-scroll ────────────────────────────────────────────────────
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  style,
  className = "",
  ...rest
}) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          node.style.transitionDelay = `${delay}ms`;
          node.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [delay]);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={style} {...rest}>
      {children}
    </Tag>
  );
}

// ─── Generative cover ────────────────────────────────────────────────────
export function Cover({
  colors,
  label,
  meta,
  ratio,
  seed = 0,
  big = false,
  fill = false,
  parallax = 0,
}) {
  const innerRef = useRef(null);
  const stops = useMemo(() => {
    const positions = [
      [22 + ((seed * 7) % 24), 28 + ((seed * 11) % 24)],
      [68 + ((seed * 13) % 22), 22 + ((seed * 17) % 28)],
      [28 + ((seed * 19) % 28), 72 + ((seed * 23) % 18)],
      [78 + ((seed * 29) % 14), 76 + ((seed * 31) % 14)],
    ];
    return colors
      .map((c, i) => {
        const [x, y] = positions[i] || positions[0];
        const size = 56 + ((seed + i * 7) % 26);
        return `radial-gradient(${size}% ${size + 10}% at ${x}% ${y}%, ${c}, transparent 65%)`;
      })
      .join(", ");
  }, [colors, seed]);

  useEffect(() => {
    if (!parallax || !innerRef.current) return;
    innerRef.current.style.transform = `translateX(${parallax}px) scale(1.08)`;
  }, [parallax]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        ...(fill ? { height: "100%" } : { aspectRatio: `${ratio || 1}` }),
        overflow: "hidden",
      }}
    >
      <div
        ref={innerRef}
        style={{
          position: "absolute",
          inset: "-6%",
          backgroundColor: colors[0],
          backgroundImage: stops,
          transition: "transform .25s cubic-bezier(.2,.7,.3,1)",
          willChange: "transform",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.55,
          mixBlendMode: "overlay",
          backgroundImage: GRAIN_URL,
          backgroundSize: "240px 240px",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,.4) 100%)",
        }}
      />
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
          }}
        >
          <span>{label}</span>
          {meta && <span style={{ opacity: 0.85 }}>{meta}</span>}
        </div>
      )}
    </div>
  );
}

// ─── 3D parallax hero title — letters shift on mouse move ───────────────
// Desktop only: on touch / coarse-pointer devices, taps would fire a single
// synthesized mousemove and strand the accent silhouettes in odd positions,
// so we render plain text instead.
export function ParallaxTitle({ text, color, accent }) {
  const ref = useRef(null);
  const [interactive, setInteractive] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
      : true,
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onChange = (e) => setInteractive(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (!interactive) return;
    const onMove = (e) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      const layers = ref.current.querySelectorAll("[data-l]");
      layers.forEach((l) => {
        const depth = parseFloat(l.dataset.l);
        l.style.transform = `translate3d(${dx * 30 * depth}px, ${
          dy * 22 * depth
        }px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [interactive]);

  if (!interactive) {
    return <span style={{ color, display: "inline-block" }}>{text}</span>;
  }

  return (
    <span
      ref={ref}
      style={{
        position: "relative",
        display: "inline-block",
        perspective: 1000,
      }}
    >
      <span
        data-l="-1.0"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          color: accent,
          opacity: 0.18,
          transition: "transform .35s cubic-bezier(.2,.7,.3,1)",
          willChange: "transform",
        }}
      >
        {text}
      </span>
      <span
        data-l="0.5"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          color: accent,
          opacity: 0.4,
          transition: "transform .35s cubic-bezier(.2,.7,.3,1)",
          willChange: "transform",
          mixBlendMode: "screen",
        }}
      >
        {text}
      </span>
      <span
        data-l="0"
        style={{
          position: "relative",
          color,
          display: "inline-block",
          transition: "transform .35s cubic-bezier(.2,.7,.3,1)",
          willChange: "transform",
        }}
      >
        {text}
      </span>
    </span>
  );
}

// ─── Magnetic button ─────────────────────────────────────────────────────
export function Magnet({ children, strength = 22, style, ...rest }) {
  const ref = useRef(null);
  const inner = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const radius = Math.max(r.width, r.height);
      if (dist < radius * 1.6) {
        const f = 1 - dist / (radius * 1.6);
        el.style.transform = `translate(${(dx / radius) * strength * f}px, ${
          (dy / radius) * strength * f
        }px)`;
        if (inner.current) {
          inner.current.style.transform = `translate(${
            (dx / radius) * strength * 0.4 * f
          }px, ${(dy / radius) * strength * 0.4 * f}px)`;
        }
      } else {
        el.style.transform = "";
        if (inner.current) inner.current.style.transform = "";
      }
    };
    const onLeave = () => {
      el.style.transform = "";
      if (inner.current) inner.current.style.transform = "";
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return (
    <a
      ref={ref}
      {...rest}
      style={{
        display: "inline-block",
        transition: "transform .35s cubic-bezier(.2,.7,.3,1)",
        willChange: "transform",
        ...style,
      }}
    >
      <span
        ref={inner}
        style={{
          display: "inline-block",
          transition: "transform .35s cubic-bezier(.2,.7,.3,1)",
          willChange: "transform",
        }}
      >
        {children}
      </span>
    </a>
  );
}

// ─── Live clock (Paris) ──────────────────────────────────────────────────
export function Clock() {
  const [d, setD] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setD(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      {new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Paris",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(d)}
    </>
  );
}

// ─── isMobile hook ───────────────────────────────────────────────────────
export function useIsMobile(bp = 768) {
  const [m, setM] = useState(
    () => typeof window !== "undefined" && window.innerWidth < bp,
  );
  useEffect(() => {
    const onR = () => setM(window.innerWidth < bp);
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, [bp]);
  return m;
}
