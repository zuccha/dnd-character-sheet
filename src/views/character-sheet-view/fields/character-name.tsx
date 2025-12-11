import { useState } from "react";
import EditableText from "~/ui/editable-text";

export default function CharacterName() {
  const [name, setName] = useState("Doranakan Ashendel");

  return (
    <EditableText
      fontSize="cs.h1"
      name="character-name"
      onChange={setName}
      placeholder="Name..."
      text={name}
      w="full"
    />
  );
}
