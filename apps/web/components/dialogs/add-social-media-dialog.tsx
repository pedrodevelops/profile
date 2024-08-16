import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from "@profile/ui";
import * as React from "react";

type AddSocialMediaDialogProps = {
  setProfile: (profile: any) => void;
  profile: any;
};

export function AddSocialMediaDialog({
  setProfile,
  profile,
}: AddSocialMediaDialogProps) {
  const defaultSocialMedia = {
    media: "",
    url: "",
  };

  const [socialMedia, setSocialMedia] = React.useState<{
    media: string;
    url: string;
  }>(defaultSocialMedia);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Adicionar Rede social</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicione uma rede social</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="social-media">Rede social</Label>
          <Input
            id="social-media"
            className="col-span-3"
            placeholder="Instagram"
            required
            onChange={(e) =>
              setSocialMedia({
                ...socialMedia,
                media: e.target.value,
              })
            }
          />
          <Label htmlFor="url">Seu link</Label>
          <Input
            id="url"
            className="col-span-3"
            placeholder="https://socialmedia.com/voce"
            required
            onChange={(e) =>
              setSocialMedia({
                ...socialMedia,
                url: e.target.value,
              })
            }
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={() => {
                if (socialMedia == defaultSocialMedia) return;
                setProfile({
                  ...profile,
                  socials: [...profile.socials, socialMedia],
                });
              }}
            >
              Adicionar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
