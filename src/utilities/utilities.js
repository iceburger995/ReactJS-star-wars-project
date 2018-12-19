
export function getIdFromUrl(url) {
    let id = url.match(/\d+/g);

    return Number(id);

}