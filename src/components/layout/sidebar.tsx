"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  links: SidebarLink[];
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ links, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-brandBlue transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand */}
        <div className="flex items-center h-16 px-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2" onClick={onClose}>
            <div className="w-8 h-8 bg-brandGold rounded-lg flex items-center justify-center">
              <span className="text-brandBlue font-bold text-sm">KB</span>
            </div>
            <span className="font-semibold text-white">Know B4 Hub</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 sidebar-scroll overflow-y-auto h-[calc(100%-4rem)]">
          {links.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/10 text-brandGold"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                <span className="w-5 h-5 flex items-center justify-center">
                  {link.icon}
                </span>
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
