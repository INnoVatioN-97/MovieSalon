import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
import { TableHead, TableBody, TableCell, Table, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';

//const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {

const styles = (theme) => ({
    table: {
        marginLeft: 20,
        marginRight: 20,
    },
    image: {
        minWidth: 480,
    },
});

class ViewMovie extends React.Component {
    // const { params } = this.props.match;
    state = { isLoading: true, movies: [], value: '' };

    //네이버 검색 API에서 영화 검색 정보를 가져오는 비동기 함수
    getSearchMovie = async () => {
        const ID_KEY = process.env.REACT_APP_NAVER_CLIENT_ID;
        const SECRET_KEY = process.env.REACT_APP_NAVER_CLIENT_SECRET_KEY;
        const search = this.props.movieNm;
        try {
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
            // this.getMovieImage();
        } catch (error) {
            console.log(error);
        }
    };

    // 가져온 movies속 link에서 영화코드만 따로 뽑아 고화질 영화 포스터를 추출하는 함수
    getMovieImage = (movie) => {
        //하드코딩이지만 일단 영화정보에서 네이버 영화검색 결과창 주소를 가져와 거기서 영화코드를 추출.
        const code = movie.link.split('?code=');
        // console.log('[가져온 영화 code: ', code);
    };

    componentDidMount() {
        //render() 함수가 실행되기 전 미리 api를 불러 영화 정보를 가져온다.
        this.getSearchMovie();
        // this.getMovieImage();
    }

    render() {
        // state에 저장된 내용들 중 아까 26번 줄에서 저장한 movies, isLoading을 가져와 const 변수에 저장.
        const { movies, isLoading } = this.state;
        console.log(movies);
        const { classes } = this.props;
        // const { link, pubDate, title, image, userRating, director, actor } = movies;
        const printActors = (actors) => {
            // console.log(actors);
            let text = '';
            for (let i = 0; i < actors.length - 1; i++) {
                if (actors[i] === '') continue;
                if (i === actors.length - 2) text += actors[i];
                else text += actors[i] + ',';
            }
            return text;
        };

        const printMovieInfo = (movie) => {
            const movies = movie[0];
            const actors = movies.actor.split('|');

            console.log('movie: ', movies);
            this.getMovieImage(movies);
            return (
                <TableBody>
                    <TableRow>
                        <TableCell colSpan="4">
                            <a href={movies.link} rel="norefferer">
                                <img className={classes.image} src={movies.image} alt={movies.title} />
                            </a>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan="4">{movies.title.replace(/<b>/gi, '').replace(/<\/b>/gi, '')}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan="2">개봉: {movies.pubDate}</TableCell>
                        <TableCell>평점: {movies.userRating}</TableCell>
                        <TableCell>감독: {movies.director.replace('|', '')}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>출연진</TableCell>
                        <TableCell colSpan="3">{printActors(actors)}</TableCell>
                    </TableRow>
                </TableBody>
            );
        };

        return (
            <Table className={classes.table}>
                {isLoading ? (
                    <TableHead className="loader">
                        <TableRow className="loader__text">Loading..</TableRow>
                    </TableHead>
                ) : (
                    <>
                        <TableHead>
                            <TableRow>포스터를 클릭하시면 해당 영화에 대한 네이버 검색 결과로 리다이렉트 됩니다.</TableRow>
                        </TableHead>
                        {printMovieInfo(movies)}
                    </>
                )}
            </Table>
        );
    }
}

ViewMovie.propTypes = {
    id: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    actor: PropTypes.string.isRequired,
};
export default withStyles(styles)(ViewMovie);
