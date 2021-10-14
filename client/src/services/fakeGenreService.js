export const genres = [
    { _id: '5b21ca3eeb7f6fbccd471818', name: 'FPS' },
    { _id: '5b21ca3eeb7f6fbccd471814', name: 'RTS' },
    { _id: '5b21ca3eeb7f6fbccd471820', name: 'MMORPG' },
];

export function getGenres() {
    return genres.filter((g) => g);
}