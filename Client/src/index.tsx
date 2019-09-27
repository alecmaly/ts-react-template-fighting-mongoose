import 'babel-polyfill';
import * as React from "react";
const { Fragment } = React;
import * as ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import { Hello } from "./components/Hello";
import Navigation from "./components/Navigation.jsx";
import VariableComponent from './components/VariableComponent';



const App: React.FunctionComponent<{}> = () => {

  return (
    <Fragment>
      <Router>
        <Navigation />
        <VariableComponent />
      </Router>
    </Fragment>
  )
};

ReactDOM.render(<App />, document.getElementById("root"));
