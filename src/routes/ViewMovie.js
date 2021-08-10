import React, { useEffect, useState } from 'react';
import '../components/App.css';
import axios from 'axios';
import { TableBody, Table, TableRow, TableCell, TableHead, TextField } from '@material-ui/core';
const cheerio = require('cheerio');

const ViewMovie = ({ movieNm }) => {
    // console.log(movieNm);
    const ID_KEY = process.env.REACT_APP_NAVER_CLIENT_ID;
    const SECRET_KEY = process.env.REACT_APP_NAVER_CLIENT_SECRET_KEY;

    const [movieInfo, setMovieInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hqPoster, setHqPoster] = useState('');
    const [code, setCode] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                // console.log('movieNm:', movieNm);
                if (movieNm === '') {
                    setMovieInfo(null);
                    setIsLoading(false);
                } else {
                    const {
                        data: { items },
                    } = await axios.get('/api/v1/search/movie.json', {
                        params: { query: movieNm, display: 5 },
                        headers: { 'X-Naver-Client-Id': ID_KEY, 'X-Naver-Client-Secret': SECRET_KEY },
                    });
                    //주소를 통해 가져와 진 items 배열을 movies라는 state에 저장.
                    setMovieInfo(items[0]);
                }
            } catch (error) {
                console.log('error 발생! ', error);
            }
        }
        fetchData();
    }, []);

    //code 의 값 변경이 감지되면 (영화정보를 가져와 거기서 영화코드추출이 끝남을 인지하면) 실행되는 훅.
    // 고화질 포스터를 가져온다.
    useEffect(() => {
        async function fetchData() {
            try {
                console.log('movieInfo (line65):', movieInfo);

                if (movieInfo !== null || movieInfo !== undefined) {
                    let tmp = movieInfo.link;
                    setCode(tmp.split('?code=')[1]);
                }

                console.log(`code from line 72: ${code}`); //정확히 전달 됨.
                return await axios.get('/poster/movie/bi/mi/photoViewPopup.naver?movieCode=' + code);
                // console.log(res);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData()
            .then((res) => {
                let $ = cheerio.load(res.data);
                // ul.list--posts를 찾고 그 children 노드를 bodyList에 저장
                const bodyList = $('#page_content').children('a').children('#targetImage');
                // hqPoster = bodyList[0].attribs.src;
                console.log('bodyList[0].attribs.src:', bodyList[0].attribs.src);
                let hqPoster = bodyList[0].attribs.src;
                if (hqPoster !== null || hqPoster !== undefined) {
                    setHqPoster(bodyList[0].attribs.src);
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [movieInfo, code]);

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

    const addComment = (e) => {
        if (e.keyCode === 13) {
            setComment('');
        }
    };
    const printMovieInfo = (movie) => {
        const actors = movie.actor.split('|');

        return (
            <TableBody>
                <TableRow hover={true}>
                    <TableCell align="center" rowSpan="7" width="25%">
                        <a href={movie.link} rel="norefferer">
                            {console.log('hqPoster', hqPoster)}
                            <img className="posterCell__posterImg" src={hqPoster} alt={movie.title} />
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
                            onKeyDown={addComment}
                        />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan="3" align="center">
                        {' '}
                        오 개쩐다{' '}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan="3" align="center">
                        {' '}
                        오 개쩐다{' '}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan="3" align="center">
                        {' '}
                        오 개쩐다{' '}
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    };

    return (
        <Table className="movieInfoTable">
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
                    {printMovieInfo(movieInfo)}
                </>
            )}
        </Table>
    );
};

export default ViewMovie;
