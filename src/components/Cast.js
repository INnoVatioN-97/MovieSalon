import React from 'react';
import axios from 'axios';
import { TableCell, TableRow, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DefaultProfileImage from 'images/DefaultProfileImage.png';
import DefaultProfileImage_2 from 'images/DefaultProfileImage_2.PNG';
import NoImageAvailable from 'images/NoImageAvailable.png';
import { withStyles } from '@material-ui/core/styles';
import '../css/View.css';
const styles = (theme) => ({
    root: {
        textAlign: 'center',
        // background: '#485460',
        height: '100%',
    },
    box: {
        display: 'flex',
        width: '35%',
        flexDirection: 'column',
        flexWrap: 'wrap',
        backgroundColor: '#20232a',
        color: '#10FF00',
    },
    box_film: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#20232a',
        color: '#10FF00',
        margin: '2% 12% 2% 12%',
        width: '75%',
        height: '100%',
        justifyContent: 'center',
    },
    profile_image: {
        width:'15%',
        "@media (max-width: 750px)": {
            width: '70%',

          },
    },
    cast_content: {
        marginLeft: '8%',
        justifyContent: 'center',
    },
    topMovieContainer: {
        margin: '2% 12% 2% 12%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: '80%',
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
        margin: '1% 1% 1% 1%', // Box 내부 아이템 margin값 조정
    },
    h2_similer: {
        color: '10FF00',
        fontSize: '1.2rem',
        textAlign: 'center',
        marginBottom: '3%',
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
            <img className={classes.profile_image} src={castInfo[5] ? imgUrl + castInfo[5] : DefaultProfileImage_2} />
            <Box className={classes.box}>
            <div className={classes.cast_content}>
            <h2>{castInfo[1]}</h2>
            <p>{castInfo[2] === 1 ? <p>woman</p> : <p>man</p>}</p>
            <p>{'🎂' + castInfo[3]}</p>
            <p>{'🏠' + castInfo[4]}</p>
            </div>
            </Box>
            </div>
            <Box className={classes.box_film}>
            <h2 className={classes.h2_similer}>🎞️출연작</h2>   
            <div className={classes.images}>
            {movies.map((m) => (
                        <span className={classes.images__cast}>
                            <Link to={queryUrl + m.id} className={classes.contentTitle}>
                                <img className={classes.images_border} 
                                src={m.poster_path ? imgUrl + m.poster_path : NoImageAvailable} alt="poster" />
                                <div>{m.title}</div>                           
                            </Link>
                            
                        </span>                        
                    ))}
            </div>
            </Box>
            </>
        );
    }
}

export default withStyles(styles)(Cast);
