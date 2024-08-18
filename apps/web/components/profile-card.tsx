import Image from "next/image";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@profile/ui";
import { socialMediaIcons } from "./icons/social-media";
import Link from "next/link";

export type ProfileSocial = {
  media: string;
  url: string;
};

export type ProfileEntityProps = {
  username: string;
  bio: string;
  iconUrl: string;
  socials: ProfileSocial[];
  tags: string[];
};

export const ProfileCard: React.FC<ProfileEntityProps> = ({
  username,
  bio,
  iconUrl,
  socials,
  tags,
}) => {
  return (
    <Card className="max-w-lg p-4 m-auto shadow-lg">
      <CardHeader className="flex items-center">
        <Avatar>
          <AvatarImage src={iconUrl} />
          <AvatarFallback>
            <div className="h-32 w-32 bg-gradient-to-bl from-purple-400 to-pink-600"></div>
          </AvatarFallback>
        </Avatar>
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
