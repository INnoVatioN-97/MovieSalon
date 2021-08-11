import React, { useState } from 'react';

const ViewTMDB = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
};
export default ViewTMDB;
