import { ProfileCard } from "@web/components/profile-card";
import { ApiError } from "@web/errors";
import { profileService } from "@web/services/profile.service";

export default async function Profile({
  params,
}: {
  params: { profile: string };
}) {
  let profile;

  try {
    profile = await profileService.getProfile(params.profile);
  } catch (error) {
    if (error instanceof ApiError) {
      return <p>{error.message}</p>;
    }

    return <p>Failed to get profile</p>;
  }
  // https://avatars.githubusercontent.com/u/115515311?v=4
  return (
    <div className="flex">
      <ProfileCard {...profile} />
    </div>
  );
}
