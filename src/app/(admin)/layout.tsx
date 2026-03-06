import { requireAdmin } from "@/lib/auth";
import { getInitials } from "@/lib/utils";
import { DashboardShellWrapper } from "@/components/layout/dashboard-shell-wrapper";
import { adminNavLinks } from "@/lib/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireAdmin();
  const fullName = `${profile.first_name} ${profile.last_name}`;
  const initials = getInitials(profile.first_name, profile.last_name);

  return (
    <DashboardShellWrapper
      sidebarLinks={adminNavLinks}
      userName={fullName}
      userInitials={initials}
    >
      {children}
    </DashboardShellWrapper>
  );
}
