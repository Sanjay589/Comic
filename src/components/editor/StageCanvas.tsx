/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Stage, Layer, Rect, Text, Group, Path, Image as KonvaImage, Transformer } from "react-konva";
import { CanvasItem } from "@/types/editor";

interface StageCanvasProps {
  items: CanvasItem[];
  selectedItemId: string | null;
  onSelectItem: (id: string | null) => void;
  onUpdateItem: (id: string, updates: Partial<CanvasItem>) => void;
  width?: number;
  height?: number;
}

export default function StageCanvas({
  items,
  selectedItemId,
  onSelectItem,
  onUpdateItem,
  width = 600,
  height = 800,
}: StageCanvasProps) {
  const stageRef = React.useRef<any>(null);
  const transformerRef = React.useRef<any>(null);
  const selectablesRef = React.useRef<Record<string, any>>({});
  const [imageElements, setImageElements] = React.useState<Record<string, HTMLImageElement>>({});

  // Load images dynamically
  React.useEffect(() => {
    const urls = items.filter((it) => it.type === "image" && it.imageUrl).map((it) => it.imageUrl!);
    urls.forEach((url) => {
      if (imageElements[url]) return;
      const img = new window.Image();
      img.src = url;
      img.onload = () => {
        setImageElements((prev) => ({ ...prev, [url]: img }));
      };
    });
  }, [items, imageElements]);

  // Handle stage clicks (deselect when clicking empty areas)
  function handleStageClick(e: any) {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      onSelectItem(null);
    }
  }

  // Update Konva Transformer nodes when selected item changes
  React.useEffect(() => {
    if (!transformerRef.current) return;

    if (selectedItemId) {
      const selectedNode = selectablesRef.current[selectedItemId];
      if (selectedNode) {
        transformerRef.current.nodes([selectedNode]);
        transformerRef.current.getLayer().batchDraw();
      } else {
        transformerRef.current.nodes([]);
      }
    } else {
      transformerRef.current.nodes([]);
    }
  }, [selectedItemId, items]);

  // Function to draw bubble paths based on bubble type and tail direction
  function getBubblePath(item: CanvasItem): string {
    const { width: w, height: h, tailDirection } = item;
    const r = 15; // border radius
    
    // Bubble outline shape path (rounded rect)
    let path = `M ${r} 0 
                h ${w - 2 * r} 
                a ${r} ${r} 0 0 1 ${r} ${r} 
                v ${h - 2 * r} 
                a ${r} ${r} 0 0 1 -${r} ${r} `;

    // Add speech tail if configured
    if (tailDirection === "bottom-left") {
      path += `h -${w - 2 * r - 20} l -15 15 l 5 -15 h -20 a ${r} ${r} 0 0 1 -${r} -${r} `;
    } else if (tailDirection === "bottom-right") {
      path += `h -20 l 5 15 l -15 -15 h -${w - 2 * r - 20} a ${r} ${r} 0 0 1 -${r} -${r} `;
    } else {
      path += `h -${w - 2 * r} a ${r} ${r} 0 0 1 -${r} -${r} `;
    }

    path += `v -${h - 2 * r} a ${r} ${r} 0 0 1 ${r} -${r} Z`;
    return path;
  }

  return (
    <div className="relative border-4 border-surface-900 shadow-comic bg-white rounded-lg overflow-hidden">
      <Stage
        width={width}
        height={height}
        onMouseDown={handleStageClick}
        onTouchStart={handleStageClick}
        ref={stageRef}
      >
        <Layer>
          {items
            .sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0))
            .map((item) => {
              if (item.type === "image") {
                const imgNode = imageElements[item.imageUrl || ""];
                return (
                  <KonvaImage
                    key={item.id}
                    image={imgNode}
                    x={item.x}
                    y={item.y}
                    width={item.width}
                    height={item.height}
                    rotation={item.rotation}
                    draggable
                    onClick={() => onSelectItem(item.id)}
                    onTouchEnd={() => onSelectItem(item.id)}
                    ref={(node) => {
                      if (node) selectablesRef.current[item.id] = node;
                    }}
                    onDragEnd={(e) => {
                      onUpdateItem(item.id, {
                        x: e.target.x(),
                        y: e.target.y(),
                      });
                    }}
                    onTransformEnd={(e) => {
                      const node = e.target;
                      onUpdateItem(item.id, {
                        x: node.x(),
                        y: node.y(),
                        width: node.width() * node.scaleX(),
                        height: node.height() * node.scaleY(),
                        rotation: node.rotation(),
                      });
                      node.scaleX(1);
                      node.scaleY(1);
                    }}
                  />
                );
              }

              // Speech bubbles and boxes
              if (
                item.type === "speech" ||
                item.type === "thought" ||
                item.type === "narration" ||
                item.type === "sfx"
              ) {
                const isNarration = item.type === "narration";
                const isSfx = item.type === "sfx";

                return (
                  <Group
                    key={item.id}
                    x={item.x}
                    y={item.y}
                    rotation={item.rotation}
                    draggable
                    onClick={() => onSelectItem(item.id)}
                    onTouchEnd={() => onSelectItem(item.id)}
                    ref={(node) => {
                      if (node) selectablesRef.current[item.id] = node;
                    }}
                    onDragEnd={(e) => {
                      onUpdateItem(item.id, {
                        x: e.target.x(),
                        y: e.target.y(),
                      });
                    }}
                    onTransformEnd={(e) => {
                      const node = e.target;
                      onUpdateItem(item.id, {
                        x: node.x(),
                        y: node.y(),
                        width: node.width() * node.scaleX(),
                        height: node.height() * node.scaleY(),
                        rotation: node.rotation(),
                      });
                      node.scaleX(1);
                      node.scaleY(1);
                    }}
                  >
                    {isNarration ? (
                      // Narration Box: Perfect rectangle
                      <Rect
                        width={item.width}
                        height={item.height}
                        fill={item.bubbleColor || "#fff"}
                        stroke={item.borderColor || "#000"}
                        strokeWidth={item.borderWidth || 2}
                        opacity={item.opacity !== undefined ? item.opacity : 1}
                      />
                    ) : isSfx ? (
                      // SFX Text: Transparent background, styled text
                      <Rect
                        width={item.width}
                        height={item.height}
                        fill="transparent"
                      />
                    ) : (
                      // Speech/Thought Bubble: Path shape
                      <Path
                        data={getBubblePath(item)}
                        fill={item.bubbleColor || "#fff"}
                        stroke={item.borderColor || "#000"}
                        strokeWidth={item.borderWidth || 2}
                        opacity={item.opacity !== undefined ? item.opacity : 1}
                      />
                    )}

                    {/* Content text */}
                    <Text
                      text={item.text || ""}
                      fontSize={item.fontSize || 16}
                      fontFamily={
                        isSfx ? "Bangers" : item.fontFamily || "Comic Neue"
                      }
                      fill={item.textColor || "#000"}
                      align="center"
                      verticalAlign="middle"
                      width={item.width}
                      height={item.height}
                      padding={10}
                      fontStyle={isSfx ? "bold italic" : "normal"}
                    />
                  </Group>
                );
              }

              return null;
            })}

          {/* Selection handles */}
          <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit minimum sizes
              if (newBox.width < 30 || newBox.height < 30) {
                return oldBox;
              }
              return newBox;
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
}
