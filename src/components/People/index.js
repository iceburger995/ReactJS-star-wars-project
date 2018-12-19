import React, {Component} from 'react';
import Character from './Character';
import {getAllPeople} from '../../api/people';
import {getDataByUrl} from '../../api/utils';
import { getIdFromUrl } from '../../utilities/utilities';

export default class People extends Component {
    constructor() {
        super();
        this.state = {
            people: {},
            nextPage: "",
            prevPage: "",
            loaded: false
        }

        this.getNextPage = this.getNextPage.bind(this);
        this.getPrevPage = this.getPrevPage.bind(this);
    }

    getNextPage() {
        getDataByUrl(this.state.nextPage)
        .then((people) => {
            this.setState({
                people,
                nextPage: people.next,
                prevPage: people.previous,
                loaded: true
            });
        });
    }
    
    getPrevPage() {
        getDataByUrl(this.state.prevPage)
        .then((people) => {
            this.setState({
                people,
                nextPage: people.next,
                prevPage: people.previous,
                loaded: true
            });
        });
    }

    renderCharacter(e) {
        let id = Number(e.currentTarget.getAttribute('data-id'));
        let charDiv = document.querySelector('.character');
        console.log(charDiv);
        
        charDiv.append(<Character id={id}/>);
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
                loaded: true
            });
        });
    }
    
    render() {
        const {people, nextPage, prevPage, loaded} = this.state;
        
        if(loaded) {

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                        {people.results.map((p, i) => (
                                <div key={i}>
                                    <p>{p.name}</p>
                                    <button className="detailsBtn" data-id={p.id} onClick={this.renderCharacter.bind(this)}>Show Details</button>
                                </div>
                                ))}
                        </div>
                        <div className="col-md-6 character">

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