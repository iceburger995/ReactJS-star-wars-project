import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getSpeciesById} from '../../../api/species';
import {getDataByUrl} from '../../../api/utils';
import { getIdFromUrl } from '../../../utilities/utilities';
import {Link} from "react-router-dom";

export default class Spec extends Component {
    constructor() {
        super();
        this.state = {
            spec: {},
            people: [],
            films: [],
            loaded: false
        }
    }

    getPeople(people) {
        people.forEach(element => {
            getDataByUrl(element)
            .then(peep => {
                peep.id = getIdFromUrl(peep.url);
                this.setState({
                    people: [...this.state.people, peep]
                })
            })
        })
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

    componentDidMount() {
        const {id} = this.props.match.params;

        getSpeciesById(id)
        .then(spec => {
            this.getPeople(spec.people);
            this.getFilms(spec.films);
            this.setState({
                spec: spec,
                loaded: true
            })
        });

    }   

    render() {

        const {spec, people, films, loaded} = this.state;

        console.log(spec);
        console.log(people);

        if(loaded) {

            return(
                <div>
                    <p>Name: {spec.name} </p>
                    <p>Average Height: {spec. average_height} </p>
                    <p>Average Lifespan: {spec.average_lifespan} </p>
                    <p>Designation: {spec.designation} </p>
                    <p>Eye colors: {spec.eye_colors} </p>
                    <p>Hair Colors: {spec.hair_colors} </p>
                    <p>Language: {spec.language} </p>
                    <p>Skin colors: {spec.skin_colors} </p>
                    <div>
                        <p>People of this species: </p>
                        {!people.length ? "There are no people known with this species" : 
                        <ul>
                            {people.map((p,i) => (
                                <li key={i}>
                                    <Link to={'/character/' + p.id}>{p.name}</Link>
                                </li>
                            ))}
                        </ul>
                    }
                        
                    </div>
                    <div>
                        <p>This species can be found in the following films: </p>
                        {!films.length ? "No films are know to host this species" : 
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

Spec.propTypes = {
    id: PropTypes.number
}