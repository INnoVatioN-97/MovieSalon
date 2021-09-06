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
        backgroundColor: '#636e72',
        borderRadius: '20px',
    },
    /**
     * .movieInfoTable {
    text-align: center;
    padding: auto;
// }

// .posterCell {
//     /* align-items: center; */
    //     /* justify-content: center; */
    //     /* align-content: center; */
    //     /* margin: auto; */

    // .posterCell__posterImg {
    //     width: 100%;
    // }

    // * /
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
        getNaverSearchResult(movieNm).then((res) => {
            setMovieInfo(res);
            let tmp = res.link;
            setCode(tmp.split('?code=')[1]);
        });
    }, []);

    //code 의 값 변경이 감지되면 (영화정보를 가져와 거기서 영화코드추출이 끝남을 인지하면) 실행되는 훅.
    // 고화질 포스터를 가져온다.
    useEffect(() => {
        getHighQualityPosterLink(code)
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
    }, [code]);

    useEffect(() => {
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
        return () => getData();
    }, [code, comments]);

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
                <>
                    {/* comments 배열을 map을 사용해 하나씩 렌더링. */}
                    {comments.map((comment) => (
                        <Comment commentObj={comment} owner={userObj.email} />
                    ))}
                </>
            );
        } else return null;
    };

    const printMovieInfo = (movie) => {
        const actors = movie.actor.split('|');
        // console.log('userObj from printMovieInfo:', userObj.email);
        return (
            <>
                <TableRow hover={true}>
                    <TableCell align="center" rowSpan="6" width="45%">
                        <a href={movie.link} rel="norefferer">
                            <img src={hqPoster} alt={movie.title} width="100%" />
                        </a>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="center">제목</TableCell>
                    <TableCell align="center">{movie.title.replace(/<b>/gi, '').replace(/<\/b>/gi, '')}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="center">감독</TableCell>
                    <TableCell align="center">{movie.director.replace('|', '')}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="center">개봉</TableCell>
                    <TableCell align="center">{movie.pubDate}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="center">출연진</TableCell>
                    <TableCell align="center">{printActors(actors)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="center">평점</TableCell>
                    <TableCell align="center">{movie.userRating}</TableCell>
                </TableRow>
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
                                <TableCell colSpan="4" align="center">
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
                                    <TableCell>로딩중...</TableCell>
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
