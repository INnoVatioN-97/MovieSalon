import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
    paper: {
        marginTop: 15,
        marginLeft: 24,
        marginRight: 24,
    },
});

class AllMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            movies: [],
            keyword: '',
            tmdbs: [],
            count: 1,
        };
        this.handleChange = this.handleChange.bind(this); // 바인딩
        this.onClickHander = this.onClickHander.bind(this); // 바인딩
    }

    handleChange = (e) => {
        this.setState({keyword: e.target.value});  
    }
    onClickHander = () => {
        this.setState({count: this.state.count+1});
        console.log('count', this.state.count);
    }
    /*
    getAllMovies = async () => {
        const API_KEYS = process.env.REACT_APP_KOBIS_API_KEY;
        const {
            data: {
                movieListResult: { movieList },
            },
        } = await axios.get(`http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${API_KEYS}&curpage=1`);
        console.log('All MovieList', movieList);
        this.setState({ movies: movieList, isLoading: false });
    };
    */
    getTmdbMoives = async () => { // Tmdb API 이용
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const COUNT = this.state.count;
        const {
            data: {
                results,
            },
        } = await axios.get(`
        https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=ko&page=${COUNT}&region=KR`);
        console.log('tmdb', results);
        this.setState({tmdbs:results, isLoading: false});
    };

    componentDidMount() {
       // this.getAllMovies();
        this.getTmdbMoives();
    }
    
    render() {
        const { isLoading, tmdbs } = this.state;
        let url = '/viewMovie?movieNm='; 
        return (
            <>
            <input type="text" name="keyword" value={this.state.keyword} onChange={this.handleChange} placeholder="검색" />
            <button onClick={this.onClickHander} >다음페이지</button>   
                {isLoading ? (
                    <TableHead>'영화 목록을 불러오는 중.'</TableHead>
                ) : (  
                    tmdbs.map((m) => (
                        <>
                         {m.original_title.indexOf(this.state.keyword) > -1 ?
                        <TableRow>
                        <TableCell>
                        <Link to={url + m.original_title}>
                        {m.original_title}({m.title})
                        </Link>
                        </TableCell>
                        <TableCell>
                        {m.release_date}
                        </TableCell>
                        <TableCell>
                        {m.vote_average}점
                        </TableCell>
                        </TableRow>
                        : <p></p> }
                        </>
                    ))            
                )}
            </>
        );
    }
}

export default AllMovies;
