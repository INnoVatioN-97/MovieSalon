import React from 'react';
import axios from 'axios';
import { TableBody, Table, TableRow, TableCell } from '@material-ui/core';
import TMDB from 'components/TMDB';
import '../css/App.css';

class ViewTMDB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            movieInfo: [],
            genre: [],
            posters: [],
        };
    }

    viewTmdbMovies = async () => {
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const id = this.props.match.params.id; // url에 포함된 쿼리스트링 정보(id값)
        const {
            data: { original_title, overview, title, poster_path, backdrop_path, tagline, genres, release_date },
        } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=ko`);
        this.setState({movieInfo: [title, original_title, tagline, overview, release_date],
             posters: [poster_path, backdrop_path],
             isLoading: false,
             genre: genres});
    }

    componentDidMount() {
        this.viewTmdbMovies();
    }

    render() {
        const { posters, movieInfo, genre} = this.state;
        const img = 'https://image.tmdb.org/t/p/w200'; // poster
        const backImg = 'https://image.tmdb.org/t/p/w1280'; // 1280 background img
        return (
            <>
            <Table>
            <TableRow hover={true} background={backImg + posters[1]} align='center' >
                <TableCell align="center">
                        <img src={img + posters[0]} alt={movieInfo[1]} />
                </TableCell>
            </TableRow>
            </Table>
            <Table>
                <TableRow>
                    <TableCell align='center' colSpan='2'><h1>{movieInfo[1]}</h1>
                    <br/><b>{movieInfo[4]}</b>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align='center'><b>{genre.map((g) => ('|'+g.name+'|'))}</b></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell align='center'><b>"{movieInfo[2]}"!</b><br/>{movieInfo[3]}</TableCell>
                </TableRow>
                <TMDB id={this.props.match.params.id} />
            </Table>
        </>
        );
        
    }

}

export default ViewTMDB;