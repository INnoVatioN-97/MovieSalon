import React from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

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

    onClickHandle = (e) => {
        this.setState({titles: e.target.title, movies: e.target.id, open: true});
        console.log('titles', this.state.titles);
        console.log('poster_path', this.state.movies);
    }

    onCloseHandle = () => {
        this.setState({open: false})
    }

    componentDidMount() {
        this.getTrendingMovies();
    }
    
    render() {
        const { tmdbs } = this.state;
        let url = 'https://image.tmdb.org/t/p/w200';
        return (
        tmdbs.map((m) => (
            <>
            <img src={url + m.poster_path} alt='img' onClick={this.onClickHandle}
             id={[m.id, m.release_date, m.poster_path]}
             title={m.title}
              />
            <Dialog open={this.state.open} onClose={this.onCloseHandle}>
                <DialogTitle>{this.state.titles}</DialogTitle>
                <DialogContent>{/*this.state.movies*/}<br />
                <img src={url + this.state.movies.substring(18,50)} /></DialogContent>
            </Dialog>
            </>
        ))
        );
    }
}
export default TmdbList;