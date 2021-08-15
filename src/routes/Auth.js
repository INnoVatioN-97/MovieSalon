import { authService, firebaseInstance } from 'fbase';
import { useState } from 'react';
import { createHashHistory } from 'history';
// import '../css/Profile.css';

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
                // <>
                <aside className="profile-card">
                    <header>
                        {/* <!-- here’s the avatar --> */}
                        <a target="_blank" href="#">
                            <img src={userObj.photoURL} className="hoverZoomLink" alt="profile" />
                        </a>

                        {/* <!-- the username --> */}
                        <h1>{userObj.displayName}</h1>

                        {/* <!-- and role or location --> */}
                        <h2>{userObj.email}</h2>
                    </header>

                    {/* <!-- bit of a bio; who are you? --> */}
                    <div className="profile-bio">
                        <p>프로필 메시지</p>
                    </div>

                    <div>
                        <button onClick={onLogOutClick}>로그아웃</button>
                    </div>

                    {/* <!-- some social links to show off --> */}
                    {/* <ul class="profile-social-links">
                        <li>
                            <a target="_blank" href="https://www.facebook.com/creativedonut">
                                <i class="fa fa-facebook"></i>
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="https://twitter.com/dropyourbass">
                                <i class="fa fa-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="https://github.com/vipulsaxena">
                                <i class="fa fa-github"></i>
                            </a>
                        </li>
                        <li>
                            <a target="_blank" href="https://www.behance.net/vipulsaxena">
                                <i class="fa fa-behance"></i>
                            </a>
                        </li>
                    </ul> */}
                    {/* <div></div>
  <p>
      <img src={userObj.photoURL} alt="profile" />
  </p>
  
  <p>{userObj.email}님 안녕하세요</p>
  <button onClick={onLogOutClick}>Log Out</button> */}
                    {/* </> */}
                </aside>
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
