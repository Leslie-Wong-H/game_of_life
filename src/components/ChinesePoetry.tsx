import { useState, useEffect, useContext, FunctionComponent } from "react";
import { CSSTransition } from "react-transition-group";
import LanguageContext from "./LanguageContext";

const ChinesePoetry: FunctionComponent = () => {
  const [poetry, setPoetry] = useState([""]);
  const [store, setStore] = useState("");
  const [inProp, setInProp] = useState(false);
  const [lang] = useContext(LanguageContext);

  // Detect language change
  useEffect(() => {
    const pattern = /\w/;
    const rawData: string = store;
    if (!rawData) return;
    let startIndex = Number(rawData.slice(0, 1));
    let objIndex = 1;
    // when index is bigger than 9
    if (pattern.exec(rawData.slice(1, 2))) {
      startIndex = Number(startIndex + +rawData.slice(1, 2));
      objIndex = 2;
    }
    const data = JSON.parse(
      rawData.slice(objIndex, rawData.length)
    ) as ChinesePoetryResponse;
    const langMap: LanguageMap = {
      en: "English",
      cn: "Chinese",
    };
    const poetry = data[langMap[lang]];
    const sentenceOne = poetry.content[startIndex];
    const sentenceTwo = poetry.content[startIndex + 1];
    let detail;
    if (
      pattern.exec(
        sentenceOne.slice(sentenceOne.length - 1, sentenceOne.length)
      )
    ) {
      detail = sentenceOne + "; " + sentenceTwo;
    } else {
      detail = sentenceOne + " " + sentenceTwo;
    }
    // setInProp(false);
    setPoetry([detail]);
    setInProp(true);
    // trick to fulfill the languageSwitcher's poetry animation
    setTimeout(() => {
      setInProp(false);
    }, 500);
    // eslint-disable-next-line
  }, [lang]);

  // Initialize poetry data
  useEffect(() => {
    void requestPoetry();
  }, []);

  async function requestPoetry() {
    const res = await fetch("https://api.playgameoflife.live/v1/tang.json");
    console.time("requestPoetry");
    const data = (await res.json()) as ChinesePoetryResponse;
    const len = data.English.content.length;
    // take even index except the last one
    const startIndex = Math.floor(Math.random() * (len / 2)) * 2;
    // display sentences in responsive language
    let sentenceOne: string;
    let sentenceTwo: string;
    // Diss langContext for latency in closure
    // if (lang === "cn") {
    const SelectorHTMLElement = document.querySelector<HTMLElement>(
      "#selector"
    );
    let className = "";
    if (SelectorHTMLElement !== null) {
      className = SelectorHTMLElement.className;
    }
    if (className.endsWith("en")) {
      sentenceOne = data.English.content[startIndex];
      sentenceTwo = data.English.content[startIndex + 1];
    } else {
      sentenceOne = data.Chinese.content[startIndex];
      sentenceTwo = data.Chinese.content[startIndex + 1];
    }
    let detail;
    const pattern = /\w/;
    if (
      pattern.exec(
        sentenceOne.slice(sentenceOne.length - 1, sentenceOne.length)
      )
    ) {
      detail = sentenceOne + "; " + sentenceTwo;
    } else {
      detail = sentenceOne + " " + sentenceTwo;
    }
    // display text with animation
    console.timeEnd("requestPoetry");
    setInProp(true);
    setPoetry([detail]);

    // store data for languageSwitcher
    const stringifiedData = `${startIndex}${JSON.stringify(data)}`;
    setStore(stringifiedData);

    // trick to fulfill the languageSwitcher's poetry animation
    setTimeout(() => {
      setInProp(false);
    }, 500);
  }

  return (
    <div
      id="poetry-data-display"
      className="poetry-data-display"
      onClick={requestPoetry}
      aria-hidden="true"
    >
      <CSSTransition in={inProp} timeout={500} classNames="poetry">
        <div id="poetry-data-box" className="poetry-data-box">
          {poetry[0]}
        </div>
      </CSSTransition>
    </div>
  );
};

export default ChinesePoetry;
