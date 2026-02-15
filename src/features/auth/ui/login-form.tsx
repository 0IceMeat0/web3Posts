"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/shared/lib";
import { login } from "../model/auth-slice";
import s from "./login-form.module.scss";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await dispatch(login(email)).unwrap();
      router.replace("/posts");
    } catch {
      setError("Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <div className={s.field}>
        <label htmlFor="email" className={s.label}>
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          className={s.input}
        />
      </div>

      <div className={s.field}>
        <label htmlFor="password" className={s.label}>
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          className={s.input}
        />
      </div>

      {error && <p className={s.error}>{error}</p>}

      <button type="submit" disabled={loading} className={s.submit}>
        {loading ? "Authenticating..." : "Sign In"}
      </button>
    </form>
  );
}
