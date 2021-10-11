import React from 'react';
import { makeStyles, Link } from '@material-ui/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Profile012 from 'images/Profile012.jpg';
import ProfileKSY from 'images/ProfileKSY.jpg';

const styles = makeStyles({
    root: {
        margin: '5% 10%',
        fontSize: '1.0rem',
        backgroundColor: 'rgba(12, 12, 12, 0.9)',
        color: '#10FF00',
        borderRadius: '20px',
        textAlign: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        justifyContent: 'space-evenly',
    },
    name: {
        fontSize: '1.3rem',
        color: 'white',
    },
    prifile: {
        color: '#2ecc71',
    },
    profile__Info: { display: 'flex', flexDirection: 'column' },
    profileImg: {
        marginTop: '5%',
        margin: 'auto',
        borderRadius: '70%',
        width: '15rem',
        height: '15rem',
    },
});
const About = () => {
    const classes = styles();
    return (
        <div className={classes.root}>
            {/* 영일 */}
            <div className={classes.profile__Info}>
                <Link
                    href="/#/AboutDetail?name=고영일"
                    className={classes.link}
                    variant="inherit"
                    color="inherit"
                    underline="none"
                >
                    <img src={Profile012} className={classes.profileImg} alt="고영일 Profile" />
                    <div className={classes.name}>고영일(❄️25살, 녹아내리는 중❄️)</div>
                </Link>
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
                <Link
                    href="/#/AboutDetail?name=강신영"
                    className={classes.link}
                    variant="inherit"
                    color="inherit"
                    underline="none"
                >
                    <img src={ProfileKSY} className={classes.profileImg} alt="고영일 Profile" />
                    <div className={classes.name}>강신영(🔥25살, 불타오르는 중🔥)</div>
                </Link>
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

export default About;
