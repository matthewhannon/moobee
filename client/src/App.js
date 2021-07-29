import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header';
import Trending from './components/Trending';
import ResultsPage from './components/ResultsPage';
import FilmDetails from './components/FilmDetails';
import ActorDetails from './components/ActorDetails';

const App = () => {
    return (
        <div className="app" >
            <Router>
                <Switch>
                    <Route exact path="/">
                        <Header />
                        <Trending />
                    </Route>
                    <Route path="/search/:title">
                        <Header />
                        <ResultsPage />
                    </Route>
                    <Route path="/details/:movie_id">
                        <Header />
                        <FilmDetails />
                    </Route>
                    <Route path="/actor/:actor_id">
                        <Header />
                        <ActorDetails />
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;