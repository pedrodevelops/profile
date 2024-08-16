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

type AddTagDialogProps = {
  setProfile: (profile: any) => void;
  profile: any;
};

export function AddTagDialog({ setProfile, profile }: AddTagDialogProps) {
  const [tag, setTag] = React.useState<string>("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Adicionar tag</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicione uma tag</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Label htmlFor="tag">Tag</Label>
          <Input
            id="tag"
            className="col-span-3"
            placeholder="Estudante"
            required
            onChange={(e) => setTag(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              onClick={() => {
                if (!tag) return;

                setProfile({
                  ...profile,
                  tags: [...profile.tags, tag],
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
