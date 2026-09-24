import { customProvider } from "ai";
import { google } from "@ai-sdk/google";
import { isTestEnvironment } from "../constants";
import { titleModel } from "./models";

const GEMINI_MODEL = "gemini-3.6-flash";

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        chatModel,
        titleModel: mockTitleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "title-model": mockTitleModel,
        },
      });
    })()
  : null;

export function getLanguageModel(modelId: string) {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel(modelId);
  }

  return google(GEMINI_MODEL) as any;
}

export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }
  return google(GEMINI_MODEL) as any;
}
