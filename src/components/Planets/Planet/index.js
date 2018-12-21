import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getPlanet} from '../../../api/planets';
import {getDataByUrl} from '../../../api/utils';
import { getIdFromUrl } from '../../../utilities/utilities';
import {Link} from "react-router-dom";

export default class Planet extends Component {
    constructor() {
        super();
        this.state = {
            planet: {},
            films: [],
            residents: [],
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

    getResidents(residents) {
        residents.forEach(element => {
            getDataByUrl(element)
            .then(resident => {
            resident.id = getIdFromUrl(resident.url);
            this.setState({
                residents: [...this.state.residents, resident]
                })
            })
        })
    }

    componentDidMount() {
        const {id} = this.props.match.params;

        getPlanet(id)
        .then(planet => {
            this.getFilms(planet.films);
            this.getResidents(planet.residents);
            this.setState({
                planet: planet,
                loaded: true
            })
        });

    }   

    render() {

        const {planet, films, residents, loaded} = this.state;

        console.log(planet);
        console.log(films);
        console.log(residents);

        if(loaded) {

            return(
                <div>
                    <p>Name: {planet.name}</p>
                    <p>Climate: {planet.climate}</p>
                    <p>Diameter: {planet.diameter}</p>
                    <p>Gravity: {planet.gravity}</p>
                    <p>Orbital period: {planet.orbital_period}</p>
                    <p>Population: {planet.population}</p>
                    <p>Rotation period: {planet.rotation_period}</p>
                    <p>Surface water: {planet.surface_water}</p>
                    <p>Terrain: {planet.terrain}</p>

                    <div>
                        <p>Planet's resident(s): </p>
                        {!residents.length ? "planet can be residented by anyone" : 
                        <ul>
                            {residents.map((r,i) => (
                                <li key={i}>
                                    <Link to={'/character/' + r.id}>{r.name}</Link>
                                </li>
                            ))}
                        </ul>
                    }
                    </div>

                    <div>
                        <p>The planet can be found in the following film(s): </p>
                        {!films.length ? "The planet is not present in any of the films" : 
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

Planet.propTypes = {
    id: PropTypes.number
}