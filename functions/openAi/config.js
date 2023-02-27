import { Configuration, OpenAIApi } from "openai";

const apiKey = process.env.OPENAI_API_KEY // replace with your API key

export const configuration = new Configuration({
  organization: "org-BYsIRtRRwdvKTsysEMc3lOsh",
  apiKey: "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",
});

export const openai = new OpenAIApi(configuration);