import { requireProfile } from "@/lib/auth";
import { getInitials } from "@/lib/utils";
import { DashboardShellWrapper } from "@/components/layout/dashboard-shell-wrapper";
import { userNavLinks } from "@/lib/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await requireProfile();
  const fullName = `${profile.first_name} ${profile.last_name}`;
  const initials = getInitials(profile.first_name, profile.last_name);

  return (
    <DashboardShellWrapper
      sidebarLinks={userNavLinks}
      userName={fullName}
      userInitials={initials}
    >
      {children}
    </DashboardShellWrapper>
  );
}
