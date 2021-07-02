import './App.css';
import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from '../routes/Home';
import MovieList from '../routes/MovieList';
import ViewMovie from '../routes/ViewMovie';
import Navigation from './Navigation';

function App() {
    return (
        // 주소에 따른 경로 설정.

        <HashRouter>
            <Navigation pageName={window.location.pathname} />
            <Route path="/" exact={true} pageName="Home" component={Home}></Route>
            <Route path="/movieList" exact={true} pageName="Movie List" component={MovieList}></Route>
            <Route path="/viewMovie" exact={true} pageName="영화 정보" component={ViewMovie}></Route>
        </HashRouter>
    );
}

export default App;
