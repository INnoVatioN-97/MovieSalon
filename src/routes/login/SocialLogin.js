import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { authService, firebaseInstance } from 'fbase';
import { createHashHistory } from 'history';

export const history = createHashHistory();

const SocialLogin = () => {
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
        <div className="authBtns">
            <button onClick={onSocialClick} name="google" className="authBtn">
                Continue with Google
                <FontAwesomeIcon icon={faGoogle} />
            </button>
            <button onClick={onSocialClick} name="github" className="authBtn">
                Continue with Github
                <FontAwesomeIcon icon={faGithub} />
            </button>
        </div>
    );
};

export default SocialLogin;
