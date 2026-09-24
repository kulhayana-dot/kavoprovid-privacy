"use client";

import {
  Children,
  useMemo,
  type ElementType,
  type ReactNode,
} from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

type RevealTextProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** "load" plays immediately (after an optional delay); "scroll" plays when scrolled into view. */
  trigger?: "load" | "scroll";
  delay?: number;
  stagger?: number;
};

type WordToken = { key: string; content: ReactNode };

/**
 * Splits string children into word tokens; a non-string child (e.g. an
 * accent <span> with no preceding space, as in "ключ<span>.</span>")
 * attaches to the previous word so it rises with it as one unit, instead
 * of getting its own out-of-place reveal slot.
 */
function splitIntoWords(children: ReactNode): WordToken[] {
  const nodes = Children.toArray(children);
  const words: WordToken[] = [];

  nodes.forEach((node, i) => {
    if (typeof node === "string") {
      node
        .split(/\s+/)
        .filter((part) => part.length > 0)
        .forEach((part, j) => {
          words.push({ key: `t${i}-${j}`, content: part });
        });
    } else if (words.length > 0) {
      const last = words[words.length - 1];
      last.content = (
        <>
          {last.content}
          {node}
        </>
      );
    } else {
      words.push({ key: `n${i}`, content: node });
    }
  });

  return words;
}

export function RevealText({
  children,
  as: Tag = "div",
  className,
  trigger = "scroll",
  delay = 0,
  stagger = 0.05,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, {
    once: true,
    margin: "0px 0px -15% 0px",
  });
  const words = useMemo(() => splitIntoWords(children), [children]);

  const play = reduced || trigger === "load" || inView;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ display: "flex", flexWrap: "wrap" }}
    >
      {words.map((w, i) => (
        <span
          key={w.key}
          className="overflow-hidden"
          style={{ display: "inline-block", paddingRight: "0.28em" }}
        >
          <motion.span
            style={{ display: "inline-block" }}
            initial={reduced ? false : { y: "110%" }}
            animate={play ? { y: "0%" } : { y: "110%" }}
            transition={{
              duration: 0.85,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
          >
            {w.content}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
