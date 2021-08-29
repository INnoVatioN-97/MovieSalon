import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Grid, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
// firebase login import 추가
import 'firebase/firestore';
import 'firebase/auth';
import '../css/Home.css';

//https://material-ui.com/system/flexbox/#flex-wrap 에서
// Box 좀 보고 Home 화면에서 순위 세개 이쁘게 띄워야 함.

const useStyles = makeStyles({
    pageTitle: {
        textAlign: 'center',
        fontSize: '4.2rem',
        marginTop: 15,
        marginBottom: 15,
    },
    top3List: {
        listStyle: 'none',
        justifyContent: 'center',
    },
    box: {
        display: 'flex',
        flexWrap: 'nowrap',
        p: 1,
        m: 1,
        backgroundColor: '#f2f2f2',
        sx: { maxWidth: 300 },
    },
});

const Home = ({ movies, isLoggedIn, userObj, tmdbHome }) => {
    const [keyword, setKeyword] = useState('');
    const classes = useStyles();
    const url = 'https://image.tmdb.org/t/p/w500';
    const linkURL = '/viewTmdb/';

    const handleChange = (e) => {
        // this.setState({ keyword: e.target.value });
        setKeyword(e.target.value);
    };
    const printTop3Movies = () => {
        // TypeError 발생 최소화 (함수밖에서 movies가 선언이 되어있기 때문에 파라미터 존재 필요X)
        console.log('movies from printTop3Movies:', movies);
        let tmp = movies.slice(0, 3);

        return tmp.map((m) => (
            <Box>
                {m.movieNm.indexOf(keyword) > -1 ? (
                    <p>
                        {m.rank}위, {m.movieNm},
                    </p>
                ) : (
                    <p></p>
                )}
            </Box>
        ));
    };

    return (
        <>
            <input
                type="text"
                name="keyword"
                value={keyword}
                onChange={handleChange}
                placeholder="검색"
            />
            <div className={classes.pageTitle}>어제의 Top 3 영화들</div>
            <Box className={classes.box}>{printTop3Movies()}</Box>
            {userObj ? <p>{userObj.email}님 안녕하세요.</p> : alert('로그인 먼저 해주세요')}
                <div className="childs" >   
                    <Grid container spacing={3} align='center'>
                        {tmdbHome.slice(0,3).map((tmdb) => (
                            <>
                                <Grid item xs={4}>
                                    <Link to={ linkURL + tmdb.id}>
                                    <img
                                    className="posters"
                                    src={url + tmdb.backdrop_path}
                                    alt={tmdb.title}
                                    /></Link>
                                    <span className="texts">
                                    <h3>{tmdb.title}</h3>
                                    </span>
                                </Grid>
                            </>
                        ))}    
                    </Grid>
                </div>
        </>
    );
};
export default Home;
