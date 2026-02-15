"use client";

import clsx from "clsx";
import { useAppSelector, useAppDispatch, removeToast } from "@/shared/lib";
import s from "./toaster.module.scss";

export function Toaster() {
  const toasts = useAppSelector((st) => st.toast.toasts);
  const dispatch = useAppDispatch();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div className={s.wrapper}>
      {toasts.map((toast) => (
        <button
          key={toast.id}
          onClick={() => dispatch(removeToast(toast.id))}
          className={clsx(
            s.toast,
            toast.type === "success" ? s.success : s.error
          )}
        >
          {toast.message}
        </button>
      ))}
    </div>
  );
}
