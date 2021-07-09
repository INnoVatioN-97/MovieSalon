import './App.css';
import React from 'react';
import Navigation from './Navigation';
import AppRouter from './Router';
import moment from 'moment';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';

//movieList 내에 있던 영화 불러오는 기능을 App.js에 넣고 그걸 AppRouter에 props로 전달해주기.

const styles = (theme) => ({
    // table: {
    // justifyContent: 'center',
    // // maxWidth: 960,
    // minWidth: 480,
    // marginLeft: 15,
    // marginRight: 15,
    // },
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
        };
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
    }

    render() {
        const { isLoading, movies } = this.state;
        const { classes } = this.props;
        return (
            <>
                {isLoading ? (
                    'initializing...'
                ) : (
                    <>
                        <Navigation />
                        <AppRouter movies={movies} />
                    </>
                )}
            </>
        );
    }
}

export default withStyles(styles)(App);
