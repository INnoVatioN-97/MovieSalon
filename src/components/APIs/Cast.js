import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DefaultProfileImage_2 from 'assets/images/DefaultProfileImage_2.png';
import NoImageAvailable from 'assets/images/NoImageAvailable.png';
import '../../assets/css/View.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const useStyles = makeStyles({
  root: {
    textAlign: 'center',
    height: '100%',
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
    width: '10rem',
    '@media (max-width: 750px)': {
      width: '70%',
    },
    borderRadius: '2.3rem',
  },
  cast_content: {
    marginLeft: '8%',
    justifyContent: 'center',
  },
  topMovieContainer: {
    color: '#10FF00',
    borderRadius: '2.3rem',
    backgroundColor: '#20232a',
    // margin: '2% 12% 2% 12%',
    margin: '2% auto',
    width: '40%',
    padding: '3%',
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
  carosol: {
    position: 'relative',
    marginLeft: '12%',
    marginBottom: '5%',
    width: '70%',
    backgroundColor: '#20232a',
    color: '#10FF00',
    paddingTop: '1%',
    paddingLeft: '3%',
    paddingRight: '3%',
    paddingBottom: '2%',
    borderRadius: '2.3rem',
  },
});

const imgUrl = 'https://image.tmdb.org/t/p/w200';
const queryUrl = '/viewTmdb';

function Cast({ id }) {
  useEffect(() => {
    getCastInfo(personId).then(() => getFilmoMovies(personId));
  }, []);

  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [personId, setPersonId] = useState(id);
  const [castInfo, setCastInfo] = useState([]);
  const [movies, setMovies] = useState([]);

  const getCastInfo = async (ID) => {
    // 인물 정보 api
    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const {
      data: { id, name, gender, birthday, place_of_birth, profile_path },
    } = await axios.get(
      `https://api.themoviedb.org/3/person/${ID}?api_key=${TMDB_API_KEY}&language=en-US`
    );

    setCastInfo([id, name, gender, birthday, place_of_birth, profile_path]);
  };

  const getFilmoMovies = async (ID) => {
    // 인물이 출연한 영화 api
    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const {
      data: { cast },
    } = await axios.get(
      `https://api.themoviedb.org/3/person/${ID}/movie_credits?api_key=${TMDB_API_KEY}&language=ko`
    );
    setMovies(cast.slice(0, cast.length));
    setIsLoading(true);
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className={classes.topMovieContainer}>
            <img
              className={classes.profile_image}
              src={
                castInfo[5] ? `${imgUrl}${castInfo[5]}` : DefaultProfileImage_2
              }
              alt='profileImg'
            />
            <div className={classes.cast_content}>
              <h2>{castInfo[1]}</h2>
              <p>
                {Number.isInteger(castInfo[2]) && castInfo[2] === 1 ? (
                  <p>woman</p>
                ) : (
                  <p>man</p>
                )}
              </p>
              {castInfo[3] && <p>{'🎂' + castInfo[3]}</p>}
              {castInfo[4] && <p>{'🏠' + castInfo[4]}</p>}
            </div>
          </div>
          <Box className={classes.carosol}>
            <h2> 🎞️출연작 </h2>
            <Slider {...settings}>
              {/* <PrintCast /> */}
              {movies.map((m) => (
                <Link to={`${queryUrl}/${m?.id}`}>
                  <img
                    key={m?.id}
                    src={
                      m?.poster_path
                        ? imgUrl + m?.poster_path
                        : NoImageAvailable
                    }
                    height='350px'
                    alt={m?.title}
                  />
                </Link>
              ))}
            </Slider>
          </Box>
        </>
      ) : (
        <h2>initializing...</h2>
      )}
    </>
  );
}

export default Cast;

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
