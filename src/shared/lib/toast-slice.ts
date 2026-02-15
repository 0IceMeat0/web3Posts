import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Toast } from "./types";
import type { AppDispatch } from "./store";

interface ToastState {
  toasts: Toast[];
}

const initialState: ToastState = { toasts: [] };

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    pushToast(state, action: PayloadAction<Toast>) {
      state.toasts.push(action.payload);
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

/** Adds a toast to the list */
export const pushToast = toastSlice.actions.pushToast;
/** Removes a toast by id. */
export const removeToast = toastSlice.actions.removeToast;

/** Thunk: add toast and auto-dismiss after 3.5s */
export function showToast(message: string, type: "success" | "error") {
  return (dispatch: AppDispatch) => {
    const id = crypto.randomUUID();
    dispatch(pushToast({ id, message, type }));
    setTimeout(() => dispatch(removeToast(id)), 3500);
  };
}

export default toastSlice.reducer;
