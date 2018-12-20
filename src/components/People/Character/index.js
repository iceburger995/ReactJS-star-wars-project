import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getPeopleById} from '../../../api/people';

export default class Character extends Component {
    constructor() {
        super();
        this.state = {
            character: {},
            loaded: false
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;

        getPeopleById(id)
        .then(char => {
            this.setState({
                character: char,
                loaded: true
            })
        });

    }   

    render() {

        const {character, loaded} = this.state;

        console.log(character);

        if(loaded) {
            return(
                <div>
                    <p>Name: {character.name}</p>
                    <p>Birth year: {character.birth_year}</p>
                    <p>Weight: {character.mass}</p>
                    <p>Height: {character.height}</p>
                    <p>Gender: {character.gender}</p>
                </div>
            )
        }
        return <div></div>
    }
}

Character.propTypes = {
    id: PropTypes.number
}