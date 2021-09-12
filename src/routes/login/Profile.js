import { authService, storageService } from 'fbase';
import React, { useState } from 'react';
import { createHashHistory } from 'history';
import { v4 as uuidv4 } from 'uuid';

//makeStyles 너무 길어서 css폴더로 이동.
import ProfileCSS from 'css/ProfileCSS';

export const history = createHashHistory();

const Profile = ({ refreshUser, userObj }) => {
    const classes = ProfileCSS();
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
                        <label for="attach-file">
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
                                                width: '2.7rem',
                                                height: '2.7rem',
                                                backgroundImage: attachment,
                                                borderRadius: '70%',
                                                border: '4',
                                                verticalAlign: 'middle',
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
            <form onSubmit={onSubmit}>
                <div className={classes.profileCard__down}>
                    <h2
                        style={{
                            fontSize: '3vw',
                        }}
                    >
                        {userObj.email}
                    </h2>
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
                                disabled={Boolean(userObj.displayName === newDisplayName) && Boolean(userObj.photoURL === attachment)}
                            />
                            <input type="button" onClick={onChangeProfile} className={classes.cancelBtn} value="취소" />
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
                            <h3 style={{ fontSize: '3vw' }}>{newDisplayName}</h3>
                            <input type="button" onClick={onChangeProfile} className={classes.formBtn} value="프로필 정보 변경" />
                            <input type="button" onClick={onLogOutClick} className={classes.cancelBtn} value="로그아웃" />
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Profile;
