import React, { setState } from 'react';
import PropTypes from 'prop-types';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

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
let rankInten, audiInten;

class Movie extends React.Component {
    //     let props =  key, movieNm, rank, rankInten, openDt, audiCnt, audiAcc, audiInten ]
    // let key, movieNm, rank, rankInten, openDt, audiCnt, audiAcc, audiInten;
    constructor(props) {
        super(props);
        rankInten = props.rankInten;
        audiInten = props.audiInten;
    }

    printRankInten = () => {
        if (rankInten != 0)
            if (rankInten > 0) return `전일 대비 👍 X ${rankInten}`;
            else return `전일 대비 👎 X ${Math.abs(rankInten)}`;
        else return '순위 변동 없음.';
    };

    printAudiIten = () => {
        if (audiInten != 0)
            if (audiInten > 0) return `👍 X ${audiInten}`;
            else return `👎 X ${Math.abs(audiInten)}`;
        else return '관람객 수 변동 없음.';
    };

    render() {
        const { classes } = this.props;
        let rankInten = this.props.rankInten;
        return (
            <>
                <TableRow hover={true}>
                    <TableCell colSpan="2" className={classes.movieTitle}>
                        {this.props.movieNm}
                    </TableCell>
                    <TableCell className={classes.movieInfo}> {this.props.rank}위 </TableCell>
                    <TableCell colSpan="2" className={classes.movieInfo}>
                        {' '}
                        누적 {this.props.audiAcc} 명 관람{' '}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.movieInfo}> {this.props.openDt} 개봉 </TableCell>
                    <TableCell colSpan="2" className={classes.movieInfo}>
                        {this.printRankInten()}
                    </TableCell>
                    <TableCell colSpan="2">{'전일 대비 ' + this.printAudiIten()}</TableCell>
                </TableRow>
            </>
        );
    }
}

Movie.propTypes = {
    title: PropTypes.string.isRequired,
};

export default withStyles(styles)(Movie);
