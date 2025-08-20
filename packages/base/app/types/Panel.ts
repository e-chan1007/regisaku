export interface PanelConfig {
  id: string;
  component: Component<PanelChildProps>;
}

export type ViewConfig = {
  panels: {
    id: string;
    width: string;
  }[];
};

export interface PanelChildProps {
  setViewIndex: (index: number) => void;
  next: () => void;
  prev: () => void;
  currentViewIndex: number;
  active: boolean;
  isTransitioning: boolean;
}
