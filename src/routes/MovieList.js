import React from 'react';
import axios from 'axios';
import Movie from 'components/Movie';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';

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

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            movies: [],
            searchKeyword: '',
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
            <Paper className={classes.paper}>
                <Table className={classes.table}>
                    {isLoading ? (
                        <TableHead>'영화 목록을 불러오는 중.'</TableHead>
                    ) : (
                        movies.map((movie) => {
                            //   console.log(movie);
                            return (
                                <TableBody>
                                    <Movie
                                        key={movie.movieCd}
                                        movieNm={movie.movieNm}
                                        rank={movie.rank}
                                        rankInten={movie.rankInten}
                                        openDt={movie.openDt}
                                        audiCnt={movie.audiCnt}
                                        audiAcc={movie.audiAcc}
                                        audiInten={movie.audiInten}
                                    />
                                </TableBody>
                            );
                        })
                    )}
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(MovieList);
