// Strips common Markdown/MDX syntax down to plain, readable text — shared by
// the auto-excerpt generator and the post read-aloud feature.
export function stripMarkdown(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/[*_~]{1,3}/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Truncates to a clean, word-bounded snippet — used to auto-fill a post
// excerpt when the author leaves it blank.
export function generateExcerpt(markdown: string, maxLength = 160): string {
  const plain = stripMarkdown(markdown);

  if (plain.length <= maxLength) return plain;

  const truncated = plain.slice(0, maxLength + 1);
  const lastSpace = truncated.lastIndexOf(" ");
  return `${truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength).trimEnd()}…`;
}
