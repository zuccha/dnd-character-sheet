import { useState } from "react";
import EditableText from "~/ui/editable-text";

export default function CharacterTitle() {
  const [title, setTitle] = useState("Ranger Mezzelfo, Taglia Media");

  return (
    <EditableText
      fontSize="cs.h2"
      name="character-title"
      onChange={setTitle}
      placeholder="Species, class, and size..."
      value={title}
      w="full"
    />
  );
}
