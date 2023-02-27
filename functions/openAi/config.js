import { Configuration, OpenAIApi } from "openai";

const prompt = "Write a short story about a detective investigating a murder case.";
const apiKey = "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"; // replace with your API key
const modelEngine = "text-davinci-001"; // replace with the desired model

export const configuration = new Configuration({
  organization: "org-BYsIRtRRwdvKTsysEMc3lOsh",
  apiKey: apiKey,
});

export const openai = new OpenAIApi(configuration);