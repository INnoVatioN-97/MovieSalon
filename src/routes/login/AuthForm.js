import { authService, firebaseInstance } from 'fbase';
import React, { useState } from 'react';
import { createHashHistory } from 'history';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Box, Button } from '@material-ui/core';
// import '../css/Profile.css';

export const history = createHashHistory();

const useStyles = makeStyles({
    root: {
        // backgroundColor: 'red',
        // color: 'blue',
        margin: '0',
        textAlign: 'center',
        width: '100%',
    },
    title: {
        color: '#fff',
    },
    title_margin: {
        marginTop: '0%',
        marginBottom: '0%',
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        marginTop: '5%',
        marginBottom: '5%',
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    inputForms: {
        width: '40%',
        height: '30px',
        marginBottom: '1%',
        borderBlock: 'solid',
        borderBlockColor: '#00FC87',
        "@media (max-width: 750px)": {
            width: '70%',

          },
        writingMode: 'horizontal-tb',
        boxShadow: 'inset 255 255 255 32px',
    },
    label: {
        color: '#00FC87',
        marginBottom: '0.3%',
    },
    sign_Button: {
        width: '30%',
        height: '30px',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0 30px',
        "&:hover": {
            background: 'rgba(25,30,40,0.8)',
        },
        background: '#00FC87',
    },
    create_Account_btn: {
        marginTop: '3%',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        padding: '0 30px',
        color: 'white',
        width: '35%',
        height: '30px',
        "@media (max-width: 750px)": {
            width: '32%',
            height: '20px',
          },
        "&:hover": {
            background: 'rgba(25,30,40,0.8)',
        },
        background: '#00FC87',
    },

});

const AuthForm = ({ userObj, isLoggedIn }) => {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChange = (event) => {
        // onChange = press the key
        const {
            target: { name, value },
        } = event;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const signInSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            // log in
            data = await authService.signInWithEmailAndPassword(email, password);
            console.log('data from signInSubmit:', data);

            history.push('/');
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };
    const joinSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            // create account
            data = await authService.createUserWithEmailAndPassword(email, password);
            console.log('data from joinSubmit:', data);

            history.push('/');
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <h1 className={classes.title_margin}>Movie Salon🎥</h1>
            </div>
            <form onSubmit={signInSubmit}>
                <Box className={classes.box}>
                    <label className={classes.label}>Your E-mail address</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={onChange}
                        className={classes.inputForms}
                    />
                    <label className={classes.label}>Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={onChange}
                        className={classes.inputForms} // CSS 적용해야.
                    />
                </Box>
                <div className={classes.box}>
                    <input
                        id="signInSubmit"
                        type="submit"
                        className={classes.sign_Button}
                        value={'Sign In'}
                        // onSubmit={signInSubmit}
                    />
                    <input
                        id="joinSubmit"
                        type="button"
                        className={classes.create_Account_btn}
                        value={'Create Account'}
                        // onSubmit={joinSubmit}
                        onClick={joinSubmit}
                    />
                    {error}
                </div>
            </form>
        </div>
    );
};

export default AuthForm;
