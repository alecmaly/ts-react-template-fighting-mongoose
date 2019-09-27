
import React, { Component } from 'react';
import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import Home from '../Pages/Home';
import Messages from '../Pages/Messages';
import News from '../Pages/News';
import MyProfile from '../Pages/MyProfile';
import Settings from '../Pages/Settings';
import NewsDetail from '../Pages/NewsDetail';
import Login from './Login';

class VariableComponent extends Component {

    render() {
        return (
            <Switch>
              <Route path='/Messages' component={Messages} />
              <Route path='/MyProfile' component={MyProfile} />
              <Route path='/Settings' component={Settings} />
              <Route path='/test' conponent={NewsDetail} />
              <Route path='/News' component={News} />
              <Route path='/Login' component={Login} />
              <Route path='/newNewsItem' component={Home} />
              <Route exact path='/*' component={Home} />
            </Switch>
        );
    }
}

export default VariableComponent;
