import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Games from './components/games';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import GameForm from './components/gameForm';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <main className="container">
        <NavBar />
        <Switch>
          <Route path="/games/:id" component={GameForm} />
          <Route path="/games" component={Games}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Redirect from="/" exact to="/games" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
