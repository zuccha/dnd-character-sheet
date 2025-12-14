import { Box, type BoxProps } from "@chakra-ui/react";
import { useGesture } from "@use-gesture/react";
import { useRef } from "react";
import { clamp } from "~/utils/math";
import { isTouch } from "~/utils/window";

//------------------------------------------------------------------------------
// PanZoom
//------------------------------------------------------------------------------

export type PanZoomProps = BoxProps & {
  maxScale?: number;
  minScale?: number;
  onTransform: (updater: (prevTransform: Transform) => Transform) => void;
  transform: Transform;
  zoomFactor?: number;
};

export default function PanZoom({
  children,
  maxScale = 2.5,
  minScale = 0.5,
  onTransform,
  transform,
  zoomFactor = 0.01,
  ...rest
}: PanZoomProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const touch = isTouch();

  useGesture(
    {
      // Drag (touch devices).
      onDrag: ({ delta: [dx, dy] }) => {
        if (!touch) return;

        onTransform((prevTransform) => ({
          ...prevTransform,
          x: prevTransform.x + dx,
          y: prevTransform.y + dy,
        }));
      },

      // Pinch (touch devices).
      onPinch: ({ origin: [ox, oy], offset: [d] }) => {
        if (!touch) return;

        const rect = viewportRef.current?.getBoundingClientRect();
        if (!rect) return;

        const pointerX = ox - rect.left;
        const pointerY = oy - rect.top;

        onTransform((prevTransform) => {
          const nextScale = clamp(d, minScale, maxScale);
          const scaleRatio = nextScale / prevTransform.scale;

          return {
            scale: nextScale,
            x: pointerX - scaleRatio * (pointerX - prevTransform.x),
            y: pointerY - scaleRatio * (pointerY - prevTransform.y),
          };
        });
      },

      // Wheel pan/zoom.
      onWheel: ({ event, delta: [dx, dy], ctrlKey }) => {
        event.preventDefault();

        const rect = viewportRef.current?.getBoundingClientRect();
        if (!rect) return;

        const pointerX = event.clientX - rect.left;
        const pointerY = event.clientY - rect.top;

        if (ctrlKey) {
          onTransform((prevTransform) => {
            const nextScale = clamp(
              prevTransform.scale * Math.exp(-dy * zoomFactor),
              minScale,
              maxScale,
            );
            const ratio = nextScale / prevTransform.scale;

            return {
              scale: nextScale,
              x: pointerX - ratio * (pointerX - prevTransform.x),
              y: pointerY - ratio * (pointerY - prevTransform.y),
            };
          });
          return;
        }

        // Normal wheel/trackpad scroll => pan
        onTransform((prevTransform) => ({
          ...prevTransform,
          x: prevTransform.x - dx,
          y: prevTransform.y - dy,
        }));
      },
    },
    {
      drag: { from: () => [transform.x, transform.y] },
      eventOptions: { passive: false },
      pinch: { scaleBounds: { max: maxScale, min: minScale } },
      target: viewportRef,
    },
  );

  return (
    <Box
      overflow="hidden"
      position="relative"
      ref={viewportRef}
      touchAction="none"
      {...rest}
    >
      <Box
        position="absolute"
        transform={`translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`}
        transformOrigin="0 0"
      >
        {children}
      </Box>
    </Box>
  );
}

//------------------------------------------------------------------------------
// Transform
//------------------------------------------------------------------------------

type Transform = {
  scale: number;
  x: number;
  y: number;
};
