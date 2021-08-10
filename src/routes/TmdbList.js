import React from 'react';
import axios from 'axios';

class TmdbList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            movies: [],
            tmdbs: [],
            count: 1,
            posters: [],
        };
        
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

    componentDidMount() {
        this.getTrendingMovies();
    }
    
    render() {
        const { tmdbs } = this.state;
        return (
        tmdbs.map((m) => (
            <img src={`https://image.tmdb.org/t/p/w200/${m.poster_path}`} alt='img' />
        ))
        );
    }
}
export default TmdbList;