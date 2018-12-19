import axios from 'axios';

const speciesUrl = 'https://swapi.co/api/species/';

export function getAllSpecies() {
    return axios.get(speciesUrl)
    .then(res => {
        return res.data;
    })
}

export function getSpeciesById(id) {
    return axios.get(speciesUrl + id)
    .then(res => {
        return res.data;
    })
}