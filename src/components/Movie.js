import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TableCell, TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
    movieTitle: {
        fontSize: '2.0rem',
        textAlign: 'center',
    },
    movieInfo: {
        fontSize: '1.0rem',
        textAlign: 'center',
    },
});

class Movie extends React.Component {
    render() {
        //props에 저장된 classes(withStyles에 필요), 영화이름, 순위, 개봉일과 같은 정보들을 가져와 변수로 관리.
        const { classes, movieNm, openDt, rank, audiAcc, audiInten, rankInten } = this.props;
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
    }
}

export default withStyles(styles)(Movie);
