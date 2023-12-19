import { Fragment, createContext, useCallback, useMemo, useState } from "react";

// types
import type { Nullable, ChildrenAlias } from "@/types";

interface OverlayContextProps {
  created: (cId: string, elem: ChildrenAlias) => void;

  unmount: (cId: string) => void;
}

type OverlayComponentState<K, V> = Map<K, V>;

interface OverlayProviderProps {
  children: ChildrenAlias;
}

export const OverlayContext =
  createContext<Nullable<OverlayContextProps>>(null);

export const OverlayProvider = ({ children }: OverlayProviderProps) => {
  const [cIds, setCIds] = useState<
    OverlayComponentState<string, ChildrenAlias>
  >(new Map());

  const created = useCallback((cId: string, elem: ChildrenAlias) => {
    setCIds((prev: OverlayComponentState<string, ChildrenAlias>) => {
      const prevMap = new Map(prev);

      prevMap.set(cId, elem);

      return prevMap;
    });
  }, []);

  const unmount = useCallback((cId: string) => {
    setCIds((prev: OverlayComponentState<string, ChildrenAlias>) => {
      const prevMap = new Map(prev);

      prevMap.delete(cId);

      return prevMap;
    });
  }, []);

  const overlayValue = useMemo(() => {
    return { created: created, unmount: unmount };
  }, [created, unmount]);

  return (
    <OverlayContext.Provider value={overlayValue}>
      {children}
      {[...cIds.entries()].map(([cId, child]) => {
        return <Fragment key={cId}>{child}</Fragment>;
      })}
    </OverlayContext.Provider>
  );
};
