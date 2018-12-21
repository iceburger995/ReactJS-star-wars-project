import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getFilm} from '../../../api/films';
import {getDataByUrl} from '../../../api/utils';
import { getIdFromUrl } from '../../../utilities/utilities';
import {Link} from "react-router-dom";

export default class Film extends Component {
    constructor() {
        super();
        this.state = {
            film: {},
            characters: [],
            starships: [],
            species: [],
            vehicles: [],
            loaded: false
        }
    }

    getCharacters(characters) {
        characters.forEach(element => {
            getDataByUrl(element)
            .then(char => {
                char.id = getIdFromUrl(char.url);
                this.setState({
                    characters: [...this.state.characters, char]
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

        getFilm(id)
        .then(film => {
            this.getCharacters(film.characters);
            this.getSpecies(film.species);
            this.getStarships(film.starships);
            this.getVehicles(film.vehicles);
            this.setState({
                film: film,
                loaded: true
            })
        });

    }   

    render() {

        const {film, characters, species, starships, vehicles, loaded} = this.state;

        console.log(film);
        console.log(characters);

        if(loaded) {

            return(
                <div>
                    <p>Name: {film.title}</p>
                    <p>Release Date: {film.release_date}</p>
                    <p>Directed by: {film.director}</p>
                    <p>Producer(s): {film.producer}</p>
                    <div>
                        <p>Characters who played in the film: </p>
                        {!characters.length ? "No characters played in this film" : 
                        <ul>
                            {characters.map((c,i) => (
                                <li key={i}>
                                    <Link to={'/films/' + c.id}>{c.name}</Link>
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

Film.propTypes = {
    id: PropTypes.number
}