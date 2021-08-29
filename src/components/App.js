import '../css/App.css';
import React, { useEffect, useState } from 'react';
import AppRouter from './Router';
import { authService } from 'fbase';
import DefaultProfileImage from 'images/DefaultProfileImage.png';
import { getKobisMovies } from './APIs/KobisAPI';
import { getTmdbBoxOffice, getUpcommingMovies } from './APIs/TmdbAPI';

//movieList 내에 있던 영화 불러오는 기능을 App.js에 넣고 그걸 AppRouter에 props로 전달해주기.
const App = () => {
    const [movies, setMovies] = useState([]);
    const [init, setInit] = useState(true);
    const [userObj, setUserObj] = useState([]);
    const [tmdbHome, setTmdbHome] = useState([]);
    const [upcomming, setUpcomming] = useState([]);

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
        getKobisMovies().then((res) => {
            // console.log('res:', res);
            setMovies(res);
        });

        getTmdbBoxOffice().then((res) => {
            // console.log('res_tmdb', res);
            setTmdbHome(res);
        });

        getUpcommingMovies().then((res) => {
            setUpcomming(res);
        });
        setInit(false);
    }, [userObj]);

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

    // console.log(isLoggedIn);
    // console.log('userObj', userObj);

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
                        tmdbHome={tmdbHome}
                        upcomming={upcomming}
                    />
                </>
            )}
        </>
    );
    // }
};
export default App;
