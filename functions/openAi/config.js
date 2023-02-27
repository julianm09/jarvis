import { Configuration, OpenAIApi } from "openai";

const apiKey = process.env.OPENAI_API_KEY // replace with your API key

export const configuration = new Configuration({
  organization: "org-BYsIRtRRwdvKTsysEMc3lOsh",
  apiKey: apiKey,
});

export const openai = new OpenAIApi(configuration);