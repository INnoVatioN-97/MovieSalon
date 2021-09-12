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

export const getHotWeekMovies = async () => { // 1주일 기준 BoxOffice 상위 rank => Home.js
    try{
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const {
            data: { results },
        } = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_API_KEY}&language=ko&page=1`);
    return results[0];
    } catch (error) {
        console.log('error!_getHotWeekMovies', error);
    }
};

export const getUpcommingMovies = async () => { // 개봉예정작
    try {
    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const {
        data: { results },
    } = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=ko&page=1&region=US`);
        return results;
    } catch (error) {
        console.log('error!', error);
    }
};