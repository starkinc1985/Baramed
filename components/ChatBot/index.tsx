"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { qaDatabase, quickReplies, greeting, type QA } from "./chatData";

// ── Types ─────────────────────────────────────────────────────────────────────
type Message = {
  id: number;
  role: "bot" | "user";
  text: string;
  links?: { label: string; href: string }[];
};

// ── Keyword search ────────────────────────────────────────────────────────────
function findAnswer(query: string): QA {
  const words = query
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 2);

  let best: QA = qaDatabase[qaDatabase.length - 1]; // fallback
  let bestScore = 0;

  for (const qa of qaDatabase) {
    if (qa.id === "fallback") continue;
    const score = words.reduce((acc, w) => {
      const hit = qa.keywords.some((k) => k.includes(w) || w.includes(k));
      return acc + (hit ? 1 : 0);
    }, 0);
    if (score > bestScore) {
      bestScore = score;
      best = qa;
    }
  }

  return best;
}

function getById(id: string): QA | undefined {
  return qaDatabase.find((qa) => qa.id === id);
}

// ── Markdown-lite: bold + line-breaks ────────────────────────────────────────
function renderText(text: string) {
  return text.split("\n").map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g).map((part, j) =>
      j % 2 === 1 ? <strong key={j}>{part}</strong> : part,
    );
    return (
      <span key={i} className="block leading-relaxed">
        {parts}
      </span>
    );
  });
}

// ── Typing indicator ──────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow">
        B
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm dark:bg-darkcard">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-2 w-2 rounded-full bg-primary/60"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Message bubbles ───────────────────────────────────────────────────────────
function BotMessage({ msg }: { msg: Message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="flex items-end gap-2"
    >
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow">
        B
      </div>
      <div className="max-w-[82%]">
        <div className="rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm text-black shadow-sm dark:bg-darkcard dark:text-white">
          {renderText(msg.text)}
        </div>
        {msg.links && msg.links.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {msg.links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/8 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                {l.label}
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function UserMessage({ msg }: { msg: Message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className="flex justify-end"
    >
      <div className="max-w-[78%] rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-sm text-white shadow-sm">
        {renderText(msg.text)}
      </div>
    </motion.div>
  );
}

// ── Main widget ───────────────────────────────────────────────────────────────
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idCounter = useRef(0);

  const nextId = () => ++idCounter.current;

  // Greeting on first open
  useEffect(() => {
    if (open && !hasOpened) {
      setHasOpened(true);
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages([{ id: nextId(), role: "bot", text: greeting }]);
      }, 700);
    }
  }, [open, hasOpened]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = useCallback(
    (text: string) => {
      if (!text.trim() || typing) return;
      setShowChips(false);
      setInput("");
      setMessages((prev) => [...prev, { id: nextId(), role: "user", text: text.trim() }]);
      setTyping(true);
      setTimeout(() => {
        const qa = findAnswer(text);
        setTyping(false);
        setMessages((prev) => [
          ...prev,
          { id: nextId(), role: "bot", text: qa.answer, links: qa.links },
        ]);
      }, 650);
    },
    [typing],
  );

  const handleQuickReply = useCallback(
    (id: string, label: string) => {
      if (typing) return;
      setShowChips(false);
      setMessages((prev) => [...prev, { id: nextId(), role: "user", text: label }]);
      setTyping(true);
      setTimeout(() => {
        const qa = getById(id);
        setTyping(false);
        if (qa) {
          setMessages((prev) => [
            ...prev,
            { id: nextId(), role: "bot", text: qa.answer, links: qa.links },
          ]);
        }
      }, 500);
    },
    [typing],
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <>
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed bottom-24 right-4 z-[9998] flex w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-[#dce4f0] bg-[#f5f8ff] shadow-[0_20px_60px_rgba(0,60,200,0.18)] dark:border-[#2a3554] dark:bg-darksectiontwo"
            style={{ height: "min(520px, calc(100vh - 120px))" }}
          >
            {/* Header */}
            <div className="flex flex-shrink-0 items-center gap-3 bg-gradient-to-r from-primary to-[#0ea5e9] px-4 py-3.5">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white backdrop-blur-sm">
                B
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white">Bäramed Assistant</p>
                <p className="flex items-center gap-1.5 text-xs text-white/80">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-300" />
                  Typically replies instantly
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                aria-label="Close chat"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((msg) =>
                msg.role === "bot" ? (
                  <BotMessage key={msg.id} msg={msg} />
                ) : (
                  <UserMessage key={msg.id} msg={msg} />
                ),
              )}

              {/* Quick-reply chips — shown after greeting */}
              {showChips && messages.length > 0 && !typing && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 pb-1 pl-10"
                >
                  {quickReplies.map((qr) => (
                    <button
                      key={qr.id}
                      onClick={() => handleQuickReply(qr.id, qr.label)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-white px-3 py-1.5 text-xs font-semibold text-primary shadow-sm transition-all hover:border-primary/60 hover:bg-primary hover:text-white dark:bg-darkcard"
                    >
                      <span>{qr.icon}</span>
                      {qr.label}
                    </button>
                  ))}
                </motion.div>
              )}

              {typing && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Input bar */}
            <div className="flex-shrink-0 border-t border-[#dce4f0] bg-white px-3 py-3 dark:border-[#2a3554] dark:bg-darksectiontwo">
              <div className="flex items-center gap-2 rounded-xl border border-[#dce4f0] bg-[#f5f8ff] px-3 py-2 transition-colors focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/15 dark:border-[#2a3554] dark:bg-darkcard">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about our instruments…"
                  disabled={typing}
                  className="flex-1 bg-transparent text-sm text-black outline-none placeholder:text-waterloo dark:text-white"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || typing}
                  aria-label="Send"
                  className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-primary text-white shadow transition-all hover:bg-primaryho disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg className="h-3.5 w-3.5 translate-x-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-waterloo">
                Bäramed Instrumente GmbH ·{" "}
                <Link href="/contact" className="hover:underline">
                  Contact us
                </Link>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating toggle button */}
      <div className="fixed bottom-6 right-4 z-[9999]">
        {!open && (
          <span className="absolute inset-0 animate-ping rounded-full bg-primary/35" />
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close chat" : "Open chat"}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-[0_6px_24px_rgba(0,107,255,0.45)] transition-all duration-300 hover:scale-105 hover:bg-primaryho hover:shadow-[0_10px_32px_rgba(0,107,255,0.55)]"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.svg
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>
    </>
  );
}
