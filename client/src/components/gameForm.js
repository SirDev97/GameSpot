const GameForm = ({ match, history }) => {
  return (
    <div>
      <h1>Game Form {match.params.id}</h1>
      <button
        className="btn btn-primary"
        onClick={() => history.push('/games')}>
        Save
      </button>
    </div>
  );
};

export default GameForm;
