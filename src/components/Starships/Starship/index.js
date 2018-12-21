import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getStarship} from '../../../api/starships';
import {getDataByUrl} from '../../../api/utils';
import { getIdFromUrl } from '../../../utilities/utilities';
import {Link} from "react-router-dom";

export default class Starship extends Component {
    constructor() {
        super();
        this.state = {
            starship: {},
            films: [],
            pilots: [],
            loaded: false
        }
    }

    getFilms(films) {
        films.forEach(element => {
            getDataByUrl(element)
            .then(film => {
                film.id = getIdFromUrl(film.url);
                this.setState({
                    films: [...this.state.films, film]
                })
            })
        })
    }

    getPilots(pilots) {
        pilots.forEach(element => {
            getDataByUrl(element)
            .then(pilot => {
            pilot.id = getIdFromUrl(pilot.url);
            this.setState({
                pilots: [...this.state.pilots, pilot]
                })
            })
        })
    }

    componentDidMount() {
        const {id} = this.props.match.params;

        getStarship(id)
        .then(starship => {
            this.getFilms(starship.films);
            this.getPilots(starship.pilots);
            this.setState({
                starship: starship,
                loaded: true
            })
        });

    }   

    render() {

        const {starship, films, pilots, loaded} = this.state;

        console.log(starship);
        console.log(films);
        console.log(pilots);

        if(loaded) {

            return(
                <div>
                    <p>Name: {starship.name}</p>
                    <p>MGLT: {starship.MGLT}</p>
                    <p>Cargo Capacity: {starship.cargo_capacity}</p>
                    <p>Consumables: {starship.consumables}</p>
                    <p>Cost in credits: {starship.cost_in_credits}</p>
                    <p>Crew: {starship.crew}</p>
                    <p>Hypedrive rating: {starship.hyperdrive_rating}</p>
                    <p>Length: {starship.length}</p>
                    <p>Manufacturer: {starship.manufacturer}</p>
                    <p>Max atmosphering speed: {starship.max_atmosphering_speed}</p>
                    <p>Model: {starship.model}</p>
                    <p>Passengers: {starship.passengers}</p>
                    <p>Starship class: {starship.starship_class}</p>

                    <div>
                        <p>Starship's pilot(s): </p>
                        {!pilots.length ? "Starship can be piloted by anyone" : 
                        <ul>
                            {pilots.map((p,i) => (
                                <li key={i}>
                                    <Link to={'/character/' + p.id}>{p.name}</Link>
                                </li>
                            ))}
                        </ul>
                    }
                    </div>

                    <div>
                        <p>The starship can be found in the following film(s): </p>
                        {!films.length ? "The starship is not present in any of the films" : 
                        <ul>
                            {films.map((f,i) => (
                                <li key={i}>
                                    <Link to={'/film/' + f.id}>{f.title}</Link>
                                </li>
                            ))}
                        </ul>
                    }
                    </div>
                </div>
            )
        }
        return <div></div>
    }
}

Starship.propTypes = {
    id: PropTypes.number
}