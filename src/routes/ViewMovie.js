import React, { useEffect, useState } from 'react';
import '../css/App.css';
import { TableBody, Table, TableRow, TableCell, TableHead, TextField } from '@material-ui/core';
import { dbService } from 'fbase';
import Comment from 'components/Comment';
import { getNaverSearchResult, getHighQualityPosterLink } from 'components/APIs/NaverSearchAPI';
import { makeStyles } from '@material-ui/styles';
const cheerio = require('cheerio');

const styles = makeStyles({
    root: {
        margin: '2% 5% 5% 5% ',
    },
    movieTable: {
        // backgroundColor: '#636e72',
        borderRadius: '20px',
        backgroundColor: 'rgba(32, 35, 42, 0.9)',
        color: '#FFFFFF',
        marginBottom: '2%',
    },
    tableHeader: {
        fontSize: '1.0rem',
        color: '#FFFFFF',
    },
    movieTitle: {
        fontWeight: '700',
        fontSize: '2.5rem',
        borderBottom: 'none',
        color: '#10FF00',
    },
    tableCell: {
        fontWeight: '400',
        fontSize: '1.2rem',
        borderBottom: 'none',
        color: '#FFFFFF',
    },
    posterCell: { margin: 0, padding: '1%', borderBottom: 'none' },
    posterImg: {
        width: '100%',
        borderRadius: '10px',
        boxShadow: '.05rem .05rem .05rem .05rem #000000',
    },
    inputComment: {
        backgroundColor: '#2d3436',
        color: '#10FF00',
    },
});

const ViewMovie = ({ movieNm, userObj }) => {
    const [movieInfo, setMovieInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hqPoster, setHqPoster] = useState('');
    const [code, setCode] = useState(0);

    const classes = styles();

    useEffect(() => {
        console.log('네이버 API 접근!');
        getNaverSearchResult(movieNm).then((res) => {
            setMovieInfo(res);
            const tmpCode = res.link.split('?code=')[1];
            setCode(tmpCode);
            getHighQualityPosterLink(tmpCode)
                .then((res) => {
                    let $ = cheerio.load(res.data);
                    // ul.list--posts를 찾고 그 children 노드를 bodyList에 저장
                    const bodyList = $('#page_content').children('a').children('#targetImage');
                    setHqPoster(bodyList[0].attribs.src);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    }, [movieNm]);

    const printActors = (actors) => {
        let text = '';
        for (let i = 0; i < actors.length - 1; i++) {
            if (actors[i] === '') continue;
            if (i === actors.length - 2) text += actors[i];
            else text += actors[i] + ',';
        }
        return text;
    };

    const printMovieInfo = (movie) => {
        const actors = movie.actor.split('|');
        // console.log('userObj from printMovieInfo:', userObj.email);
        return (
            <>
                <TableRow hover={true}>
                    <TableCell align="center" rowSpan="6" width="30%" className={classes.posterCell}>
                        <a href={movie.link} rel="norefferer">
                            <img src={hqPoster} alt={movie.title} className={classes.posterImg} />
                        </a>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan="2" align="center" className={classes.movieTitle}>
                        {movie.title.replace(/<b>/gi, '').replace(/<\/b>/gi, '')}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="center" className={classes.tableCell}>
                        감독
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                        {movie.director.replace('|', '')}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="center" className={classes.tableCell}>
                        개봉
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                        {movie.pubDate}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="center" className={classes.tableCell}>
                        출연진
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                        {printActors(actors)}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align="center" className={classes.tableCell}>
                        평점
                    </TableCell>
                    <TableCell align="center" className={classes.tableCell}>
                        ⭐x{movie.userRating}
                    </TableCell>
                </TableRow>
            </>
        );
    };

    return (
        <div className={classes.root}>
            {isLoading ? (
                <Table className={classes.movieTable}>
                    <TableHead>
                        <TableRow>Loading..</TableRow>
                    </TableHead>
                </Table>
            ) : (
                <>
                    <Table className={classes.movieTable}>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan="4" align="center" className={classes.tableHeader}>
                                    포스터를 클릭하시면 해당 영화에 대한 네이버 검색 결과로 리다이렉트 됩니다.
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>{printMovieInfo(movieInfo)}</TableBody>
                        {/* const Comment = ({userObj, owner, colSpan, code }) */}
                    </Table>
                    {code > 0 ? (
                        <Comment code={code} owner={userObj.email} colSpan={3} />
                    ) : (
                        <TableRow>
                            <TableCell>'한줄평 기능 로딩중'</TableCell>
                        </TableRow>
                    )}
                </>
            )}
        </div>
    );
};

export default ViewMovie;
