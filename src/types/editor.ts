export interface CanvasItem {
  id: string;
  type: "speech" | "thought" | "narration" | "sfx" | "image";
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  textColor?: string;
  bubbleColor?: string;
  borderColor?: string;
  borderWidth?: number;
  tailDirection?: "bottom-left" | "bottom-right" | "top-left" | "top-right" | "none";
  opacity?: number;
  zIndex?: number;
  imageUrl?: string;
  scaleX?: number;
  scaleY?: number;
}

export interface ComicPage {
  id: string;
  pageNumber: number;
  layoutType: "single" | "2-grid" | "4-grid" | "vertical-split" | "horizontal-split";
  canvasItems: CanvasItem[];
}

export interface StudioState {
  pages: ComicPage[];
  currentPageId: string;
  selectedItemId: string | null;
}
