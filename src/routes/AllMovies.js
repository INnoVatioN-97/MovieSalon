import React from 'react';
import axios from 'axios';
import TableHead from '@material-ui/core/TableHead';
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
            searchMovies: [],
        };
        this.handleChange = this.handleChange.bind(this); // 바인딩
    }

    handleChange = (e) => {
        this.setState({ keyword: e.target.value });
        this.getSearchMovies(e.target.value);
    };

    getSearchMovies = async (keywords) => {
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const {
            data: { results },
        } = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=ko&page=1&include_adult=false&query=${keywords}`)
        this.setState({searchMovies: results, isLoading: false});
    }

    componentDidMount() {
    }

    render() {
        const { isLoading, searchMovies } = this.state;
        let url = '/viewTmdb/';
        return (
            <>
                <input type="text" name="keyword" value={this.state.keyword}
                 onChange={this.handleChange} placeholder="검색" />
                {isLoading ? (
                    <h2>Search!!!</h2>
                ) : (
                    searchMovies.map((m) => (
                        <>
                            {m.original_title||m.title.indexOf(this.state.keyword) > -1 ? (
                                <TableRow>
                                    <TableCell>
                                        <Link to={url + m.id}>
                                            {m.original_title}({m.title})
                                        </Link>
                                    </TableCell>
                                    <TableCell>{m.release_date}</TableCell>
                                    <TableCell>{m.vote_average}점</TableCell>
                                </TableRow>
                            ) : (
                                <p></p>
                            )}
                        </>
                    ))
                )}
            </>
        );
    }
}

export default AllMovies;
