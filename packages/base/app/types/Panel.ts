export type PanelView = {
  id: string;
  width: string;
}[];

export interface PanelChildProps {
  setViewIndex: (index: number) => void;
  next: () => void;
  prev: () => void;
  currentViewIndex: MaybeRef<number>;
  active: MaybeRef<boolean>;
  isTransitioning: MaybeRef<boolean>;
}
