import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
const cheerio = require('cheerio');

const styles = makeStyles({
    movieTitle: {
        fontSize: '2.0rem',
        textAlign: 'center',
    },
    movieInfo: {
        fontSize: '1.0rem',
        textAlign: 'center',
    },
});

const Movie = ({ movieCode, movieNm, openDt, rank, audiAcc, audiInten, rankInten }) => {
    // const [movieCode, setMovieCode] = useState(0);
    // const [movieLink, setMovieLink] = useState('');
    // const [poster, setPoster] = useState('');

    // const ID_KEY = process.env.REACT_APP_NAVER_CLIENT_ID;
    // const SECRET_KEY = process.env.REACT_APP_NAVER_CLIENT_SECRET_KEY;
    console.log('movieCode from Movie:', movieCode);
    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             if (movieNm === '') {
    //                 setMovieCode(0);
    //             } else {
    //                 const {
    //                     data: { items },
    //                 } = await axios.get('/api/v1/search/movie.json', {
    //                     params: { query: movieNm, display: 5 },
    //                     headers: {
    //                         'X-Naver-Client-Id': ID_KEY,
    //                         'X-Naver-Client-Secret': SECRET_KEY,
    //                     },
    //                 });
    //                 //주소를 통해 가져와 진 items 배열을 movies라는 state에 저장.
    //                 console.log('items[0] from Movie.js:', items[0]);
    //                 setMovieLink(items[0].link);
    //             }
    //         } catch (error) {
    //             console.log('error 발생! ', error);
    //         }
    //     }
    //     fetchData();
    // }, []);

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

    //props에 저장된 classes(withStyles에 필요), 영화이름, 순위, 개봉일과 같은 정보들을 가져와 변수로 관리.
    // const { classes, movieNm, openDt, rank, audiAcc, audiInten, rankInten } = this.props;
    const classes = styles();
    let url = '/viewMovie?movieNm=';

    const printAudiIten = () => {
        // console.log(audiInten);
        if (audiInten === '0') return '관람객 수 변동 없음.';
        if (audiInten !== '0') {
            let text = '전일 대비 ';
            if (audiInten > 0) text += `👍 X ${audiInten}`;
            else text += `👎 X ${Math.abs(audiInten)}`;
            return text + ' 명';
        }
    };

    const printRankInten = () => {
        // console.log(rankInten);
        if (rankInten === '0') return '순위 변동 없음.';
        if (rankInten !== '0') {
            let text = '전일 대비 ';
            if (rankInten > 0) text += `👍 X ${rankInten}`;
            else text += `👎 X ${Math.abs(rankInten)}`;
            return text + '위';
        }
    };

    return (
        <>
            <TableRow hover={true}>
                <TableCell colSpan="2" className={classes.movieTitle}>
                    <Link to={url + movieNm}>{movieNm}</Link>
                </TableCell>
                <TableCell className={classes.movieInfo}> {rank}위 </TableCell>
                <TableCell colSpan="2" className={classes.movieInfo}>
                    누적 {audiAcc} 명 관람
                </TableCell>
            </TableRow>
            <TableRow>
                {/* 전일 대비 순위/관람객 수 증감여부는 함수로 뺐음. 상단 참조  */}
                <TableCell className={classes.movieInfo}> {openDt} 개봉 </TableCell>
                <TableCell colSpan="2" className={classes.movieInfo}>
                    {printRankInten()}
                </TableCell>
                <TableCell colSpan="2">{'전일 대비 ' + printAudiIten()}</TableCell>
            </TableRow>
        </>
    );
};

export default Movie;
