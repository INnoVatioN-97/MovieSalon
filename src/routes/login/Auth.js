import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import AuthForm from './AuthForm';
import SocialLogin from './SocialLogin';

const Auth = () => {
    return (
        <div className="authContainer">
            {/* <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      /> */}
            <AuthForm />
            <SocialLogin />
        </div>
    );
};
export default Auth;
//function component
