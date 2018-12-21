import React, { Component } from 'react';
import { BrowserRouter, Router, Route} from 'react-router-dom';
import history from './history';

import People from './components/People';
import Character from './components/People/Character';
import Films from './components/Films';
import Film from './components/Films/Film';
import Species from './components/Species';
import Spec from './components/Species/Spec';
import Starships from './components/Starships';
import Starship from './components/Starships/Starship';
import Vehicles from './components/Vehicles';
import Vehicle from './components/Vehicles/Vehicle';
import Planets from './components/Planets/';
import Planet from './components/Planets/Planet';

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
            <Route path={"/character/:id"} component={Character}></Route>
            <Route path={"/films"} component={Films}></Route>
            <Route path={"/film/:id"} component={Film}></Route>
            <Route path={"/species"} component={Species}></Route>
            <Route path={"/spec/:id"} component={Spec}></Route>
            <Route path={"/starships"} component={Starships}></Route>
            <Route path={"/starship/:id"} component={Starship}></Route>
            <Route path={"/vehicles"} component={Vehicles}></Route>
            <Route path={"/vehicle/:id"} component={Vehicle}></Route>
            <Route path={"/planets"} component={Planets}></Route>
            <Route path={"/planet/:id"} component={Planet}></Route>
            <Route path={"/home"} component={Home}></Route>
          </div>
        </Router>
    );
  }
}

export default App;
