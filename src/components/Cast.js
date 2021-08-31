import React from 'react';
import axios from 'axios';
import { TableCell, TableRow, Table } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DefaultProfileImage from 'images/DefaultProfileImage.png';
import NoImageAvailable from 'images/NoImageAvailable.png';

class Cast extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        isLoading: false,
        personId: props.id,
        castInfo: [],
        movies: [],
    }
}

    getCastInfo = async (ID) => { // 인물 정보 api
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const {
            data: {id, name, gender, birthday, place_of_birth, profile_path},
        } = await axios.get(`https://api.themoviedb.org/3/person/${ID}?api_key=${TMDB_API_KEY}&language=en-US`);
        this.setState({castInfo: [id, name, gender, birthday, place_of_birth, profile_path ] });
    }

    getFilmoMovies = async (ID) => { // 인물이 출연한 영화 api
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const {
            data: { cast },
        } = await axios.get(`https://api.themoviedb.org/3/person/${ID}/movie_credits?api_key=${TMDB_API_KEY}&language=ko`);
        this.setState({movies: cast.slice(0,5)});
    }

    componentDidMount() {
        this.getCastInfo(this.state.personId);
        this.getFilmoMovies(this.state.personId);
    }

    render() {
        const { castInfo, movies } = this.state;
        const imgUrl = 'https://image.tmdb.org/t/p/w200';
        let queryUrl = '/viewTmdb/';
        return(
            <>
            <TableRow>
                <TableCell><img src={ castInfo[5] ? imgUrl + castInfo[5] : DefaultProfileImage} alt={castInfo[1]}
                width="150" height="150"/></TableCell>
                    <TableCell>
                        <TableRow><h2>{castInfo[1]}</h2></TableRow>
                        <TableRow>{castInfo[3]}</TableRow>
                        <TableRow>{castInfo[2] === 1 ? (<p>woman</p>) : (<p>man</p>)}</TableRow>
                        <TableRow>{castInfo[4]}</TableRow>
                    </TableCell>
            </TableRow>
            <TableRow>
                {movies.map((m) => (
                    <TableCell><Link to={ queryUrl + m.id }><img src={m.poster_path ? imgUrl + m.poster_path : NoImageAvailable }/></Link></TableCell>
                ))}
            </TableRow>
            
            
            </>
        );
    }

    }

export default Cast;