import React from 'react';
import axios from 'axios';
import DetailMovie from 'components/DetailMovie';

//const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {

class ViewMovie extends React.Component {
    // const { params } = this.props.match;
    state = { isLoading: true, movies: [], value: '' };

    getSearchMovie = async () => {
        const ID_KEY = process.env.REACT_APP_NAVER_CLIENT_ID;
        const SECRET_KEY = process.env.REACT_APP_NAVER_CLIENT_SECRET_KEY;
        const search = this.props.movieNm;
        try {
            console.log(`search: ${search}, ID_KEY: ${ID_KEY}, SECRET_KEY: ${SECRET_KEY}`);
            if (search === '') {
                this.setState({ movies: [], isLoading: false });
            } else {
                const {
                    data: { items },
                } = await axios.get('/v1/search/movie.json', {
                    params: { query: search, display: 20 },
                    headers: { 'X-Naver-Client-Id': ID_KEY, 'X-Naver-Client-Secret': SECRET_KEY },
                });
                this.setState({ movies: items, isLoading: false });
            }
        } catch (error) {
            console.log(error);
        }
    };
    componentDidMount() {
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
        const { movies, isLoading } = this.state;

        return (
            // <div>
            //     <div>ViewMovie 페이지.</div>
            //     <div>전달받은 영화 이름: {this.props.movieNm}</div>
            // </div>
            <section className="container">
                {' '}
                {isLoading ? (
                    <div className="loader">
                        {' '}
                        <span className="loader__text">Loading..</span>{' '}
                    </div>
                ) : (
                    <form onSubmit={this.handleSubmit}>
                        {' '}
                        <div>
                            {' '}
                            <div className="input_div">
                                {' '}
                                <h1>영화 검색</h1>{' '}
                                <input
                                    className="input_search"
                                    type="text"
                                    value={this.state.value}
                                    onChange={this.handleChange}
                                    placeholder="영화를 검색해 보세요."
                                />{' '}
                            </div>{' '}
                            <div className="movies">
                                {' '}
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
                                ))}{' '}
                            </div>{' '}
                        </div>{' '}
                    </form>
                )}{' '}
            </section>
        );
    }
}

export default ViewMovie;
