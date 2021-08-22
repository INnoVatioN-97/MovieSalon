import React, { useState, useEffect } from 'react';
import Movie from 'components/Movie';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import axios from 'axios';

/*
2021.07.14 List 기능 추가 ver1.0 @TylerKang
*/
const styles = makeStyles({
    paper: {
        marginTop: 15,
        marginLeft: 24,
        marginRight: 24,
    },
});

const MovieList = ({ movies }) => {
    const [keyword, setKeyword] = useState('');
    const [poster, setPoster] = useState('');

    const ID_KEY = process.env.REACT_APP_NAVER_CLIENT_ID;
    const SECRET_KEY = process.env.REACT_APP_NAVER_CLIENT_SECRET_KEY;

    const fetchData = async (movieNm) => {
        let movieLink = '';
        let movieCode = 0;
        try {
            if (movieNm === '') {
                movieCode = 0;
            } else {
                const {
                    data: { items },
                } = await axios.get('/api/v1/search/movie.json', {
                    params: { query: movieNm, display: 5 },
                    headers: {
                        'X-Naver-Client-Id': ID_KEY,
                        'X-Naver-Client-Secret': SECRET_KEY,
                    },
                });
                //주소를 통해 가져와 진 items 배열을 movies라는 state에 저장.
                // console.log('items[0] from MovieList.js:', items[0]);
                movieLink = items[0].link;
                movieCode = movieLink.split('?code=')[1];
                // console.log('movieCode: ', movieCode);
                return movieCode;
            }
        } catch (error) {
            console.log('error 발생! ', error);
        }
    };

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             // console.log('movieInfo (line65):', movieInfo);

    //             if (movieLink !== null || movieLink !== undefined) {
    //                 let tmp = movieLink;
    //                 setMovieCode(tmp.split('?code=')[1]);
    //             }

    //             // console.log(`code from line 72: ${code}`); //정확히 전달 됨.
    //             return await axios.get(
    //                 '/poster/movie/bi/mi/photoViewPopup.naver?movieCode=' + movieCode
    //             );
    //             // console.log(res);
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }
    //     fetchData()
    //         .then((res) => {
    //             let $ = cheerio.load(res.data);
    //             // ul.list--posts를 찾고 그 children 노드를 bodyList에 저장
    //             const bodyList = $('#page_content').children('a').children('#targetImage');
    //             // hqPoster = bodyList[0].attribs.src;
    //             // console.log('bodyList[0].attribs.src:', bodyList[0].attribs.src);
    //             let hqPoster = bodyList[0].attribs.src;
    //             if (hqPoster !== null || hqPoster !== undefined) {
    //                 setPoster(bodyList[0].attribs.src);
    //                 console.log('poster:', poster);
    //                 console.log('movieCode:', movieCode);
    //             }
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, [movieLink, movieCode]);

    const handleChange = (e) => {
        // this.setState({ keyword: e.target.value });
        setKeyword(e.target.value);
    };

    const classes = styles();

    return (
        <Paper className={classes.paper}>
            <Table className={classes.table}>
                <TableBody>
                    <InputBase
                        type="text"
                        name="keyword"
                        value={keyword}
                        onChange={handleChange}
                        placeholder="검색"
                    />
                    {movies.map((movie) => {
                        // console.log('movie_list',movie);
                        return (
                            // 검색창에 입력된 문자의 키워드를 movieName과 매치하여 리스트 출력
                            movie.movieNm.indexOf(keyword) > -1 ? (
                                <Movie
                                    key={movie.movieCd}
                                    movieNm={movie.movieNm}
                                    rank={movie.rank}
                                    rankInten={movie.rankInten}
                                    openDt={movie.openDt}
                                    audiCnt={movie.audiCnt}
                                    audiAcc={movie.audiAcc}
                                    audiInten={movie.audiInten}
                                    // movieCode={fetchData(movie.movieNm)}
                                />
                            ) : (
                                <p></p>
                            )
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default MovieList;
