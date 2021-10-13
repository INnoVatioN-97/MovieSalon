import React from 'react';
import AuthForm from './AuthForm';
import SocialLogin from './SocialLogin';
import 'css/LoginForm.css';

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
