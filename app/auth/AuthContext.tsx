// app/auth/AuthContext.tsx
import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth } from "../../src/lib/firebase"; // your firebase.ts export

type AuthCtx = {
  user: User | null | undefined; // undefined = not resolved yet
  ready: boolean;                // first auth snapshot received
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {

  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);       // u is User or null
      setReady(true);   // first snapshot received
    });
    return unsub;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    // Do NOT set user here; onAuthStateChanged will update it.
  };

  const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    // Do NOT set user(null) optimistically; let onAuthStateChanged fire.
  };

  const value = useMemo(
    () => ({ user, ready, login, register, logout }),
    [user, ready]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}
