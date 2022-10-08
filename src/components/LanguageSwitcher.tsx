import { useContext, FunctionComponent } from "react";
import LanguageContext from "./LanguageContext";

const LanguageSwitcher: FunctionComponent = () => {
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
      aria-hidden="true"
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
