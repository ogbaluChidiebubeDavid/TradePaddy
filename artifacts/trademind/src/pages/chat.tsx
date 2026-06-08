import { useState, useRef, useEffect } from "react";
import {
  useListChatSessions,
  useGetChatMessages,
  useCreateChatSession,
  useSendChatMessage,
} from "@workspace/api-client-react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Skeleton } from "../components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { getListChatSessionsQueryKey, getGetChatMessagesQueryKey } from "@workspace/api-client-react";

const SUGGESTED_PROMPTS = [
  "What are my biggest trading weaknesses based on my history?",
  "Analyze Bitcoin for a potential entry right now",
  "Why am I losing money and how do I fix it?",
  "What opportunities exist in the market today?",
  "Review my portfolio and tell me what to change",
  "Explain my most recent losing trade",
];

function MarkdownContent({ content }: { content: string }) {
  // Simple markdown renderer
  const lines = content.split("\n");
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <p key={i} className="font-bold text-foreground font-mono text-sm">
              {line.slice(2, -2)}
            </p>
          );
        }
        if (line.startsWith("- ")) {
          return (
            <div key={i} className="flex gap-2 items-start">
              <span className="text-cyan-400 mt-0.5">›</span>
              <span className="text-sm font-mono text-muted-foreground">{line.slice(2)}</span>
            </div>
          );
        }
        if (/^\d+\./.test(line)) {
          return (
            <div key={i} className="flex gap-2 items-start pl-1">
              <span className="text-sm font-mono text-muted-foreground">{line}</span>
            </div>
          );
        }
        if (line.trim() === "") return <div key={i} className="h-1" />;
        // Inline bold
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="text-sm font-mono text-muted-foreground leading-relaxed">
            {parts.map((part, j) =>
              j % 2 === 1 ? (
                <strong key={j} className="text-foreground font-bold">
                  {part}
                </strong>
              ) : (
                part
              )
            )}
          </p>
        );
      })}
    </div>
  );
}

export default function Chat() {
  const [activeSessionId, setActiveSessionId] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const { data: sessions, isLoading: loadingSessions } = useListChatSessions();
  const { data: messages, isLoading: loadingMessages } = useGetChatMessages(
    activeSessionId ?? 0,
    { query: { enabled: activeSessionId != null } }
  );

  const { mutate: createSession, isPending: creatingSession } = useCreateChatSession({
    mutation: {
      onSuccess: (session) => {
        queryClient.invalidateQueries({ queryKey: getListChatSessionsQueryKey() });
        setActiveSessionId(session.id);
      },
    },
  });

  const { mutate: sendMessage, isPending: sending } = useSendChatMessage({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: getGetChatMessagesQueryKey(activeSessionId ?? 0),
        });
        queryClient.invalidateQueries({ queryKey: getListChatSessionsQueryKey() });
        setInput("");
      },
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !activeSessionId || sending) return;
    sendMessage({ sessionId: activeSessionId, data: { content: input.trim() } });
  };

  const handlePrompt = (prompt: string) => {
    if (!activeSessionId) {
      // Create session first then send
      createSession(
        {},
        {
          onSuccess: (session) => {
            sendMessage({ sessionId: session.id, data: { content: prompt } });
          },
        }
      );
    } else {
      setInput(prompt);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-slate-800 flex flex-col bg-slate-950/50">
        <div className="p-4 border-b border-slate-800">
          <Button
            onClick={() => createSession({})}
            disabled={creatingSession}
            className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 font-mono text-sm"
            variant="outline"
          >
            {creatingSession ? "Creating..." : "+ New Chat"}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {loadingSessions ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-10 bg-slate-800/50 rounded" />
            ))
          ) : !sessions?.length ? (
            <p className="text-xs text-muted-foreground font-mono px-2 pt-4 text-center">
              No conversations yet
            </p>
          ) : (
            sessions.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSessionId(s.id)}
                className={`w-full text-left px-3 py-2 rounded text-xs font-mono transition-all ${
                  activeSessionId === s.id
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                    : "text-muted-foreground hover:bg-slate-800/50 hover:text-foreground"
                }`}
              >
                <p className="truncate">{s.title}</p>
                <p className="text-slate-600 mt-0.5">{s.messageCount} messages</p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {!activeSessionId ? (
          /* Landing / prompt suggestions */
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            <div className="max-w-lg w-full space-y-8 text-center">
              <div>
                <h2 className="text-2xl font-bold font-mono text-foreground mb-2">TradeMind AI</h2>
                <p className="text-sm text-muted-foreground font-mono">
                  Your expert AI trading mentor. Ask anything about your portfolio, strategies, or market conditions.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-2 text-left">
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => handlePrompt(prompt)}
                    className="p-3 text-sm font-mono text-muted-foreground bg-slate-900/40 border border-slate-800 rounded-lg hover:border-cyan-500/30 hover:text-foreground hover:bg-cyan-500/5 transition-all text-left"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <Button
                onClick={() => createSession({})}
                disabled={creatingSession}
                className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 font-mono"
                variant="outline"
              >
                Start a new chat
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {loadingMessages ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-20 bg-slate-800/50 rounded-lg" />
                ))
              ) : !messages?.length ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-muted-foreground font-mono text-sm mb-4">
                    New conversation started. Ask me anything.
                  </p>
                  <div className="grid grid-cols-1 gap-2 max-w-md w-full">
                    {SUGGESTED_PROMPTS.slice(0, 3).map((p, i) => (
                      <button
                        key={i}
                        onClick={() => setInput(p)}
                        className="p-2.5 text-xs font-mono text-muted-foreground bg-slate-900/40 border border-slate-800 rounded hover:border-cyan-500/30 hover:text-foreground transition-all text-left"
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                        <span className="text-cyan-400 text-xs font-mono font-bold">AI</span>
                      </div>
                    )}
                    <div
                      className={`max-w-2xl ${
                        msg.role === "user"
                          ? "bg-slate-800/80 border border-slate-700 rounded-2xl rounded-br-sm px-4 py-3"
                          : "bg-slate-900/60 border border-slate-800 rounded-2xl rounded-tl-sm px-4 py-4"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <p className="text-sm font-mono text-foreground">{msg.content}</p>
                      ) : (
                        <MarkdownContent content={msg.content} />
                      )}
                    </div>
                  </div>
                ))
              )}
              {sending && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
                    <span className="text-cyan-400 text-xs font-mono font-bold">AI</span>
                  </div>
                  <div className="bg-slate-900/60 border border-slate-800 rounded-2xl rounded-tl-sm px-4 py-4">
                    <div className="flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.1s]" />
                      <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/50">
              <div className="flex gap-3 max-w-4xl mx-auto">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask about your portfolio, market conditions, or trading strategy..."
                  className="flex-1 min-h-[52px] max-h-32 bg-slate-900/60 border-slate-700 font-mono text-sm resize-none"
                  rows={1}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || sending}
                  className="bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 font-mono self-end px-5"
                  variant="outline"
                >
                  Send
                </Button>
              </div>
              <p className="text-xs text-muted-foreground font-mono mt-2 text-center max-w-4xl mx-auto">
                Enter to send · Shift+Enter for new line · Powered by Qwen 235B
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
