import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";

export function DialogCloseButton({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
<<<<<<< HEAD
        <Button className="block rounded-2xl">Add Tours</Button>
=======
        <Button className="block">{title}</Button>
>>>>>>> 95e93b3e07aef95dfbd13fcc75108221bdecf14f
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{children}</DialogTitle>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
