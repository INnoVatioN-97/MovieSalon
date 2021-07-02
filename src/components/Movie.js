import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
    movieTitle: {
        textAlign: 'center',
        fontSize: '2.0rem',
    },
    movieInfo: {
        fontSize: '1.0rem',
        textAlign: 'center',
    },
    // rowMargin: {
    //     marginLeft: 18,
    //     marginRight: 18,
    // },
});

class Movie extends React.Component {
    //     let props =  key, movieNm, rank, rankInten, openDt, audiCnt, audiAcc, audiInten ]
    // let key, movieNm, rank, rankInten, openDt, audiCnt, audiAcc, audiInten;
    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <TableRow hover={true} className={classes.rowMargin}>
                    <TableCell colSpan="2" className={classes.movieTitle}>
                        {this.props.movieNm}
                    </TableCell>
                    <TableCell className={classes.movieInfo}> {this.props.rank}위 </TableCell>
                    <TableCell colSpan="2" className={classes.movieInfo}>
                        {' '}
                        누적 {this.props.audiAcc} 명 관람{' '}
                    </TableCell>
                </TableRow>
                <TableRow className={classes.rowMargin}>
                    <TableCell className={classes.movieInfo}> {this.props.openDt} 개봉 </TableCell>
                    <TableCell colSpan="2" className={classes.movieInfo}>
                        ({this.props.rankInten !== 0 ? `전일 대비 ${this.props.rankInten}위 변동` : '순위 변동 없음.'})
                    </TableCell>
                    <TableCell colSpan="2">
                        ({this.props.audiInten !== 0 ? `전일 대비 ${this.props.audiInten}명의 관람객 변동` : '-'})
                    </TableCell>
                    <TableCell></TableCell>
                </TableRow>
            </>
        );
    }
}

Movie.propTypes = {
    title: PropTypes.string.isRequired,
};

export default withStyles(styles)(Movie);
