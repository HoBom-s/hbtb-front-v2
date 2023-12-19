import { Ref, useContext, useRef, useMemo, useEffect } from "react";

// context
import { OverlayContext } from "@/context";

// components
import { OverlayHandler } from "@/components";

// utils
import { generateUid } from "@/utils";

// types
import type { Nullable, OverlayRef, OverlayElem } from "@/types";

interface OverlayHook {
  onOpenEvent: (Overlay: OverlayElem) => void;

  onCloseEvent: () => void;

  onExitEvent: () => void;
}

/**
 * `useOverlay.tsx`
 *
 * Overlay hook
 *
 * @example
 *      1. Set `OverlayProvider` at root component.
 *      2. Call `useOverlay()` hook
 *          -   const { onOpenEvent } = overlay;
 *
 *              onOpenEvent(({ isOpen, onCloseEvent }) => {
 *                  return (
 *                      <CommonModal
 *                          isOpen={isOpen}
 *                          title="Modal"
 *                          bodyContents="Modal contents"
 *                          onModalCloseButtonClickEvent={() => onCloseEvent()}
 *                      />
 *                    );
 *                });
 *
 * @returns {OverlayHook}
 */
export const useOverlay = (): OverlayHook => {
  const overlayContext = useContext(OverlayContext);

  console.log(overlayContext);

  if (!overlayContext) {
    throw new Error("overlay hook must be exist but got null !");
  }

  const { created, unmount } = overlayContext;

  const overlayRef = useRef<Nullable<OverlayRef>>(null);

  if (!overlayRef) {
    throw new Error("overlay ref must be exist but got null !");
  }

  const componentUid: string = generateUid();

  useEffect(() => {
    return () => {
      unmount(componentUid);
    };
  }, [unmount, componentUid]);

  return useMemo(() => {
    return {
      onOpenEvent: (Overlay: OverlayElem) => {
        created(
          componentUid,
          <OverlayHandler
            key={generateUid()}
            ref={overlayRef as Ref<OverlayRef>}
            Overlay={Overlay}
            onExitEvent={() => unmount(componentUid)}
          />,
        );
      },
      onCloseEvent: () => {
        overlayRef.current?.onCloseEvent();
      },
      onExitEvent: () => {
        unmount(componentUid);
      },
    };
  }, [componentUid, created, unmount]);
};
