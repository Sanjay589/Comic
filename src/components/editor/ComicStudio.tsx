"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { CanvasItem, ComicPage } from "@/types/editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import {
  Plus,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Undo2,
  Redo2,
  Save,
  Download,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  Type,
  Maximize2,
  ZoomIn,
  ZoomOut,
  ArrowLeft,
  Settings,
  HelpCircle,
  FolderUp,
} from "lucide-react";
import Link from "next/link";

// Dynamically import StageCanvas to prevent SSR window reference failures
const StageCanvas = dynamic(() => import("./StageCanvas"), {
  ssr: false,
  loading: () => (
    <div className="w-[600px] h-[800px] bg-dark-surface border border-dark-border rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent mx-auto mb-3" />
        <span className="text-sm text-surface-400">Loading Canvas Workspace...</span>
      </div>
    </div>
  ),
});

// Demo panels data to represent generated images from previous stages
const DEMO_IMAGE_PANELS = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=60",
];

const DEFAULT_PAGES: ComicPage[] = [
  {
    id: "page-1",
    pageNumber: 1,
    layoutType: "4-grid",
    canvasItems: [
      {
        id: "panel-img-1",
        type: "image",
        x: 10,
        y: 10,
        width: 280,
        height: 380,
        rotation: 0,
        imageUrl: DEMO_IMAGE_PANELS[0],
        zIndex: 0,
      },
      {
        id: "panel-img-2",
        type: "image",
        x: 310,
        y: 10,
        width: 280,
        height: 380,
        rotation: 0,
        imageUrl: DEMO_IMAGE_PANELS[1],
        zIndex: 0,
      },
      {
        id: "panel-img-3",
        type: "image",
        x: 10,
        y: 410,
        width: 280,
        height: 380,
        rotation: 0,
        imageUrl: DEMO_IMAGE_PANELS[2],
        zIndex: 0,
      },
      {
        id: "panel-img-4",
        type: "image",
        x: 310,
        y: 410,
        width: 280,
        height: 380,
        rotation: 0,
        imageUrl: DEMO_IMAGE_PANELS[3],
        zIndex: 0,
      },
      {
        id: "bubble-1",
        type: "speech",
        x: 50,
        y: 50,
        width: 150,
        height: 80,
        rotation: 0,
        text: "What is this place? It looks completely abandoned.",
        fontSize: 14,
        fontFamily: "Comic Neue",
        textColor: "#000000",
        bubbleColor: "#ffffff",
        borderColor: "#000000",
        borderWidth: 2,
        tailDirection: "bottom-left",
        zIndex: 1,
      },
      {
        id: "sfx-1",
        type: "sfx",
        x: 230,
        y: 350,
        width: 120,
        height: 60,
        rotation: -10,
        text: "CREEEAK!",
        fontSize: 24,
        fontFamily: "Bangers",
        textColor: "#ef4444",
        bubbleColor: "transparent",
        borderColor: "transparent",
        borderWidth: 0,
        tailDirection: "none",
        zIndex: 2,
      },
    ],
  },
];

export default function ComicStudio({ projectId }: { projectId: string }) {
  const { toast } = useToast();
  
  // Studio Pages State
  const [pages, setPages] = React.useState<ComicPage[]>(DEFAULT_PAGES);
  const [currentPageId, setCurrentPageId] = React.useState<string>("page-1");
  const [selectedItemId, setSelectedItemId] = React.useState<string | null>(null);

  // History stack for Undo/Redo
  const [history, setHistory] = React.useState<ComicPage[][]>([]);
  const [redoStack, setRedoStack] = React.useState<ComicPage[][]>([]);

  // Autosave Status
  const [saveStatus, setSaveStatus] = React.useState<"saved" | "saving" | "unsaved">("saved");
  const [lastSaved, setLastSaved] = React.useState<Date>(new Date());

  // Editor Scale (Zoom)
  const [scale, setScale] = React.useState(1);

  // Current Active Page Reference
  const currentPage = pages.find((p) => p.id === currentPageId) || pages[0];

  // Helper to register undo checkpoint
  const recordHistory = React.useCallback((nextPages: ComicPage[]) => {
    setHistory((prev) => [...prev, pages]);
    setRedoStack([]); // Clear redo
    setSaveStatus("unsaved");
  }, [pages]);

  // Debounced auto-save function simulation
  React.useEffect(() => {
    if (saveStatus !== "unsaved") return;

    // Transition to saving state in next tick to avoid synchronous cascading render warning
    const saveTimer = setTimeout(() => {
      setSaveStatus("saving");
    }, 100);

    // Transition to saved state after 1.5 seconds
    const finishTimer = setTimeout(() => {
      setSaveStatus("saved");
      setLastSaved(new Date());
    }, 1600);

    return () => {
      clearTimeout(saveTimer);
      clearTimeout(finishTimer);
    };
  }, [saveStatus]);

  // Add Page
  function handleAddPage() {
    recordHistory(pages);
    const newPage: ComicPage = {
      id: `page-${crypto.randomUUID()}`,
      pageNumber: pages.length + 1,
      layoutType: "4-grid",
      canvasItems: [],
    };
    const nextPages = [...pages, newPage];
    setPages(nextPages);
    setCurrentPageId(newPage.id);
    toast({ type: "success", title: "New Page Added" });
  }

  // Delete Page
  function handleDeletePage(id: string) {
    if (pages.length <= 1) {
      toast({ type: "warning", title: "Cannot delete the only page" });
      return;
    }
    recordHistory(pages);
    const nextPages = pages
      .filter((p) => p.id !== id)
      .map((p, idx) => ({ ...p, pageNumber: idx + 1 }));
    
    setPages(nextPages);
    if (currentPageId === id) {
      setCurrentPageId(nextPages[0].id);
    }
    toast({ type: "success", title: "Page Deleted" });
  }

  // Duplicate Page
  function handleDuplicatePage(page: ComicPage) {
    recordHistory(pages);
    const duplicated: ComicPage = {
      ...page,
      id: `page-${crypto.randomUUID()}`,
      pageNumber: pages.length + 1,
      canvasItems: page.canvasItems.map((item) => ({
        ...item,
        id: `${item.id}-copy-${crypto.randomUUID()}`,
      })),
    };
    setPages([...pages, duplicated]);
    setCurrentPageId(duplicated.id);
    toast({ type: "success", title: "Page Duplicated" });
  }

  // Page Order Navigation
  function handleMovePage(idx: number, dir: "up" | "down") {
    if (dir === "up" && idx === 0) return;
    if (dir === "down" && idx === pages.length - 1) return;
    
    recordHistory(pages);
    const nextPages = [...pages];
    const targetIdx = dir === "up" ? idx - 1 : idx + 1;
    [nextPages[idx], nextPages[targetIdx]] = [nextPages[targetIdx], nextPages[idx]];
    
    setPages(nextPages.map((p, i) => ({ ...p, pageNumber: i + 1 })));
  }

  // Add Item to Canvas
  function handleAddCanvasItem(type: "speech" | "thought" | "narration" | "sfx" | "image") {
    recordHistory(pages);
    const id = `${type}-${crypto.randomUUID()}`;
    
    const baseItem: CanvasItem = {
      id,
      type,
      x: 100,
      y: 100,
      width: type === "image" ? 280 : 150,
      height: type === "image" ? 380 : 80,
      rotation: 0,
      zIndex: currentPage.canvasItems.length + 1,
    };

    if (type === "speech" || type === "thought") {
      baseItem.text = "Enter dialogue...";
      baseItem.fontSize = 16;
      baseItem.fontFamily = "Comic Neue";
      baseItem.textColor = "#000000";
      baseItem.bubbleColor = "#ffffff";
      baseItem.borderColor = "#000000";
      baseItem.borderWidth = 2;
      baseItem.tailDirection = "bottom-left";
    } else if (type === "narration") {
      baseItem.text = "Enter narration description...";
      baseItem.fontSize = 14;
      baseItem.fontFamily = "Comic Neue";
      baseItem.textColor = "#000000";
      baseItem.bubbleColor = "#fbf5e6"; // vintage paper style yellow
      baseItem.borderColor = "#000000";
      baseItem.borderWidth = 2;
      baseItem.tailDirection = "none";
    } else if (type === "sfx") {
      baseItem.text = "BOOM!";
      baseItem.fontSize = 24;
      baseItem.fontFamily = "Bangers";
      baseItem.textColor = "#ef4444";
      baseItem.bubbleColor = "transparent";
      baseItem.borderColor = "transparent";
      baseItem.borderWidth = 0;
      baseItem.tailDirection = "none";
    } else if (type === "image") {
      // Pick next demo image placeholder
      const idx = currentPage.canvasItems.filter((i) => i.type === "image").length % DEMO_IMAGE_PANELS.length;
      baseItem.imageUrl = DEMO_IMAGE_PANELS[idx];
    }

    const nextPages = pages.map((p) => {
      if (p.id !== currentPageId) return p;
      return {
        ...p,
        canvasItems: [...p.canvasItems, baseItem],
      };
    });

    setPages(nextPages);
    setSelectedItemId(id);
  }

  // Update Canvas Item Details
  function handleUpdateCanvasItem(id: string, updates: Partial<CanvasItem>) {
    setPages((prevPages) =>
      prevPages.map((p) => {
        if (p.id !== currentPageId) return p;
        return {
          ...p,
          canvasItems: p.canvasItems.map((item) =>
            item.id === id ? { ...item, ...updates } : item
          ),
        };
      })
    );
    setSaveStatus("unsaved");
  }

  // Delete Item
  function handleDeleteItem(id: string) {
    recordHistory(pages);
    const nextPages = pages.map((p) => {
      if (p.id !== currentPageId) return p;
      return {
        ...p,
        canvasItems: p.canvasItems.filter((item) => item.id !== id),
      };
    });
    setPages(nextPages);
    setSelectedItemId(null);
    toast({ type: "info", title: "Element deleted" });
  }

  // Arrange Layers Z-Index
  function handleArrangeLayer(id: string, action: "front" | "back") {
    recordHistory(pages);
    const nextPages = pages.map((p) => {
      if (p.id !== currentPageId) return p;
      const sortedItems = [...p.canvasItems].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
      const targetIdx = sortedItems.findIndex((it) => it.id === id);
      if (targetIdx === -1) return p;

      const item = sortedItems.splice(targetIdx, 1)[0];
      if (action === "front") {
        sortedItems.push(item);
      } else {
        sortedItems.unshift(item);
      }

      // Reassign sequential indices
      const itemsWithNewZ = sortedItems.map((it, idx) => ({ ...it, zIndex: idx + 1 }));
      return {
        ...p,
        canvasItems: itemsWithNewZ,
      };
    });

    setPages(nextPages);
    toast({ type: "info", title: action === "front" ? "Brought to front" : "Sent to back" });
  }

  // Undo Action
  function handleUndo() {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setRedoStack((prev) => [pages, ...prev]);
    setPages(previous);
    setHistory((prev) => prev.slice(0, -1));
    setSelectedItemId(null);
    setSaveStatus("unsaved");
  }

  // Redo Action
  function handleRedo() {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setHistory((prev) => [...prev, pages]);
    setPages(next);
    setRedoStack((prev) => prev.slice(1));
    setSelectedItemId(null);
    setSaveStatus("unsaved");
  }

  // Trigger Manual Save
  function handleManualSave() {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setLastSaved(new Date());
      toast({
        type: "success",
        title: "Project saved successfully",
      });
    }, 1000);
  }

  // Element Duplicate
  function handleDuplicateItem(item: CanvasItem) {
    recordHistory(pages);
    const id = `${item.type}-${crypto.randomUUID()}`;
    const duplicated: CanvasItem = {
      ...item,
      id,
      x: item.x + 30, // Offset position to distinguish from original
      y: item.y + 30,
      zIndex: currentPage.canvasItems.length + 1,
    };
    
    setPages((prevPages) =>
      prevPages.map((p) => {
        if (p.id !== currentPageId) return p;
        return {
          ...p,
          canvasItems: [...p.canvasItems, duplicated],
        };
      })
    );
    setSelectedItemId(id);
    toast({ type: "success", title: "Element duplicated" });
  }

  // Export File simulation
  function handleExport(format: "png" | "pdf") {
    toast({
      type: "info",
      title: `Preparing export as ${format.toUpperCase()}...`,
      description: "Processing canvas layers, font styling, and bounding vectors.",
    });

    setTimeout(() => {
      toast({
        type: "success",
        title: "Export completed!",
        description: `Your comic book file is downloading.`,
      });
    }, 2000);
  }

  // Selected Item references
  const selectedItem = currentPage.canvasItems.find((it) => it.id === selectedItemId);

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-dark-bg text-surface-100 overflow-hidden">
      {/* LEFT SIDEBAR: Page List & Thumbnails */}
      <aside className="w-64 border-r border-dark-border bg-dark-surface flex flex-col flex-shrink-0" aria-label="Page and panel manager">
        {/* Actions header */}
        <div className="p-4 border-b border-dark-border flex items-center justify-between">
          <span className="text-sm font-semibold text-surface-200 flex items-center gap-1.5">
            Comic Pages
          </span>
          <Button variant="secondary" size="icon-sm" onClick={handleAddPage} aria-label="Add page">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Page items list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {pages.map((page, idx) => {
            const isActive = page.id === currentPageId;
            return (
              <div
                key={page.id}
                className={`relative rounded-xl border p-3 flex items-center justify-between group transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-brand-600/10 border-brand-500 shadow-md"
                    : "bg-dark-card border-dark-border hover:border-surface-600"
                }`}
                onClick={() => {
                  setCurrentPageId(page.id);
                  setSelectedItemId(null);
                }}
              >
                <div className="flex items-center gap-3">
                  {/* Miniature canvas preview sketch */}
                  <div className="w-10 h-14 bg-dark-surface rounded border border-dark-border flex items-center justify-center text-xs font-bold text-surface-500">
                    P{page.pageNumber}
                  </div>
                  <span className="text-sm font-medium text-surface-300">
                    Page {page.pageNumber}
                  </span>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMovePage(idx, "up");
                    }}
                    disabled={idx === 0}
                    className="p-1 rounded text-surface-500 hover:text-surface-300 disabled:opacity-30"
                    aria-label="Move page up"
                  >
                    <ChevronUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMovePage(idx, "down");
                    }}
                    disabled={idx === pages.length - 1}
                    className="p-1 rounded text-surface-500 hover:text-surface-300 disabled:opacity-30"
                    aria-label="Move page down"
                  >
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDuplicatePage(page);
                    }}
                    className="p-1 rounded text-surface-500 hover:text-surface-300"
                    aria-label="Duplicate page"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePage(page.id);
                    }}
                    className="p-1 rounded text-surface-500 hover:text-comic-red"
                    aria-label="Delete page"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Toolbar Shortcuts to Add Items */}
        <div className="p-4 border-t border-dark-border bg-dark-card space-y-2">
          <span className="text-xs font-bold text-surface-500 uppercase tracking-wider block mb-2">
            Canvas Toolbox
          </span>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="secondary"
              size="sm"
              className="justify-start gap-1 text-xs"
              onClick={() => handleAddCanvasItem("speech")}
            >
              <MessageSquare className="h-3.5 w-3.5 text-brand-400" /> Bubble
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="justify-start gap-1 text-xs"
              onClick={() => handleAddCanvasItem("narration")}
            >
              <Sparkles className="h-3.5 w-3.5 text-accent-400" /> Narration
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="justify-start gap-1 text-xs"
              onClick={() => handleAddCanvasItem("sfx")}
            >
              <Type className="h-3.5 w-3.5 text-comic-red" /> SFX
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="justify-start gap-1 text-xs"
              onClick={() => handleAddCanvasItem("image")}
            >
              <ImageIcon className="h-3.5 w-3.5 text-comic-green" /> Panel
            </Button>
          </div>
        </div>
      </aside>

      {/* CENTRE CANVAS */}
      <main className="flex-1 flex flex-col min-w-0 bg-dark-bg halftone-bg relative">
        {/* Editor controls bar */}
        <div className="h-14 border-b border-dark-border bg-dark-surface flex items-center justify-between px-6 z-10">
          {/* Saved indicator and title info */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-surface-200">
              The Robot Lab — Page {currentPage.pageNumber}
            </span>
            <span className="text-xs text-surface-500 flex items-center gap-1.5">
              {saveStatus === "saving" && (
                <>
                  <div className="h-2 w-2 rounded-full bg-comic-yellow animate-pulse" /> Saving...
                </>
              )}
              {saveStatus === "saved" && (
                <>
                  <div className="h-2 w-2 rounded-full bg-comic-green" /> Autosaved (
                  {lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})
                </>
              )}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleUndo}
              disabled={history.length === 0}
              className="p-2 rounded-lg text-surface-400 hover:text-surface-100 hover:bg-dark-hover disabled:opacity-30"
              aria-label="Undo"
            >
              <Undo2 className="h-4 w-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              className="p-2 rounded-lg text-surface-400 hover:text-surface-100 hover:bg-dark-hover disabled:opacity-30"
              aria-label="Redo"
            >
              <Redo2 className="h-4 w-4" />
            </button>
            
            <div className="w-px h-6 bg-dark-border mx-1" />

            <button
              onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
              className="p-2 rounded-lg text-surface-400 hover:text-surface-100 hover:bg-dark-hover"
              aria-label="Zoom out"
            >
              <ZoomOut className="h-4 w-4" />
            </button>
            <span className="text-xs text-surface-400 font-medium select-none min-w-[32px] text-center">
              {Math.round(scale * 100)}%
            </span>
            <button
              onClick={() => setScale((s) => Math.min(1.5, s + 0.1))}
              className="p-2 rounded-lg text-surface-400 hover:text-surface-100 hover:bg-dark-hover"
              aria-label="Zoom in"
            >
              <ZoomIn className="h-4 w-4" />
            </button>

            <div className="w-px h-6 bg-dark-border mx-1" />

            <Button variant="secondary" size="sm" onClick={handleManualSave} leftIcon={<Save className="h-4 w-4" />}>
              Save
            </Button>
            <Button
              variant="comic"
              size="sm"
              onClick={() => handleExport("pdf")}
              leftIcon={<Download className="h-4 w-4" />}
            >
              Export PDF
            </Button>
          </div>
        </div>

        {/* Workspace Canvas scroll viewport */}
        <div className="flex-1 overflow-auto flex items-center justify-center p-8">
          <div
            className="transition-transform duration-200 origin-center"
            style={{ transform: `scale(${scale})` }}
          >
            <StageCanvas
              items={currentPage.canvasItems}
              selectedItemId={selectedItemId}
              onSelectItem={setSelectedItemId}
              onUpdateItem={handleUpdateCanvasItem}
              width={600}
              height={800}
            />
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR: Selected Item Properties */}
      <aside className="w-72 border-l border-dark-border bg-dark-surface flex flex-col flex-shrink-0" aria-label="Properties panel">
        <div className="p-4 border-b border-dark-border">
          <span className="text-sm font-semibold text-surface-200">
            Element Properties
          </span>
        </div>

        {selectedItem ? (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Show matching properties based on active type */}
            {selectedItem.type !== "image" && (
              <div>
                <label className="text-xs text-surface-500 mb-1.5 block">Text Content</label>
                <textarea
                  className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-2 text-sm text-surface-100 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-brand-500 resize-y"
                  value={selectedItem.text || ""}
                  onChange={(e) => handleUpdateCanvasItem(selectedItem.id, { text: e.target.value })}
                />
              </div>
            )}

            {selectedItem.type === "image" && (
              <div>
                <span className="text-xs text-surface-500 block mb-1">Image Panel</span>
                <div className="p-2 border border-dark-border rounded-lg bg-dark-card flex items-center justify-between text-xs text-surface-400">
                  <span className="truncate max-w-[180px]">{(selectedItem.imageUrl || "").split("/").pop()?.split("?")[0]}</span>
                  <button
                    onClick={() => toast({ type: "info", title: "Custom image upload trigger" })}
                    className="p-1 rounded text-brand-400 hover:text-brand-300 hover:bg-dark-hover"
                    aria-label="Upload replacement image"
                  >
                    <FolderUp className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Bubble customizers */}
            {selectedItem.type !== "image" && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-surface-500 mb-1 block">Font Size</label>
                    <input
                      type="number"
                      className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-1.5 text-sm text-surface-100 focus:outline-none"
                      value={selectedItem.fontSize || 16}
                      onChange={(e) =>
                        handleUpdateCanvasItem(selectedItem.id, {
                          fontSize: parseInt(e.target.value) || 12,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-surface-500 mb-1 block">Tail Direction</label>
                    <select
                      className="w-full h-8 bg-dark-surface border border-dark-border rounded-lg px-2 text-xs text-surface-300 focus:outline-none"
                      value={selectedItem.tailDirection || "none"}
                      onChange={(e) =>
                        handleUpdateCanvasItem(selectedItem.id, {
                          tailDirection: e.target.value as "bottom-left" | "bottom-right" | "top-left" | "top-right" | "none",
                        })
                      }
                    >
                      <option value="none">None</option>
                      <option value="bottom-left">Bottom Left</option>
                      <option value="bottom-right">Bottom Right</option>
                      <option value="top-left">Top Left</option>
                      <option value="top-right">Top Right</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-surface-500 mb-1 block">Text Color</label>
                    <input
                      type="color"
                      className="w-full h-8 rounded-lg bg-dark-surface border border-dark-border cursor-pointer px-1 py-0.5"
                      value={selectedItem.textColor || "#000000"}
                      onChange={(e) =>
                        handleUpdateCanvasItem(selectedItem.id, {
                          textColor: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="text-xs text-surface-500 mb-1 block">Bubble Fill</label>
                    <input
                      type="color"
                      className="w-full h-8 rounded-lg bg-dark-surface border border-dark-border cursor-pointer px-1 py-0.5"
                      value={selectedItem.bubbleColor || "#ffffff"}
                      onChange={(e) =>
                        handleUpdateCanvasItem(selectedItem.id, {
                          bubbleColor: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </>
            )}

            {/* Common coordinates & layer depth controls */}
            <div className="border-t border-dark-border pt-4 space-y-3">
              <span className="text-xs font-bold text-surface-500 uppercase tracking-wider block">
                Arrangement & Size
              </span>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-surface-500 block mb-0.5">X Position</span>
                  <input
                    type="number"
                    className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-1 text-xs text-surface-300"
                    value={Math.round(selectedItem.x)}
                    onChange={(e) =>
                      handleUpdateCanvasItem(selectedItem.id, { x: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div>
                  <span className="text-[10px] text-surface-500 block mb-0.5">Y Position</span>
                  <input
                    type="number"
                    className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-1 text-xs text-surface-300"
                    value={Math.round(selectedItem.y)}
                    onChange={(e) =>
                      handleUpdateCanvasItem(selectedItem.id, { y: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-surface-500 block mb-0.5">Width</span>
                  <input
                    type="number"
                    className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-1 text-xs text-surface-300"
                    value={Math.round(selectedItem.width)}
                    onChange={(e) =>
                      handleUpdateCanvasItem(selectedItem.id, { width: parseInt(e.target.value) || 10 })
                    }
                  />
                </div>
                <div>
                  <span className="text-[10px] text-surface-500 block mb-0.5">Height</span>
                  <input
                    type="number"
                    className="w-full bg-dark-surface border border-dark-border rounded-lg px-3 py-1 text-xs text-surface-300"
                    value={Math.round(selectedItem.height)}
                    onChange={(e) =>
                      handleUpdateCanvasItem(selectedItem.id, { height: parseInt(e.target.value) || 10 })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="secondary"
                  className="flex-1 text-xs py-1 h-8"
                  onClick={() => handleArrangeLayer(selectedItem.id, "front")}
                >
                  Bring to Front
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1 text-xs py-1 h-8"
                  onClick={() => handleArrangeLayer(selectedItem.id, "back")}
                >
                  Send to Back
                </Button>
              </div>
            </div>

            {/* Element duplication and deletion */}
            <div className="border-t border-dark-border pt-4 flex gap-2">
              <Button
                variant="secondary"
                className="flex-1 text-xs py-1 h-9"
                onClick={() => handleDuplicateItem(selectedItem)}
                leftIcon={<Copy className="h-3.5 w-3.5" />}
              >
                Duplicate
              </Button>
              <Button
                variant="danger"
                className="flex-1 text-xs py-1 h-9"
                onClick={() => handleDeleteItem(selectedItem.id)}
                leftIcon={<Trash2 className="h-3.5 w-3.5" />}
              >
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-4 text-center">
            <div>
              <Maximize2 className="h-8 w-8 text-surface-600 mx-auto mb-2" />
              <span className="text-xs text-surface-500 block">
                Select an item on the canvas to configure properties
              </span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
