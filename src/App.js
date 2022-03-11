import {
  useState,
  useEffect,
  Fragment,
  StrictMode,
  lazy,
  Suspense,
  Component,
} from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import i18n from "./i18n";
import imgURL from "./img/loading.svg";
import LanguageContext from "./components/LanguageContext";
import GithubAvatar from "./components/GithubAvatar";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ChinesePoetry from "./components/ChinesePoetry";

const JxgContainer = lazy(() => import("./components/JxgContainer/index"));

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1 style={{ textAlign: "center" }}>
          Something went wrong. Please reload.
        </h1>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  const lang = useState("en");

  const renderLoader = () => (
    <div style={{ textAlign: "center" }}>
      <img src={imgURL} alt="Wait a moment" />
    </div>
  );

  // Detect the change of LanguageSwitcher globally, at the app entry point
  useEffect(() => {
    i18n.changeLanguage(lang[0]);
  }, [lang[0]]);

  return (
    <StrictMode>
      <LanguageContext.Provider value={lang}>
        <ErrorBoundary>
          <Suspense fallback={renderLoader()}>
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
          </Suspense>
        </ErrorBoundary>
      </LanguageContext.Provider>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
