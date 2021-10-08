import React, { useState, useEffect } from 'react';
// import MJC_LOGO from 'images/MJC_LOGO.svg';
import Profile012 from 'images/Profile012.jpg';
import ProfileKSY from 'images/ProfileKSY.jpg';
import { makeStyles } from '@material-ui/core';

const styles = makeStyles({
    //이미지 flex:left로
    root: {
        margin: '3% 10% 10% 10% ',
        // padding: 'auto',
        display: 'flex',
        flexDirection: 'row',
        whiteSpace: 'wrap',
        justifyContent: 'space-around',
        borderRadius: '2vw',
        backgroundColor: 'rgba(12, 12, 12, 0.9)',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        margin: '5%',
        width: '100%',
        height: '100%',
    },
    profileImg: {
        padding: '2% 2% 2% 2%',
        borderRadius: '20%',
        // minWidth: '300px',
        // maxWidth: '500px',
        // minHeight: '300px',
        // maxHeight: '500px',
        width: '30vw',
        height: '30vw',
    },
    schoolLogo: {
        margin: '0',
        padding: '0',
        width: '4vw',
        height: '4vw',
        opacity: '0.4',
        borderRadius: '70%',
    },
    headline: {
        fontSize: '2.5vw',
        margin: 'auto',
        padding: '0',
        color: '#10FF00',
        textAlign: 'center',
    },
    name: {
        fontSize: '2.1vw',
        margin: '2%',
    },
    comment: {
        // display: 'inline-block',
        wordBreak: 'keep-all',
        margin: '1%',
        fontSize: '1.7vw',
    },
    myStack: {
        backgroundColor: 'grey',
        fontSize: '1.5vw',
        padding: '3%',
    },
    myStack__Title: { textAlign: 'center' },
    myStack__List: { color: 'white' },
});

const AboutDetail = ({ name }) => {
    const [meObj, setMeObj] = useState({});
    const [init, setInit] = useState(false);

    const classes = styles();

    /**
     * 들어온 이름 정보가 누구냐에 따라 만나이, 취미 등 다르게 설정될 수 있도록.
     * <속성 정보>
     * name, school, major, age, hobby, comment
     */
    useEffect(() => {
        const curYear = new Date().getFullYear();
        const born012 = new Date(1997, 6, 3).getFullYear();
        const bornKSY = new Date(1997, 8, 11).getFullYear();

        name === '고영일'
            ? setMeObj({
                  name: name,
                  major: '전자공학과',
                  school: '명지전문대학',
                  year: '16',
                  age: `${curYear - born012}`,
                  hobby: '밥먹고 코딩하다 현타오기',
                  headline: '오늘도 나는 코딩에 쩔어산다...',
                  profileImg: Profile012,
              })
            : setMeObj({
                  name: name,
                  major: '전자공학과',
                  school: '명지전문대학',
                  year: '16',
                  age: `${curYear - bornKSY}`,
                  hobby: 'MLB 더쇼 하기',
                  headline: '아... 기모찌...',
                  profileImg: ProfileKSY,
              });
        setInit(true);
    }, []);

    return init ? (
        <div className={classes.root}>
            <img src={meObj.profileImg} className={classes.profileImg} alt="프로필 사진" />
            <div className={classes.container}>
                <div style={{ textAlign: 'center' }}>자기소개</div>
                <div className={classes.headline}>"{meObj.headline}"</div>
                <div>
                    <br />
                    <div className={classes.name}>저는 {name}입니다... 아...</div>
                    <div className={classes.comment}>
                        저는 {meObj.school}을 졸업해 지금 만 {meObj.age}살 이며,
                        {meObj.school}에 {meObj.major} {meObj.year}학번으로 입학했고,
                        {meObj.hobby}가 내 취미입니다... 살려주세요 취업시켜주세요
                    </div>
                    <div className={classes.myStack}>
                        <div className={classes.myStack__Title}> 사용 가능한 기술 스택</div>
                        <div className={classes.myStack__List}>
                            <ul>
                                <li>자바</li>
                                <li>JSP</li>
                                <li>Javascript</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
           {/*<img src={MJC_LOGO} className={classes.schoolLogo} alt="학교 로고" /> */} 
        </div>
    ) : (
        <div>initializing...</div>
    );
};

export default AboutDetail;
