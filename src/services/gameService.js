import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + '/games';

function gameUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function getGames() {
    return http.get(apiEndpoint);
}

export function getGame(gameId) {
    return http.get(gameUrl(gameId));
}

export function saveGame(game) {
    if (game._id) {
        const body = {...game };
        delete body._id;
        return http.put(gameUrl(game._id), body);
    }

    return http.post(apiEndpoint, game);
}

export function deleteGame(gameId) {
    return http.delete(gameUrl(gameId));
}