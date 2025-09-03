import React, { createContext, useContext, useMemo, useState } from "react";

const uid = () => {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).substring(2, 8) +
    Math.random().toString(36).substring(2, 8)
  );
};

type Message = { from: "you" | "sarah"; text: string; id: string };
type GameContextType = {
  points: number;
  awardPoints: (n: number) => void;
  messages: Message[];
  sendMessage: (text: string) => void;
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [points, setPoints] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    { id: "m1", from: "sarah", text: "Loved your answer — what's your perfect first date?", },
  ]);

  const awardPoints = (n: number) => setPoints(p => p + n);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const id = uid();
    setMessages(m => [...m, { id, from: "you", text }]);

    setTimeout(() => {
        const rid = uid();
        setMessages(m => [...m, { id: rid, from: "sarah", text: "Cute 😄 Tell me more." }]);
        }, 900);
    };


  const value = useMemo(() => ({ points, awardPoints, messages, sendMessage }), [points, messages]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
};
