import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";

interface CustomDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
  showFooter?: boolean;
  onSubmit?: () => void;
  showCancel?: boolean;
  width?: boolean;
}

export default function CustomDialog({
  open,
  setOpen,
  children,
  width = false,
}: CustomDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={`${
          width ? "sm:max-w-[367px]" : "sm:max-w-[511px]"
        }  bg-white border-0 rounded-[16px]`}
      >
        <DialogHeader className="hidden">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
