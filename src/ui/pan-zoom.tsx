import { Box, type BoxProps } from "@chakra-ui/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { clamp } from "~/utils/math";

//------------------------------------------------------------------------------
// PanZoom
//------------------------------------------------------------------------------

export type PanZoomProps = BoxProps & {
  initialScale?: number;
  initialX?: number;
  initialY?: number;
  maxScale?: number;
  minScale?: number;
  offsetX?: number;
  offsetY?: number;
  zoomFactor?: number;
};

export default function PanZoom({
  children,
  initialScale = 1,
  initialX,
  initialY,
  maxScale = 2.5,
  minScale = 0.5,
  offsetX = 0,
  offsetY = 0,
  zoomFactor = 0.01,
  ...rest
}: PanZoomProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const initialTransform = { scale: initialScale, x: 0, y: 0 };
  const [transform, setTransform] = useState<Transform>(initialTransform);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const sheet = sheetRef.current;
    if (!viewport || !sheet) return;

    const viewportRect = viewport.getBoundingClientRect();
    const sheetRect = sheet.getBoundingClientRect();

    setTransform((current) => ({
      ...current,
      x: initialX ?? (offsetX + viewportRect.width - sheetRect.width) / 2,
      y: initialY ?? (offsetY + viewportRect.height - sheetRect.height) / 2,
    }));
  }, [initialX, initialY, offsetX, offsetY]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const rect = viewport.getBoundingClientRect();
      const pointerX = event.clientX - rect.left;
      const pointerY = event.clientY - rect.top;
      const isZoomGesture = event.ctrlKey || Math.abs(event.deltaZ) > 0;

      if (isZoomGesture) {
        setTransform((current) => {
          const nextScale = clamp(
            current.scale * Math.exp(-event.deltaY * zoomFactor),
            minScale,
            maxScale,
          );
          const scaleRatio = nextScale / current.scale;

          return {
            scale: nextScale,
            x: pointerX - scaleRatio * (pointerX - current.x),
            y: pointerY - scaleRatio * (pointerY - current.y),
          };
        });
        return;
      }

      setTransform((current) => ({
        ...current,
        x: current.x - event.deltaX,
        y: current.y - event.deltaY,
      }));
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [maxScale, minScale, zoomFactor]);

  return (
    <Box
      bgColor="bg.emphasized"
      h="100vh"
      overflow="hidden"
      position="relative"
      touchAction="none"
      w="full"
      {...rest}
      ref={viewportRef}
    >
      <Box
        left={0}
        position="absolute"
        ref={sheetRef}
        top={0}
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
  x: number;
  y: number;
  scale: number;
};
