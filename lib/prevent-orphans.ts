import { type ReactNode } from "react";

/**
 * Keeps the last N words on one line to avoid typographic orphans in headings and CTAs.
 */
export function preventOrphans(text: string, tailWordCount = 2): string {
  const trimmed = text.trim();
  if (!trimmed) return text;

  const words = trimmed.split(/\s+/);
  if (words.length <= tailWordCount) {
    return words.join("\u00A0");
  }

  const head = words.slice(0, -tailWordCount).join(" ");
  const tail = words.slice(-tailWordCount).join("\u00A0");
  return `${head} ${tail}`;
}

/** Prevent orphans at the end of each sentence in multi-sentence copy (e.g. fact cards). */
export function preventOrphansInParagraph(
  text: string,
  tailWordCount = 2,
): string {
  const trimmed = text.trim();
  if (!trimmed) return text;

  const sentences = trimmed.split(/(?<=[.!?…])\s+/);
  if (sentences.length <= 1) {
    return preventOrphans(trimmed, tailWordCount);
  }

  return sentences
    .map((sentence) => preventOrphans(sentence.trim(), tailWordCount))
    .join(" ");
}

/** Apply orphan prevention to plain string children only. */
export function balanceText(children: ReactNode, tailWordCount = 2): ReactNode {
  if (typeof children === "string") {
    return preventOrphans(children, tailWordCount);
  }

  return children;
}
