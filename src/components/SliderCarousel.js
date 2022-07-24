import React, { Component } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import NoImageAvailable from 'assets/images/NoImageAvailable.png';
import { Link } from 'react-router-dom';

export default class SliderCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      similer: [],
      movieId: props.id,
    };
  }

  getSimilerMovies = async (id) => {
    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    // const url = 'https://image.tmdb.org/t/p/w200';
    const {
      data: { results },
    } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${TMDB_API_KEY}&language=ko&page=1`
    );
    this.setState({ similer: results.slice(0, 8), isLoading: false });
    // console.log('responsive_similer', this.state.similer[0].poster_path);
  };

  componentDidMount() {
    this.getSimilerMovies(this.state.movieId);
  }

  render() {
    const { similer, isLoading } = this.state;
    const url = 'https://image.tmdb.org/t/p/w200';
    let qeuryUrl = '/viewTmdb/';
    const printSimiler = () => {
      const result = [];
      for (let i = 0; i < similer.length; i++) {
        result.push(
          <Link to={qeuryUrl + similer[i].id}>
            <img
              src={
                similer[i].poster_path
                  ? url + similer[i].poster_path
                  : NoImageAvailable
              }
              height='350px'
              alt={similer[i].title}
            />
          </Link>
        );
      }
      return result;
    };
    var settings = {
      dots: true,
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
            dots: true,
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
    return (
      <>
        <div>
          <h2> 🎞️이런 영화는 어때요? </h2>
          {isLoading ? (
            <p>로딩중</p>
          ) : (
            <div>
              <Slider {...settings}>{printSimiler()}</Slider>
            </div>
          )}
        </div>
      </>
    );
  }
}
