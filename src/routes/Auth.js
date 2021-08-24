import { authService, firebaseInstance } from 'fbase';
import React, { useState } from 'react';
import { createHashHistory } from 'history';
import { makeStyles } from '@material-ui/styles';
// import '../css/Profile.css';

export const history = createHashHistory();

const useStyles = makeStyles({
    profileCard: {
        // backgroundColor: 'red',
        // color: 'blue',
        textAlign: 'center',
    },
    profileImg: {
        margin: '20px',
        width: '30%',
        border: '10px',
        borderRadius: '70%',
        boxShadow: '0px 0px 7px 8px rgba(0,0,0,0.76)',
    },
});

const Auth = ({ userObj, isLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');
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
    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                // create account
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            history.push('/');
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const onSocialClick = async (event) => {
        const {
            target: { name },
        } = event; //ES6
        let provider;
        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        history.push('/');
        console.log(data.user.email);
    };

    const classes = useStyles();
    return (
        <>
            {isLoggedIn ? (
                // <>
                <div className={classes.profileCard}>
                    <div>
                        <img src={userObj.photoURL} className={classes.profileImg} alt="profile" />
                        <h1>{userObj.displayName}</h1>
                        <h2>{userObj.email}</h2>
                        <button onClick={onLogOutClick}>로그아웃</button>
                    </div>
                </div>
            ) : (
                <div>
                    <form onSubmit={onSubmit}>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={onChange}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={onChange}
                        />
                        <input type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
                        {error}
                    </form>
                    <span onClick={toggleAccount}>
                        {newAccount ? '==>Sign in<==' : '==>Create Account<=='}
                    </span>
                    <div>
                        <button onClick={onSocialClick} name="google">
                            Continue with Google
                        </button>
                        <button onClick={onSocialClick} name="github">
                            Continue with Github
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Auth;
