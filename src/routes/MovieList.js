import React, { useState } from 'react';
import Movie from 'components/Movie';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

/*
2021.07.14 List 기능 추가 ver1.0 @TylerKang
*/
const styles = makeStyles({
    root: {
        // backgroundColor: '#1e272e',
    },
    paper: {
        // margin: '2% 10% 10% 10%',
        padding: '2%',
        minwidth: '60%',
        maxWidth: '70%',
        // height: '80%',
        margin: '2% auto auto auto',
        borderRadius: '20px',
        backgroundColor: '#1e272e',
        alignItems: 'center',
        textAlign: 'center',
    },
    tableCell: {
        textAlign: 'center',
        fontSize: '1.9rem',
        color: '#10ff00',
        paddingBottom: '4%',
        // marginBottom: '5%',
    },
});

const MovieList = ({ movies }) => {
    const classes = styles();

    return (
        <Paper className={classes.paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell colSpan="5" className={classes.tableCell}>
                            어제자 한국 박스오피스 Top 10 영화들
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {movies.map((movie) => {
                        // console.log('movie_list',movie);
                        return (
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
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default MovieList;
