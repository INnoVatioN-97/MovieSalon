import React, { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
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
    const [res, setRes] = useState([]);
    const [data, setData] = useState('');
    const [comment, setComment] = useState('');

    // const getHTML = async (code) => {
    //     try {
    //         console.log(`code from getHTML: ${code}`); //정확히 전달 됨.
    //         return await axios.get('/poster/movie/bi/mi/photoViewPopup.naver?movieCode=' + code);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

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
                    // this.setState({ movies: items, isLoading: false });
                    setMovieInfo(items[0]);
                    // setIsLoading(false); //isLoading은 모든 작업이 다 끝나고 되어야 한다.

                    // setCode(movieInfo.link.split('?code=')[1]);
                    // console.log('code:', code);
                    // this.getMovieImage();
                    // let highQualityPoster = '';
                    // console.log('movie[0]', movie[0]);
                }
                //  this.getMovieImage();
            } catch (error) {
                // console.log('error 발생! ', error);
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
                // const code = movieInfo.link.split('?code=')[1];
                console.log(`code from line 72: ${code}`); //정확히 전달 됨.
                return await axios.get('/poster/movie/bi/mi/photoViewPopup.naver?movieCode=' + code);
                // console.log(res);
            } catch (error) {
                console.error(error);
            }
        }
        // setRes(fetchData());
        // setData(res.data);
        fetchData()
            .then((res) => {
                // console.log(`html: ${res}`);
                let $ = cheerio.load(res.data);
                // console.log('html.data: ', res.data);
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

    // return <div>{isLoading ? '로딩중...' : `로딩됨! ${console.log(movieInfo)}`}</div>;
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
        // this.setState({ comment: e.target.value });
        setComment(e.target.value);
        // console.log(`comment: ${e.target.value}`);
        // e.target.value = '';
    };

    const addComment = (e) => {
        if (e.keyCode === 13) {
            // console.log(`addComment : ${this.state.comment}`);
            // document.getElementById('commentField').innerText = '';
            // this.setState({ comment: '' });
            setComment('');
        }
    };
    const printMovieInfo = (movie) => {
        // const movie = mv[0];
        const actors = movie.actor.split('|');

        // console.log('movie from printMovieInfo:', movie);
        // const code = movie.link.split('?code=')[1];
        // console.log('code from printMovieInfo:', code);

        // console.log('movie: ', movies);
        // this.getMovieImage(movies);
        return (
            <TableBody>
                <TableRow>
                    <TableCell colSpan="4">
                        <a href={movie.link} rel="norefferer">
                            {/* {this.getMovieImage(movies, classes.image)} */}
                            {console.log('hqPoster', hqPoster)}
                            <img src={hqPoster} alt={movie.title} />
                        </a>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan="4">{movie.title.replace(/<b>/gi, '').replace(/<\/b>/gi, '')}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan="2">개봉: {movie.pubDate}</TableCell>
                    <TableCell>평점: {movie.userRating}</TableCell>
                    <TableCell>감독: {movie.director.replace('|', '')}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>출연진</TableCell>
                    <TableCell colSpan="3">{printActors(actors)}</TableCell>
                </TableRow>
                <TableRow>
                    {/* <form className={classes.commentForm} noValidate autoComplete="off"> */}
                    <TableCell colSpan="4">
                        {/* <TextField id="outliend-basic" label="한줄평 남기기" variant="outlined" /> */}
                        <TextField
                            id="commentField"
                            fullWidth={true}
                            label="한줄평"
                            placeholder="한줄평 남기기"
                            // multiline
                            variant="filled"
                            value={comment}
                            onChange={handleChange}
                            onKeyDown={addComment}
                        />
                    </TableCell>
                    {/* </form> */}
                </TableRow>
            </TableBody>
        );
    };

    return (
        <Table>
            {isLoading ? (
                <TableHead>
                    <TableRow>Loading..</TableRow>
                </TableHead>
            ) : (
                <>
                    <TableHead>
                        <TableRow>포스터를 클릭하시면 해당 영화에 대한 네이버 검색 결과로 리다이렉트 됩니다.</TableRow>
                    </TableHead>
                    {printMovieInfo(movieInfo)}
                </>
            )}
        </Table>
    );
};

export default ViewMovie;