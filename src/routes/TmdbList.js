import React from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { TableCell, TableRow } from '@material-ui/core';

class TmdbList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            tmdbs: [],
            posters: [],
            titles: '',
            movies: '',
            open: false,
            date:'',
            movieId: '436969',
            castMember: [],

        };
        this.onClickHandle = this.onClickHandle.bind(this);
        this.onCloseHandle = this.onCloseHandle.bind(this);
    }

     getTrendingMovies = async () => { // Tmdb API 이용
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const COUNT = this.state.count;
        const {
            data: {
                results,
            },
        } = await axios.get(`
        https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}&language=ko`);
        console.log('trending_Movies', results);
        console.log('COUNT', COUNT);
        this.setState({tmdbs:results, isLoading: false});
    };
    
    
    getMovieCasts = async () => {
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const M_ID = this.state.movieId;
        const {
            data: {
                cast,
            },
        } = await axios.get(`https://api.themoviedb.org/3/movie/${M_ID}/credits?api_key=${TMDB_API_KEY}`);
        console.log('movie_Id', M_ID);
        console.log('cast', cast);
        this.setState({castMember: cast, isLoading: false});
    }

    onClickHandle = (e) => {
        // Click발생한 영화포스터의 제목, 영화정보(,로 split), 다이얼로그 상태변경
        this.setState({titles: e.target.title, movies: e.target.id.split(','), open: true});
        console.log('titles', this.state.titles);
        console.log('movies_posterClick', this.state.movies); // 클릭된 포스터의 영화정보 가져옴
    }

    onCloseHandle = () => {
        this.setState({open: false})
    }

    componentDidMount() {
        this.getTrendingMovies();
        this.getMovieCasts();
    }
    
    render() {
        const { tmdbs } = this.state;
        let url = 'https://image.tmdb.org/t/p/w200';
        return (
        tmdbs.map((m) => (
            <>
            <img src={url + m.poster_path} alt='img' onClick={this.onClickHandle}
             id={[m.id,m.vote_average, m.release_date, m.poster_path, m.overview]}
             title={m.title}
              />
            <Dialog open={this.state.open} onClose={this.onCloseHandle} >
                <DialogTitle>{this.state.titles}</DialogTitle>
                <DialogContent>
                    <TableRow>
                        <TableCell><img src={url + this.state.movies[3]}/></TableCell>
                        <TableRow>
                        <TableCell>개봉일: {this.state.movies[2]}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>평점: {this.state.movies[1]}</TableCell>
                        </TableRow>
                        <TableRow>
                        <TableCell>줄거리: <label>{this.state.movies[4]}</label></TableCell>
                        </TableRow>
                    </TableRow>
                </DialogContent>
            </Dialog>
            </>
        ))
        );
    }
}
export default TmdbList;