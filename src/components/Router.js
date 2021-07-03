import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from 'routes/Home';
import MovieList from 'routes/MovieList';
import ViewMovie from 'routes/ViewMovie';
import queryStirng from 'query-string';

const AppRouter = () => {
    //url속 쿼리스트링에 movieNm을 가져와 ViewMovie컴포넌트에 싣고 렌더링.
    const viewMovie = (e) => {
        // return <ViewMovie movieNm={e.}
        const { search } = e.location;
        const queryObj = queryStirng.parse(search);
        console.log(queryObj.movieNm);
        return <ViewMovie movieNm={queryObj.movieNm} />;
    };
    return (
        <HashRouter>
            <Switch>
                <div>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/movieList">
                        <MovieList />
                    </Route>
                    <Route path="/viewMovie" component={viewMovie} />
                </div>
            </Switch>
        </HashRouter>
    );
};

export default AppRouter;
