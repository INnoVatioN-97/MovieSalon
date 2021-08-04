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
            genre: '',
            tmdbs: [],
        };
        this.handleChange = this.handleChange.bind(this); // 바인딩
    }

    handleChange = (e) => {
        this.setState({genre: e.target.value});  
    }

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

    getTmdbMoives = async () => { // Tmdb API 이용
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const {
            data: {
                results,
            },
        } = await axios.get(`
        https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&language=ko&page=1&region=KR`);
        console.log('tmdb', results);
        this.setState({tmdbs:results, isLoading: false});
    };

    componentDidMount() {
        this.getAllMovies();
        this.getTmdbMoives();
    }
    
    render() {
        const { movies, isLoading } = this.state;

        return (
            <>
             <input type="text" name="genre" value={this.state.genre} onChange={this.handleChange} placeholder="장르" />
             <button name="genBtn_drama" onClick={() => this.setState({ genre: '드라마' })}>드라마 </button>
             <button name="genBtn_horro" onClick={() => this.setState({ genre: '공포' })}>공포 </button>
             <button name="genBtn_mistary" onClick={() => this.setState({ genre: '미스터리' })}>미스터리 </button>
                {isLoading ? (
                    <TableHead>'영화 목록을 불러오는 중.'</TableHead>
                ) : (
                    movies.map((m) => (
                        
                        <>
                        {m.repGenreNm.indexOf(this.state.genre) > -1 ? <TableRow>
                        <TableCell>
                        {m.movieNm}({m.movieNmEn})
                        </TableCell>
                        <TableCell>
                        {m.repGenreNm}
                        </TableCell>
                        </TableRow> : <p></p>}
                        </>
                    ))
                              
                )}
               
            </>
        );
    }
}

export default AllMovies;
