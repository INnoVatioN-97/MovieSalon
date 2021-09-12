import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { fade, makeStyles, Table, TableRow, Typography, TableCell, MenuList, Paper, MenuItem, ListItemIcon } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import NoImageAvailable from 'images/NoImageAvailable.png';
const styles = makeStyles((theme) => ({
    posterIcon: {
        width: '3.5rem',
        height: '3.5rem',
        borderRadius: '70%',
        verticalAlign: 'middle',
        alignItems: 'left',
    },
    search: {
        textAlign: 'center',
        position: 'relative',
        borderRadius: '20px',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        width: '70%',
        [theme.breakpoints.up('sm')]: {
            margin: 'auto',
            width: '70%',
        },
    },
    searchIcon: {
        // matgin: '20%',
        padding: theme.spacing(1, 1),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        // alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'top',
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
        backgroundColor: '#1F272E',
        margin: 'auto',
        borderRadius: ' 0 0 20px 20px',
    },
    searchResult__text: {
        color: '#ffffff',
        textDecoration: 'none',
        textAlign: 'center',
        borderBottom: 'none',
        // verticalAlign: 'middle',
    },
}));

const Search = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [searchedMovies, setSearchedMovies] = useState([]);

    const imgPathRoot = 'https://image.tmdb.org/t/p/w400'; // poster

    const classes = styles();
    const handleChange = (e) => {
        // this.setState({ keyword: e.target.value });
        // this.getSearchMovies(e.target.value);
        const target = e.target.value;
        // console.log('handleChange 호출, 값:', target);
        if (target === '') {
            setKeyword();
            setSearchedMovies([]);
        } else {
            setKeyword(e.target.value);
            getSearchMovies(e.target.value);
        }
    };

    const getSearchMovies = async (keywords) => {
        // console.log('getSearchMovies 호출');
        const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
        const {
            data: { results },
        } = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=ko&page=1&include_adult=true&query=${keywords}`
        );
        // this.setState({ searchMovies: results, isLoading: false });
        // if(results.length === 0 )
        setSearchedMovies(results);
        setIsLoading(false);
        // console.log('isLoading:', isLoading);
    };

    // componentDidMount() {}

    // render() {
    // const { isLoading, searchMovies } = this.state;
    let url = '/viewTmdb/';

    return (
        <>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
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
                        <Paper className={classes.searchResult}>
                            {searchedMovies.map((m) => (
                                <MenuList
                                    onClick={() => {
                                        setKeyword('');
                                        setSearchedMovies([]);
                                    }}
                                >
                                    {m.original_title || m.title.indexOf(keyword) > -1 ? (
                                        <MenuItem className={classes.searchResult__text}>
                                            <Link to={url + m.id} className={classes.searchResult__text}>
                                                <ListItemIcon>
                                                    {m.poster_path ? (
                                                        <img
                                                            src={imgPathRoot + m.poster_path}
                                                            alt="poster"
                                                            className={classes.posterIcon}
                                                        />
                                                    ) : (
                                                        <img src={NoImageAvailable} alt="poster" className={classes.posterIcon} />
                                                    )}
                                                </ListItemIcon>
                                                <Typography variant="inherit">{m.title + ' (' + m.release_date + ' 개봉)'}</Typography>
                                            </Link>
                                        </MenuItem>
                                    ) : (
                                        <MenuItem className={classes.searchResult__text}>
                                            <Typography variant="inherit"> 검색결과없음.</Typography>
                                        </MenuItem>
                                    )}
                                </MenuList>
                            ))}
                        </Paper>
                    )}
                </div>
            </div>
        </>
    );
    // }
};

export default Search;
