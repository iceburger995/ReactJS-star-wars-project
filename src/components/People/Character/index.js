import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getPeopleById} from '../../../api/people';
import {getDataByUrl} from '../../../api/utils';
import { getIdFromUrl } from '../../../utilities/utilities';
import {Link} from "react-router-dom";

export default class Character extends Component {
    constructor() {
        super();
        this.state = {
            character: {},
            films: [],
            starships: [],
            species: [],
            vehicles: [],
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

    getSpecies(species) {
        species.forEach(element => {
            getDataByUrl(element)
            .then(spec => {
            spec.id = getIdFromUrl(spec.url);
            this.setState({
                species: [...this.state.species, spec]
                })
            })
        })
    }

    getStarships(starships) {
        starships.forEach(element => {
            getDataByUrl(element)
            .then(starship => {
            starship.id = getIdFromUrl(starship.url);
            this.setState({
                starships: [...this.state.starships, starship]
                })
            })
        })
    }

    getVehicles(vehicles) {
        vehicles.forEach(element => {
            getDataByUrl(element)
            .then(vehicle => {
                vehicle.id = getIdFromUrl(vehicle.url);
            this.setState({
                vehicles: [...this.state.vehicles, vehicle]
                })
            })
        })
    }

    componentDidMount() {
        const {id} = this.props.match.params;

        getPeopleById(id)
        .then(char => {
            this.getFilms(char.films);
            this.getSpecies(char.species);
            this.getStarships(char.starships);
            this.getVehicles(char.vehicles);
            this.setState({
                character: char,
                loaded: true
            })
        });

    }   

    render() {

        const {character, films, species, starships, vehicles, loaded} = this.state;

        if(loaded) {

            return(
                <div>
                    <p>Name: {character.name}</p>
                    <p>Birth year: {character.birth_year}</p>
                    <p>Weight: {character.mass}</p>
                    <p>Height: {character.height}</p>
                    <p>Gender: {character.gender}</p>
                    <div>
                        <p>Films played in: </p>
                        {!films.length ? "Character didn't play in any film" : 
                        <ul>
                            {films.map((f,i) => (
                                <li key={i}>
                                    <Link to={'/films/' + f.id}>{f.title}</Link>
                                </li>
                            ))}
                        </ul>
                    }
                        
                    </div>
                    <div>
                        <p>Species: </p>
                        {!species.length ? "Unknown" : 
                        <ul>
                            {species.map((s,i) => (
                                <li key={i}>
                                    <Link to={'/species/' + s.id}>{s.name}</Link>
                                </li>
                            ))}
                        </ul>
                    }
                        
                    </div>
                    <div>
                        <p>Starships owned by the character: </p>
                        {!starships.length ? "None" :
                    <ul>
                        {starships.map((s,i) => (
                            <li key={i}>
                                <Link to={'/starships/' + s.id}>{s.name}</Link>
                            </li>
                        ))}
                    </ul>
                    }
                    </div>
                    <div>
                        <p>Vehicles owned by the character: </p>
                        {!vehicles.length ? "None" :
                    <ul>
                        {vehicles.map((v,i) => (
                            <li key={i}>
                                <Link to={'/vehicles/' + v.id}>{v.name}</Link>
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

Character.propTypes = {
    id: PropTypes.number
}