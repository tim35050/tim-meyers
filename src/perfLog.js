// perfLog.js — lightweight perf instrumentation that writes to both the
// console and an in-memory ring buffer surfaced by the on-screen
// <PerfOverlay /> debug panel. Enable the overlay with ?debug=1 in the URL.
//
// All entries record `performance.now()` so deltas between events are easy
// to read off the log. This exists to diagnose the mobile modal-close lag.

const MAX_ENTRIES = 40;
const buffer = [];
const listeners = new Set();

export function perfLog(label, extra) {
  const t = performance.now();
  const entry = { t, label, extra };
  buffer.push(entry);
  if (buffer.length > MAX_ENTRIES) buffer.shift();
  // Mirror to console for remote-inspector debugging.
  console.log(
    `[perf ${t.toFixed(1)}ms] ${label}` + (extra != null ? ` :: ${extra}` : ""),
  );
  listeners.forEach((l) => l(buffer.slice()));
}

export function subscribePerfLog(listener) {
  listeners.add(listener);
  listener(buffer.slice());
  return () => listeners.delete(listener);
}

export function getPerfLog() {
  return buffer.slice();
}

export function clearPerfLog() {
  buffer.length = 0;
  listeners.forEach((l) => l([]));
}
