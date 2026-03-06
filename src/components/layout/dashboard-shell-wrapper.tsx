"use client";

import type { ReactNode } from "react";
import { DashboardShell } from "./dashboard-shell";

interface SidebarLink {
  href: string;
  label: string;
  icon: ReactNode;
}

interface Props {
  children: ReactNode;
  sidebarLinks: SidebarLink[];
  userName: string;
  userInitials?: string;
}

export function DashboardShellWrapper({
  children,
  sidebarLinks,
  userName,
  userInitials,
}: Props) {
  return (
    <DashboardShell
      sidebarLinks={sidebarLinks}
      userName={userName}
      userInitials={userInitials}
    >
      {children}
    </DashboardShell>
  );
}
