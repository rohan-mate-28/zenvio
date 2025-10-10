"use client";

import { useEffect, useState } from "react";

interface LoopingTypingEffectProps {
  texts: string[];
  typingSpeed?: number;
  pauseTime?: number; // pause after full text typed
}

export default function LoopingTypingEffect({
  texts,
  typingSpeed = 80,
  pauseTime = 1000,
}: LoopingTypingEffectProps) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!deleting && charIndex < texts[textIndex].length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayed(texts[textIndex].slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typingSpeed);
    } else if (!deleting && charIndex === texts[textIndex].length) {
      // Pause before deleting
      timeout = setTimeout(() => setDeleting(true), pauseTime);
    } else if (deleting && charIndex > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayed(texts[textIndex].slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, typingSpeed / 2);
    } else if (deleting && charIndex === 0) {
      // Next text
      setDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, texts, textIndex, typingSpeed, pauseTime]);

  return <span className="font-semibold text-gradient">{displayed}</span>;
}
