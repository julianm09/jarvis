import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { CircularProgress, Slider } from "@mui/material";
import styled from "styled-components";
import Dropdown from "../Dropdown/Dropdown";
import { Input } from "../Input/Input";
import {
  useBusinessDescription,
  useBusinessName,
  useImageQuery,
  useSections,
  useSelectedOption,
} from "@/utils/provider";
import { generateSection } from "@/functions/section/generateSection";

export const Controls = ({
  randomness,
  setRandomness,
  loading,
  setLoading,
}) => {
  const { sections, setSections } = useSections();
  const { businessName, setBusinessName } = useBusinessName();
  const { businessDescription, setBusinessDescription } =
    useBusinessDescription();
  const { imageQuery, setImageQuery } = useImageQuery();
  const { selectedOption, setSelectedOption } = useSelectedOption();

  const [hide, setHide] = useState(false);

  const handleGenerateSection = async () => {
    setLoading(true);

    const section = await generateSection(
      imageQuery,
      businessName,
      businessDescription,
      selectedOption,
      randomness
    );

    setSections({ ...sections, [uuidv4()]: section });
  };

  return (
    <Cont hide={hide}>
      <button onClick={() => setHide(!hide)}>{hide ? "show" : "hide"}</button>
      <ControlUI>
        <ColumnUI>
          <Input
            label="business name"
            onChange={(e) => {
              setBusinessName(e.target.value);
            }}
            value={businessName}
          />

          <Input
            label="business description"
            onChange={(e) => {
              setBusinessDescription(e.target.value);
            }}
            value={businessDescription}
          />

          <Input
            label="image (one word)"
            onChange={(e) => {
              setImageQuery(e.target.value);
            }}
            value={imageQuery}
          />
        </ColumnUI>
        <ColumnUI>
          <Dropdown
            onSelect={(option) => {
              setSelectedOption(option.value);
            }}
            options={[
              { value: "hero", label: "hero section" },
              { value: "about", label: "about section" },
            ]}
          />

          <button
            onClick={handleGenerateSection}
            style={{
              margin: "0 0 20px 0",
              background: "#4D7EFF",
              color: "white",
              padding: "10px",
            }}
          >
            Generate Section
          </button>

          {loading && <CircularProgress />}
        </ColumnUI>

        <div
          style={{
            display: "flex",
            width: "400px",
            alignItems: "center",
            margin: "0 0 20px 0",
          }}
        >
          <div style={{ margin: "0 20px 0 0" }}>temperature:</div>
          <Slider
            defaultValue={randomness * 100}
            onChange={(e) => {
              setRandomness(e.target.value / 100);
            }}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
        </div>
      </ControlUI>
    </Cont>
  );
};

const Cont = styled.div`
  display: flex;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 999;
  transform: ${({ hide }) => (hide ? "translateX(600px)" : "translateX(0px)")};
  transition: 0.2s ease;
`;

const ControlUI = styled.div`
  display: flex;
  background: black;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  padding: 40px;
  width: 600px;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ColumnUI = styled.div`
  display: flex;
  flex-direction: column;
`;
