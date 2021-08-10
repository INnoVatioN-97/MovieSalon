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
            tmdbs: [],
            count: 1,
        };
        this.handleChange = this.handleChange.bind(this); // 바인딩
        this.onNextClick = this.onNextClick.bind(this); // 바인딩
        this.onBeforeClick = this.onBeforeClick.bind(this);
    }

    handleChange = (e) => {
        this.setState({ keyword: e.target.value });
    };

    onNextClick = () => {
        this.setState({ count: this.state.count + 1 });
        this.getTmdbMoives();
    };
    onBeforeClick = () => {
        if (this.state.count > 1) {
            this.setState({ count: this.state.count - 1 });
            this.getTmdbMoives();
        } else {
            alert('처음페이지입니다.');
        }
    };

    getTmdbMoives = async () => {
        // Tmdb API 이용
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const COUNT = this.state.count;
        const {
            data: { results },
        } = await axios.get(`
        https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=ko&page=${COUNT + 1}&region=KR`);
        console.log('tmdb', results);
        console.log('COUNT', COUNT);
        this.setState({ tmdbs: results, isLoading: false });
    };

    componentDidMount() {
        this.getTmdbMoives();
    }

    render() {
        const { isLoading, tmdbs, count } = this.state;
        let url = '/viewMovie?movieNm=';
        return (
            <>
                <input type="text" name="keyword" value={this.state.keyword} onChange={this.handleChange} placeholder="검색" />
                <button onClick={this.onBeforeClick}>이전페이지</button>
                <button onClick={this.onNextClick}>다음페이지</button>
                <p>현재 페이지:{this.state.count}</p>
                {isLoading ? (
                    <TableHead>'영화 목록을 불러오는 중.'</TableHead>
                ) : (
                    tmdbs.map((m) => (
                        <>
                            {m.original_title.indexOf(this.state.keyword) > -1 ? (
                                <TableRow>
                                    <TableCell>
                                        <Link to={url + m.original_title}>
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
