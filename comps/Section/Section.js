import Image from "next/image.js";
import { useEffect, useState } from "react";

export default function Section({
  sections = [],
  setSections = () => {},
  section,
  loading,
  setLoading,
  key
}) {
  const [layout, setLayout] = useState(1);

  return (
    <section className={"section " + section.type + "-" + layout} key={key}>
      <div className="button-container">
        <button onClick={() => setLayout(1)}>1</button>
        <button onClick={() => setLayout(2)}>2</button>
      </div>
      <div className="column">
        <h1>{section.h1}</h1>
        <p>{section.text}</p>
      </div>
      <div className="image-container">
        <Image
          className="image"
          src={section.image}
          fill
          onLoad={() => setLoading(false)}
          loading="lazy"
        />
      </div>
    </section>
  );
}
