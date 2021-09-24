import React from 'react';
import { makeStyles, Link } from '@material-ui/core';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const styles = makeStyles({
    root: {
        // marginTop: '5%',
        // margin: 'auto',
        width: '100%',
        height: '10vh',
        fontSize: '1.rem',
        // height: '100%',
        // position: 'absolute',
        bottom: '0',
        backgroundColor: 'black',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        whiteSpace: 'nowrap',

        // position:absolute;
        // bottom:0;
        // background:#5eaeff;
    },
    profile: {
        textAlign: 'center',
        color: 'white',
        // textDecoration: 'none',
    },
    profile__Info: {
        // height: '100%',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
    },
});
const Footer = () => {
    const classes = styles();
    return (
        <div className={classes.root}>
            {/* 영일 */}
            <div className={classes.profile__Info}>
                <span>고영일(❄️25살, 녹아내리는 중❄️) </span>
                <br />
                <span>
                    <Link href="https://github.com/INnoVatioN-97/" className={classes.profile}>
                        <FontAwesomeIcon icon={faGithub} />
                        Github Address
                    </Link>
                </span>
                <span>koyoungil97@gmail.com</span>
            </div>
            {/* 신영 */}
            <div className={classes.profile__Info}>
                <span>강신영(🔥25살, 불타오르는 중🔥)</span>
                <br />
                <span>
                    <Link href="https://github.com/TylerKang-97" className={classes.profile}>
                        <FontAwesomeIcon icon={faGithub} />
                        Github Address
                    </Link>
                </span>
                <span>💪kingksy777@gmail.com</span>
            </div>
        </div>
    );
};

export default Footer;
