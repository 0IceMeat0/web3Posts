"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppSelector } from "@/shared/lib";
import { LoginForm } from "@/features/auth";
import logoSvg from "@/shared/assets/logo.svg";
import s from "./login.module.scss";

const emptySubscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export default function LoginPage() {
  const mounted = useHydrated();
  const isAuthenticated = useAppSelector((st) => st.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (mounted && isAuthenticated) router.replace("/posts");
  }, [mounted, isAuthenticated, router]);

  if (!mounted) {
    return <div className={s.loading} />;
  }

  return (
    <div className={s.page}>
      <div className={s.accentBar} />

      <div className={s.center}>
        <div className={s.card}>
          <div className={s.brand}>
            <div className={s.logoRow}>
              <Image src={logoSvg} alt="web3Posts" width={36} height={40} />
              <h1 className={s.logoText}>web3Posts</h1>
            </div>
            <p className={s.tagline}>Authenticate to continue</p>
          </div>

          <LoginForm />

          <p className={s.hint}>Mock auth — any email + password works</p>
        </div>
      </div>
    </div>
  );
}
