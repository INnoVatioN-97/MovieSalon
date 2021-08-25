import React from 'react';
import axios from 'axios';
import { TableCell, TableRow, Table } from '@material-ui/core';
import { Link } from 'react-router-dom';

class TMDB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            castMember: [],
            similer: [],
            movieId: props.id,
        };
    }

    getMovieCasts = async (id) => {
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const {
            data: { cast },
        } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}`);
        this.setState({ castMember: cast.slice(0, 5), isLoading: false }); // 출연진 7명만 추출(slice())
    };

    getSimilerMovies = async (id) => {
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const {
            data: { results },
        } = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${TMDB_API_KEY}&language=ko&page=1`);
        this.setState({similer: results.slice(0,5)});
    }

    componentDidMount() {
        this.getMovieCasts(this.state.movieId);
        this.getSimilerMovies(this.state.movieId);
    }

    render() {
        const { castMember, similer } = this.state;
        const url = 'https://image.tmdb.org/t/p/w200';
        let qeuryUrl = '/viewTmdb/';
        return(
            <>
            <TableRow>
            <div className="container">
                {castMember.map((c) => (
                    <TableCell>
                        <>
                            <img className='item' 
                            src={c.profile_path ? url + c.profile_path : 
                                'https://image.tmdb.org/t/p/w200/rAgsOIhqRS6tUthmHoqnqh9PIAE.jpg'} 
                            alt="castingMembers" width="100" height="100" />
                            <br />
                            <span><b>{c.name}</b></span>
                            <br/>[{c.character}] 
                        </>
                    </TableCell>
                ))}
            </div>
            </TableRow>
            <Table>
            <TableRow>
                {similer.map((s) => (
                <TableCell><Link to={qeuryUrl + s.id} ><img src={url + s.poster_path}/></Link><br/><b>{s.title}</b></TableCell>
                ))}
            </TableRow>
            </Table>
            </>
        )
    }
}

export default TMDB;