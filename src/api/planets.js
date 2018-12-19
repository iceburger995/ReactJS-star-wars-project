import axios from 'axios';

const planetsUrl = 'https://swapi.co/api/species/';

export function getAllPlanets() {
    return axios.get(planetsUrl)
    .then(res => {
        return res.data;
    })
}

export function getPlanet(id) {
    return axios.get(planetsUrl + id)
    .then(res => {
        return res.data;
    })
}