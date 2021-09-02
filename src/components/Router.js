import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'routes/Home';
import MovieList from 'routes/MovieList';
import ViewMovie from 'routes/ViewMovie';
import queryString from 'query-string';
import Auth from 'routes/login/Auth';
import Search from 'routes/Search';
import TmdbList from 'routes/TmdbList';
import ViewTMDB from 'routes/ViewTMDB';
import Navigation from './Navigation';
import Profile from 'routes/login/Profile';
import Filmography from 'routes/Filmography';

const AppRouter = ({
    refreshUser,
    movies,
    userObj,
    isLoggedIn,
    tmdbHome,
    upcomming,
    top3Movies,
}) => {
    // 파라미터 {}포함시 userObj 확인가능, movies 실종
    //url속 쿼리스트링에 movieNm을 가져와 ViewMovie컴포넌트에 싣고 렌더링.
    const viewMovie = (e) => {
        const { search } = e.location;
        const queryObj = queryString.parse(search);
        return <ViewMovie movieNm={queryObj.movieNm} userObj={userObj} />;
    };

    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj} />}
            <Switch>
                {isLoggedIn ? (
                    <div>
                        <Route exact path="/">
                            <Home
                                movies={top3Movies}
                                isLoggedIn={isLoggedIn}
                                userObj={userObj}
                                tmdbHome={tmdbHome.slice(0, 3)}
                            />
                        </Route>
                        <Route exact path="/movieList">
                            <MovieList movies={movies} isLoggedIn={isLoggedIn} userObj={userObj} />
                        </Route>
                        <Route path="/viewMovie" component={viewMovie} />
                        <Route exact path="/auth">
                            <Auth isLoggedIn={isLoggedIn} userObj={userObj} />
                        </Route>
                        <Route path="/Search">
                            <Search />
                        </Route>
                        <Route path="/tmdbList">
                            <TmdbList tmdbHome={tmdbHome} upcomming={upcomming} />
                        </Route>
                        <Route
                            exact
                            path="/viewTMDB/:id"
                            render={({ match }) => <ViewTMDB key={match.params.id} match={match} userObj={userObj} />}
                        ></Route>
                        <Route exact path="/Filmography/:id" component={Filmography}></Route>
                        <Route exact path="/profile">
                            <Profile userObj={userObj} refreshUser={refreshUser} />
                        </Route>
                    </div>
                ) : (
                    <>
                        <Navigation />
                        <Route exact path="/">
                            <Auth />
                        </Route>
                    </>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;
