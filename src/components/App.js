import '../css/App.css';
import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import AppRouter from './Router';
import moment from 'moment';
import axios from 'axios';
import { makeStyles } from '@material-ui/styles';
import { authService } from 'fbase';
import Auth from 'routes/Auth';
import { PinDropRounded } from '@material-ui/icons';

//movieList 내에 있던 영화 불러오는 기능을 App.js에 넣고 그걸 AppRouter에 props로 전달해주기.

const styles = makeStyles({
    paper: {
        marginTop: 15,
        marginLeft: 24,
        marginRight: 24,
    },
});

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userObj, setUserObj] = useState([]);

    const classes = styles();

    useEffect(() => {
        async function signInState() {
            // login 상태 확인
            authService.onAuthStateChanged((user) => {
                if (user) {
                    setIsLoggedIn(true);
                    setUserObj(user);

                    // this.userObj = user;
                    // console.log(this.isLoggedIn);
                    console.log('userObj_App', userObj.email);
                } else {
                    setIsLoggedIn(false);
                    console.log(isLoggedIn);
                }
                // this.movies = [];
            });
        }
        signInState();
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
                setIsLoading(false);
                setInit(true);
            } catch (error) {
                console.log('error!', error);
            }
        }
        getMovies();
    }, [isLoggedIn]);

    // render() {
    // const { isLoggedIn, movies, userObj } = this.state;
    console.log(isLoggedIn);
    console.log('usrObj', userObj);
    // const { classes } = this.props;

    return (
        <>
            {isLoggedIn && userObj ? (
                <>
                    <Navigation userObj={userObj} />
                    <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} movies={movies} />
                </>
            ) : (
                <>
                    <Auth />
                    <p>LogIn이 필요합니다.</p>
                </>
            )}
        </>
    );
    // }
};
export default App;
