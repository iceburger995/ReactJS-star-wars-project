import axios from 'axios';

const filmsUrl = 'https://swapi.co/api/films/';

export function getAllFilms() {
    return axios.get(filmsUrl)
    .then(res => {
        return res.data;
    })
}

export function getFilm(id) {
    return axios.get(filmsUrl + id)
    .then(res => {
        return res.data;
    })
}