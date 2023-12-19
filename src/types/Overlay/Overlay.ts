export interface OverlayRef {
  onCloseEvent: () => void;
}

export interface OverlayElemProps {
  isOpen: boolean;

  onCloseEvent: () => void;

  onExitEvent: () => void;
}

export type OverlayElem = (props: OverlayElemProps) => JSX.Element;
