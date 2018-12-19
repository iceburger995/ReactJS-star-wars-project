import axios from 'axios';

const starshipsUrl = 'https://swapi.co/api/starships/';

export function getAllStarships() {
    return axios.get(starshipsUrl)
    .then(res => {
        return res.data;
    })
}

export function getStarship(id) {
    return axios.get(starshipsUrl + id)
    .then(res => {
        return res.data;
    })
}