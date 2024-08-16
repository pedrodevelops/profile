import { UpdateProfileForm } from "@web/components/forms/update-profile-form";
import { ApiError } from "@web/errors";
import { profileService } from "@web/services/profile.service";

export default async function EditProfile() {
  return (
    <div className="flex h-screen">
      <UpdateProfileForm />
    </div>
  );
}
