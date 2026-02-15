"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/shared/lib";
import { Sidebar } from "@/widgets/sidebar";
import s from "./dashboard.module.scss";

const emptySubscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const mounted = useHydrated();
  const isAuthenticated = useAppSelector((st) => st.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.replace("/login");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted) {
    return (
      <div className={s.skeleton}>
        <div className={s.skeletonSidebar} />
        <div className={s.skeletonMain}>
          <div className={s.skeletonBarSm} />
          <div className={s.skeletonBarLg} />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className={s.layout}>
      <Sidebar />
      <main className={s.main}>
        <div className={s.content}>{children}</div>
      </main>
    </div>
  );
}
