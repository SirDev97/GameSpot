import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import _ from 'lodash';

import { getGames, deleteGame } from '../services/gameService';
import { getGenres } from '../services/genreService';

import GamesTable from './gamesTable';
import SearchBox from './searchBox';

import ListGroup from './common/listGroup';
import Pagination from './common/pagination';

import { paginate } from '../utils/paginate';

class Games extends Component {
  state = {
    games: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: '',
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: '', name: 'All Genres' }, ...data];

    const { data: games } = await getGames();
    this.setState({ games, genres });
  }

  handleDelete = async (game) => {
    const originalGames = this.state.games;
    const games = originalGames.filter((g) => g._id !== game._id);
    this.setState({ games });

    try {
      await deleteGame(game._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This game has already been deleted.');
      this.setState({ games: originalGames });
    }
  };

  handleLike = (game) => {
    const games = [...this.state.games];
    const index = games.indexOf(game);
    games[index] = { ...games[index] };
    games[index].liked = !games[index].liked;

    this.setState({ games });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      searchQuery,
      games: allGames,
    } = this.state;

    let filtered = allGames;
    if (searchQuery)
      filtered = allGames.filter((g) =>
        g.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allGames.filter((g) => g.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const games = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: games };
  };

  render() {
    const { length: count } = this.state.games;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;
    const { user } = this.props;

    if (count === 0) return <p>There are no games in the database</p>;

    const { totalCount, data: games } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/games/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}>
              New Game
            </Link>
          )}

          <p>Showing {totalCount} games in the database.</p>

          <SearchBox value={searchQuery} onChange={this.handleSearch} />

          <GamesTable
            games={games}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Games;
