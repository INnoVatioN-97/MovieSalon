import '../css/App.css';
import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import AppRouter from './Router';
import moment from 'moment';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import { authService } from 'fbase';
import Auth from 'routes/login/Auth';
import DefaultProfileImage from 'images/DefaultProfileImage.png';

//movieList 내에 있던 영화 불러오는 기능을 App.js에 넣고 그걸 AppRouter에 props로 전달해주기.

const styles = makeStyles({
    paper: {
        marginTop: 15,
        marginLeft: 24,
        marginRight: 24,
    },
});

const App = () => {
    const [movies, setMovies] = useState([]);
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState([]);

    const classes = styles();

    useEffect(() => {
        // login 상태 확인
        authService.onAuthStateChanged((user) => {
            if (user) {
                setUserObj({
                    displayName: user.displayName ? user.displayName : user.email,
                    uid: user.uid,
                    photoURL: user.photoURL ? user.photoURL : DefaultProfileImage,
                    email: user.email,
                    updateProfile: (args) => user.updateProfile(args),
                });
                // console.log('userObj_App', userObj.email);
            } else {
                setUserObj(null);
            }
        });
    }, []);

    useEffect(() => {
        async function getMovies() {
            try {
                //어제 기준 박스오피스 상위 10위권 출력.
                const yesterday = moment().subtract(1, 'days').format('YYYYMMDD');
                // console.log(yesterday);
                const API_KEY = process.env.REACT_APP_KOBIS_API_KEY;
                const {
                    data: {
                        boxOfficeResult: { dailyBoxOfficeList },
                    },
                } = await axios.get(
                    `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${API_KEY}&targetDt=${yesterday}`
                );
                // console.log(dailyBoxOfficeList);
                // this.setState({ movies: dailyBoxOfficeList, isLoading: false });
                setMovies(dailyBoxOfficeList);
                setInit(true);
            } catch (error) {
                console.log('error!', error);
            }
        }
        getMovies();
    }, [userObj]);

    const refreshUser = () => {
        const user = authService.currentUser;
        console.log('currentUser from App.js', user);
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL,
            updateProfile: (args) => user.updateProfile(args),
        });
    };

    // console.log(isLoggedIn);
    // console.log('userObj', userObj);

    return (
        <>
            {init ? (
                <>
                    <AppRouter
                        refreshUser={refreshUser}
                        isLoggedIn={Boolean(userObj)}
                        userObj={userObj}
                        movies={movies}
                    />
                </>
            ) : (
                '초기화중...'
            )}
        </>
    );
    // }
};
export default App;
