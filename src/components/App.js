import '../css/App.css';
import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { authService } from 'fbase';
import DefaultProfileImage from 'images/DefaultProfileImage.png';
import { getKobisMovies } from './APIs/KobisAPI';
import { getTmdbBoxOffice, getUpcommingMovies, getHotWeekMovies } from './APIs/TmdbAPI';
import { getNaverSearchResult } from './APIs/NaverSearchAPI';

//movieList 내에 있던 영화 불러오는 기능을 App.js에 넣고 그걸 AppRouter에 props로 전달해주기.
const App = () => {
    const [movies, setMovies] = useState([]);
    const [top3Movies, setTop3Movies] = useState([]);
    const [userObj, setUserObj] = useState([]);
    const [tmdbHome, setTmdbHome] = useState([]);
    const [upcomming, setUpcomming] = useState([]);
    const [hotMovie, setHotMovie] = useState([]);

    const [init, setInit] = useState(true);

    useEffect(() => {
        // login 상태 확인
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj({
                    displayName: Boolean(user.displayName) ? user.displayName : user.email,
                    uid: user.uid,
                    photoURL: Boolean(user.photoURL) ? user.photoURL : DefaultProfileImage,
                    email: user.email,
                    updateProfile: (args) => user.updateProfile(args),
                });
            } else {
                setUserObj(null);
            }
        });
    }, []);

    useEffect(() => {
        const getMovieInfos = async (movies) => {
            let tmpCodes = [];
            let cnt = 0;
            movies.slice(0, 4).map((movie) =>
                getNaverSearchResult(movie.movieNm).then((res) => {
                    const { image, title } = res;
                    tmpCodes[cnt++] = {
                        //tmpCode안에 kobis 영화[제목, 이미지url]만 삽입
                        title: title.replace(/<b>/gi, '').replace(/<\/b>/gi, ''),
                        image: image,
                        rank: movie.rank,
                    };
                })
            );
            return tmpCodes;
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
                setTop3Movies(res);
                setInit(false);
            });
            setMovies(res);
        });
    }, []);

    // useEffect(() => {
    //     const getMovieInfos = async () => {
    //         let tmpCodes = [];
    //         movies.slice(0, 3).map((movie) =>
    //             getNaverSearchResult(movie.movieNm).then((res) => {
    //                 const { image, title } = res;
    //                 tmpCodes.push({
    //                     //tmpCode안에 kobis 영화[제목, 이미지url]만 삽입
    //                     title: title.replace(/<b>/gi, '').replace(/<\/b>/gi, ''),
    //                     image: image,
    //                     rank: movie.rank,
    //                 });
    //             })
    //         );
    //         return tmpCodes;
    //     };
    //     getMovieInfos().then((res) => {
    //         setTop3Movies(res);
    //         setInit(false);
    //     });
    // }, [movies]);

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
                        movies={movies}
                        top3Movies={top3Movies}
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
