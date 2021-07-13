import React from 'react';
import axios from 'axios';
import Movie from 'components/Movie';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
/*
2021.07.14 List 기능 추가 ver1.0 @TylerKang
*/
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
            // movies: props.movies.movies,
            isLoading: true,
            keyword: ''
        };
        // console.log('movies from MovieList:', this.state.movies);
        this.handleChange = this.handleChange.bind(this); // 바인딩
    }
    handleChange = (e) => {
        this.setState({keyword: e.target.value});  
    }

    getMovies = async () => {
        //영화 배열을 다 가져오기까지 시간이 좀 걸리므로 async 사용해서 스테이트 설정.
        await this.setState({
            movies: this.props.movies,
            isLoading: false,
        });
    };
    componentDidMount() {
        this.getMovies();
    }
    render() {
        const { movies, isLoading } = this.state;
        const { classes } = this.props;

        return (
            <Paper className={classes.paper}>
                <Table className={classes.table}>
                    {isLoading ? (
                        <TableHead>'영화 목록을 불러오는 중.'</TableHead>
                    ) : (
                        <TableBody>
                            <InputBase type="text" name="keyword" value={this.state.keyword} onChange={this.handleChange} placeholder="검색" /> 
                            {movies.movies.map((movie) => {
                                //   console.log(movie);
                                return (
                                    // 검색창에 입력된 문자의 키워드를 movieName과 매치하여 리스트 출력
                                    movie.movieNm.indexOf(this.state.keyword) > -1 ?
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
                                    : <p></p>
                                ); 
                            })}
                        </TableBody>
                    )}
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(MovieList);
