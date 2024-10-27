import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

import { Trash2 } from "lucide-react";

const DialogDemo = ({ deleteFor, ...props }) => {
  return (
    <Dialog className="rounded">
      <DialogTrigger asChild>
        {deleteFor === "poster" || deleteFor === "gallery" ? (
          <button
            className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
            aria-label="Delete image"
          >
            <Trash2 className="w-6 h-6 text-white" />
          </button>
        ) : (
          <Button
            variant="destructive"
            size="small"
            className=" px-2 py-1 text-xs"
          >
            Delete
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[90vw] rounded sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {" " + deleteFor}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this {" " + deleteFor}?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="grid gap-3 grid-cols-2 sm:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" {...props}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDemo;
