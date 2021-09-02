import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import DefaultProfileImage from 'images/DefaultProfileImage.png';
import NoImageAvailable from 'images/NoImageAvailable.png';
import { Grid, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import ReactPlayer from 'react-player';
import '../css/Dialog.css';

/**
 * 박스오피스 / 개봉 예정작 버튼에 각각 ID값을 줘
 * 이를 처리하는 onOpenChange에서 id값에 따라 state값을 바꾸도록 설정. (line 71 참조)
 *
 *  Dialog를 중복해서 출력하는게 아니라
 * viewChange 여부에 따라 화면에 렌더링할 배열을 그에 맞게 설정하고 (line 152 부근 참조)
 * 그 후에 Dialog를 출력하는 함수를 하나만 if문 밖에 배치해서 코드 최적화 했음.
 * 출연진 : 기존 5명 출력에서 6명으로 늘리고 텍스트를 "주요 출연진"으로 바꿨음.
 *
 * 캐스팅 목록 그리드형 배치 위해 9번 줄에 Dialog 전담 css 파일 생성 후 적용.
 */
const styles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        background: '#eeeeee',
    },
    margins: {
        padding: '2,3,4,5',
    },
}));

const TmdbList = ({ tmdbHome, upcomming }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [viewChange, setViewChange] = useState(false);
    const [titles, setTitles] = useState('');
    const [movie, setMovie] = useState('');
    const [castMember, setCastMember] = useState([]);
    const [trailers, setTrailers] = useState([]);
    const [similars, setSimilars] = useState([]);
    const [tmdbs, setTmdbs] = useState(tmdbHome);
    const [upcommings, setUpcommings] = useState(upcomming);
    const [id, setId] = useState(0);

    useEffect(() => {
        const getMovieCasts = async (id) => {
            // 출연진 정보
            const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
            const {
                data: { cast },
            } = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}`
            );
            // console.log('cast', cast);
            setCastMember(cast.slice(0, 5));
            // setIsLoading(false);
        };

        const getMovieVideos = async (id) => {
            // 트레일러
            const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
            const {
                data: { results },
            } = await axios.get(`
            https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}&language=en-US`);
            console.log('videos', results);
            setTrailers(results.slice(0, 1));
            setIsLoading(false);
            // console.log('isLoading:', isLoading);
        };

        const getSimilerMovies = async (id) => {
            // 유사한 영화
            const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
            const {
                data: { results },
            } = await axios.get(
                `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${TMDB_API_KEY}&language=ko&page=1`
            );
            setSimilars(results.slice(0, 4));
        };

        console.log('useEffect에서의 id값: ', id);
        if (id !== 0 && isLoading) {
            console.log(`id:${id}`);
            getMovieCasts(id);
            getSimilerMovies(id);
            getMovieVideos(id);
            console.log('isLoading:', isLoading);
        } else {
            console.log(`id:${id}이므로 안가져왔음.`);
            console.log('isLoading:', isLoading);
        }
    }, [id, isLoading]);

    // 영화 포스터를 클릭하면 다이얼로그를 띄우도록 하는 함수
    const onOpenChange = (e) => {
        setOpen(!open);
        setTitles(e.target.title);
        console.log('e.target.id:', e.target.id);
        /**
         * 0: "653349"
         * 1: "7.5"
         * 2: "2021-08-27"
         * 3: "/kdnZgD1PfNQmRKWBAFvCsyNfFG7.jpg"
         * 4: "Vacation Friends"
         * 5: "모범생 마커스와 에밀리는 멕시코의 리조트에 갔다가"
         * 6: " 쾌락을 추구하는 론"
         * 7: " 카일라와 친구가 된다. 마커스와 에밀리는 새로 사귄 ‘휴가 친구’와 함께 아무 거리낌 없이 즐겁고 방탕한 일주일을 보낸다. 광란의 휴가를 보낸 몇 달 후"
         * 8: " 마커스와 에밀리는 자신들의 결혼식에 초대하지도 않은 론과 카일라가 나타나자 경악을 금치 못한다."
         */
        const movieObj = e.target.id.split(',');
        setMovie({
            movieCode: movieObj[0],
            rate: movieObj[1],
            openedAt: movieObj[2],
            poster_path: movieObj[3],
            movieName: movieObj[4],
            plot: movieObj.slice(5),
        });
        console.log('onOpenChange에서의 movies값: ', movie);
        const movieId = e.target.id.substring(0, 7);
        setId(movieId);
    };

    const onCloseHandle = () => {
        setIsLoading(true);
        setOpen(false);
        setId(0);
        setMovie([]);
        setTrailers('');
        setCastMember([]);
        setSimilars([]);
    };

    const onClickHandles = (event) => {
        let id = event.target.id;
        id === 'btnBoxOffice' ? setViewChange(false) : setViewChange(true);
        // console.log('viewChange', viewChange);
        // console.log('event:', event.target.id);
    };

    const printDialog = (castMember, url, trailer, trailers, similer) => {
        const { rate, openedAt, poster_path, movieName, plot } = movie;
        // console.log('printDialog:', rate, openedAt, poster_path, movieName, plot);
        return (
            <Dialog open={open} onClose={onCloseHandle} maxWidth="md">
                <DialogTitle>{titles}</DialogTitle>
                {isLoading ? (
                    <DialogContent>
                        <Table>
                            <TableHead>로딩중...</TableHead>
                        </Table>
                    </DialogContent>
                ) : (
                    <DialogContent>
                        <Table>
                            <TableRow>
                                <TableCell align="center" rowSpan="4" width="25%">
                                    <Link to={'/viewTmdb/' + id } >
                                    <img
                                        src={poster_path ? url + poster_path : NoImageAvailable}
                                        alt="Poster"
                                        width="200"
                                        height="300"
                                    />
                                    </Link>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <b>{movieName}</b>
                                </TableCell>
                                <TableCell>
                                    {' '}
                                    {openedAt} <b>[★{rate}]</b>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <b>줄거리:</b>
                                </TableCell>
                                <TableCell>
                                    <label>{plot}</label>
                                </TableCell>
                            </TableRow>
                        </Table>
                        <Table>
                            <TableRow>
                                <div className="container">
                                    {castMember.map((c) => (
                                        <TableCell>
                                            <>
                                                <Link to={'/Filmography/' + c.id}>
                                                    <img
                                                        className="item"
                                                        src={
                                                            c.profile_path
                                                                ? url + c.profile_path
                                                                : DefaultProfileImage
                                                        }
                                                        alt="castingMembers"
                                                        width="100"
                                                        height="100"
                                                    />
                                                </Link>{' '}
                                                <br />
                                                <span>
                                                    <b>{c.name}</b>
                                                </span>
                                                <br />[{c.character}]
                                            </>
                                        </TableCell>
                                    ))}
                                </div>
                            </TableRow>
                            <TableRow>
                                {trailers.map((t) => (
                                    <TableCell>
                                        {/*현재 어플리케이션을 돌리는 주소를 매핑 해야함(localhost) */}
                                        <ReactPlayer
                                            url={trailer + t.key + '&origin=https://localhost:3000'}
                                            controls
                                        ></ReactPlayer>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </Table>
                        <Table>
                            <TableHead>
                                <b>이런영화는 어떤가요?</b>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    {similer.map((s) => (
                                        <TableCell>
                                            <Link to={'/viewTmdb/' + s.id}>
                                                <img
                                                    id={s.id}
                                                    src={url + s.poster_path}
                                                    alt={url + s.poster_path}
                                                />
                                            </Link>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableBody>
                        </Table>
                    </DialogContent>
                )}
            </Dialog>
        );
    };
    const { classes } = styles();
    const url = 'https://image.tmdb.org/t/p/w200';
    const trailer = 'https://www.youtube.com/embed/';
    return (
        <>
            <br />
            <div align="center">
                <button className="button" id="btnBoxOffice" onClick={onClickHandles}>
                    BoxOffice
                </button>
                <button className="button" id="btnUpcomingRelease" onClick={onClickHandles}>
                    개봉예정작
                </button>
            </div>
            <br />
            {viewChange ? (
                <div className="child">
                    <Grid container spacing={3} align="center">
                        {upcommings.map((u) => (
                            <Grid item xs={2}>
                                <img
                                    className="poster"
                                    src={u.poster_path ? url + u.poster_path : NoImageAvailable}
                                    alt="img"
                                    onClick={onOpenChange}
                                    id={[
                                        u.id,
                                        u.vote_average,
                                        u.release_date,
                                        u.poster_path,
                                        u.original_title,
                                        u.overview,
                                    ]}
                                    title={u.title}
                                    width="200"
                                    height="300"
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            ) : (
                <div className="child">
                    <Grid container spacing={3} align="center">
                        {tmdbs.map((m, index) => (
                            <>
                                <Grid item xs={2}>
                                    <img
                                        className="poster"
                                        src={url + m.poster_path}
                                        alt="img"
                                        onClick={onOpenChange}
                                        id={[
                                            m.id,
                                            m.vote_average,
                                            m.release_date,
                                            m.poster_path,
                                            m.original_title,
                                            m.overview,
                                        ]}
                                        title={m.title}
                                    />
                                </Grid>
                            </>
                        ))}
                    </Grid>
                </div>
            )}
            {Boolean(movie) ? printDialog(castMember, url, trailer, trailers, similars) : ''}
        </>
    );
};

export default TmdbList;
