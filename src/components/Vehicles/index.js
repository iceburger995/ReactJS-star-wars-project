import React, {Component} from 'react';
import {getAllVehicles} from '../../api/vehicles';
import {getDataByUrl} from '../../api/utils';
import { getIdFromUrl } from '../../utilities/utilities';
import {Link} from "react-router-dom";

export default class Vehicles extends Component {
    constructor() {
        super();
        this.state = {
            vehicles: {},
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
        .then((vehicles) => {
            vehicles.results.forEach(vehicle => {
                vehicle.id = getIdFromUrl(vehicle.url);
            });
            this.setState({
                vehicles,
                nextPage: vehicles.next,
                prevPage: vehicles.previous,
                selectedId: "",
                loaded: true
            });
        });
    }
    
    getPrevPage() {
        getDataByUrl(this.state.prevPage)
        .then((vehicles) => {
            vehicles.results.forEach(vehicle => {
                vehicle.id = getIdFromUrl(vehicle.url);
            });
            this.setState({
                vehicles,
                nextPage: vehicles.next,
                prevPage: vehicles.previous,
                selectedId: "",
                loaded: true
            });
        });
    }

    componentDidMount() {

        getAllVehicles()
            .then((vehicles) => {
                vehicles.results.forEach(vehicle => {
                    vehicle.id = getIdFromUrl(vehicle.url);
                });
            this.setState({
                vehicles,
                nextPage: vehicles.next,
                prevPage: vehicles.previous,
                selectedId: "",
                loaded: true
            });
        });
    }
    
    render() {

        const {vehicles, nextPage, prevPage, selectedId, loaded} = this.state;

        console.log(vehicles);
        
        if(loaded) {

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        {vehicles.results.map((v, i) => (
                                <div key={i}>
                                    <p>{v.name}</p>
                                    <Link to={"/vehicle/" + v.id}>Details</Link>
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