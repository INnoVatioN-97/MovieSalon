import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = makeStyles({
    movieTitle: {
        margin: 'auto',
        color: '#10ff00',
        fontSize: '1.5rem',
        // textAlign: 'center',
        textDecoration: 'none',
    },
    rank: {
        //
        //
    },
    movieInfo: {
        color: 'white',
        fontSize: '1.0rem',
        textAlign: 'center',
    },
});

const Movie = ({ movieCode, movieNm, openDt, rank, audiAcc, audiInten, rankInten }) => {
    // console.log('movieCode from Movie:', movieCode);
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
                <TableCell colSpan="2">
                    <Link to={url + movieNm} className={classes.movieTitle}>
                        {movieNm}
                    </Link>
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
                <TableCell colSpan="2" className={classes.movieInfo}>
                    {'전일 대비 ' + printAudiIten()}
                </TableCell>
            </TableRow>
        </>
    );
};

export default Movie;
