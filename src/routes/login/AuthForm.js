import { authService, firebaseInstance } from 'fbase';
import React, { useState } from 'react';
import { createHashHistory } from 'history';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
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

const AuthForm = ({ userObj, isLoggedIn }) => {
    const [newAccount, setNewAccount] = useState(true);
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

    const classes = useStyles();
    return (
        <>
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
                        className="authInput" // CSS 적용해야.
                    />
                    <input
                        type="submit"
                        className="authInput authSubmit"
                        value={newAccount ? 'Create Account' : 'Log In'}
                    />
                    {error}
                </form>
                <span onClick={toggleAccount}>
                    {newAccount ? '==>Sign in<==' : '==>Create Account<=='}
                </span>
            </div>
        </>
    );
};

export default AuthForm;
