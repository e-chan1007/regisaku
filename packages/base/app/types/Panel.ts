export type PanelView = {
  id: string;
  width: string;
}[];

export interface PanelChildProps {
  setViewIndex: (index: number, skipTransition?: boolean) => void;
  next: (skipTransition?: boolean) => void;
  prev: (skipTransition?: boolean) => void;
  currentViewIndex: number;
  active: boolean;
  isTransitioning: boolean;
}
