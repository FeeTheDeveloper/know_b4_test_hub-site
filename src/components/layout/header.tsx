"use client";

import { getInitials } from "@/lib/utils";

interface HeaderProps {
  onMenuToggle: () => void;
  userName: string;
  userInitials?: string;
}

export function Header({ onMenuToggle, userName, userInitials }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-brandBlue border-b border-white/10 flex items-center justify-between px-4 lg:px-6">
      {/* Mobile menu button */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-2 -ml-2 rounded-lg text-white/70 hover:bg-white/10"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex-1 lg:flex-none" />

      {/* Right section */}
      <div className="flex items-center gap-3">
        <span className="hidden sm:block text-sm text-white/70">{userName}</span>
        <div className="w-9 h-9 bg-brandGold rounded-full flex items-center justify-center">
          <span className="text-brandBlue text-sm font-semibold">
            {userInitials || getInitials(userName.split(" ")[0] ?? "", userName.split(" ")[1] ?? "")}
          </span>
        </div>
      </div>
    </header>
  );
}
