import { authService, storageService } from 'fbase';
import React, { useState } from 'react';
import { createHashHistory } from 'history';
import { makeStyles } from '@material-ui/styles';
import { v4 as uuidv4 } from 'uuid';
export const history = createHashHistory();

const useStyles = makeStyles((theme) => ({
    profileCard: {
        backgroundColor: '#eeeeee',
        color: '#000000',
        textAlign: 'center',
        height: '100%',
    },
    profileCard__up: {
        // backgroundColor: 'red',
        background: 'linear-gradient(90deg, #3389D4 30%, #EFBAA8 90%)',
        height: '20%',
    },
    profileCard__down: {
        // alignItems: 'center',
        // textAlign: 'center',
        margin: 'auto',
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
    },
    profileImg: {
        position: 'relative',
        margin: '20px',
        marginTop: '5%',
        marginBottom: '2%',
        // transform: 'translate(50, 50)',
        width: '20%',
        height: '20%',

        // objectFit: 'cover',
        border: '10px',
        borderRadius: '70%',
        boxShadow: '0px 0px 7px 8px rgba(0,0,0,0.5)',
    },
    formInput: {
        cursor: 'pointer',
        width: '100%',
        padding: '10px 20px',
        borderRadius: '20px',
        border: '2px solid black',
        textAlign: 'center',
        backgroundColor: 'white',
        color: 'black',
        boxSizing: 'border-box',
        marginBottom: '3%',
    },
    formBtn: {
        cursor: 'pointer',
        width: '100%',
        padding: '10px 20px',
        border: '2px solid black',
        textAlign: 'center',
        color: 'white',
        borderRadius: '20px',
        backgroundColor: '#04aaff',
        marginBottom: '3%',
    },

    cancelBtn: {
        cursor: 'pointer',
        width: '100%',
        padding: '10px 20px',
        border: '2px solid black',
        textAlign: 'center',
        color: 'white',
        borderRadius: '20px',
        backgroundColor: 'tomato',
        marginBottom: '3%',
    },
}));

const Profile = ({ refreshUser, userObj }) => {
    const classes = useStyles();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const [attachment, setAttachment] = useState(userObj.photoURL);
    const [isChange, setIsChange] = useState(false);
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
        /**
         * btnConfirmChangeProfile
         * btnChangeProfile
         */
        console.log('event.target.id:', event.target.id);
        event.preventDefault(); //창 새로고침 막기.
        if (userObj.displayName === newDisplayName && userObj.photoURL === attachment) {
            console.log('아무것도 안바뀜.');
        } else {
            if (userObj.displayName !== newDisplayName && userObj.photoURL === attachment) {
                await userObj.updateProfile({
                    displayName: newDisplayName,
                    uid: userObj.uid,
                    photoURL: userObj.photoURL,
                    email: userObj.email,
                });
                console.log('별명만 바뀜');
            } else if (userObj.photoURL !== attachment && userObj.displayName === newDisplayName) {
                let attachmentUrl = '';
                if (attachment !== '') {
                    const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
                    const response = await attachmentRef.putString(attachment, 'data_url');
                    attachmentUrl = await response.ref.getDownloadURL();
                }
                await userObj.updateProfile({
                    displayName: userObj.displayName,
                    uid: userObj.uid,
                    photoURL: attachmentUrl,
                    email: userObj.email,
                });
                console.log('프사만 바뀜');
            } else if (userObj.displayName !== newDisplayName && userObj.photoURL !== attachment) {
                let attachmentUrl = '';
                if (attachment !== '') {
                    const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
                    const response = await attachmentRef.putString(attachment, 'data_url');
                    attachmentUrl = await response.ref.getDownloadURL();
                }
                await userObj.updateProfile({
                    displayName: newDisplayName,
                    uid: userObj.uid,
                    photoURL: attachment !== userObj.photoURL ? attachmentUrl : userObj.photoURL,
                    email: userObj.email,
                });
                console.log('프사, 별명 둘다 바뀜');
            }
            refreshUser();
            setAttachment(userObj.photoURL);
            setIsChange(false);
            history.push('/');
        }
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

    const onChangeProfile = () => {
        setIsChange(!isChange);
        console.log('isChange:', isChange);
    };

    return (
        <div className={classes.profileCard}>
            <div className={classes.profileCard__up}>
                <div>
                    {isChange ? (
                        <label for="attach-file" className="factoryInput__label">
                            <img
                                src={userObj.photoURL}
                                className={classes.profileImg}
                                alt="profile"
                                style={{
                                    cursor: 'pointer',
                                    transform: 'translate(50, 50)',

                                    objectFit: 'cover',
                                }}
                            />
                            <h5>
                                {attachment && userObj.photoURL !== attachment ? (
                                    <p>
                                        교체할 사진
                                        <img
                                            src={attachment}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                backgroundImage: attachment,
                                                borderRadius: '70%',
                                                border: '4',
                                                borderColor: '#000000',
                                            }}
                                            alt="attachment"
                                        />
                                    </p>
                                ) : (
                                    '사진을 클릭해 프로필 사진을 변경하세요.'
                                )}
                            </h5>
                        </label>
                    ) : (
                        <img src={userObj.photoURL} className={classes.profileImg} alt="profile" />
                    )}
                </div>
            </div>
            <h2>{userObj.email}</h2>
            <form onSubmit={onSubmit}>
                <div className={classes.profileCard__down}>
                    {isChange ? (
                        <>
                            <input
                                onChange={onChangeDisplayName}
                                type="text"
                                autoFocus
                                placeholder="별명 바꾸기"
                                value={newDisplayName}
                                className={classes.formInput}
                            />

                            <input
                                type="submit"
                                value="정보 수정 확인"
                                className={classes.formBtn}
                                disabled={Boolean(userObj.displayName === newDisplayName)}
                            />
                            <input
                                type="button"
                                onClick={onChangeProfile}
                                className={classes.cancelBtn}
                                value="취소"
                            />
                            <input
                                id="attach-file"
                                type="file"
                                accept="image/*"
                                onChange={onFileChange}
                                style={{
                                    opacity: 0,
                                }}
                                hidden={true}
                                width="100%"
                            />
                        </>
                    ) : (
                        <>
                            <h3 style={{ color: '#000000' }}>{newDisplayName}</h3>
                            <input
                                type="button"
                                onClick={onChangeProfile}
                                className={classes.formBtn}
                                value="프로필 정보 변경"
                            />
                            <input
                                type="button"
                                onClick={onLogOutClick}
                                className={classes.cancelBtn}
                                value="로그아웃"
                            />
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Profile;
