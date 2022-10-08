declare module "*.png" {
  const value: any;
  export = value;
}

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface RuleDescriptionModalProps {
  show: boolean;
  onHide: () => void;
}

interface ButtonContextProviderProps {
  children: React.ReactNode;
}

interface AppProps {
  children: React.ReactNode;
}

interface ButtonMachineContext {
  originalNumber: 0;
  remainLifes: 0;
  evolutionTimes: 0;
  rateText: "medium";
  rateCount: 0;
  startCount: 0;
  pauseCount: 0;
  continueCount: 0;
  resetCount: 0;
  pattern: "";
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

interface RLEDecipherResult {
  width: number;
  height: number;
  result: CoordinatedPattern;
}

type CoordinatedPattern = [number, number][];

type GameState = "" | "Start" | "Pause" | "Continue" | "Reset";

type PaddedPatternName =
  | ""
  | "glider"
  | "honeyFarm"
  | "pulsar"
  | "tencellcolumn"
  | "lightweightspaceship"
  | "tumbler"
  | "gosperglidergun"
  | "mournJohnConway"
  | "__1024";

interface PaddedPatternMap {
  glider: CoordinatedPattern;
  honeyFarm: CoordinatedPattern;
  pulsar: CoordinatedPattern;
  tencellcolumn: CoordinatedPattern;
  lightweightspaceship: CoordinatedPattern;
  tumbler: CoordinatedPattern;
  gosperglidergun: CoordinatedPattern;
  mournJohnConway: CoordinatedPattern;
  __1024: CoordinatedPattern;
}

type mediumDecodedPattern = string[] | string[][] | number[][];

interface PatternResponseJson {
  height: number;
  index: number;
  pattern: string[];
  uuid: string;
  width: number;
  _id: number;
}
