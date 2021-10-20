import React from 'react';
import Like from './common/like';
import Table from './common/table';

class GamesTable extends React.Component {
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: (game) => (
        <Like liked={game.liked} onClick={() => this.props.onLike(game)} />
      ),
    },
    {
      key: 'delete',
      content: (game) => (
        <button
          onClick={() => this.props.onDelete(game)}
          className="btn btn-danger btn-sm">
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { games, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={games}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default GamesTable;
