import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  alpha,
  makeStyles,
  Typography,
  MenuList,
  MenuItem,
  ListItemIcon,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import NoImageAvailable from 'assets/images/NoImageAvailable.png';

const styles = makeStyles((theme) => ({
  posterIcon: {
    // 영화 포스터의 비율은 1:1.3 (가로:세로)이다. 너비 기준값을 정해주면 너비 X 1.3으로 높이 설정하도록 함.
    width: '16rem',
    height: 'width * 1.3',
    verticalAlign: 'middle',
    // alignItems: 'left',
  },
  search: {
    textAlign: 'center',
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: '70%',
    [theme.breakpoints.up('sm')]: {
      margin: 'auto',
      width: '70%',
    },
  },
  searchIcon: {
    padding: theme.spacing(1, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    justifyContent: 'center',
    verticalAlign: 'middle',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  searchResult: {
    width: '100%',
    backgroundColor: 'rgba(12, 12, 12, 0.9)',
    margin: 'auto',
    borderRadius: ' 0 0 20px 20px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  searchResult__text: {
    color: '#ffffff',
    textDecoration: 'none',
    textAlign: 'center',
    borderBottom: 'none',
    wordBreak: 'keep-all',
  },
}));

const Search = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [searchedMovies, setSearchedMovies] = useState([]);

  const imgPathRoot = 'https://image.tmdb.org/t/p/w400'; // poster

  const classes = styles();
  const handleChange = (e) => {
    const target = e.target.value;
    if (target === '') {
      setKeyword('');
      setSearchedMovies([]);
    } else {
      setKeyword(e.target.value);
    }
  };

  useEffect(() => {
    if (keyword.length > 1) {
      getSearchMovies(keyword);
    }
  }, [keyword]);

  const getSearchMovies = async (keywords) => {
    const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
    const {
      data: { results },
    } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=ko&page=1&include_adult=true&query=${keywords}`
    );
    setSearchedMovies(results);
    setIsLoading(false);
  };
  let url = '/viewTmdb/';

  return (
    <>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder='Search…'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          onChange={handleChange}
          value={keyword}
          inputProps={{ 'aria-label': 'search' }}
        />

        <div className={classes.searchResult}>
          {isLoading ? (
            ''
          ) : (
            <div className={classes.searchResult}>
              {searchedMovies.map((m) => (
                <MenuList
                  onClick={() => {
                    setKeyword('');
                    setSearchedMovies([]);
                  }}
                >
                  {m.original_title || m.title.indexOf(keyword) > -1 ? (
                    <MenuItem>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '15rem',
                        }}
                      >
                        <Link
                          to={url + m.id}
                          className={classes.searchResult__text}
                        >
                          <ListItemIcon>
                            {m.poster_path ? (
                              <img
                                src={imgPathRoot + m.poster_path}
                                alt='poster'
                                className={classes.posterIcon}
                              />
                            ) : (
                              <img
                                src={NoImageAvailable}
                                alt='poster'
                                className={classes.posterIcon}
                              />
                            )}
                          </ListItemIcon>
                        </Link>
                        <Link
                          to={url + m.id}
                          className={classes.searchResult__text}
                        >
                          <Typography
                            variant='inherit'
                            style={{ whiteSpace: 'pre-line' }}
                          >
                            {m.release_date !== undefined
                              ? m.title + ' (' + m.release_date + ' 개봉)'
                              : m.title + ' (개봉일 정보 없음.)'}
                          </Typography>
                        </Link>
                      </div>
                    </MenuItem>
                  ) : (
                    <MenuItem className={classes.searchResult__text}>
                      <Typography variant='inherit'> 검색결과없음.</Typography>
                    </MenuItem>
                  )}
                </MenuList>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
  // }
};

export default Search;
