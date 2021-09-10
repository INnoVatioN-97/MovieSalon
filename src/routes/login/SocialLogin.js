import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub } from '@fortawesome/free-brands-svg-icons';
import { authService, firebaseInstance } from 'fbase';
import { createHashHistory } from 'history';
import { makeStyles } from '@material-ui/styles';
export const history = createHashHistory();

const styles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
    },
});
const SocialLogin = () => {
    const onSocialClick = async (event) => {
        try {
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
        } catch (error) {
            alert(
                '로그인에 문제가 발생했습니다. 혹시 같은 아이디에 다른 플랫폼으로 로그인을 시도하셨나요??'
            );
        }
    };
    const classes = styles();
    return (
        <div className={classes.root}>
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
