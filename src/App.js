import React, { Component } from 'react';
import { BrowserRouter, Router, Route} from 'react-router-dom';
import history from './history';

import People from './components/People';
import Films from './components/Films';
import Species from './components/Species';
import Starships from './components/Starships';
import Vehicles from './components/Vehicles';
import Character from './components/People/Character';
import Root from './components/Root';
import Home from './components/Home';

class App extends Component {
  constructor() {
    super();
  }

  render() {

    return (
        <Router history={history}>
          <div>
            <Route path={"/"} component={Root}></Route>
            <Route path={"/people"} component={People}></Route>
            <Route path={"/films"} component={Films}></Route>
            <Route path={"/species"} component={Species}></Route>
            <Route path={"/starships"} component={Starships}></Route>
            <Route path={"/vehicles"} component={Vehicles}></Route>
            <Route path={"/character/:id"} component={Character}></Route>
            <Route path={"/home"} component={Home}></Route>
          </div>
        </Router>
    );
  }
}

export default App;
