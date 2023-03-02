import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { generateText } from "@/functions/openAi/generateText.js";
import { searchImage } from "@/functions/unslpash/searchImage.js";
import { Controls } from "@/comps/Controls/Controls.js";
import { Section } from "@/comps/Section/Section.js";
import {
  useBusinessDescription,
  useBusinessName,
  useImageQuery,
  useSections,
  useSelectedOption,
  useTheme,
} from "@/utils/provider";

export const PageBuilder = () => {
  const { sections, setSections } = useSections();
  const { businessName, setBusinessName } = useBusinessName();
  const { businessDescription, setBusinessDescription } =
    useBusinessDescription();
  const { imageQuery, setImageQuery } = useImageQuery();
  const { selectedOption, setSelectedOption } = useSelectedOption();

  const [randomness, setRandomness] = useState(0.5);
  const [loading, setLoading] = useState(false);

  return (
    <div style={{ background: "white", color: "black" }}>
      <Controls
        randomness={randomness}
        setRandomness={setRandomness}
        loading={loading}
        setLoading={setLoading}
      />
      {sections &&
        Object.entries(sections).map((section, i) => (
          <>
            <Section
              key={i}
              id={section[0]}
              section={section[1]}
              sections={sections}
              setSections={setSections}
              setLoading={setLoading}
              loading={loading}
              imageQuery={imageQuery}
            />
          </>
        ))}
    </div>
  );
};
