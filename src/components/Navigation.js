import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Link, Drawer, Divider, List, MenuItem, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

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
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        // color: '#000000',
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    link: {
        // margin: 10,
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
        // margin: 10,
        // marginRight: '30px',
        // marginRight: '1%',
        width: '40px',
        borderRadius: '20px',
        verticalAlign: 'middle',
    },

    appBarProfile_Mobile__img: {
        // minWidth: '50px',
        // maxWidth: '270px',
        width: '270px',
    },
    appBarProfile_Mobile: {
        textAlign: 'center',
    },
}));

const Navigation = ({ userObj }) => {
    // console.log('userObj from Navigation', userObj);
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false,
    });

    // 네비게이션바 안에 들어갈 요소들 목록. 후에 map 함수를 사용해 출력한다.
    // userObj가 있으면 프로필을 띄우고 아니면 로그인하도록.
    const menuObj = Boolean(userObj)
        ? [
              {
                  isProfile: true,
                  key: 'profile',
                  url: '/#/profile',
                  text: `${Boolean(userObj.displayName) ? userObj.displayName : userObj.email}님`,
                  imgUrl: userObj.photoURL,
              },
              {
                  key: 'Home',
                  url: '/#',
                  text: 'Home',
              },
              {
                  key: 'movieList',
                  url: '/#/movieList',
                  text: '박스 오피스 (영화 진흥위원회)',
              },
              {
                  key: 'Search',
                  url: '/#/Search',
                  text: '영화 검색',
              },
              {
                  key: 'tmdbList',
                  url: '/#/tmdbList',
                  text: '박스 오피스 (TMDB)',
              },
          ]
        : [
              {
                  url: '/#/',
                  text: '로그인 하기',
              },
          ];

    const { mobileView, drawerOpen } = state;
    // 창 폭에 따라 모바일 뷰, 데스크톱 뷰로 체인지 (900 전후로)
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
            <AppBar
                position="static"
                className={classes.appbar}
                // style={{ background: 'transparent' }}
            >
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {menuObj.map((m) => (
                            // {console.log(m.imgUrl)}\
                            <Button color="inherit">
                                {m.isProfile ? (
                                    <>
                                        <Link
                                            href={m.url}
                                            className={classes.link}
                                            variant="inherit"
                                            color="inherit"
                                        >
                                            <img
                                                src={m.imgUrl}
                                                alt="profile"
                                                className={classes.appBarProfile}
                                            />
                                        </Link>
                                        <Link
                                            href={m.url}
                                            className={classes.link}
                                            variant="inherit"
                                            color="inherit"
                                        >
                                            {m.text}
                                        </Link>
                                    </>
                                ) : (
                                    <Link
                                        href={m.url}
                                        className={classes.link}
                                        variant="inherit"
                                        color="inherit"
                                    >
                                        {m.text}
                                    </Link>
                                )}
                            </Button>
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
                /**
                 * 맨위에 정의한 menuObj에 각 요소를 매핑해 드로워(모바일뷰), 앱 바(데스크탑 뷰)를 출력.
                 * 요소 내 isProfile의 여부에 따라 프로필 아이템의 이미지, Divider 처리를 하도록 설정함.
                 */
                <List onClick={handleDrawerClose}>
                    {menuObj.map((m) => (
                        <>
                            <MenuItem key={m.key}>
                                <Link
                                    href={m.url}
                                    className={classes.link}
                                    variant="inherit"
                                    color="inherit"
                                >
                                    {m.isProfile ? (
                                        <div className={classes.appBarProfile_Mobile}>
                                            <div>
                                                <img
                                                    src={m.imgUrl}
                                                    alt={m.key}
                                                    className={classes.appBarProfile_Mobile__img}
                                                />
                                            </div>
                                            <div style={{ fontWeight: 'bold' }}>{m.text}</div>
                                        </div>
                                    ) : (
                                        `${m.text}`
                                    )}
                                </Link>
                            </MenuItem>
                            {m.isProfile ? <Divider /> : ''}
                        </>
                    ))}
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
                    <Drawer
                        anchor="left"
                        open={drawerOpen}
                        onClose={handleDrawerClose}
                        className={classes.Drawer}
                    >
                        <div>{getDrawerChoices()}</div>
                    </Drawer>
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
