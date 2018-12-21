import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getVehicle} from '../../../api/vehicles';
import {getDataByUrl} from '../../../api/utils';
import { getIdFromUrl } from '../../../utilities/utilities';
import {Link} from "react-router-dom";

export default class Vehicle extends Component {
    constructor() {
        super();
        this.state = {
            vehicle: {},
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

        getVehicle(id)
        .then(vehicle => {
            this.getFilms(vehicle.films);
            this.getPilots(vehicle.pilots);
            this.setState({
                vehicle: vehicle,
                loaded: true
            })
        });

    }   

    render() {

        const {vehicle, films, pilots, loaded} = this.state;

        console.log(vehicle);
        console.log(films);
        console.log(pilots);

        if(loaded) {

            return(
                <div>
                    <p>Name: {vehicle.name}</p>
                    <p>Cargo Capacity: {vehicle.cargo_capacity}</p>
                    <p>Consumables: {vehicle.consumables}</p>
                    <p>Cost in credits: {vehicle.cost_in_credits}</p>
                    <p>Crew: {vehicle.crew}</p>
                    <p>Length: {vehicle.length}</p>
                    <p>Manufacturer: {vehicle.manufacturer}</p>
                    <p>Max atmosphering speed: {vehicle.max_atmosphering_speed}</p>
                    <p>Model: {vehicle.model}</p>
                    <p>Vehicle class: {vehicle.vehicle_class}</p>
                    <p>Passengers: {vehicle.passengers}</p>

                    <div>
                        <p>Vehicle's pilot(s): </p>
                        {!pilots.length ? "Vehicle can be piloted by anyone" : 
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
                        <p>The vehicle can be found in the following film(s): </p>
                        {!films.length ? "The vehicle is not present in any of the films" : 
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

Vehicle.propTypes = {
    id: PropTypes.number
}