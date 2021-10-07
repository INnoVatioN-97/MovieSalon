import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DefaultProfileImage from 'images/DefaultProfileImage.png';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

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
        flexWrap: 'wrap',
        backgroundColor: '#20232a',
        color: '#10FF00',
        borderRadius: '3rem',
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
class TMDB extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            castMember: [],
            movieId: props.id,
        };
    }

    getMovieCasts = async (id) => {
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const {
            data: { cast },
        } = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}`
        );
        this.setState({ castMember: cast.slice(0, 5), isLoading: false }); // 출연진 7명만 추출(slice())
    };

    componentDidMount() {
        this.getMovieCasts(this.state.movieId);
    }

    render() {
        const { castMember} = this.state;
        const { classes } = this.props;
        const url = 'https://image.tmdb.org/t/p/w200';
        let castUrl = '/Filmography/';

        return (
            <>
                <div className={classes.root}>
                    <div className={classes.topMovieContainer}>
                        <div className={classes.topMovieContainer__container}>
                            <Box className={classes.box}>
                                <h2 className={classes.h2_similer}>🎬출연진</h2>
                                <div className={classes.images}>
                                    {castMember.map((c) => (
                                        <span className={classes.images__cast}>
                                            <Link
                                                to={castUrl + c.id}
                                                className={classes.contentTitle}
                                            >
                                                <img
                                                    className={classes.images_border}
                                                    src={
                                                        c.profile_path
                                                            ? url + c.profile_path
                                                            : DefaultProfileImage
                                                    }
                                                    alt="castingMembers"
                                                    width="100"
                                                />
                                                <div>{c.name}</div>
                                            </Link>
                                        </span>
                                    ))}
                                </div>
                            </Box>
                        </div>
                    </div>                 
                </div>
            </>
        );
    }
}

export default withStyles(styles)(TMDB);