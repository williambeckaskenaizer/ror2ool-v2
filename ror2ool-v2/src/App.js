import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { makeStyles } from "@material-ui/core/styles";

import SurvivorsPage from "./pages/survivors";
import ItemsPage from "./pages/items";
import EnemiesPage from "./pages/enemies";
import ChestsPage from "./pages/chests";

import Navbar from "./components/Navbar";
import styles from "./styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#880e4f",
      light: "#bc477b",
      dark: "#560027",
      contrastText: "#fff"
    },
    secondary: {
      main: "#fff59d",
      light: "#ffffcf",
      dark: "#cbc26d",
      contrastText: "#fff"
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div style={styles.container}>
            <Switch>
              <Route exact path="/" component={SurvivorsPage} />
              <Route exact path="/survivors" component={SurvivorsPage} />
              <Route exact path="/items" component={ItemsPage} />
              <Route exact path="/enemies" component={EnemiesPage} />
              <Route exact path="/chests" component={ChestsPage} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}
export default App;
