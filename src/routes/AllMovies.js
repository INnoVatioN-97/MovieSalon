import React from 'react';
import axios from 'axios';


class AllMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            movies: [],
        };
    }

    getAllMovies = async () => {
        const API_KEYS = process.env.REACT_APP_KOBIS_API_KEY;
        const {
            data: {
                movieListResult: { movieList },
            },
        } = await axios.get(
                `http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${API_KEYS}&curpage=1`
            );
            console.log('All MovieList',movieList);
            this.setState({movies: movieList, isLoading: false});    
    };
    componentDidMount() {
        this.getAllMovies();
    }
    render() {
        return (
            <p>AllMovies Testing...</p>
        );
    }
}

export default AllMovies;