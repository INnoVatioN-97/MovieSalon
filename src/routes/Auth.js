import { authService, firebaseInstance } from 'fbase';
import { useState } from 'react';
import { createHashHistory } from 'history';

export const history = createHashHistory();

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

    return (
        <>
            {isLoggedIn ? (
                <>
                    <p>{userObj.email}님 안녕하세요</p>
                    <button onClick={onLogOutClick}>Log Out</button>
                </>
            ) : (
                <div>
                    <form onSubmit={onSubmit}>
                        <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
                        <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
                        <input type="submit" value={newAccount ? 'Create Account' : 'Log In'} />
                        {error}
                    </form>
                    <span onClick={toggleAccount}>{newAccount ? '==>Sign in<==' : '==>Create Account<=='}</span>
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
