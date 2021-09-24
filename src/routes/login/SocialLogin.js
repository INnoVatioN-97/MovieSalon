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
        flexWrap: 'wrap',
        // margin: 'auto 5% auto 5%',
        justifyContent: 'space-around',
        // marginLeft: '15%',
        '@media (max-width: 750px)': {
            // marginLeft: '0%',
        },
        textAlign: 'center',
    },
    google: {
        width: '40%',
        '@media (max-width: 750px)': {
            // width: '65%',
        },
        // height: '4vh',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        fontWeight: '700',
        // padding: '0 30px',
        '&:hover': {
            background: '#2980b9',
            whiteSpace: 'nowrap',
            color: 'white',
        },
        background: 'linear-gradient(90deg, #c0392b 30%, #FBC014 35%, #2980b9 80%)',
        color: 'white',
        textAlign: 'center',
        fontSize: '2vw',
        whiteSpace: 'nowrap',
    },
    github: {
        width: '40%',
        '@media (max-width: 750px)': {
            // width: '65%',
        },
        // height: '30px',
        // marginLeft: '3%',
        // fontSize: 'vw',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        fontWeight: '700',
        // padding: '0 30px',
        '&:hover': {
            background: '#ffffff',
            color: '#202329',
        },
        background: 'rgba(25,30,40,0.8)',
        color: 'white',
        textAlign: 'center',
        fontSize: '2vw',
        whiteSpace: 'nowrap',
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
                '로그인에 문제가 발생했습니다. \n혹시 같은 아이디의 다른 플랫폼 계정으로 로그인을 시도하셨나요??\n(ex: ABCDE@gmail.com / ABCDE@naver.com)'
            );
        }
    };
    const classes = styles();
    return (
        <div className={classes.root}>
            <button onClick={onSocialClick} name="google" className={classes.google}>
                Sign with <FontAwesomeIcon icon={faGoogle} />
            </button>
            <button onClick={onSocialClick} name="github" className={classes.github}>
                Sign with <FontAwesomeIcon icon={faGithub} />
            </button>
        </div>
    );
};

export default SocialLogin;
