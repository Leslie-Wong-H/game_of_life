import { useState, useEffect, Fragment } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LanguageContext from "./components/LanguageContext";
import GithubAvatar from "./components/GithubAvatar";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ChinesePoetry from "./components/ChinesePoetry";
import JxgContainer from "./components/JxgContainer/index";

import i18n from "./i18n";

const App = () => {
  const lang = useState("en");

  // Detect the change of LanguageSwitcher globally, at the app entry point
  useEffect(() => {
    i18n.changeLanguage(lang[0]);
  }, [lang[0]]);

  return (
    <LanguageContext.Provider value={lang}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Fragment>
              <GithubAvatar />
              <ChinesePoetry />
              <LanguageSwitcher />
              <JxgContainer />
            </Fragment>
          </Route>
          <Route path="" render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </LanguageContext.Provider>
  );
};

render(<App />, document.getElementById("root"));
