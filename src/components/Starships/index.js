import React, {Component} from 'react';
import {getAllStarships} from '../../api/starships';
import {getDataByUrl} from '../../api/utils';
import { getIdFromUrl } from '../../utilities/utilities';
import {Link} from "react-router-dom";

export default class Starships extends Component {
    constructor() {
        super();
        this.state = {
            starships: {},
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
        .then((starships) => {
            starships.results.forEach(starship => {
                starship.id = getIdFromUrl(starship.url);
            });
            this.setState({
                starships,
                nextPage: starships.next,
                prevPage: starships.previous,
                selectedId: "",
                loaded: true
            });
        });
    }
    
    getPrevPage() {
        getDataByUrl(this.state.prevPage)
        .then((starships) => {
            starships.results.forEach(starship => {
                starship.id = getIdFromUrl(starship.url);
            });
            this.setState({
                starships,
                nextPage: starships.next,
                prevPage: starships.previous,
                selectedId: "",
                loaded: true
            });
        });
    }

    componentDidMount() {

        getAllStarships()
            .then((starships) => {
                starships.results.forEach(starship => {
                    starship.id = getIdFromUrl(starship.url);
                });
            this.setState({
                starships,
                nextPage: starships.next,
                prevPage: starships.previous,
                selectedId: "",
                loaded: true
            });
        });
    }
    
    render() {

        const {starships, nextPage, prevPage, selectedId, loaded} = this.state;

        console.log(starships);
        
        if(loaded) {

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        {starships.results.map((s, i) => (
                                <div key={i}>
                                    <p>{s.name}</p>
                                    <Link to={"/starship/" + s.id}>Details</Link>
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