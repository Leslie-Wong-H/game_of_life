import { createContext } from "react";

const LanguageContext = createContext<[string, (language: string) => void]>(["en", () => {}]);

export default LanguageContext;
