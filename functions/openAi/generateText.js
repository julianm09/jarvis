import { openai } from "./config";

export const generateText = async (
  type = "headline",
  role = "law firm",
  description ="",
  section = "hero",
  randomness = 0.1
) => {
  const prompt = `Please write me a ${section} section ${type} for my ${description} business named "${role}" under 150 characters and no quotation marks.`;
  console.log(prompt);
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 100,
    temperature: randomness,
  });

  console.log(response);
  const result = response.data.choices[0].text.trim();
  return result;
};
