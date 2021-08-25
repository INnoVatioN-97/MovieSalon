import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Link,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

/**
 * 8월 15일 개선점
 * 기존 네비게이션 속 요소들을 따로 JSON 배열로 빼냈음. (데스크탑용 / 모바일용 반응형으로 구성하기 위해 )
 *
 *
 */
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appbar: {
        alignItems: 'center',
    },

    appbarMobile: {
        alignItems: 'left',
    },
    // '@media (max-width: 900px)': {
    //     alignItems: 'left',
    // },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    link: {
        // marginLeft: 6,
        // marginRight: 3,
        // marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 3,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    appBarProfile: {
        margin: 'auto',
        width: '40px',
        borderRadius: '20px',
    },
}));

const Navigation = ({ userObj }) => {
    console.log('userObj from Navigation', userObj);
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    });

    // 네비게이션바 안에 들어갈 요소들 목록. 후에 map 함수를 사용해 출력한다.
    // userObj가 있으면 프로필을 띄우고 아니면 로그인하도록.
    const menuObj = Boolean(userObj)
        ? [
              {
                  url: '/#',
                  text: 'Home',
              },
              {
                  url: '/#/movieList',
                  text: '박스 오피스 (영화 진흥위원회)',
              },
              {
                  url: '/#/Search',
                  text: '영화 검색',
              },
              {
                  url: '/#/tmdbList',
                  text: '박스 오피스 (TMDB)',
              },
              {
                  url: '/#/profile',
                  text: `${userObj.displayName}님`,
                  imgUrl: userObj.photoURL,
              },
          ]
        : [
              {
                  url: '/#',
                  text: 'Home',
              },
              {
                  url: '/#/movieList',
                  text: '박스 오피스 (영화 진흥위원회)',
              },
              {
                  url: '/#/Search',
                  text: '영화 검색',
              },
              {
                  url: '/#/tmdbList',
                  text: '박스 오피스 (TMDB)',
              },
              {
                  url: '/#/auth',
                  text: '로그인 하기',
              },
          ];

    const { mobileView, drawerOpen } = state;
    useEffect(() => {
        const setResponsiveView = () => {
            return window.innerWidth < 900
                ? setState((prevState) => ({ ...prevState, mobileView: true }))
                : setState((prevState) => ({ ...prevState, mobileView: false }));
        };
        setResponsiveView();
        window.addEventListener('resize', () => setResponsiveView());
        return () => {
            window.removeEventListener('resize', () => setResponsiveView());
        };
    }, []);

    const classes = useStyles();
    const displayDesktopView = () => {
        return (
            <AppBar position="static" className={classes.appbar}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {menuObj.map((m) => (
                            // {console.log(m.imgUrl)}\
                            <Link
                                href={m.url}
                                className={classes.link}
                                variant="inherit"
                                color="inherit"
                            >
                                {m.imgUrl !== undefined ? (
                                    <img
                                        src={userObj.photoURL}
                                        alt="profile"
                                        className={classes.appBarProfile}
                                    />
                                ) : (
                                    ''
                                )}
                                {m.text}
                            </Link>
                        ))}
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    };

    const displayMobileView = () => {
        // 모바일뷰 화면에서 三 버튼 클릭시 발생되는 함수 (드로워가 열릴 수 있도록 State를 변경.)
        const handleDrawerOpen = () => {
            setState((prevState) => ({ ...prevState, drawerOpen: true }));
            console.log('drawer open!');
        };

        // 드로워가 열린 상태에서 바깥을 클릭하거나 메뉴 아이템을 클릭시 발생되는 함수 (앱 드로워 닫힘)
        const handleDrawerClose = () => {
            setState((prevState) => ({ ...prevState, drawerOpen: false }));
            console.log('drawerClosed');
        };

        // Drawer가 열릴때 Drawer속 내용물을 표시함.
        const getDrawerChoices = () => {
            // console.log('getDrawerChoices 발생');
            return (
                <List onClick={handleDrawerClose}>
                    <ListItem button key="text">
                        <Link
                            href="/#/Profile"
                            className={classes.link}
                            variant="inherit"
                            color="inherit"
                        >
                            <MenuItem>
                                {userObj.displayName ? (
                                    <>
                                        <img src={userObj.photoURL} alt="profile" />{' '}
                                        {userObj.displayName}
                                        님(Profile)
                                    </>
                                ) : (
                                    'Profile'
                                )}
                            </MenuItem>
                        </Link>
                    </ListItem>
                    <Divider />

                    <ListItem>
                        <Link href="/#" className={classes.link} variant="inherit" color="inherit">
                            <MenuItem>Home</MenuItem>
                        </Link>
                    </ListItem>

                    <ListItem>
                        <Link
                            href="/#/movieList"
                            className={classes.link}
                            variant="inherit"
                            color="inherit"
                        >
                            <MenuItem>박스 오피스 (영화 진흥위원회)</MenuItem>
                        </Link>
                    </ListItem>

                    <ListItem>
                        <Link
                            href="/#/Search"
                            className={classes.link}
                            variant="inherit"
                            color="inherit"
                        >
                            <MenuItem>영화 검색</MenuItem>
                        </Link>
                    </ListItem>

                    <ListItem>
                        <Link
                            href="/#/tmdbList"
                            className={classes.link}
                            variant="inherit"
                            color="inherit"
                        >
                            <MenuItem>박스 오피스 (TMDB)</MenuItem>
                        </Link>
                    </ListItem>
                </List>
            );
        };
        return (
            <AppBar position="static" className={classes.appbarMobile}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
                        <div>{getDrawerChoices()}</div>
                    </Drawer>
                    {/* {console.log('mobileView!')} */}
                </Toolbar>
            </AppBar>
        );
    };

    return (
        <header className={classes.root}>
            {mobileView ? displayMobileView() : displayDesktopView()}
        </header>
    );
};

export default Navigation;
