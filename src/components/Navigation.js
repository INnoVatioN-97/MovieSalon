import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Link,
  Drawer,
  Divider,
  List,
  MenuItem,
  Button,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { alpha, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Search from 'components/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    alignItems: 'center',
    backgroundColor: '#2f3640',
    color: '#10FF00',
  },

  appbarMobile: {
    alignItems: 'left',
    backgroundColor: '#2f3640',
    color: '#10FF00',
    height: '100%',
  },
  appBarProfile: {
    width: '40px',
    borderRadius: '20px',
    verticalAlign: 'middle',
  },
  appbarDrawer: {
    color: '#10FF00',
    backgroundColor: '#202124',
    height: '100%',
  },
  appBarProfile_Mobile__img: {
    width: '270px',
    borderRadius: '20px',
  },
  appBarProfile_Mobile: {
    textAlign: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    marginBottom: '0.5rem',
  },
  link: {
    paddingLeft: 10,
    paddingRight: 3,
    fontSize: '1.2rem',
    '&:hover': {
      color: '#ffffff',
      fontSize: '1.4rem',
    },
  },
  search: {
    textAlign: 'center',
    position: 'relative',
    borderRadius: '20px',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },

    [theme.breakpoints.up('sm')]: {
      margin: 'auto',
      width: '70%',
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
}));

const Navigation = ({ userObj }) => {
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  // ?????????????????? ?????? ????????? ????????? ??????. ?????? map ????????? ????????? ????????????.
  // userObj??? ????????? ???????????? ????????? ????????? ??????????????????.
  const menuObj = Boolean(userObj)
    ? [
        {
          isProfile: true,
          key: 'profile',
          url: '/#/profile',
          text: `${
            Boolean(userObj.displayName) ? userObj.displayName : userObj.email
          }???`,
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
          text: '???????? BoxOffice',
        },
        {
          key: 'tmdbList',
          url: '/#/tmdbList',
          text: '???????BoxOffice (WORLD)',
        },
        {
          key: 'About',
          url: '/#/aboutUs',
          text: 'About Us',
        },
      ]
    : [
        {
          key: 'preLogin',
          url: '/#/',
          text: '????????? ??????',
        },
        {
          key: 'About..',
          url: '/#/aboutUs',
          text: 'About Us',
        },
      ];

  const { mobileView, drawerOpen } = state;
  // ??? ?????? ?????? ????????? ???, ???????????? ?????? ????????? (900 ?????????)
  useEffect(() => {
    const setResponsiveView = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({
            ...prevState,
            mobileView: false,
            drawerOpen: false,
          }));
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
        position='static'
        className={classes.appbar}
        // style={{ background: 'transparent' }}
      >
        <Toolbar>
          <Typography className={classes.title} variant='h6' noWrap>
            {menuObj.map((m) => (
              // {console.log(m.imgUrl)}\
              <Button color='inherit' key={m.key}>
                {m.isProfile ? (
                  <>
                    <Link
                      href={m.url}
                      className={classes.link}
                      variant='inherit'
                      color='inherit'
                      underline='none'
                    >
                      <img
                        src={m.imgUrl}
                        alt='profile'
                        className={classes.appBarProfile}
                      />
                    </Link>
                    <Link
                      href={m.url}
                      className={classes.link}
                      variant='inherit'
                      color='inherit'
                      underline='none'
                    >
                      {m.text}
                    </Link>
                  </>
                ) : (
                  <Link
                    href={m.url}
                    className={classes.link}
                    variant='inherit'
                    color='inherit'
                    underline='none'
                  >
                    {m.text}
                  </Link>
                )}
              </Button>
            ))}
            {Boolean(userObj) ? <Search /> : null}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  };

  const displayMobileView = () => {
    // ???????????? ???????????? ??? ?????? ????????? ???????????? ?????? (???????????? ?????? ??? ????????? State??? ??????.)
    const handleDrawerOpen = () => {
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
      // console.log('drawer open!');
    };

    // ???????????? ?????? ???????????? ????????? ??????????????? ?????? ???????????? ????????? ???????????? ?????? (??? ????????? ??????)
    const handleDrawerClose = () => {
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
      // console.log('drawerClosed');
    };

    // Drawer??? ????????? Drawer??? ???????????? ?????????.
    const getDrawerChoices = () => {
      // console.log('getDrawerChoices ??????');
      return (
        /**
         * ????????? ????????? menuObj??? ??? ????????? ????????? ?????????(????????????), ??? ???(???????????? ???)??? ??????.
         * ?????? ??? isProfile??? ????????? ?????? ????????? ???????????? ?????????, Divider ????????? ????????? ?????????.
         */
        <List onClick={handleDrawerClose} className={classes.appbarDrawer}>
          {menuObj.map((m) => (
            <>
              <MenuItem key={m.key}>
                <Link
                  href={m.url}
                  className={classes.link}
                  variant='inherit'
                  color='inherit'
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
      <AppBar position='static' className={classes.appbarMobile}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
          {Boolean(userObj) ? <Search /> : null}
          <Drawer
            anchor='left'
            open={drawerOpen}
            onClose={handleDrawerClose}
            className={classes.drawer}
          >
            {getDrawerChoices()}
          </Drawer>
        </Toolbar>{' '}
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
