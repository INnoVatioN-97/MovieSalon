import React from 'react';
import { makeStyles, Link } from '@material-ui/core';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Profile012 from 'images/Profile012.png';

const styles = makeStyles({
    root: {
        margin: '5%',
        fontSize: '1.0rem',
        backgroundColor: 'rgba(12, 12, 12, 0.9)',
        color: '#10FF00',
        borderRadius: '20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        whiteSpace: 'nowrap',
    },
    profile__Info: { display: 'flex', flexDirection: 'column' },
    profileImg: {},
});
const About = () => {
    const classes = styles();
    return (
        <div className={classes.root}>
            {/* 영일 */}
            <div className={classes.container}>
                <div className={classes.profile__Info}>
                    <img src={Profile012} className={classes.profileImg} alt="고영일 Profile" />
                    <span>고영일(❄️25살, 녹아내리는 중❄️) </span>
                    <span>
                        <Link href="https://github.com/INnoVatioN-97/" className={classes.profile}>
                            <FontAwesomeIcon icon={faGithub} />
                            Github Address
                        </Link>
                    </span>
                    <span>koyoungil97@gmail.com</span>
                </div>
            </div>
            {/* 신영 */}
            <div className={classes.container}>
                <div className={classes.profile__Info}>
                    <img src={Profile012} className={classes.profileImg} alt="고영일 Profile" />
                    <span>강신영(🔥25살, 불타오르는 중🔥)</span>
                    <span>
                        <Link href="https://github.com/TylerKang-97" className={classes.profile}>
                            <FontAwesomeIcon icon={faGithub} />
                            Github Address
                        </Link>
                    </span>
                    <span>💪kingksy777@gmail.com</span>
                </div>
            </div>
        </div>
    );
};

export default About;
