import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import AuthForm from './AuthForm';
import SocialLogin from './SocialLogin';
import 'css/LoginForm.css';
// import 'css/'

const Auth = () => {
    return (
        <div className="authContainer">
            <AuthForm />
            <SocialLogin />
        </div>
    );
};
export default Auth;
//function component
