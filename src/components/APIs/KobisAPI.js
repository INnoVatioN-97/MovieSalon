import moment from 'moment';
import axios from 'axios';

export const getKobisMovies = async () => {
    try {
        //어제 기준 박스오피스 상위 10위권 출력.
        const yesterday = moment().subtract(1, 'days').format('YYYYMMDD');
        // console.log(yesterday);
        const API_KEY = process.env.REACT_APP_KOBIS_API_KEY;
        const {
            data: {
                boxOfficeResult: { dailyBoxOfficeList },
            },
        } = await axios.get(
            `http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${API_KEY}&targetDt=${yesterday}`
        );
        // console.log(dailyBoxOfficeList);
        // this.setState({ movies: dailyBoxOfficeList, isLoading: false });
        // console.log('dailyBoxOfficeList:', dailyBoxOfficeList);
        const result = Boolean(dailyBoxOfficeList) ? dailyBoxOfficeList : null;
        // console.log('result:', result);
        if (result !== null || result !== undefined) {
            return result;
        }
    } catch (error) {
        console.log('error!', error);
    }
};
