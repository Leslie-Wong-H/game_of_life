import { createContext, Dispatch, SetStateAction } from "react";

const LanguageContext = createContext<
  [Language, Dispatch<SetStateAction<Language>>]
>(["en", () => {}]);

export default LanguageContext;
