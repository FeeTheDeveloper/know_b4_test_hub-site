"use client";

import { useState, type ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

interface SidebarLink {
  href: string;
  label: string;
  icon: ReactNode;
}

interface DashboardShellProps {
  children: ReactNode;
  sidebarLinks: SidebarLink[];
  userName: string;
  userInitials?: string;
}

export function DashboardShell({
  children,
  sidebarLinks,
  userName,
  userInitials,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-primary-600">
      <Sidebar
        links={sidebarLinks}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          userName={userName}
          userInitials={userInitials}
        />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
