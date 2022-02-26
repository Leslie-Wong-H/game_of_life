import { useState, useEffect, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import LanguageContext from "./LanguageContext";

const ChinesePoetry = () => {
  const [poetry, setPoetry] = useState([""]);
  const [store, setStore] = useState("");
  const [inProp, setInProp] = useState(false);
  const [lang] = useContext(LanguageContext);

  // Detect language change
  useEffect(() => {
    const pattern = /\w/;
    const rawData = store;
    if (!rawData) return;
    let startIndex = Number(rawData.slice(0, 1));
    let objIndex = 1;
    // when index is bigger than 9
    if (rawData.slice(1, 2).match(pattern)) {
      startIndex = Number(startIndex + rawData.slice(1, 2));
      objIndex = 2;
    }
    const data = JSON.parse(rawData.slice(objIndex, rawData.length));
    const langMap = {
      en: "English",
      cn: "Chinese",
    };
    const sentenceOne = data[langMap[lang]].content[startIndex];
    const sentenceTwo = data[langMap[lang]].content[startIndex + 1];
    let detail;
    if (
      sentenceOne
        .slice(sentenceOne.length - 1, sentenceOne.length)
        .match(pattern)
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
  }, [lang]);

  // Initialize poetry data
  useEffect(() => {
    requestPoetry();
  }, [""]);

  async function requestPoetry() {
    const res = await fetch("https://playgameoflife.live/tang.json");
    console.time("requestPoetry");
    const data = await res.json();
    const len = data.English.content.length;
    // take even index except the last one
    const startIndex = Math.floor(Math.random() * (len / 2)) * 2;
    // display sentences in responsive language
    let sentenceOne;
    let sentenceTwo;
    // Diss langContext for latency in closure
    // if (lang === "cn") {
    if (document.querySelector("#selector").className.endsWith("en")) {
      sentenceOne = data.English.content[startIndex];
      sentenceTwo = data.English.content[startIndex + 1];
    } else {
      sentenceOne = data.Chinese.content[startIndex];
      sentenceTwo = data.Chinese.content[startIndex + 1];
    }
    let detail;
    const pattern = /\w/;
    if (
      sentenceOne
        .slice(sentenceOne.length - 1, sentenceOne.length)
        .match(pattern)
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
    const stringifiedData = startIndex + JSON.stringify(data);
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
