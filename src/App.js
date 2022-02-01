import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./NavBar";
import NotFound from "./NotFound";
import MoviesDetails from "./MoviesDetails";
import Form from "./Form";
import RegisterForm from "./RegisterForm";
import Movies from "./Movies";
import Favorites from "./Favorites";
import { useState } from "react";
import { useSelector } from "react-redux";
import { LanguageContext } from "./languageContext";
import LangComponent from "./LangComponent";

function App() {
  const [contextLanguage, setContextLanguage] = useState("en");
  const lang = useSelector((state) => state.language.lang);

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      className={lang === "ar" ? "text-right" : "text-left"}
    >
      <LanguageContext.Provider value={{ contextLanguage, setContextLanguage }}>
        <BrowserRouter>
          <NavBar />
          <div className="container my-5">
            <Switch>
              <Route path={"/"} exact component={Movies} />
              <Route path={"/favorites"} component={Favorites} />
              <Route path={"/login"} exact component={Form} />
              <Route path={"/register"} exact component={RegisterForm} />
              <Route
                path={"/movieDetails:id"}
                exact
                component={MoviesDetails}
              />
              <Route path={"/functional"} exact component={LangComponent} />
              <Route path={"*"} component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </LanguageContext.Provider>
    </div>
  );
}

export default App;