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
import Footer from './Footer';
import Responsive from './Responsive';

const AppRouter = ({ refreshUser, movies, userObj, isLoggedIn, tmdbHome, upcomming, top3Movies, hotMovie }) => {
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
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Route exact path="/">
                            <Home
                                movies={top3Movies}
                                isLoggedIn={isLoggedIn}
                                userObj={userObj}
                                tmdbHome={tmdbHome.slice(0, 3)}
                                hotMovie={hotMovie}
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
                        <Route exact path="/Responsive">
                            <Responsive/>
                        </Route>
                        <footer>
                            <Footer />
                        </footer>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Navigation />
                        <Route exact path="/">
                            <Auth />
                        </Route>
                        <footer>
                            <Footer />
                        </footer>
                    </div>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter;
