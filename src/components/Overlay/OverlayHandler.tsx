import {
  Ref,
  forwardRef,
  useCallback,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";

// types
import type { OverlayRef, OverlayElem } from "@/types";

interface OverlayHandlerProps {
  Overlay: OverlayElem;

  onExitEvent: () => void;
}

export const OverlayHandler = forwardRef(
  ({ Overlay, onExitEvent }: OverlayHandlerProps, ref: Ref<OverlayRef>) => {
    const [isOpenOverlay, setIsOpenOverlay] = useState<boolean>(false);

    const handleClose = useCallback(() => {
      setIsOpenOverlay((prevIsOpenOverlay: boolean) => !prevIsOpenOverlay);
    }, []);

    useImperativeHandle(
      ref,
      () => {
        return {
          onCloseEvent: handleClose,
        };
      },
      [handleClose],
    );

    useEffect(() => {
      requestAnimationFrame(() => {
        setIsOpenOverlay(true);
      });
    }, []);

    return (
      <Overlay
        isOpen={isOpenOverlay}
        onCloseEvent={handleClose}
        onExitEvent={onExitEvent}
      />
    );
  },
);
