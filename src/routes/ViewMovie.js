import React from 'react';
import axios from 'axios';
import DetailMovie from 'components/DetailMovie';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import { TableRow } from '@material-ui/core';

//const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {

class ViewMovie extends React.Component {
    // const { params } = this.props.match;
    state = { isLoading: true, movies: [], value: '' };

    getSearchMovie = async () => {
        const ID_KEY = process.env.REACT_APP_NAVER_CLIENT_ID;
        const SECRET_KEY = process.env.REACT_APP_NAVER_CLIENT_SECRET_KEY;
        const search = this.props.movieNm;
        try {
            // console.log(`search: ${search}, ID_KEY: ${ID_KEY}, SECRET_KEY: ${SECRET_KEY}`);
            if (search === '') {
                this.setState({ movies: [], isLoading: false });
            } else {
                const {
                    data: { items },
                } = await axios.get('/v1/search/movie.json', {
                    params: { query: search, display: 1 },
                    headers: { 'X-Naver-Client-Id': ID_KEY, 'X-Naver-Client-Secret': SECRET_KEY },
                });
                //주소를 통해 가져와 진 items 배열을 movies라는 state에 저장.
                this.setState({ movies: items, isLoading: false });
            }
        } catch (error) {
            console.log(error);
        }
    };
    componentDidMount() {
        //render() 함수가 실행되기 전 미리 api를 불러 영화 정보를 가져온다.
        this.getSearchMovie();
    }
    handleChange = (e) => {
        this.setState({ value: e.target.value });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.getSearchMovie();
    };

    render() {
        // state에 저장된 내용들 중 아까 26번 줄에서 저장한 movies, isLoading을 가져와 const 변수에 저장.
        const { movies, isLoading } = this.state;

        return (
            <Table className="container">
                {isLoading ? (
                    <TableHead className="loader">
                        <TableRow className="loader__text">Loading..</TableRow>{' '}
                    </TableHead>
                ) : (
                    <TableBody>
                        {movies.map((movie) => (
                            <DetailMovie
                                key={movie.link}
                                id={movie.link}
                                year={movie.pubDate}
                                title={movie.title}
                                poster={movie.image}
                                rating={movie.userRating}
                                director={movie.director}
                                actor={movie.actor}
                            />
                        ))}
                    </TableBody>
                )}
            </Table>
        );
    }
}

export default ViewMovie;
