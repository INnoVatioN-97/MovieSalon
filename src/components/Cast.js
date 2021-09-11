import React from 'react';
import axios from 'axios';
import { TableCell, TableRow, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DefaultProfileImage from 'images/DefaultProfileImage.png';
import NoImageAvailable from 'images/NoImageAvailable.png';
import { withStyles } from '@material-ui/core/styles';
const styles = (theme) => ({
    root: {
        textAlign: 'center',
        // background: '#485460',
        height: '100%',
    },

    pageTitle: {
        textAlign: 'center',
        fontSize: '4.2rem',
        marginTop: '2%',
        color: '#fff',
        // marginBottom: 15,
    },

    box: {
        display: 'flex',
        width: 'auto',
        flexDirection: 'column',
        flexWrap: 'wrap',
        backgroundColor: '#20232a',
        color: '#10FF00',
        // sx: { maxWidth: 300 },
    },

    topMovieContainer: {
        margin: '2% 12% 2% 12%',
        display: 'flex',
        flexDirection: 'row',
        // padding: '5% 0 5% 0',
        justifyContent: 'center',
        height: '80%',
    },

    topMovieContainer__container: {
        marginRight: '0%',
        marginLeft: ' 0%',
        width: '100%',
        height: '100%',
    },
    images: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
    },
    images__cast: {
        color: 'white',
        margin: '2% 3% 3% 3%', // Box 내부 아이템 margin값 조정
    },
    h2_similer: {
        color: '10FF00',
        textAlign: 'center',
        marginLeft: '6%',
        marginBottom: '0',
    },
    images_border: {
        borderRadius: '4px 4px 4px 4px',
    },
    contentTitle: {
        color: 'white',
        fontSize: '1.3rem',
        textDecoration: 'none',
    },
});
class Cast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            personId: props.id,
            castInfo: [],
            movies: [],
        };
    }

    getCastInfo = async (ID) => {
        // 인물 정보 api
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const {
            data: { id, name, gender, birthday, place_of_birth, profile_path },
        } = await axios.get(`https://api.themoviedb.org/3/person/${ID}?api_key=${TMDB_API_KEY}&language=en-US`);
        this.setState({ castInfo: [id, name, gender, birthday, place_of_birth, profile_path] });
    };

    getFilmoMovies = async (ID) => {
        // 인물이 출연한 영화 api
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const {
            data: { cast },
        } = await axios.get(`https://api.themoviedb.org/3/person/${ID}/movie_credits?api_key=${TMDB_API_KEY}&language=ko`);
        this.setState({ movies: cast.slice(0, 5) });
    };

    componentDidMount() {
        this.getCastInfo(this.state.personId);
        this.getFilmoMovies(this.state.personId);
    }

    render() {
        const { castInfo, movies } = this.state;
        const { classes } = this.props;
        /*
        0_id, 1_name, 2_gender, 3_birthday, 4_place_of_birth, 5_profile_path
        */
        const imgUrl = 'https://image.tmdb.org/t/p/w200';
        let queryUrl = '/viewTmdb/';
        return (
            <>
            <div className={classes.topMovieContainer}>
            <img src={imgUrl + castInfo[5]} />

            <Box className={classes.box}>
            <h2>{castInfo[1]}</h2>
            <p>{castInfo[3]}</p>
            <p>{castInfo[4]}</p>
            </Box>
            </div>
            </>
        );
    }
}

export default withStyles(styles)(Cast);
