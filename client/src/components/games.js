import React, { Component } from 'react';
import { getGames } from '../services/fakeGameService';

class Games extends Component {
  state = {
    games: getGames(),
  };

  handleDelete = (game) => {
    const games = this.state.games.filter((g) => g._id !== game._id);
    this.setState({ games });
  };

  render() {
    const { length: count } = this.state.games;

    if (count === 0) return <p>There are no games in the database</p>;

    return (
      <React.Fragment>
        <p>Showing {count} games in the database.</p>

        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.games.map((game) => (
              <tr key={game._id}>
                <td>{game.title}</td>
                <td>{game.genre.name}</td>
                <td>{game.numberInStock}</td>
                <td>{game.dailyRentalRate}</td>
                <td>
                  <button
                    onClick={() => this.handleDelete(game)}
                    className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Games;
