"use client";

import { useEffect, useState } from "react";
import { Play, Pause, Square } from "lucide-react";

type Status = "idle" | "playing" | "paused";

export default function PostAudioPlayer({ text }: { text: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(typeof window !== "undefined" && "speechSynthesis" in window);
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  function handlePlay() {
    if (status === "paused") {
      window.speechSynthesis.resume();
      setStatus("playing");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setStatus("idle");
    utterance.onerror = () => setStatus("idle");
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
    setStatus("playing");
  }

  function handlePause() {
    window.speechSynthesis.pause();
    setStatus("paused");
  }

  function handleStop() {
    window.speechSynthesis.cancel();
    setStatus("idle");
  }

  if (!supported) return null;

  return (
    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-muted">
      {status === "playing" ? (
        <button
          type="button"
          onClick={handlePause}
          className="flex items-center gap-1.5 transition-colors hover:text-fg"
        >
          <Pause size={14} />
          Pause
        </button>
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          className="flex items-center gap-1.5 transition-colors hover:text-fg"
        >
          <Play size={14} />
          {status === "paused" ? "Resume" : "Listen to this post"}
        </button>
      )}
      {status !== "idle" && (
        <>
          <span className="h-4 w-px bg-border" />
          <button
            type="button"
            onClick={handleStop}
            aria-label="Stop"
            className="flex items-center transition-colors hover:text-fg"
          >
            <Square size={12} />
          </button>
        </>
      )}
    </div>
  );
}
