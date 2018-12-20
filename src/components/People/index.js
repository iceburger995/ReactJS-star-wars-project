import React, {Component} from 'react';
import Character from './Character';
import {getAllPeople} from '../../api/people';
import {getDataByUrl} from '../../api/utils';
import { getIdFromUrl } from '../../utilities/utilities';
import {Link} from "react-router-dom";

export default class People extends Component {
    constructor() {
        super();
        this.state = {
            people: {},
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
        .then((people) => {
            people.results.forEach(peep => {
                peep.id = getIdFromUrl(peep.url);
            });
            this.setState({
                people,
                nextPage: people.next,
                prevPage: people.previous,
                selectedId: "",
                loaded: true
            });
        });
    }
    
    getPrevPage() {
        getDataByUrl(this.state.prevPage)
        .then((people) => {
            people.results.forEach(peep => {
                peep.id = getIdFromUrl(peep.url);
            });
            this.setState({
                people,
                nextPage: people.next,
                prevPage: people.previous,
                selectedId: "",
                loaded: true
            });
        });
    }

    componentDidMount() {

        getAllPeople()
            .then((people) => {
                people.results.forEach(peep => {
                    peep.id = getIdFromUrl(peep.url);
                });
            this.setState({
                people,
                nextPage: people.next,
                prevPage: people.previous,
                selectedId: "",
                loaded: true
            });
        });
    }
    
    render() {

        const {people, nextPage, prevPage, selectedId, loaded} = this.state;

        console.log(people);
        
        if(loaded) {

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        {people.results.map((p, i) => (
                                <div key={i}>
                                    <p>{p.name}</p>
                                    <Link to={"/character/" + p.id}>Details</Link>
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