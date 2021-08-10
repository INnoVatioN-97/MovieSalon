import React, { useEffect, useState } from 'react';
import axios from 'axios';
import queryString from 'query-string';
const cheerio = require('cheerio');

const ViewMovie_tmp = ({ movieNm }) => {
    // console.log(movieNm);
    const ID_KEY = process.env.REACT_APP_NAVER_CLIENT_ID;
    const SECRET_KEY = process.env.REACT_APP_NAVER_CLIENT_SECRET_KEY;

    const [movieInfo, setMovieInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hqPoster, setHqPoster] = useState('');
    const [code, setCode] = useState(0);
    const [res, setRes] = useState([]);
    const [data, setData] = useState('');

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
                    console.log('movieInfo (line42):', movieInfo);
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
                console.log('movieInfo (line64):', movieInfo);
                let tmp = queryString.parse(movieInfo.link);
                console.log('tmp.code:', tmp.code);
                setCode(tmp.code);
                // setCode(tmp.split('?code=')[1]);
                // const code = movieInfo.link.split('?code=')[1];
                console.log(`code from line 70: ${code}`); //정확히 전달 됨.
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
                setHqPoster(bodyList[0].attribs.src);
                setIsLoading(false);
                // // console.log('hqPoster from getHtml(line94):', highQualityPoster);
                // if (hqPoster !== undefined) {
                //     this.setState({ hqPoster: hqPoster, isLoading: false });

                //     return;
                // }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [movieInfo]);

    // useEffect(() => {
    //     async function fetchData() {
    //         // console.log('res from line 95: ', res);
    //         // alert(data);
    //         let $ = cheerio.load(data);
    //         // console.log('html.data: ', res.data);
    //         // ul.list--posts를 찾고 그 children 노드를 bodyList에 저장
    //         const bodyList = $('#page_content').children('a').children('#targetImage');
    //         // highQualityPoster = bodyList[0].attribs.src;
    //         setHqPoster(bodyList[0].attribs.src);
    //         console.log('hqPoster from getHtml(line57):', hqPoster);
    //         setIsLoading(false);

    //         // return;
    //         // if (highQualityPoster !== undefined) {
    //         //     this.setState({ hqPoster: highQualityPoster, isLoading: false });
    //         //     return;
    //         // }
    //     }
    //     fetchData();
    // }, [data]);

    return <div>{isLoading ? '로딩중...' : `로딩됨! ${console.log(movieInfo)}`}</div>;
};

export default ViewMovie_tmp;
