import { useState, useRef, useEffect } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Bot, Sparkles, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const mockResponses = [
  "Based on your campus data, I recommend scheduling the Cultural Fest Auditions on Feb 25th at 4 PM to avoid conflicts with the Robotics Showdown. This time slot has historically shown 40% higher attendance.",
  "I've analyzed member overlap across societies. There's a 35% overlap between AI & ML Society and Robotics & Automation. Consider a joint hackathon event to maximize engagement.",
  "The Photography & Media Club has seen a 12% decline in active members this month. I suggest partnering with the Performing Arts Society for a collaborative showcase event to boost visibility.",
  "Your Sports & Fitness Council events consistently reach full capacity. Consider expanding capacity or hosting multiple sessions. The demand suggests there's room for growth.",
  "I've detected an opportunity: there's no dedicated Sustainability Society yet, but 180+ students have shown interest in environmental initiatives. This could be a high-impact addition.",
];

const AI = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi! I'm your AI co-pilot. I can help optimize societies, events, and engagement. Ask me anything about your campus ecosystem.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateStreaming = (fullText: string, onChunk: (chunk: string) => void) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        onChunk(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  };

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const randomResponse =
      mockResponses[Math.floor(Math.random() * mockResponses.length)];

    setTimeout(() => {
      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      let currentContent = '';
      const cleanup = simulateStreaming(randomResponse, (chunk) => {
        currentContent = chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessage.id ? { ...msg, content: currentContent } : msg,
          ),
        );
      });

      setTimeout(() => {
        setIsTyping(false);
        cleanup();
      }, randomResponse.length * 20 + 100);
    }, 600);
  };

  return (
<div className="relative flex h-[calc(100vh-8rem)] w-full max-w-5xl mx-auto flex-col space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-slate-50">AI Co-pilot</h1>
          <p className="mt-1 text-xs text-slate-400">
            Chat with your AI assistant to optimize societies, events, and engagement.
          </p>
        </div>
        <div className="inline-flex items-center gap-1 rounded-2xl border border-neonCyan/40 bg-slate-900/70 px-2 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-neonCyan shadow-soft">
          <Sparkles className="h-3 w-3" />
          AI Playbook
        </div>
      </div>

      <GlassCard className="relative flex flex-1 flex-col overflow-hidden p-4">
        <div className="pointer-events-none absolute -inset-16 bg-[radial-gradient(circle_at_top,_rgba(0,245,255,0.12),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(168,85,247,0.12),_transparent_55%)] opacity-60" />

        <div className="relative flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-3 overflow-y-auto pr-2">
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neonCyan/30 to-neonPurple/30 shadow-glow">
                      <Bot className="h-4 w-4 text-neonCyan" />
                    </div>
                  )}
                  <div
                    className={`max-w-[75%] rounded-3xl px-3 py-2 text-xs ${
                      msg.role === 'user'
                        ? 'bg-slate-800/80 text-slate-100'
                        : 'bg-gradient-to-br from-neonCyan/20 to-neonPurple/20 border border-neonCyan/30 text-slate-100'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-2"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neonCyan/30 to-neonPurple/30 shadow-glow">
                  <Bot className="h-4 w-4 text-neonCyan" />
                </div>
                <div className="flex items-center gap-1 rounded-3xl bg-gradient-to-br from-neonCyan/20 to-neonPurple/20 border border-neonCyan/30 px-3 py-2">
                  <Loader2 className="h-3 w-3 animate-spin text-neonCyan" />
                  <span className="text-sm text-slate-300">AI is thinking...</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="mt-4 flex items-center gap-4 rounded-full border border-white/10 bg-slate-900/60 p-3 pl-6">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask me anything about societies, events, or engagement..."
              className="flex-1 bg-transparent text-base text-slate-100 outline-none placeholder:text-slate-500"
              disabled={isTyping}
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-gradient-to-tr from-neonCyan to-neonPurple text-slate-900 shadow-glow transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      </GlassCard>

      <motion.button
        className="fixed bottom-20 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-neonCyan to-neonPurple text-slate-900 shadow-glow sm:bottom-6 sm:right-6"
        animate={{
          y: [0, -6, 0],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="absolute inline-flex h-[150%] w-[150%] animate-pulse-ring rounded-full border border-neonCyan/50" />
        <Bot className="relative h-6 w-6" />
      </motion.button>
    </div>
  );
};

export default AI;

