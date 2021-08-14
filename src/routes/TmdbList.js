import React from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Table, TableCell, TableRow } from '@material-ui/core';
import { index } from 'cheerio/lib/api/traversing';
import '../css/Dialog.css';

const url = 'https://image.tmdb.org/t/p/w200';

class TmdbList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            tmdbs: [],
            titles: '',
            movies: '',
            open: false,
            castMember: [],
            upcommings: [],
            viewChange: false,
        };
        this.onOpenChange = this.onOpenChange.bind(this);
        this.onCloseHandle = this.onCloseHandle.bind(this);
        this.onClickHandles = this.onClickHandles.bind(this);
    }

    getTrendingMovies = async () => {
        // Tmdb API 이용
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const {
            data: { results },
        } = await axios.get(`
        https://api.themoviedb.org/3/trending/movie/day?api_key=${TMDB_API_KEY}&language=ko`);
        console.log('trending_Movies', results);
        this.setState({ tmdbs: results, isLoading: false });
    };

    getUpcommingMovies = async () => {
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const {
            data: { results },
        } = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${TMDB_API_KEY}&language=ko&page=1&region=kr`);
        console.log('upcomming_movies', results);
        this.setState({ upcommings: results, isLoading: false });
    };

    getMovieCasts = async (id) => {
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const {
            data: { cast },
        } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}`);
        console.log('cast', cast);
        this.setState({ castMember: cast.slice(0, 5), isLoading: false }); // 출연진 5명만 추출(slice())
    };

    // 영화 포스터를 클릭하면 다이얼로그를 띄우도록 하는 함수
    onOpenChange = (e) => {
        // Click발생한 영화포스터의 제목, 영화정보(,로 split), 다이얼로그 상태변경
        this.setState({ open: !this.state.open, titles: e.target.title, movies: e.target.id.split(',') });
        console.log('titles', this.state.titles);
        console.log('target값', e.target.id.substring(0, 7));
        console.log('movies_posterClick', this.state.movies); // 클릭된 포스터의 영화정보 가져옴
        this.getMovieCasts(e.target.id.substring(0, 7)); // 현재 state에서 가져오지 않고 바로 target에 잡힌 날것의 데이터 삽입
    };

    onCloseHandle = () => {
        this.setState({ open: false });
    };
    onClickHandles = (event) => {
        let id = event.target.id;
        id === 'btnBoxOffice' ? this.setState({ viewChange: false }) : this.setState({ viewChange: true });
        console.log('viewChange', this.state.viewChange);
        console.log('event:', event.target.id);
    };

    componentDidMount() {
        this.getTrendingMovies();
        this.getUpcommingMovies();
    }

    printDialog = (castMember, movies) => {
        return (
            <Dialog open={this.state.open} onClose={this.onCloseHandle}>
                <DialogTitle>{this.state.titles}</DialogTitle>
                <DialogContent>
                    <Table>
                        <TableRow>
                            <TableCell>
                                <img src={url + movies[3]} alt="Poster" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>개봉예정일: {movies[2]}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                줄거리: <label>{movies.slice(4)}</label>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">출연진</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <div className="container">
                                    {castMember.map((c) => (
                                        <>
                                            <span className="item">
                                                <span>
                                                    <img src={url + c.profile_path} alt="castingMembers" />
                                                    <br />
                                                </span>
                                                <span>{c.name}</span>
                                            </span>
                                        </>
                                    ))}
                                </div>
                            </TableCell>
                        </TableRow>
                    </Table>
                </DialogContent>
            </Dialog>
        );
    };

    render() {
        const { tmdbs, movies, castMember, upcommings, viewChange } = this.state;
        return (
            <>
                <button id="btnBoxOffice" onClick={this.onClickHandles}>
                    BoxOffice
                </button>
                <button id="btnUpcomingRelease" onClick={this.onClickHandles}>
                    개봉예정작
                </button>
                <br />
                {viewChange
                    ? upcommings.map((u) => (
                          <>
                              <img
                                  src={url + u.poster_path}
                                  alt="img"
                                  onClick={this.onOpenChange}
                                  id={[u.id, u.vote_average, u.release_date, u.poster_path, u.overview]}
                                  title={u.title}
                              />
                              {/* <Dialog open={this.state.open} onClose={this.onCloseHandle}>
                                  <DialogTitle>{this.state.titles}</DialogTitle>
                                  <DialogContent>
                                      <Table>
                                          <TableRow>
                                              <TableCell>
                                                  <img src={url + movies[3]} />
                                              </TableCell>
                                          </TableRow>
                                          <TableRow>
                                              <TableCell>개봉예정일: {movies[2]}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                              <TableCell>
                                                  줄거리: <label>{movies.slice(4)}</label>
                                              </TableCell>
                                          </TableRow>
                                          <TableRow>
                                              <TableCell align="center">출연진</TableCell>
                                          </TableRow>
                                          <TableRow>
                                              <TableCell>
                                                  {castMember.map((c) => (
                                                      <label>
                                                          <img src={url + c.profile_path} width="60" height="60"></img>
                                                          <br />
                                                          {c.name}
                                                          <br />
                                                      </label>
                                                  ))}
                                              </TableCell>
                                          </TableRow>
                                      </Table>
                                  </DialogContent>
                              </Dialog> */}
                              {this.printDialog(castMember, movies)}
                          </>
                      ))
                    : tmdbs.map((m) => (
                          <>
                              <img
                                  src={url + m.poster_path}
                                  alt="img"
                                  onClick={this.onOpenChange}
                                  id={[m.id, m.vote_average, m.release_date, m.poster_path, m.overview]}
                                  title={m.title}
                              />
                              {/* <Dialog open={this.state.open} onClose={this.onCloseHandle}>
                                  <DialogTitle>{this.state.titles}</DialogTitle>
                                  <DialogContent>
                                      <Table>
                                          <TableRow>
                                              <TableCell>
                                                  <img src={url + movies[3]} />
                                              </TableCell>
                                          </TableRow>
                                          <TableRow>
                                              <TableCell>개봉예정일: {movies[2]}</TableCell>
                                          </TableRow>
                                          <TableRow>
                                              <TableCell>
                                                  줄거리: <label>{movies.slice(4)}</label>
                                              </TableCell>
                                          </TableRow>
                                          <TableRow>
                                              <TableCell align="center">출연진</TableCell>
                                          </TableRow>
                                          <TableRow>
                                              <TableCell>
                                                  {castMember.map((c) => (
                                                      <label>
                                                          <img src={url + c.profile_path} width="60" height="60"></img>
                                                          <br />
                                                          {c.name}
                                                          <br />
                                                      </label>
                                                  ))}
                                              </TableCell>
                                          </TableRow>
                                      </Table>
                                  </DialogContent>
                              </Dialog> */}
                              {this.printDialog(castMember, movies)}
                          </>
                      ))}
            </>
        );
    }
}
export default TmdbList;
