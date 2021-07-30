import './App.css';
import React, { useEffect, useState } from 'react';
import Navigation from './Navigation';
import AppRouter from './Router';
import moment from 'moment';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
import { authService } from 'fbase';
import Auth from 'routes/Auth';
import { PinDropRounded } from '@material-ui/icons';




//movieList 내에 있던 영화 불러오는 기능을 App.js에 넣고 그걸 AppRouter에 props로 전달해주기.

const styles = (theme) => ({
    paper: {
        marginTop: 15,
        marginLeft: 24,
        marginRight: 24,
    },
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            movies: [],
            init: false,
            isLoggedIn: false,
            userObj: null,
        };
    }

    signInState = () => { // login 상태 확인
        authService.onAuthStateChanged((user) => {
            if(user) {
                //this.isLoggedIn = true;
                this.setState({isLoggedIn : true, userObj: user});
                // this.userObj = user;
                // console.log(this.isLoggedIn);
                console.log('userObj_App',this.state.userObj.email); 
            } else{
               // this.isLoggedIn= false;
               // this.setState.isLoggedIn = false;
               this.setState({isLoggedIn: false});
                console.log(this.isLoggedIn);
            }
            this.init = true;
            // this.movies = [];
        });
    }
    
    getMovies = async () => {
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
        this.setState({ movies: dailyBoxOfficeList, isLoading: false });
    };
    componentDidMount() {
        this.getMovies();
        this.signInState();
    }

    render() {
        const { isLoggedIn, movies, userObj } = this.state;
        console.log(isLoggedIn);
        console.log('usrObj', userObj);
        const { classes } = this.props;
        
        return (
                <>
                {isLoggedIn ? (
                    <>
                    <Navigation />
                    <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} movies={movies} />
                    
                </>
                ) : (<>
                    <Auth />
                    <p>LogIn이 필요합니다.</p>
                    </>
                )}
            </>
        );
    }
}
export default withStyles(styles)(App);
