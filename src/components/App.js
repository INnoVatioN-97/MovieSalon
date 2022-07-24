import '../assets/css/App.css';
import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { authService } from 'fbase';
import DefaultProfileImage from 'assets/images/DefaultProfileImage.png';
import { getKobisMovies } from './APIs/KobisAPI';
import {
  getTmdbBoxOffice,
  getUpcommingMovies,
  getHotWeekMovies,
  getTMDBSearchKRBoxOffice,
} from './APIs/TmdbAPI';

//movieList 내에 있던 영화 불러오는 기능을 App.js에 넣고 그걸 AppRouter에 props로 전달해주기.
const App = () => {
  const [movies, setMovies] = useState([]);
  const [kobis, setKobis] = useState([]);
  const [userObj, setUserObj] = useState([]);
  const [tmdbHome, setTmdbHome] = useState([]);
  const [upcomming, setUpcomming] = useState([]);
  const [hotMovie, setHotMovie] = useState([]);
  const [krHome, setKRHome] = useState([]);

  const [init, setInit] = useState(true);

  useEffect(() => {
    // login 상태 확인
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: Boolean(user.displayName)
            ? user.displayName
            : user.email,
          uid: user.uid,
          photoURL: Boolean(user.photoURL)
            ? user.photoURL
            : DefaultProfileImage,
          email: user.email,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
    });
  }, []);

  useEffect(() => {
    // search kr boxoffice
    const getMovieInfos = async (movies) => {
      let results = [];
      let krmovies = [];
      movies?.slice(0, 9).map((movie) =>
        getTMDBSearchKRBoxOffice(movie.movieNm).then((res) => {
          const results = res;
          krmovies.push(results);
          // console.log('tmdb_한국박스오피스검색', results);
          setKRHome(krmovies);
          setMovies(krmovies);
        })
      );
      return results;
    };

    getTmdbBoxOffice().then((res) => {
      setTmdbHome(res);
    });

    getUpcommingMovies().then((res) => {
      setUpcomming(res);
    });

    getHotWeekMovies().then((res) => {
      setHotMovie(res);
    });

    getKobisMovies().then((res) => {
      getMovieInfos(res).then((res) => {
        setInit(false);
      });
      setKobis(res);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    console.log('currentUser from App.js', user);
    if (Boolean(user)) {
      setUserObj({
        displayName: user.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
        email: user.email,
        updateProfile: (args) => user.updateProfile(args),
      });
    }
  };

  return (
    <>
      {init ? (
        '초기화중...'
      ) : (
        <>
          <AppRouter
            refreshUser={refreshUser}
            isLoggedIn={Boolean(userObj)}
            userObj={userObj}
            krHome={krHome}
            kobis={kobis}
            movies={movies}
            tmdbHome={tmdbHome}
            upcomming={upcomming}
            hotMovie={hotMovie}
          />
        </>
      )}
    </>
  );
  // }
};
export default App;
