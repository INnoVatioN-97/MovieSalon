import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from 'routes/Home';
import MovieList from 'routes/MovieList';
import ViewMovie from 'routes/ViewMovie';
import queryStirng from 'query-string';
import Auth from 'routes/Auth';
import App from './App';


const AppRouter = (movies, userObj, isLoggedIn) => { // 파라미터 {}포함시 userObj 확인가능, movies 실종
    //url속 쿼리스트링에 movieNm을 가져와 ViewMovie컴포넌트에 싣고 렌더링.

    const viewMovie = (e) => {
        const { search } = e.location;
        console.log(search);
        const queryObj  = queryStirng.parse(search);
        // console.log(queryObj.movieNm);
        return <ViewMovie movieNm={queryObj.movieNm} />;
    };
    
    
    
    return (
        <HashRouter>
            <Switch>
                    <Route exact path="/">
                        <Home movies={movies} isLoggedIn={isLoggedIn} userObj={userObj} />
                    </Route>
                    <Route exact path="/movieList">
                        <MovieList movies={movies} />
                    </Route>
                    <Route path="/viewMovie" component={viewMovie} />
                    <Route exact path="/auth">
                        <Auth isLoggedIn={isLoggedIn} userObj={userObj}  />
                    </Route>
            </Switch>
        </HashRouter>
    );
};

export default AppRouter;
