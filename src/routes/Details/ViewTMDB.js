import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { TableBody, Table, TableRow, TableCell } from '@material-ui/core';
import Comment from 'components/Comment';
import TMDB from 'components/APIs/TMDB';
import { Box } from '@material-ui/core';
import NoBackdropImage from 'images/NoBackdropImage.PNG';
import NoImageAvailable from 'images/NoImageAvailable.png';
import 'css/View.css';
import SliderCarousel from 'components/SliderCarousel';

const useStyles = makeStyles({
    box: {
        display: 'grid',
        backgroundColor: 'rgba(12, 12, 12, 0.9)',
        color: '#10FF00',
    },
    carosol: {
        position: 'relative',
        marginLeft: '12%',
        marginBottom: '5%',
        width: '70%',
        backgroundColor: '#20232a',
        color: '#10FF00',
        paddingTop: '1%',
        paddingLeft: '3%',
        paddingRight: '3%',
        paddingBottom: '2%',
        borderRadius: '3rem',
    },
});

const ViewTMDB = ({ match, userObj }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movieInfo, setMovieInfo] = useState([]);
    const [genre, setGenre] = useState([]);
    const [posters, setPosters] = useState([]);

    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const id = match.params.id; // 영화 코드
    const img = 'https://image.tmdb.org/t/p/w400'; // 영화 메인 포스터
    const backImg = 'https://image.tmdb.org/t/p/w1280'; // 1280사이즈 백그라운드 포스터
    const classes = useStyles();

    useEffect(() => {
        getMovieInfo();
    }, []);

    const getMovieInfo = async () => {
        const {
            data: { original_title, overview, title, poster_path, backdrop_path, tagline, genres, release_date, runtime, vote_average },
        } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=ko`);
        setMovieInfo({
            title: title,
            original_title: original_title,
            tagline: tagline,
            overview: overview.substring(0, 350),
            release_date: release_date,
            runtime: runtime,
            vote_average: vote_average,
        });
        setPosters({
            poster_path: poster_path,
            backdrop_path: backdrop_path,
        });
        setGenre(genres);
        setIsLoading(false);
    };

    return (
        <>
            {isLoading ? (
                <div className="lb-wrap">로딩중...</div>
            ) : (
                <>
                    <div className="lb-wrap">
                        <div className="lb-image">
                            <img src={posters.backdrop_path ? backImg + posters.backdrop_path : NoBackdropImage} alt="backPoster" />
                        </div>

                        <div className="lb-poster">
                            <img src={posters.poster_path ? img + posters.poster_path : NoImageAvailable} alt="mainPoster" />
                        </div>
                        <div className="lb-text">
                            <Box className={classes.box}>
                                <span>
                                    <h1>{movieInfo.original_title}</h1>
                                </span>

                                <h3>{Boolean(movieInfo.tagline) ? `"${movieInfo.tagline}"` : ''}</h3>
                                <p>{movieInfo.overview}</p>
                                <div className="lb-cols">
                                    <Table>
                                        <TableRow>
                                            <TableCell>
                                                Runtime:
                                                <br />
                                                <span>{movieInfo.runtime}mins</span>
                                            </TableCell>
                                            <TableCell>
                                                release_date:
                                                <br />
                                                <span>{movieInfo.release_date}</span>
                                            </TableCell>
                                            <TableCell>
                                                vote_average:
                                                <br />
                                                <span>{movieInfo.vote_average}/10</span>
                                            </TableCell>
                                            <TableCell>
                                                Genres:
                                                <br />
                                                <span>{genre.map((g) => g.name + '|')}</span>
                                            </TableCell>
                                        </TableRow>
                                    </Table>
                                </div>
                            </Box>
                        </div>
                    </div>
                    <Table>
                        <TMDB id={id} />
                    </Table>
                    <div>
                        <Box className={classes.carosol}>
                            <SliderCarousel id={id} />
                        </Box>
                    </div>
                    {id > 0 ? (
                        <Comment code={id} owner={userObj.email} colSpan={3} />
                    ) : (
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>'한줄평 기능 로딩중'</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    )}
                </>
            )}
        </>
    );
};

export default ViewTMDB;
