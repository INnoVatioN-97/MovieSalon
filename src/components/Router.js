import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'routes/Pages/Home';
import MovieList from 'routes/Pages/MovieList';
import queryString from 'query-string';
import Auth from 'routes/login/Auth';
import Search from 'components/Search';
import TmdbList from 'routes/Pages/TmdbList';
import ViewTMDB from 'routes/Details/ViewTMDB';
import Navigation from './Navigation';
import Profile from 'routes/login/Profile';
import Filmography from 'routes/Details/Filmography';
import SliderCarousel from './SliderCarousel';
import About from 'routes/Pages/AboutUs/About';
import AboutDetail from 'routes/Pages/AboutUs/AboutDetail';

const AppRouter = ({
  refreshUser,
  movies,
  userObj,
  isLoggedIn,
  tmdbHome,
  upcomming,
  hotMovie,
  krHome,
  kobis,
}) => {
  // 파라미터 {}포함시 userObj 확인가능, movies 실종
  //url속 쿼리스트링에 movieNm을 가져와 ViewMovie컴포넌트에 싣고 렌더링.

  const aboutDetail = (e) => {
    const { search } = e.location;
    const queryObj = queryString.parse(search);
    // console.log('queryObj.name : ', queryObj.name);
    return <AboutDetail name={queryObj.name} />;
  };

  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <Switch>
        {isLoggedIn ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Route exact path='/'>
              <Home
                isLoggedIn={isLoggedIn}
                userObj={userObj}
                tmdbHome={tmdbHome.slice(0, 3)}
                hotMovie={hotMovie}
                krHome={krHome}
              />
            </Route>
            <Route exact path='/movieList'>
              <MovieList
                movies={movies}
                isLoggedIn={isLoggedIn}
                userObj={userObj}
                kobis={kobis}
              />
            </Route>
            <Route path='/AboutDetail' component={aboutDetail} />
            <Route exact path='/auth'>
              <Auth isLoggedIn={isLoggedIn} userObj={userObj} />
            </Route>
            <Route path='/Search'>
              <Search />
            </Route>
            <Route path='/tmdbList'>
              <TmdbList tmdbHome={tmdbHome} upcomming={upcomming} />
            </Route>
            <Route
              exact
              path='/viewTMDB/:id'
              render={({ match }) => (
                <ViewTMDB
                  key={match.params.id}
                  match={match}
                  userObj={userObj}
                />
              )}
            ></Route>
            <Route
              exact
              path='/Filmography/:id'
              component={Filmography}
            ></Route>
            <Route exact path='/profile'>
              <Profile userObj={userObj} refreshUser={refreshUser} />
            </Route>
            <Route exact path='/SliderCarousel'>
              <SliderCarousel />
            </Route>
            <Route exact path='/aboutUs'>
              <About />
            </Route>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Navigation />
            <Route exact path='/'>
              <Auth />
            </Route>
            <Route exact path='/aboutUs'>
              <About />
            </Route>
          </div>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
