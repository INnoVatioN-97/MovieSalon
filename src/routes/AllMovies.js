import React from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

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
        };
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
    componentDidMount() {
        this.getAllMovies();
    }
    render() {
        const { movies, isLoading } = this.state;
        const { classes } = this.props;

        return (
            <>
                {isLoading ? (
                    <TableHead>'영화 목록을 불러오는 중.'</TableHead>
                ) : (
                    movies.map((m) => (
                        <TableBody>
                            제목: {m.movieNm}({m.movieNmEn}){m.repGenreNm}
                        </TableBody>
                    ))
                )}
            </>
        );
    }
}

export default AllMovies;
