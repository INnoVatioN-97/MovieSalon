import axios from 'axios';
const cheerio = require('cheerio');

// 네이버 검색 API 사용시 헤더에 집어넣어야 할 요소들.
const ID_KEY = process.env.REACT_APP_NAVER_CLIENT_ID;
const SECRET_KEY = process.env.REACT_APP_NAVER_CLIENT_SECRET_KEY;

// 네이버 검색 API를 활용해 영화의 상세정보를 가져오는 함수
export const getNaverSearchResult = async (movieName) => {
    try {
        const {
            data: { items },
        } = await axios.get('/api/v1/search/movie.json', {
            params: { query: movieName, display: 5 },
            headers: { 'X-Naver-Client-Id': ID_KEY, 'X-Naver-Client-Secret': SECRET_KEY },
        });

        // 정상적으로 가져와진 영화 정보 배열을 반환.
        return items[0];
    } catch (error) {
        console.log('error 발생! ', error);
    }
};

/**
 * 9번 라인의 getNaverSearchResult 함수를 통해 가져온 영화정보를 토대로
 * 분해해 영화 상세정보의 link를 얻고, 이를 분해해 실제 영화코드를 뽑아낸다.
 * 그 후 해당 영화의 고화질 포스터 주소를 반환한다.
 * 이를 cheerio를 통해 이미지만 파싱해서 쓴다.
 * (이 작업은 해당 페이지에서)
 */
export const getHighQualityPosterLink = async (code) => {
    try {
        return await axios.get('/poster/movie/bi/mi/photoViewPopup.naver?movieCode=' + code);
        // console.log(res);
    } catch (error) {
        console.error(error);
    }
};
