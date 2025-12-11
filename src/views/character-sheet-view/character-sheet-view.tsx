import { Box } from "@chakra-ui/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { clamp } from "~/utils/math";
import CharacterSheet from "./character-sheet";

export default function CharacterSheetView() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<Transform>(defaultTransform);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const sheet = sheetRef.current;
    if (!viewport || !sheet) return;

    const viewportRect = viewport.getBoundingClientRect();
    const sheetRect = sheet.getBoundingClientRect();

    setTransform((current) => ({
      ...current,
      x: (viewportRect.width - sheetRect.width) / 2,
      y: (viewportRect.height - sheetRect.height) / 2,
    }));
  }, []);

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
  }, []);

  return (
    <Box
      bgColor="bg.emphasized"
      h="100vh"
      overflow="hidden"
      position="relative"
      ref={viewportRef}
      touchAction="none"
      w="full"
    >
      <Box
        left={0}
        position="absolute"
        ref={sheetRef}
        top={0}
        transform={`translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`}
        transformOrigin="0 0"
      >
        <CharacterSheet />
      </Box>
    </Box>
  );
}

type Transform = {
  x: number;
  y: number;
  scale: number;
};

const defaultTransform = { scale: 1, x: 0, y: 0 };
const maxScale = 2.5;
const minScale = 0.5;
const zoomFactor = 0.01;
