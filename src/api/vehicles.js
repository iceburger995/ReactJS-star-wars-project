import axios from 'axios';

const vehiclesUrl = 'https://swapi.co/api/vehicles/';

export function getAllVehicles() {
    return axios.get(vehiclesUrl)
    .then(res => {
        return res.data;
    })
}

export function getVehicle(id) {
    return axios.get(vehiclesUrl + id)
    .then(res => {
        return res.data;
    })
}