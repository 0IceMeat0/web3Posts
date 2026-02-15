import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthState } from "./types";

const AUTH_KEY = "dashx-auth";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

/** Read persisted auth from localStorage (safe for SSR) */
export function loadAuthState(): AuthState {
  if (typeof window === "undefined") {
    return initialState;
  }
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AuthState;
      if (parsed.user && parsed.isAuthenticated) {
        return parsed;
      }
    }
  } catch {}
  return initialState;
}

/** Persist auth to localStorage */
function persistAuth(state: AuthState) {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(state));
  } catch {}
}

/** Mock login — accepts any email, simulates 600ms latency */
export const login = createAsyncThunk(
  "auth/login",
  async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const name = email.split("@")[0] ?? "user";
    return { email, name };
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      persistAuth(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      persistAuth(state);
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
