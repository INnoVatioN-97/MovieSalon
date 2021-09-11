import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Grid, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@material-ui/core';
// firebase login import 추가
import 'firebase/firestore';
import 'firebase/auth';
import '../css/Home.css';

//https://material-ui.com/system/flexbox/#flex-wrap 에서
// Box 좀 보고 Home 화면에서 순위 세개 이쁘게 띄워야 함.

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
        // background: '#485460',
        height: '100%',
    },

    pageTitle: {
        textAlign: 'center',
        fontSize: '4.2rem',
        marginTop: '2%',
        color: '#fff',
        // marginBottom: 15,
    },
    box: {
        display: 'grid',
        backgroundColor: '#20232a',
        color: '#10FF00',
        borderRadius: '3rem',
        // sx: { maxWidth: 300 },
    },

    topMovieContainer: {
        margin: '2% 15% 2% 15%',
        display: 'flex',
        flexDirection: 'row',
        // padding: '5% 0 5% 0',
        justifyContent: 'center',
        height: '80%',
    },

    topMovieContainer__container: {
        marginRight: '3%',
        marginLeft: ' 3%',
        width: '100%',
        height: '100%',
    },
    posters: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // width: '50%',
    },
    posters__poster: {
        color: 'white',
        margin: '4% 4% 10% 4%',
        '&:hover': {
            transform: 'scale(1.4)',
        },
    },
    posters2: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        // width: '50%',
    },
    posters2_Mobile: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // width: '50%',
    },
    posters2__poster: {
        color: 'white',
        margin: '4% 4% 5% 4%',
        '&:hover': {
            transform: 'scale(1.4)',
        },
    },
    posters_border: {
        borderRadius: '4px 4px 4px 4px',
    },
    movieTitle: {
        color: 'white',
        fontSize: '1.3rem',
        textDecoration: 'none',
    },
    hottest: {
        color: 'white',
    },
    backdrop: {
        width: '40%',
        borderRadius: '15px',
        boxShadow: '5px 5px 15px 5px #000000',
    },
});

const Home = ({ movies, isLoggedIn, userObj, tmdbHome, hotMovie }) => {
    const classes = useStyles();
    const tmdbPosterURL = 'https://image.tmdb.org/t/p/w500';
    const tmdbViewURL = '/viewTmdb/';
    const kobisViewURL = '/viewMovie?movieNm=';
    const isMobile = useMediaQuery('(max-width: 400px)');

    const printTop3Movies_KOBIS = () => {
        console.log('movies:', movies);
        return (
            <div>
                <div>
                    <h2>박스오피스 (국내) 🇰🇷</h2>
                </div>
                <div className={classes.posters}>
                    {movies.map((m) => (
                        <span className={classes.posters__poster}>
                            <Link to={kobisViewURL + m.title} className={classes.movieTitle}>
                                <img
                                    width="100%"
                                    height="100%"
                                    src={m.image}
                                    alt={m.title}
                                    width="150"
                                />
                                <div>{m.title}</div>
                            </Link>
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    const printTop3Movies_TMDB = () => {
        console.log('tmdbHome:', tmdbHome);
        return (
            <div>
                <div>
                    <h2>박스오피스 (해외) 🇺🇸</h2>
                </div>
                <div className={isMobile ? classes.posters2_Mobile : classes.posters2}>
                    {tmdbHome.map((tmdb) => (
                        <span className={classes.posters2__poster}>
                            <Link to={tmdbViewURL + tmdb.id} className={classes.movieTitle}>
                                <img
                                    className={classes.posters_border}
                                    width="100%"
                                    src={tmdbPosterURL + tmdb.backdrop_path}
                                    alt={tmdb.title}
                                />
                                <div>{tmdb.title}</div>
                            </Link>
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    const printMainMovie = () => {
        return (
            <div className={classes.hottest}>
                <p>The hottest Movie of The Week </p>
                <Link to={tmdbViewURL + hotMovie.id}>
                    <img
                        className={classes.backdrop}
                        src={tmdbPosterURL + hotMovie.backdrop_path}
                    />
                </Link>
                <p>{hotMovie.title}</p>
            </div>
        );
    };

    return (
        <div className={classes.root}>
            <div className={classes.pageTitle}>Movie Salon🎥</div>
            <div>
                <span>{printMainMovie()}</span>
            </div>
            <div className={classes.topMovieContainer}>
                <div className={classes.topMovieContainer__container}>
                    <Box className={classes.box}>{printTop3Movies_KOBIS()}</Box>
                </div>
            </div>
            <div className={classes.topMovieContainer}>
                <div className={classes.topMovieContainer__container}>
                    <Box className={classes.box}>{printTop3Movies_TMDB()}</Box>
                </div>
            </div>
        </div>
    );
};
export default Home;
