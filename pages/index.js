import { useEffect, useState } from "react";
import { generateText } from "../functions/openAi/generateText.js";
import { exportHtml } from "../functions/exportHtml/exportHtml.js";
import Dropdown from "../comps/Dropdown/Dropdown.js";
import { Slider } from "@mui/material";

export default function Home() {
  const [sections, setSections] = useState([]);
  const [sectionType, setSectionType] = useState("info");
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [imageQuery, setImageQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("hero");
  const [randomness, setRandomness] = useState();

  const generateSection = () => {
    const random =
      "https://api.unsplash.com/photos/random?client_id=VcpKFVjbEWrxtXl1M3cgzYoh_DBLTwAmcLLGf3P8yy8";

    const randNum = Math.floor(Math.random() * 5) + 1;

    const search = `https://api.unsplash.com/search/photos?page=${randNum}&query=${imageQuery}&orientation=landscape&client_id=VcpKFVjbEWrxtXl1M3cgzYoh_DBLTwAmcLLGf3P8yy8`;

    async function fetchImage() {
      const response = await fetch(search);
      const data = await response.json();
      console.log("image data", data);
      return data.results[randNum].urls.thumb;
    }

    fetchImage()
      .catch((err) => {
        console.log(err);
        return;
      })
      .then((img) => {
        generateText(
          "headline",
          `${businessName} landing page`,
          businessDescription,
          selectedOption,
          randomness
        )
          .catch((err) => {
            console.log(err);
            return;
          })
          .then((r) => {
            generateText("text block", r, selectedOption, randomness)
              .catch((err) => {
                console.log(err);
                return;
              })
              .then((r2) => {
                console.log(r, r2);
                const content =
                  sectionType === "info"
                    ? `<div class="${selectedOption}">
                    <div class="column">                  
                      <h1>${r}</h1>
                      <p>${r2}</p>
                    </div>
                    <img src=${img}/>
                  </div>`
                    : "";
                setSections([...sections, { name: "two", html: content }]);
              });
          });
      });
  };

  console.log(sections.map((x) => x.html).join(" "));

  return (
    <div style={{ background: "white", color: "black" }}>
      <div
        style={{
          background: "black",
          color: "white",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          position: "fixed",
          bottom: "0",
          zIndex: 999,
        }}
      >
        <div style={{ display: "flex", width: "300px", alignItems: "center" }}>
          <div style={{ margin: "0 20px 0 0" }}>business name:</div>
          <input
            value={businessName}
            onChange={(e) => {
              setBusinessName(e.target.value);
            }}
          />
        </div>

        <div style={{ display: "flex", width: "300px", alignItems: "center" }}>
          <div style={{ margin: "0 20px 0 0" }}>business description:</div>
          <input
            value={businessDescription}
            onChange={(e) => {
              setBusinessDescription(e.target.value);
            }}
          />
        </div>

        <div style={{ display: "flex", width: "300px", alignItems: "center" }}>
          <div style={{ margin: "0 20px 0 0" }}>image (one word):</div>
          <input
            value={imageQuery}
            onChange={(e) => {
              setImageQuery(e.target.value);
            }}
          />
        </div>

        <Dropdown
          onSelect={(option) => {
            setSelectedOption(option.value);
          }}
          options={[
            { value: "hero", label: "hero section" },
            { value: "about", label: "about section" },
            { value: "services", label: "services section" },
          ]}
        />
        <div style={{ display: "flex", width: "400px", alignItems: "center" }}>
          <div style={{ margin: "0 20px 0 0" }}>random:</div>
          <Slider
            defaultValue={50}
            onChange={(e) => {
              setRandomness(e.target.value / 100);
            }}
            aria-label="Small"
            valueLabelDisplay="auto"
          />
        </div>

        <button onClick={generateSection}>Generate Section</button>
        <button onClick={() => exportHtml(sections)}>Output HTML File</button>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: sections.map((x) => x.html).join(" "),
        }}
      ></div>
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
