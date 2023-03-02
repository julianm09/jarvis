import { generateText } from "../openAi/generateText";
import { searchImage } from "../unslpash/searchImage";

//generate section based on user inputs
export const generateSection = async (
  imageQuery,
  businessName,
  businessDescription,
  selectedOption,
  randomness
) => {
  const image = await searchImage(imageQuery).catch((err) => {
    console.log(err);
    return;
  });

  const text1 = await generateText(
    selectedOption === "hero" ? "h1" : "h2",
    businessName,
    businessDescription,
    selectedOption,
    randomness
  ).catch((err) => {
    console.log(err);
    return;
  });

  const text2 = await generateText(
    "text block",
    businessName,
    businessDescription,
    selectedOption,
    randomness
  ).catch((err) => {
    console.log(err);
    return;
  });

  const section = {
    type: selectedOption,
    class: selectedOption + "-1",
    h1: text1,
    p: text2,
    image: image,
    businessName,
    businessDescription,
    selectedOption,
    randomness,
  };

  return section;
};
