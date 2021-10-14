import * as genresAPI from './fakeGenreService';

const games = [{
        _id: '5b21ca3eeb7f6fbccd471815',
        title: 'Counter-Strike',
        genre: { _id: '5b21ca3eeb7f6fbccd471818', name: 'FPS' },
        numberInStock: 6,
        dailyRentalRate: 2.5,
        publishDate: '2018-01-03T19:04:28.809Z',
    },
    {
        _id: '5b21ca3eeb7f6fbccd471816',
        title: 'Valorant',
        genre: { _id: '5b21ca3eeb7f6fbccd471818', name: 'FPS' },
        numberInStock: 5,
        dailyRentalRate: 2.5,
    },
    {
        _id: '5b21ca3eeb7f6fbccd471817',
        title: 'World of Warcraft',
        genre: { _id: '5b21ca3eeb7f6fbccd471820', name: 'MMORPG' },
        numberInStock: 8,
        dailyRentalRate: 3.5,
    },
    {
        _id: '5b21ca3eeb7f6fbccd471819',
        title: 'StarCraft 1',
        genre: { _id: '5b21ca3eeb7f6fbccd471814', name: 'RTS' },
        numberInStock: 7,
        dailyRentalRate: 3.5,
    },
    {
        _id: '5b21ca3eeb7f6fbccd47181a',
        title: 'Starcraft 2',
        genre: { _id: '5b21ca3eeb7f6fbccd471814', name: 'RTS' },
        numberInStock: 7,
        dailyRentalRate: 3.5,
    },
    {
        _id: '5b21ca3eeb7f6fbccd47181b',
        title: 'Age of Empire',
        genre: { _id: '5b21ca3eeb7f6fbccd471814', name: 'RTS' },
        numberInStock: 7,
        dailyRentalRate: 3.5,
    },
    {
        _id: '5b21ca3eeb7f6fbccd47181e',
        title: 'Star Wars The Old Republic',
        genre: { _id: '5b21ca3eeb7f6fbccd471820', name: 'MMORPG' },
        numberInStock: 7,
        dailyRentalRate: 4.5,
    },
    {
        _id: '5b21ca3eeb7f6fbccd47181f',
        title: 'Blade And Soul',
        genre: { _id: '5b21ca3eeb7f6fbccd471820', name: 'MMORPG' },
        numberInStock: 4,
        dailyRentalRate: 3.5,
    },
    {
        _id: '5b21ca3eeb7f6fbccd471821',
        title: 'BulletStorm',
        genre: { _id: '5b21ca3eeb7f6fbccd471818', name: 'FPS' },
        numberInStock: 7,
        dailyRentalRate: 3.5,
    },
];

export function getGames() {
    return games;
}

export function getGame(id) {
    return games.find((g) => g._id === id);
}

export function savegame(game) {
    let gameInDb = games.find((g) => g._id === game._id) || {};
    gameInDb.name = game.name;
    gameInDb.genre = genresAPI.genres.find((g) => g._id === game.genreId);
    gameInDb.numberInStock = game.numberInStock;
    gameInDb.dailyRentalRate = game.dailyRentalRate;

    if (!gameInDb._id) {
        gameInDb._id = Date.now();
        games.push(gameInDb);
    }

    return gameInDb;
}

export function deleteGame(id) {
    let gameInDb = games.find((g) => g._id === id);
    games.splice(games.indexOf(gameInDb), 1);
    return gameInDb;
}