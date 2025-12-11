import PanZoom from "~/ui/pan-zoom";
import CharacterSheet from "./character-sheet";

export default function CharacterSheetView() {
  return (
    <PanZoom bgColor="bg.emphasized" h="100vh" w="full">
      <CharacterSheet />
    </PanZoom>
  );
}
