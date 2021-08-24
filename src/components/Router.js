import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from 'routes/Home';
import MovieList from 'routes/MovieList';
import ViewMovie from 'routes/ViewMovie';
import queryString from 'query-string';
import Auth from 'routes/Auth';
import AllMovies from 'routes/AllMovies';
import TmdbList from 'routes/TmdbList';
import ViewTMDB from 'routes/ViewTMDB';

const AppRouter = ({ movies, userObj, isLoggedIn }) => {
    // 파라미터 {}포함시 userObj 확인가능, movies 실종
    //url속 쿼리스트링에 movieNm을 가져와 ViewMovie컴포넌트에 싣고 렌더링.

    const viewMovie = (e) => {
        const { search } = e.location;
        // console.log(search);
        const queryObj = queryString.parse(search);
        // console.log(queryObj.movieNm);
        return <ViewMovie movieNm={queryObj.movieNm} userObj={userObj} />;
    };

    return (
        <HashRouter>
            <Switch>
                <Route exact path="/">
                    <Home movies={movies} isLoggedIn={isLoggedIn} userObj={userObj} />
                </Route>
                <Route exact path="/movieList">
                    <MovieList movies={movies} isLoggedIn={isLoggedIn} userObj={userObj} />
                </Route>
                <Route path="/viewMovie" component={viewMovie} />
                <Route exact path="/auth">
                    <Auth isLoggedIn={isLoggedIn} userObj={userObj} />
                </Route>
                <Route path="/allMovies">
                    <AllMovies />
                </Route>
                <Route path="/tmdbList">
                    <TmdbList />
                </Route> 
                <Route exact path="/viewTMDB/:id" component={ViewTMDB}>
                </Route>
            </Switch>
        </HashRouter>
    );
};

export default AppRouter;
