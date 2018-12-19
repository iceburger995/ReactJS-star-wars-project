import axios from 'axios';

const peopleUrl = 'https://swapi.co/api/people/';

export function getAllPeople() {
    return axios.get(peopleUrl)
    .then(res => {
        return res.data;
    })
}

export function getPeopleById(id) {
    return axios.get(peopleUrl + id)
    .then(res => {
        return res.data;
    })
}