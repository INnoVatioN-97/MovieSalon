import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableBody, Table, TableRow, TableCell, TextField } from '@material-ui/core';
import { dbService } from 'fbase';
import Comment from 'components/Comment';
import TMDB from 'components/TMDB';
import '../css/App.css';

const ViewTMDB = ({match, userObj}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movieInfo, setMovieInfo] = useState([]);
    const [genre, setGenre] = useState([]);
    const [posters, setPosters] = useState([]);
    const [comment, setComment] = useState(''); // 글작성
    const [comments, setComments] = useState([]); // 모든 코멘트 저장소

    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const id = match.params.id;
    const img = 'https://image.tmdb.org/t/p/w200'; // poster
    const backImg = 'https://image.tmdb.org/t/p/w1280'; // 1280 background img

    useEffect(() => {
        getMovieInfo();
    }, [match]); 

    useEffect(() => {
        const getData = dbService
        .collection(`comment_movieCode=${id}`)
        .orderBy('createAt', 'desc')
        .onSnapshot((snapshot) => {
            const commentsArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setComments(commentsArray);
        });
        return () => getData();
    }, [id, comments]);

    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const addComment = async (event) => { /*made by INNo */
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
        // console.log(comments);
        if (comments !== null || comments !== undefined) {
            return (
                <>
                    {/* comments 배열을 map을 사용해 하나씩 렌더링. */}
                    {comments.map((comment) => (
                        <Comment commentObj={comment} owner={userObj.email} />
                    ))}
                </>
            );
        } else return (<p>comment없음</p>);
    };

    const getMovieInfo = async () => {
        const {
            data: { original_title, overview, title, poster_path, backdrop_path, tagline, genres, release_date },
        } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=ko`);
        setMovieInfo({ title: title, original_title: original_title, tagline: tagline, overview: overview
        , release_date: release_date});
        setPosters({
            poster_path: poster_path,
            backdrop_path: backdrop_path,
        });
        setIsLoading(false);
        setGenre(genres);
      //  console.log(posters.poster_path);
    }

    return (
        <>
        <Table>
        <TableRow hover={true} background={backImg + posters.backdrop_path} align='center' >
            <TableCell align="center">
                    <img src={img + posters.poster_path} alt={movieInfo.title} />
            </TableCell>
        </TableRow>
        </Table>
        <Table>
            <TableRow>
                <TableCell align='center' colSpan='2'><h1>{movieInfo.original_title}</h1>
                <br/><b>{movieInfo.release_date}</b>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell align='center'><b>{genre.map((g) => ('|'+g.name+'|'))}</b></TableCell>
            </TableRow>
            <TableRow>
                <TableCell align='center'><b>"{movieInfo.tagline}"!</b><br/>{movieInfo.overview}</TableCell>
            </TableRow>
            <TMDB id={id} />
        </Table>
        <Table>
        <TableRow>
                    <TableCell align="center" colSpan="3">
                        <TextField
                            id="commentField"
                            fullWidth={true}
                            label="한줄평"
                            placeholder="한줄평 남기기"
                            // multiline
                            variant="filled"
                            size="medium"
                            value={comment}
                            onChange={handleChange}
                            onKeyPress={addComment}
                        />
                    </TableCell>
                </TableRow>
        </Table>
        <Table>
        <TableRow>
        {comments !== null ? (
                            printComments()
                        ) : (
                            <TableRow>
                                <TableCell>로딩중...</TableCell>
                            </TableRow>
                        )}
        </TableRow>
        </Table>
    </>
    );
}

export default ViewTMDB;

