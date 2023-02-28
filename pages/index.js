import { useState } from "react";
import { generateText } from "../functions/openAi/generateText.js";
import { exportHtml } from "../functions/exportHtml/exportHtml.js";
import Dropdown from "../comps/Dropdown/Dropdown.js";
import { CircularProgress, Slider } from "@mui/material";
import styled from "styled-components";
import { Input } from "../comps/Input/Input.js";
import Section from "../comps/Section/Section.js";

export default function Home() {
  const [sections, setSections] = useState([]);
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [imageQuery, setImageQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("hero");
  const [randomness, setRandomness] = useState(0.5);
  const [loading, setLoading] = useState(false);

  const generateSection = () => {
    setLoading(true);

    const randNum = Math.floor(Math.random() * 5) + 1;
    const randNum2 = Math.floor(Math.random() * 5) + 1;

    const search = `https://api.unsplash.com/search/photos?page=${randNum}&query=${imageQuery}&orientation=landscape&client_id=VcpKFVjbEWrxtXl1M3cgzYoh_DBLTwAmcLLGf3P8yy8`;

    async function fetchImage() {
      const response = await fetch(search);
      const data = await response.json();
      return data.results[randNum2].urls.full;
    }

    fetchImage()
      .catch((err) => {
        console.log(err);
        return;
      })
      .then((img) => {
        generateText(
          "h1",
          businessName,
          businessDescription,
          selectedOption,
          randomness
        )
          .catch((err) => {
            console.log(err);
            return;
          })
          .then((r) => {
            generateText(
              "text block",
              businessName,
              businessDescription,
              selectedOption,
              randomness
            )
              .catch((err) => {
                console.log(err);
                return;
              })
              .then((r2) => {
                const section = {
                  type: selectedOption,
                  class: selectedOption + "-1",
                  h1: r,
                  text: r2,
                  image: img,
                };

                setSections([...sections, section]);
              });
          });
      });
  };

  return (
    <div style={{ background: "white", color: "black" }}>
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
            onClick={generateSection}
            style={{
              margin: "0 0 20px 0",
              background: "#4D7EFF",
              color: "white",
              padding: "10px",
            }}
          >
            Generate Section
          </button>

          {loading && <CircularProgress/>}
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
        {/* <ColumnUI>
          <button onClick={() => exportHtml(sections)}>Output HTML File</button>
        </ColumnUI> */}
      </ControlUI>

      {sections &&
        sections.map((section) => (
          <Section
            section={section}
            setLoading={setLoading}
            loading={loading}
          />
        ))}

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "500px",
        }}
      ></div>
    </div>
  );
}

const ControlUI = styled.div`
  display: flex;
  background: black;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: fixed;
  bottom: 0;
  z-index: 999;
  padding: 40px;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ColumnUI = styled.div`
  display: flex;
  flex-direction: column;
`;
