import { createContext } from "react";

const LanguageContext = createContext<[Language, (language: Language) => void]>(
  ["en", () => {}]
);

export default LanguageContext;
