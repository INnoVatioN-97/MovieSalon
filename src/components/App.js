import './App.css';
import React, { useState } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Home from '../routes/Home';
import MovieList from '../routes/MovieList';
import ViewMovie from '../routes/ViewMovie';
import Navigation from './Navigation';
import AppRouter from './Router';

function App() {
    const [movieNm, setMovieNm] = useState('');
    return (
        <>
            <Navigation />
            <AppRouter movieNm={movieNm} />
        </>
    );
}

export default App;
