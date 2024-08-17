import Image from "next/image";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@profile/ui";
import { socialMediaIcons } from "./icons/social-media";
import Link from "next/link";

export type ProfileSocial = {
  media: string;
  url: string;
};

export type ProfileEntityProps = {
  username: string;
  bio: string;
  image: string;
  socials: ProfileSocial[];
  tags: string[];
};

export const ProfileCard: React.FC<ProfileEntityProps> = ({
  username,
  bio,
  image,
  socials,
  tags,
}) => {
  return (
    <Card className="max-w-lg p-4 m-auto shadow-lg">
      <CardHeader className="text-center">
        <Image
          className="rounded-full mx-auto"
          src={"https://avatars.githubusercontent.com/u/115515311?v=4"}
          alt={`${username}'s profile picture`}
          width={150}
          height={150}
        />
        <CardTitle className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">
          {username}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-6">
        <p className="text-muted-foreground">{bio}</p>
        <div className="mt-4">
          <ul className="gap-4 flex">
            {socials.map((social, index) => {
              const Icon = socialMediaIcons[social.media];

              if (Icon == undefined) {
                return null;
              }

              return (
                <li key={index}>
                  <Link href={social.url}>
                    {<Icon size={24} className="text-zinc-700" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-4">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
