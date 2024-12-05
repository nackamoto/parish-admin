import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";

type DialogProps = {
  DialogHeader?: React.ReactNode;
  DialogTitle?: React.ReactNode;
  DialogContent?: React.ReactNode;
  DialogTrigger?: React.ReactNode;
  DialogDescription?: React.ReactNode;
  DialogCloser?: React.ReactNode;
  DialogPosition?: string;
  className?: string;
  hasTrigger?: boolean;
  close?: () => void;
  open?: () => void;
};
type DialogMethods = {
  open: () => void;
  close: () => void;
};

const DialogModal = forwardRef<DialogMethods, DialogProps>((props, ref) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  function close() {
    setDialogOpen(false);
  }
  function open() {
    setDialogOpen(true);
  }

  useImperativeHandle(ref, () => {
    return { open, close };
  });
  return (
    <Dialog.Root open={props.hasTrigger ? undefined : dialogOpen}>
      {/* if there's a trigger, show trigger */}
      {props.hasTrigger && (
        <Dialog.Trigger asChild>{props.DialogTrigger}</Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-_gray-200/60 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            "data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white  shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none",
            props.className && props.className
          )}
        >
          {!!props.DialogTitle && (
            <Dialog.Title asChild>{props.DialogTitle}</Dialog.Title>
          )}
          {!!props.DialogDescription && (
            <Dialog.Description>{props.DialogDescription}</Dialog.Description>
          )}
          {/* render the dialog content here */}
          {props.DialogContent}
          {/* if there's no custom closer passed, render a default one */}
          {!!props.DialogCloser ? (
            <Dialog.Close asChild>{props.DialogCloser}</Dialog.Close>
          ) : (
            <Dialog.Close asChild>
              <button
                className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <XIcon />
              </button>
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});
export { DialogModal };
DialogModal.displayName = "DialogModal";
