import { authService, storageService } from 'fbase';
import React, { useState } from 'react';
import { createHashHistory } from 'history';
import { makeStyles } from '@material-ui/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';
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
        height: '30%',
        border: '10px',
        borderRadius: '70%',
        boxShadow: '0px 0px 7px 8px rgba(0,0,0,0.76)',
    },
});

const Profile = ({ refreshUser, userObj }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [attachment, setAttachment] = useState(userObj.photoURL);
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
        if (userObj.displayName !== newDisplayName || userObj.photoURL !== attachment) {
            let attachmentUrl = '';
            if (attachment !== '') {
                const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
                const response = await attachmentRef.putString(attachment, 'data_url');
                attachmentUrl = await response.ref.getDownloadURL();
            }
            await userObj.updateProfile({
                displayName: newDisplayName,
                uid: userObj.uid,
                photoURL: attachmentUrl,
                email: userObj.email,
            });
        }
        refreshUser();
        setAttachment('');
    };

    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        // 업로드한 사진을 가져와서
        const theFile = files[0];
        //reader 객체를 만들어
        if (theFile != null) {
            const reader = new FileReader();
            reader.onloadend = (finishedEvent) => {
                const {
                    currentTarget: { result },
                } = finishedEvent;
                setAttachment(result);
            };
            //reader 객체로 파일을 읽는다.
            reader.readAsDataURL(theFile);
        }
    };

    const classes = useStyles();

    return (
        <div className={classes.profileCard}>
            <div>
                <div>
                    <img src={userObj.photoURL} className={classes.profileImg} alt="profile" />
                    <label for="attach-file" className="factoryInput__label">
                        <span>Add photos</span>
                        <FontAwesomeIcon icon={faPlus} />
                    </label>
                    {attachment ? (
                        <img
                            src={attachment}
                            style={{
                                width: '50px',
                                height: '50px',
                                backgroundImage: attachment,
                            }}
                            alt="attachment"
                        />
                    ) : (
                        ''
                    )}
                </div>
                <h2>{userObj.email}</h2>
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            onChange={onChangeDisplayName}
                            type="text"
                            autoFocus
                            placeholder="별명 바꾸기"
                            value={newDisplayName}
                        />

                        <input
                            id="attach-file"
                            type="file"
                            accept="image/*"
                            onChange={onFileChange}
                            style={{
                                opacity: 0,
                            }}
                        />
                    </div>
                    <div>
                        <button onClick={onLogOutClick}>로그아웃</button>
                        <input type="submit" value="프로필 정보 변경" className="formBtn" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
