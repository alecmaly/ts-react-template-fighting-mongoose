import * as React from "react";
const { Fragment } = React;
import * as ReactDOM from "react-dom";

import { Hello } from "./components/Hello";




const ROOT_URI = process.env.ROOT_URI || 'http://192.168.99.100:8080' //'http://localhost:3000'



const App: React.FunctionComponent<{}> = () => {

  function getData() {
    fetch(ROOT_URI + '/me', { credentials: 'include' })
      .then(resp => {
        if (resp.status === 401) { return 'Unauthorized' } else { return resp.json() } 
      })
      .then(data => console.log(data))
  }


  return (
    <Fragment>
      <Hello compiler="TypeScript" framework="React" />
      Root API URI: &nbsp;&nbsp;{ROOT_URI}

      <br /><br />
      <a href={ROOT_URI + '/auth/twitter'}>Login with Twitter</a><br />
      <a href={ROOT_URI + '/auth/facebook'}>Login with Facebook</a><br />
      <a href={ROOT_URI + '/auth/github'}>Login with Github</a><br />
      <a href={ROOT_URI + '/auth/linkedin'}>Login with LinkedIn</a><br />
      <a href={ROOT_URI + '/auth/azure'}>Login with Microsoft Azure</a><br />
      <a href={ROOT_URI + '/auth/google'}>Login with Google</a><br />

      <br />
      <a href='#' onClick={getData}>Me</a><br /><br />
      <a href={ROOT_URI + '/logout'}>Logout</a>
    </Fragment>
  )
};

ReactDOM.render(<App />, document.getElementById("root"));
