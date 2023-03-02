import { useSections } from "@/utils/provider";
import { Collapse } from "@mui/material";
import Image from "next/image.js";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { searchImage } from "../../functions/unslpash/searchImage";
import EditableText from "../EditableText/EditableText";

export const Section = ({ section, setLoading, id, key, imageQuery }) => {
  const [layout, setLayout] = useState(1);
  const [editImage, setEditImage] = useState(1);
  const { sections, setSections } = useSections();

  const handleRemove = () => {
    const cached = { ...sections };
    delete cached[id];
    setSections(cached);
  };

  const handleRegenerateImage = async () => {
    const response = await searchImage(imageQuery).catch((err) => {
      console.log(err);
      return;
    });

    setSections({ ...sections, [id]: { ...section, image: response } });
  };

  const handleImageLoad = () => {
    setLoading(false);
    // window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <SectionUI className={"section " + section.type + "-" + layout} key={key}>
      <ButtonCont className="button-container">
        <button onClick={handleRemove}>x</button>
        <button onClick={() => setLayout(1)}>1</button>
        <button onClick={() => setLayout(2)}>2</button>
      </ButtonCont>
      <div className="column">
        <EditableText
          sections={sections}
          setSections={setSections}
          section={section}
          id={id}
          type={"h1"}
        />
        <EditableText
          sections={sections}
          setSections={setSections}
          section={section}
          id={id}
          type={"p"}
        />
      </div>
      <div className="image-container">
        {editImage && (
          <button
            onClick={handleRegenerateImage}
            style={{ zIndex: 100, position: "absolute" }}
          >
            regenerate image
          </button>
        )}
        <Image
          onBlur={() => setEdit(false)}
          onClick={() => setEditImage(!editImage)}
          className="image"
          src={section.image && section.image.full}
          fill
          onLoad={handleImageLoad}
          loading="lazy"
        />
      </div>
    </SectionUI>
  );
};

const SectionUI = styled.section``;

const ButtonCont = styled.div`
  z-index: 1;
  position: absolute;
  display: flex;
  top: 0;
  left: 0;

  button {
    width: 20px;
    height: 20px;
  }
`;
