import http from './httpService';

export function getGenres() {
    return http.get('http://localhost:5000/api/genres');
}