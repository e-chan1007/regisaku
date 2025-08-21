export type PanelView = {
  id: string;
  width: string;
}[];

export interface PanelChildProps {
  setViewIndex: (index: number) => void;
  next: () => void;
  prev: () => void;
  currentViewIndex: number;
  active: boolean;
  isTransitioning: boolean;
}
