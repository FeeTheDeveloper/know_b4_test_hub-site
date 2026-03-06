import { PageHeading } from "@/components/ui";
import { requireProfile } from "@/lib/auth";
import { formatDate } from "@/lib/utils";
import { ProfileForm } from "@/components/ui/profile-form";

export default async function ProfilePage() {
  const profile = await requireProfile();

  return (
    <>
      <PageHeading
        title="Profile"
        description="View and manage your account information."
      />

      <div className="max-w-2xl space-y-6">
        {/* Profile info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Personal Information</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm mb-6">
            <div>
              <dt className="text-gray-500">Email</dt>
              <dd className="mt-0.5 font-medium text-gray-900">
                {profile.email}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Member Since</dt>
              <dd className="mt-0.5 font-medium text-gray-900">
                {formatDate(profile.created_at)}
              </dd>
            </div>
            <div>
              <dt className="text-gray-500">Role</dt>
              <dd className="mt-0.5 font-medium text-gray-900 capitalize">
                {profile.role}
              </dd>
            </div>
          </dl>

          <ProfileForm profile={profile} />
        </div>
      </div>
    </>
  );
}
