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

const DialogDemo = ({deleteFor, ...props }) => {
  return (
    <Dialog className='rounded'>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="small"
          className=" px-2 py-1 text-xs"
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] rounded sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete {' ' + deleteFor}</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this {' ' + deleteFor}?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="grid gap-3 grid-cols-2 sm:gap-0">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
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
