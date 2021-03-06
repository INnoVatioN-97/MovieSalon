import React, { useState, useEffect } from 'react';
import Movie from 'components/Movie';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import { TableCell, TableHead, TableRow } from '@material-ui/core';

/*
2021.07.14 List 기능 추가 ver1.0 @TylerKang
*/
const styles = makeStyles({
  root: {},
  paper: {
    padding: '2%',
    margin: '2% auto auto auto',
    width: '50%',
    '@media (max-width: 750px)': {
      width: '80%',
    },
    borderRadius: '2.5rem',
    backgroundColor: '#1e272e',
    alignItems: 'center',
    textAlign: 'center',
  },
  tableCell: {
    textAlign: 'center',
    fontSize: '2.2rem',
    color: '#10ff00',
    lineHeight: '2.2rem',
  },
});

const MovieList = ({ movies, kobis }) => {
  const classes = styles();
  const [isLoading, setIsLoading] = useState(true);
  // console.log('movies', movies);
  // console.log('kobis', kobis);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 700);
  }, []);
  const printKRBoxOffice = () => {
    return (
      <>
        {kobis.map((k) => {
          return (
            <>
              {movies.map((movie) => {
                // console.log('movie_list',movie);
                return (
                  <>
                    {movie === undefined ? (
                      <p></p>
                    ) : (
                      <>
                        {k.movieNm === movie.title ? (
                          <Movie
                            key={movie.id}
                            id={movie.id}
                            movieNm={movie.title}
                            rank={k.rank}
                            rankInten={k.rankInten}
                            openDt={k.openDt}
                            audiCnt={k.audiCnt}
                            audiAcc={k.audiAcc}
                            audiInten={k.audiInten}
                          />
                        ) : (
                          <p></p>
                        )}
                      </>
                    )}
                  </>
                );
              })}
            </>
          );
        })}
      </>
    );
  };

  return (
    <Paper className={classes.paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell colSpan='5' className={classes.tableCell}>
              📈{} 한국 박스오피스 Top 10
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? <p>로딩중</p> : <>{printKRBoxOffice()}</>}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default MovieList;
