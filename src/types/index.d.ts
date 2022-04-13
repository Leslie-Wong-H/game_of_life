declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.svg" {
  const value: any;
  export = value;
}

interface RuleDescriptionModalProps {
  show: boolean;
  onHide: () => void;
}

type Language = "en" | "cn";

interface LanguageMap {
  en: "English";
  cn: "Chinese";
}

interface ChinesePoetry {
  title: string;
  dynasty: string;
  author: string;
  content: string[];
}

interface EnglishPoetry {
  title: string;
  dynasty: string;
  author: string;
  content: string[];
}

interface ChinesePoetryResponse {
  _id: string;
  index: string;
  Chinese: ChinesePoetry;
  English: EnglishPoetry;
  tags: string[];
}
