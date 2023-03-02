import { useState } from "react";
import styled from "styled-components";
import { generateText } from "../../functions/openAi/generateText";

export default function EditableText({
  sections,
  setSections,
  id,
  section,
  type = "h1",
}) {
  const [edit, setEdit] = useState(false);

  const handleTextChange = (e) => {
    setSections({ ...sections, [id]: { ...section, [type]: e.target.value } });
  };

  const handleGenerate = async () => {
    const response = await generateText(
        type,
        section.businessName,
        section.businessDescription,
        section.selectedOption,
        section.randomness
      ).catch((err) => {
        console.log(err);
        return;
      });

      setSections({ ...sections, [id]: { ...section, [type]: response } });

    console.log(response)
  }

  return (
    <>
      {edit ? (
        <>
          <button onClick={handleGenerate}>regenerate</button>
          <Input
            className={type}
            type={type}
            value={sections[id][type]}
            onChange={(e) => handleTextChange(e)}
            onBlur={() => setEdit(false)}
          />
        </>
      ) : (
        <Text className={type} type={type} onClick={() => setEdit(true)}>
          {sections[id][type]}
        </Text>
      )}
    </>
  );
}

const Text = styled.div`
  width: 100%;
  font-size: ${({ type }) =>
    type === "h1" ? "36px" : type === "p" ? "18px" : "16px"};
  font-weight: ${({ type }) =>
    type === "h1" ? "700" : type === "p" ? "450" : "400"};
  margin: ${({ type }) =>
    type === "h1" ? "0 0 20px 0" : type === "p" ? "0" : "400"};
`;

const Input = styled.textarea`
  background: 0;
  border: 0;
  color: inherit;
  width: 100%;
  text-align: center;
  min-height: 120px;

  height: auto;
  font-size: ${({ type }) =>
    type === "h1" ? "36px" : type === "p" ? "18px" : "16px"};
  font-weight: ${({ type }) =>
    type === "h1" ? "700" : type === "p" ? "450" : "400"};
  margin: ${({ type }) =>
    type === "h1" ? "0 0 20px 0" : type === "p" ? "0" : "400"};
`;
