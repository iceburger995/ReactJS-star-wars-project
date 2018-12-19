import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import App from './App';
import People from './components/People';

export default class NavRouter extends Component {
    render() {
        return(
            <Router>
                <Route path="./components/People" component={People} ></Route>
            </Router>
        )
    }
    
}