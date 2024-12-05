"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useOnClickOutside } from "usehooks-ts";
type SideDrawerProps = {
  hasTrigger?: boolean;
  noHeader?: boolean;
  className?: string;
  /**
   * Side to open the drawer
   * @default "right"
   * @type "top" | "bottom" | "left" | "right" | null | undefined
   *
   */
  side?: "top" | "bottom" | "left" | "right" | null | undefined;
  SheetTitle?: ReactNode;
  SheetDescription?: ReactNode;
  SheetTrigger?: ReactNode;
  SheetContent?: ReactNode;
  SheetClose?: ReactNode;

  /**
   * Callback when the drawer is opened
   */
  onClickOutside?: () => void;
};
export type SideDrawerMethods = {
  onOpen?: () => void;
  onClose?: () => void;
};

export const SideDrawer = forwardRef<SideDrawerMethods, SideDrawerProps>(
  (props, ref) => {
    const watchOutsideClickRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    function onOpen() {
      setOpen(true);
    }
    function onClose() {
      setOpen(false);
    }
    useImperativeHandle(ref, () => {
      return { onOpen, onClose };
    });
    useOnClickOutside(watchOutsideClickRef, () => {
      !props.onClickOutside ? setOpen(false) : props.onClickOutside();
    });
    return (
      <Sheet open={props.hasTrigger ? undefined : open}>
        <SheetTrigger asChild>{props.SheetTrigger}</SheetTrigger>
        <SheetContent
          side={props.side}
          className={props.className}
          ref={watchOutsideClickRef}
        >
          {!props.noHeader && (
            <SheetHeader>
              <SheetTitle asChild>{props.SheetTitle}</SheetTitle>
              <SheetDescription asChild>
                {props.SheetDescription}
              </SheetDescription>
            </SheetHeader>
          )}
          {/* content here */}
          {props.SheetContent}
          <SheetFooter>
            <SheetClose asChild>{props.SheetClose}</SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }
);
SideDrawer.displayName = "SideDrawer";
