import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { TableBody, Table, TableRow, TableCell, TextField, Grid } from '@material-ui/core';
import { dbService } from 'fbase';
import Comment from 'components/Comment';
import TMDB from 'components/TMDB';
import { Box } from '@material-ui/core';
import NoBackdropImage from 'images/NoBackdropImage.PNG';
import NoImageAvailable from 'images/NoImageAvailable.png';
import '../css/View.css';

const useStyles = makeStyles({
    box: {
        display: 'grid',
        backgroundColor: 'rgba(12, 12, 12, 0.9)',
        color: '#10FF00',
    },
});

const ViewTMDB = ({ match, userObj }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movieInfo, setMovieInfo] = useState([]);
    const [genre, setGenre] = useState([]);
    const [posters, setPosters] = useState([]);
    const [comment, setComment] = useState(''); // 글작성
    const [comments, setComments] = useState([]); // 모든 코멘트 저장소

    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const id = match.params.id;
    const img = 'https://image.tmdb.org/t/p/w400'; // poster
    const backImg = 'https://image.tmdb.org/t/p/w1280'; // 1280 background img
    const classes = useStyles();

    useEffect(() => {
        getMovieInfo();
    }, []);

    useEffect(() => {
        const getData = dbService
            .collection(`comment_movieCode=${id}`)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                const commentsArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setComments(commentsArray);
                // console.log(comments);
            });
        return () => getData();
    }, [id, comments]);

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const addComment = async (event) => {
        /*made by INNo */
        console.log('event.keyCode:', event.code);
        if (event.code === 'Enter') {
            //Enter 키를 누르면 입력된 한줄평을 파이어베이스 DB에 넣고,
            //한줄평 필드를 비운다.
            if (comment === '') {
                return;
            }
            event.preventDefault();

            const commentObj = {
                comment: comment,
                userId: userObj.email,
                createdAt: Date.now(),
            };
            await dbService
                .collection(`comment_movieCode=${id}`)
                .doc(commentObj.userId)
                .set(commentObj) // insert
                .then(() => {
                    console.log('Document successfully written!');
                })
                .catch((error) => {
                    console.error('Error writing document: ', error);
                });

            setComment('');
            setComments([]);
        }
    };

    const printComments = () => {
        // console.log('comments',comments);
        if (comments !== null || comments !== undefined) {
            return (
                <>
                    {/* comments 배열을 map을 사용해 하나씩 렌더링. */}
                    {comments.map((comment) => (
                        <Comment commentObj={comment} owner={userObj.email} code={id} />
                    ))}
                </>
            );
        } else return <p>comment없음</p>;
    };

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
        setIsLoading(false);
        setGenre(genres);
        //  console.log(posters.poster_path);
    };

    return (
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
                        {/* 태그라인 미존재시 허공에 ""만 떠있는거 해결 */}
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
            {id > 0 ? (
                <Comment code={id} owner={userObj.email} colSpan={3} />
            ) : (
                <TableRow>
                    <TableCell>'한줄평 기능 로딩중'</TableCell>
                </TableRow>
            )}
        </>
    );
};

export default ViewTMDB;
