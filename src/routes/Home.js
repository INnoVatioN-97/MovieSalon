import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Grid, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
// firebase login import 추가
import 'firebase/firestore';
import 'firebase/auth';
import '../css/Home.css';
import { getHighQualityPosterLink } from 'components/APIs/NaverSearchAPI';

//https://material-ui.com/system/flexbox/#flex-wrap 에서
// Box 좀 보고 Home 화면에서 순위 세개 이쁘게 띄워야 함.

const useStyles = makeStyles({
    pageTitle: {
        textAlign: 'center',
        fontSize: '4.2rem',
        marginTop: 15,
        marginBottom: 15,
    },
    top3List: {
        listStyle: 'none',
        justifyContent: 'center',
    },
    box: {
        display: 'grid',
        flexWrap: 'nowrap',
        p: 1,
        m: 1,
        backgroundColor: '#150A52',
        color: "#F4F3F7",
        sx: { maxWidth: 300 },
    },
});

const Home = ({ movies, isLoggedIn, userObj, tmdbHome }) => {
    const classes = useStyles();
    const tmdbPosterURL = 'https://image.tmdb.org/t/p/w500';
    const tmdbViewURL = '/viewTmdb/';
    const kobisViewURL = '/viewMovie?movieNm=';

    const printTop3Movies_KOBIS = () => {
        console.log('movies:', movies);
        return (
            <div className="childs">
                <div>
                    <h2>박스오피스 (국내)</h2>
                </div>
                <Grid container spacing={3} align="center">
                    {movies.map((m) => (
                        <Grid item xs={2}>
                            <Link to={kobisViewURL + m.title}>
                                <img className="posters" src={m.image} alt={m.title} width="150" />
                            </Link>
                            <span className="texts">
                                <h3>
                                     {m.title}
                                </h3>
                            </span>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    };

    const printTop3Movies_TMDB = () => {
        console.log('tmdbHome:', tmdbHome);
        return (
            <div className="childs">
                <div>
                    <h2>박스오피스 (해외)</h2>
                </div>
                <Grid container spacing={3} align="center">
                    {tmdbHome.map((tmdb) => (
                        <Grid item xs={4}>
                            <Link to={tmdbViewURL + tmdb.id}>
                                <img
                                    className="posters"
                                    width="400"
                                    src={tmdbPosterURL + tmdb.backdrop_path}
                                    alt={tmdb.title}
                                />
                            </Link>
                            <span className="texts">
                                <h3>{tmdb.title}</h3>
                            </span>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    };

    return (
        <>
            <div className={classes.pageTitle}>Movie Salon</div>
            <Box className={classes.box}>{printTop3Movies_KOBIS()}</Box>
            {printTop3Movies_TMDB()}
        </>
    );
};
export default Home;
