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
  // Redirect,
} from "react-router-dom";
import i18n from "./i18n";
import imgURL from "./img/loading.svg";
import LanguageContext from "./components/LanguageContext";
import GithubAvatar from "./components/GithubAvatar";
import LanguageSwitcher from "./components/LanguageSwitcher";
import ChinesePoetry from "./components/ChinesePoetry";

const JxgContainer = lazy(() => import("./components/JxgContainer/index"));

class ErrorBoundary extends Component {
  constructor(props: AppProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
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
      {/* <img src={imgURL} alt="Wait a moment" /> */}
      <svg>
        <use xlinkHref={imgURL} />
      </svg>
    </div>
  );

  // Detect the change of LanguageSwitcher globally, at the app entry point
  useEffect(() => {
    void i18n.changeLanguage(lang[0]);
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
                {/* <Route path="" render={() => <Redirect to="/" />} /> */}
              </Switch>
            </Router>
          </Suspense>
        </ErrorBoundary>
      </LanguageContext.Provider>
    </StrictMode>
  );
};

render(<App />, document.getElementById("root"));
