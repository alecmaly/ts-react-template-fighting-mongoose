import React, { Component } from 'react';
import axios from 'axios';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';



const ROOT_API_URI = process.env.ROOT_API_URI || 'http://fightingmongooses.com:8080';// 'http://192.168.99.100:8080'; //'http://localhost:3000'




class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInText: ''
    }
  }

  componentDidMount() {
    this.getLoggedInStatus();
  }

  getLoggedInStatus = () => {
    axios.get(ROOT_API_URI + '/me', { 
      withCredentials: true
    })
    .then(res => {
      this.setState({
        loggedInText: res.data
      });
      console.log(res.data);
    })
    .catch(() =>
      this.setState({
        loggedInText: 'Not Logged In'
      })
    )
  }

  logout = () => {
    axios.get(ROOT_API_URI + '/logout', { 
      withCredentials: true
    })
    .then(res => { this.getLoggedInStatus(); console.log(res.data) })
    // .then(resp => {return resp.text()})
    //   .then(data => console.log(data))
  }

  render() {
      return (
        <div className='login'>
          {/* <Hello compiler="TypeScript" framework="React" /> */}
          Root API URI: &nbsp;&nbsp;{ROOT_API_URI}
          <h1>{this.state.loggedInText}</h1>

          <br /><br />
          <a href={ROOT_API_URI + '/auth/twitter'}>Login with Twitter</a><br />
          <a href={ROOT_API_URI + '/auth/facebook'}>Login with Facebook</a><br />
          <a href={ROOT_API_URI + '/auth/github'}>Login with Github</a><br />
          <a href={ROOT_API_URI + '/auth/linkedin'}>Login with LinkedIn</a><br />
          <a href={ROOT_API_URI + '/auth/azure'}>Login with Microsoft Azure</a><br />
          <a href={ROOT_API_URI + '/auth/google'}>Login with Google</a><br />

          <br />
          <a href='#' onClick={this.getLoggedInStatus}>Me</a><br /><br />
          {/* <a href={ROOT_API_URI + '/logout'}>Logout</a> */}
          <a href='#' onClick={this.logout}>Logout</a>

      </div>
    );
  }
}

export default Login;
