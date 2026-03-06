import { AdminTable, PageHeading } from "@/components/ui";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import type { Profile } from "@/types";

export default async function AdminUsersPage() {
  const supabase = await createSupabaseServerClient();

  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  const users = (profiles ?? []) as Profile[];

  // Get enrollment counts per user
  const { data: enrollmentCounts } = await supabase
    .from("enrollments")
    .select("user_id");

  const countMap: Record<string, number> = {};
  for (const e of enrollmentCounts ?? []) {
    countMap[e.user_id] = (countMap[e.user_id] ?? 0) + 1;
  }

  type UserRow = Profile & { enrollmentCount: number };
  const userRows: UserRow[] = users.map((u) => ({
    ...u,
    enrollmentCount: countMap[u.user_id] ?? 0,
  }));

  return (
    <>
      <PageHeading
        title="Manage Users"
        description="View and manage all registered users."
      />

      <AdminTable<UserRow>
        keyExtractor={(u) => u.id}
        data={userRows}
        columns={[
          {
            key: "name",
            header: "Name",
            render: (user) => (
              <div>
                <p className="font-medium text-gray-900">
                  {user.first_name && user.last_name
                    ? `${user.first_name} ${user.last_name}`
                    : user.email}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            ),
          },
          {
            key: "company",
            header: "Company",
            render: (user) => (
              <span className="text-gray-600">
                {user.company ?? "—"}
              </span>
            ),
          },
          {
            key: "role",
            header: "Role",
            render: (user) => (
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {user.role === "admin" ? "Admin" : "User"}
              </span>
            ),
          },
          {
            key: "enrollments",
            header: "Enrollments",
            render: (user) => (
              <span className="text-gray-600">{user.enrollmentCount}</span>
            ),
          },
          {
            key: "joined",
            header: "Joined",
            render: (user) => (
              <span className="text-gray-500">{formatDate(user.created_at)}</span>
            ),
          },
        ]}
      />
    </>
  );
}
