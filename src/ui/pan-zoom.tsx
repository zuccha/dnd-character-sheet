import { Box, type BoxProps } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { clamp } from "~/utils/math";

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
  const sheetRef = useRef<HTMLDivElement>(null);

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
        onTransform((prevTransform) => {
          const nextScale = clamp(
            prevTransform.scale * Math.exp(-event.deltaY * zoomFactor),
            minScale,
            maxScale,
          );
          const scaleRatio = nextScale / prevTransform.scale;

          return {
            scale: nextScale,
            x: pointerX - scaleRatio * (pointerX - prevTransform.x),
            y: pointerY - scaleRatio * (pointerY - prevTransform.y),
          };
        });
      }

      onTransform((prevTransform) => ({
        ...prevTransform,
        x: prevTransform.x - event.deltaX,
        y: prevTransform.y - event.deltaY,
      }));
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [maxScale, minScale, onTransform, zoomFactor]);

  return (
    <Box
      bgColor="bg.emphasized"
      h="100vh"
      overflow="hidden"
      position="relative"
      touchAction="none"
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
  scale: number;
  x: number;
  y: number;
};
