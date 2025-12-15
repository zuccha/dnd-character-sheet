import { Box, HStack } from "@chakra-ui/react";
import { useLayoutEffect, useRef, useState } from "react";
import PanZoom from "~/ui/pan-zoom";
import { isTouch } from "~/utils/window";
import CharacterSheet from "./fields/character-sheet";
import Sidebar from "./sidebar/sidebar";

//------------------------------------------------------------------------------
// Character Sheet View
//------------------------------------------------------------------------------

export default function CharacterSheetView() {
  const sidebarWidth = 20 * 16; // em * px
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isTouch);

  return (
    <HStack gap={0} position="relative">
      <CharacterSheetPanZoom
        offsetX={isTouch() || sidebarCollapsed ? 0 : sidebarWidth}
      />

      <Sidebar
        collapsed={sidebarCollapsed}
        left={0}
        onCollapsedChange={setSidebarCollapsed}
        position="absolute"
        top={0}
        w={`${sidebarWidth}px`}
      />
    </HStack>
  );
}

//------------------------------------------------------------------------------
// Character Sheet Pan Zoom
//------------------------------------------------------------------------------

type CharacterSheetPanZoomProps = {
  offsetX?: number;
  offsetY?: number;
};

function CharacterSheetPanZoom({
  offsetX = 0,
  offsetY = 0,
}: CharacterSheetPanZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ scale: 1, x: 0, y: 0 });

  const offsetRef = useRef({ x: offsetX, y: offsetY });

  useLayoutEffect(() => {
    offsetRef.current.x = offsetX;
    offsetRef.current.y = offsetY;
  }, [offsetX, offsetY]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const padding = 32;

    const scale = Math.min(
      Math.max(0, rect.width - padding) / a4Size.w,
      Math.max(0, rect.height - padding) / a4Size.h,
    );

    const scaledW = a4Size.w * scale;
    const scaledH = a4Size.h * scale;

    const scaledOffsetX = offsetRef.current.x * scale;
    const scaledOffsetY = offsetRef.current.y * scale;

    setTransform({
      scale,
      x: scaledOffsetX + (rect.width - scaledW - scaledOffsetX) / 2,
      y: scaledOffsetY + (rect.height - scaledH - scaledOffsetY) / 2,
    });
  }, []);

  return (
    <Box h="100vh" ref={containerRef} w="full">
      <PanZoom
        bgColor="bg.l2"
        h="100vh"
        onTransform={setTransform}
        transform={transform}
        w="full"
      >
        <CharacterSheet />
      </PanZoom>
    </Box>
  );
}

//------------------------------------------------------------------------------
// Paper Sizes
//------------------------------------------------------------------------------

const cmToPx = 96 / 2.54;

const a4Size = { h: 29.7 * cmToPx, w: 21.0 * cmToPx };
