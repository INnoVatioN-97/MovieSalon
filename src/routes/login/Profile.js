import { authService, firebaseInstance } from 'fbase';
import React, { useState } from 'react';
import { createHashHistory } from 'history';
import { makeStyles } from '@material-ui/styles';

export const history = createHashHistory();

const useStyles = makeStyles({
    profileCard: {
        // backgroundColor: 'red',
        // color: 'blue',
        textAlign: 'center',
    },
    profileImg: {
        margin: '20px',
        width: '30%',
        border: '10px',
        borderRadius: '70%',
        boxShadow: '0px 0px 7px 8px rgba(0,0,0,0.76)',
    },
});

const Profile = ({ refreshUser, userObj }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        history.push('/');
    };

    const onChangeDisplayName = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };

    const onSubmit = async (event) => {
        event.preventDefault(); //창 새로고침 막기.
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
                uid: userObj.uid,
                photoURL: userObj.photoURL,
                email: userObj.email,
            });
        }
        refreshUser();
    };

    const classes = useStyles();

    return (
        <div className={classes.profileCard}>
            <div>
                <img src={userObj.photoURL} className={classes.profileImg} alt="profile" />
                <h2>{userObj.email}</h2>
                <div>
                    <form onSubmit={onSubmit}>
                        <input
                            onChange={onChangeDisplayName}
                            type="text"
                            autoFocus
                            placeholder="별명 바꾸기"
                            value={newDisplayName}
                        />
                        <input type="submit" value="Update DisplayName" className="formBtn" />
                    </form>
                </div>
                <button onClick={onLogOutClick}>로그아웃</button>
            </div>
        </div>
    );
};

export default Profile;
