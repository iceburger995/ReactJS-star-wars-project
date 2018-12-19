import axios from 'axios';

export function getDataByUrl(url) {
    return axios.get(url)
    .then(res => {
        return res.data;
    })
}