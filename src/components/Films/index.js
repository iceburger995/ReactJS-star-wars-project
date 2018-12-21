import React, {Component} from 'react';
import {getAllFilms} from '../../api/films';
import {getDataByUrl} from '../../api/utils';
import { getIdFromUrl } from '../../utilities/utilities';
import {Link} from "react-router-dom";

export default class Films extends Component {
    constructor() {
        super();
        this.state = {
            films: {},
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
        .then((films) => {
            films.results.forEach(film => {
                film.id = getIdFromUrl(film.url);
            });
            this.setState({
                films,
                nextPage: films.next,
                prevPage: films.previous,
                selectedId: "",
                loaded: true
            });
        });
    }
    
    getPrevPage() {
        getDataByUrl(this.state.prevPage)
        .then((films) => {
            films.results.forEach(film => {
                film.id = getIdFromUrl(film.url);
            });
            this.setState({
                films,
                nextPage: films.next,
                prevPage: films.previous,
                selectedId: "",
                loaded: true
            });
        });
    }

    componentDidMount() {

        getAllFilms()
            .then((films) => {
                films.results.forEach(film => {
                    film.id = getIdFromUrl(film.url);
                });
            this.setState({
                films,
                nextPage: films.next,
                prevPage: films.previous,
                selectedId: "",
                loaded: true
            });
        });
    }
    
    render() {

        const {films, nextPage, prevPage, selectedId, loaded} = this.state;

        console.log(films);
        
        if(loaded) {

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        {films.results.map((f, i) => (
                                <div key={i}>
                                    <p>{f.title}</p>
                                    <Link to={"/film/" + f.id}>Details</Link>
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