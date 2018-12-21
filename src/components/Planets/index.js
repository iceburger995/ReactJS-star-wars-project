import React, {Component} from 'react';
import {getAllPlanets} from '../../api/planets';
import {getDataByUrl} from '../../api/utils';
import { getIdFromUrl } from '../../utilities/utilities';
import {Link} from "react-router-dom";

export default class Planets extends Component {
    constructor() {
        super();
        this.state = {
            planets: {},
            nextPage: "",
            prevPage: "",
            selectedId: "",
            loaded: false
        }

        this.getNextPage = this.getNextPage.bind(this);
        this.getPrevPage = this.getPrevPage.bind(this);
    }

    getNextPage() {
        getDataByUrl(this.state.nextPage)
        .then((planets) => {
            planets.results.forEach(planet => {
                planet.id = getIdFromUrl(planet.url);
            });
            this.setState({
                planets,
                nextPage: planets.next,
                prevPage: planets.previous,
                selectedId: "",
                loaded: true
            });
        });
    }
    
    getPrevPage() {
        getDataByUrl(this.state.prevPage)
        .then((planets) => {
            planets.results.forEach(planet => {
                planet.id = getIdFromUrl(planet.url);
            });
            this.setState({
                planets,
                nextPage: planets.next,
                prevPage: planets.previous,
                selectedId: "",
                loaded: true
            });
        });
    }

    componentDidMount() {

        getAllPlanets()
            .then((planets) => {
                planets.results.forEach(planet => {
                    planet.id = getIdFromUrl(planet.url);
                });
            this.setState({
                planets,
                nextPage: planets.next,
                prevPage: planets.previous,
                selectedId: "",
                loaded: true
            });
        });
    }
    
    render() {

        const {planets, nextPage, prevPage, selectedId, loaded} = this.state;

        console.log(planets);
        
        if(loaded) {

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        {planets.results.map((p, i) => (
                                <div key={i}>
                                    <p>{p.name}</p>
                                    <Link to={"/planet/" + p.id}>Details</Link>
                                </div>
                                ))}
                        </div>
                    </div>
                    <div>
                        <button className="prevBtn" onClick={this.getPrevPage} disabled={!prevPage}>Previous</button>
                        <button className="nextBtn" onClick={this.getNextPage} disabled={!nextPage}>Next</button>
                    </div>
                </div>
            )
        }
        return <div></div>
    }
}