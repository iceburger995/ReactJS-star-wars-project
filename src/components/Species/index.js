import React, {Component} from 'react';
import {getAllSpecies} from '../../api/species';
import {getDataByUrl} from '../../api/utils';
import { getIdFromUrl } from '../../utilities/utilities';
import {Link} from "react-router-dom";

export default class Species extends Component {
    constructor() {
        super();
        this.state = {
            species: {},
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
        .then((species) => {
            species.results.forEach(spec => {
                spec.id = getIdFromUrl(spec.url);
            });
            this.setState({
                species,
                nextPage: species.next,
                prevPage: species.previous,
                selectedId: "",
                loaded: true
            });
        });
    }
    
    getPrevPage() {
        getDataByUrl(this.state.prevPage)
        .then((species) => {
            species.results.forEach(spec => {
                spec.id = getIdFromUrl(spec.url);
            });
            this.setState({
                species,
                nextPage: species.next,
                prevPage: species.previous,
                selectedId: "",
                loaded: true
            });
        });
    }

    componentDidMount() {

        getAllSpecies()
            .then((species) => {
                species.results.forEach(spec => {
                    spec.id = getIdFromUrl(spec.url);
                });
            this.setState({
                species,
                nextPage: species.next,
                prevPage: species.previous,
                selectedId: "",
                loaded: true
            });
        });
    }
    
    render() {

        const {species, nextPage, prevPage, selectedId, loaded} = this.state;

        console.log(species);
        
        if(loaded) {

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        {species.results.map((s, i) => (
                                <div key={i}>
                                    <p>{s.name}</p>
                                    <Link to={"/spec/" + s.id}>Details</Link>
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