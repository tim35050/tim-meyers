import { createElement } from "react";

// Renders a paragraph string with markdown-style links: [text](url).
// The URL pattern allows one level of nested parens so Wikipedia URLs
// like `(rail)` resolve correctly.
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
      createElement(
        "a",
        {
          key: key++,
          href: match[2],
          target: "_blank",
          rel: "noreferrer",
          style: {
            color: "inherit",
            borderBottom: `1px solid ${accent}88`,
            transition: "border-color .2s, color .2s",
          },
          onMouseEnter: (e) => {
            e.currentTarget.style.borderBottomColor = accent;
            e.currentTarget.style.color = accent;
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.borderBottomColor = `${accent}88`;
            e.currentTarget.style.color = "inherit";
          },
        },
        match[1],
      ),
    );
    lastIdx = regex.lastIndex;
  }
  if (lastIdx < text.length) {
    parts.push(text.slice(lastIdx));
  }
  return parts;
}
