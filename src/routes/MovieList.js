import React, { useState } from 'react';
import Movie from 'components/Movie';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

/*
2021.07.14 List 기능 추가 ver1.0 @TylerKang
*/
const styles = makeStyles({
    root: {
        backgroundColor: '#a29bfe',
    },
    paper: {
        margin: '2% 10% 10% 10%',
        padding: '2%',
        borderRadius: '20px',
    },
});

const MovieList = ({ movies }) => {
    const [keyword, setKeyword] = useState('');

    const handleChange = (e) => {
        setKeyword(e.target.value);
    };

    const classes = styles();

    return (
        <Paper className={classes.paper}>
            <Table className={classes.table}>
                <TableBody>
                    <InputBase type="text" name="keyword" value={keyword} onChange={handleChange} placeholder="검색" />
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
