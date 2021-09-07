import React, { useEffect, useState } from 'react';
import '../css/App.css';
import { TableBody, Table, TableRow, TableCell, TableHead, TextField } from '@material-ui/core';
import { dbService } from 'fbase';
import Comment from 'components/Comment';
import { getNaverSearchResult, getHighQualityPosterLink } from 'components/APIs/NaverSearchAPI';
import { makeStyles } from '@material-ui/styles';
const cheerio = require('cheerio');

const styles = makeStyles({
    root: {
        margin: '2% 5% 5% 5% ',
    },
    movieTable: {
        // backgroundColor: '#636e72',
        borderRadius: '20px',
        backgroundColor: 'rgba(12, 12, 12, 0.9)',
        color: '#FFFFFF',
    },
    tableHeader: {
        fontSize: '1.0rem',
        color: '#FFFFFF',
    },
    movieTitle: {
        fontWeight: '700',
        fontSize: '2.5rem',
        borderBottom: 'none',
        color: '#10FF00',
    },
    tableCell: {
        fontWeight: '400',
        fontSize: '1.2rem',
        borderBottom: 'none',
        color: '#FFFFFF',
    },
    posterCell: { margin: 0, padding: '1%' },
    posterImg: {
        width: '100%',
        borderRadius: '10px',
        boxShadow: '.05rem .05rem .05rem .05rem #000000',
    },
});

const ViewMovie = ({ movieNm, userObj }) => {
    const [movieInfo, setMovieInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hqPoster, setHqPoster] = useState('');
    const [code, setCode] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const classes = styles();

    useEffect(() => {
        console.log('네이버 API 접근!');
        getNaverSearchResult(movieNm).then((res) => {
            setMovieInfo(res);
            const tmpCode = res.link.split('?code=')[1];
            setCode(tmpCode);
            getHighQualityPosterLink(tmpCode)
                .then((res) => {
                    let $ = cheerio.load(res.data);
                    // ul.list--posts를 찾고 그 children 노드를 bodyList에 저장
                    const bodyList = $('#page_content').children('a').children('#targetImage');
                    setHqPoster(bodyList[0].attribs.src);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }, []);

    //code 의 값 변경이 감지되면 (영화정보를 가져와 거기서 영화코드추출이 끝남을 인지하면) 실행되는 훅.
    // 고화질 포스터를 가져온다.
    // useEffect(() => {
    //     getHighQualityPosterLink(code)
    //         .then((res) => {
    //             let $ = cheerio.load(res.data);
    //             // ul.list--posts를 찾고 그 children 노드를 bodyList에 저장
    //             const bodyList = $('#page_content').children('a').children('#targetImage');
    //             setHqPoster(bodyList[0].attribs.src);
    //             setIsLoading(false);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [code]);

    useEffect(() => {
        console.log('dbService 접근!');
        const getData = dbService
            .collection(`comment_movieCode=${code}`)
            .orderBy('createdAt', 'desc')
            .onSnapshot((snapshot) => {
                const commentsArray = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setComments(commentsArray);
                // console.log(comments);
            });
        getData();
    }, [code]);

    const printActors = (actors) => {
        let text = '';
        for (let i = 0; i < actors.length - 1; i++) {
            if (actors[i] === '') continue;
            if (i === actors.length - 2) text += actors[i];
            else text += actors[i] + ',';
        }
        return text;
    };
    const handleChange = (e) => {
        setComment(e.target.value);
    };

    const addComment = async (event) => {
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
                .collection(`comment_movieCode=${code}`)
                .doc(commentObj.userId)
                .set(commentObj)
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
                /* comments 배열을 map을 사용해 하나씩 렌더링. */
                comments.map((comment) => <Comment commentObj={comment} owner={userObj.email} />)
            );
        } else return null;
    };

    const printMovieInfo = (movie) => {
        const actors = movie.actor.split('|');
        // console.log('userObj from printMovieInfo:', userObj.email);
        return (
            <>
                <TableRow hover={true}>
                    <TableCell align="center" rowSpan="6" width="45%" className={classes.posterCell}>
                        <a href={movie.link} rel="norefferer">
                            <img src={hqPoster} alt={movie.title} className={classes.posterImg} />
                        </a>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan="2" align="center" className={classes.movieTitle}>
                        {movie.title.replace(/<b>/gi, '').replace(/<\/b>/gi, '')}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="center" className={classes.tableCell}>
                        감독
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                        {movie.director.replace('|', '')}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="center" className={classes.tableCell}>
                        개봉
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                        {movie.pubDate}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="center" className={classes.tableCell}>
                        출연진
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                        {printActors(actors)}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="center" className={classes.tableCell}>
                        평점
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                        ⭐x{movie.userRating}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="center" colSpan="3" className={classes.tableCell}>
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
            </>
        );
    };

    return (
        <div className={classes.root}>
            <Table className={classes.movieTable}>
                {isLoading ? (
                    <TableHead>
                        <TableRow>Loading..</TableRow>
                    </TableHead>
                ) : (
                    <>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan="4" align="center" className={classes.tableHeader}>
                                    포스터를 클릭하시면 해당 영화에 대한 네이버 검색 결과로 리다이렉트 됩니다.
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {printMovieInfo(movieInfo)}
                            {comments !== null ? (
                                printComments()
                            ) : (
                                <TableRow>
                                    <TableCell className={classes.tableCell}>로딩중...</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </>
                )}
            </Table>
        </div>
    );
};

export default ViewMovie;
