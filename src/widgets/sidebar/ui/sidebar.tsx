"use client";

import { useState, type ComponentType } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch, useSessionState } from "@/shared/lib";
import { PostsIcon, PhotosIcon, LogoutIcon } from "@/shared/ui";
import { logout } from "@/features/auth";
import logoSvg from "@/shared/assets/logo.svg";
import s from "./sidebar.module.scss";

interface NavItem {
  href: string;
  label: string;
  Icon: ComponentType<{ active?: boolean; size?: number }>;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/posts", label: "Posts", Icon: PostsIcon },
  { href: "/photos", label: "Photos", Icon: PhotosIcon },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((st) => st.auth.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useSessionState("sidebar-collapsed", false);

  const handleLogout = () => {
    dispatch(logout());
    router.replace("/login");
  };

  const navLinks = (showLabels: boolean) =>
    NAV_ITEMS.map((item) => {
      const isActive = pathname.startsWith(item.href);
      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => setMobileOpen(false)}
          className={isActive ? s.navLinkActive : s.navLink}
          title={item.label}
        >
          <span className={s.navIcon}>
            <item.Icon active={isActive} size={20} />
          </span>
          {showLabels && item.label}
        </Link>
      );
    });

  const brandBlock = (showName: boolean) => (
    <div className={s.brand}>
      <Link href="/posts" className={s.brandLink}>
        <Image src={logoSvg} alt="web3Posts" width={28} height={32} />
        {showName && <span className={s.brandName}>web3Posts</span>}
      </Link>
    </div>
  );

  const userBlock = (showLabels: boolean) => (
    <div className={s.userSection}>
      {user && showLabels && <p className={s.userEmail}>{user.email}</p>}
      <button onClick={handleLogout} className={s.logoutBtn} title="Sign Out">
        <LogoutIcon size={16} />
        {showLabels && <span>Sign Out</span>}
      </button>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className={mobileOpen ? s.hamburgerOpen : s.hamburger}
        aria-label="Toggle navigation"
      >
        <span className={s.hamburgerInner}>
          {mobileOpen ? "✕" : "☰"}
        </span>
      </button>

      <div className={mobileOpen ? s.overlayVisible : s.overlay} onClick={() => setMobileOpen(false)} />

      <aside className={mobileOpen ? s.drawerOpen : s.drawer}>
        {brandBlock(true)}
        <nav className={s.nav}>{navLinks(true)}</nav>
        {userBlock(true)}
      </aside>

      <div className={collapsed ? s.spacerCollapsed : s.spacer} />
      <aside className={collapsed ? s.desktopCollapsed : s.desktop}>
        {brandBlock(!collapsed)}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={s.collapseBtn}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? "»" : "«"}
        </button>
        <nav className={s.nav}>{navLinks(!collapsed)}</nav>
        {userBlock(!collapsed)}
      </aside>
    </>
  );
}
