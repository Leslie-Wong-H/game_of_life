import { useContext } from "react";
import LanguageContext from "./LanguageContext";

const LanguageSwitcher = () => {
  const [lang, setLang] = useContext(LanguageContext);

  const handleLangClick = () => {
    if (lang === "en") {
      setLang("cn");
    } else {
      setLang("en");
    }
  };

  return (
    <div
      onClick={handleLangClick}
      id="lgswitcherContainer"
      className="lgswitcherContainer"
    >
      <div id="selector" className={`selector ${lang}`}>
        <span className="langCn">中</span>
        <span className="langEn">Eng</span>
      </div>
    </div>
  );
};

export default LanguageSwitcher;