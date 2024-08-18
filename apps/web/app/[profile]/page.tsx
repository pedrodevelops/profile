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
    let message = "An unexpected error occurred. Please try again later.";

    if (error instanceof ApiError) {
      if (error.code === 404) {
        message = `We couldn't find ${params.profile}'s profile 🫠`;
      }
    }

    return <p className="text-3xl">{message}</p>;
  }
  return (
    <div className="flex">
      <ProfileCard {...profile} />
    </div>
  );
}
