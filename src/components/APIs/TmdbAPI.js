import axios from 'axios';

export const getTmdbBoxOffice = async () => { // TMDB_박스오피스 => Home.js
    try {
    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const {
        data: { results },
    } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}&language=ko`);
    return results;
    } catch (error) {
        console.log('error!', error);
    }
};

export const getUpcommingMovies = async () => { // 개봉예정작
    try {
    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const {
        data: { results },
    } = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=ko&page=1&region=kr`);
        return results;
    } catch (error) {
        console.log('error!', error);
    }
};