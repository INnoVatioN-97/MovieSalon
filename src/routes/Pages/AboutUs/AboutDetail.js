import React, { useState, useEffect } from 'react';

import MJC_LOGO from 'images/MJC_LOGO.svg';
import { meObj012, meObjKSY } from 'components/AboutUs/AboutMe';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

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
    intro: {
        textAlign: 'center',
        margin: '2%',
        // marginBottom: '8%',
        borderRadius: '20px',
        backgroundColor: '#2f3640',
        padding: 'auto',
    },
    headline: {
        fontSize: '2.5vw',
        // margin: 'auto',
        margin: '5% auto 5% auto',
        color: '#10FF00',
        textAlign: 'center',
    },
    profileImg: {
        padding: '2% 2% 2% 2%',
        borderRadius: '20%',
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
    name: {
        fontSize: '2.1vw',
        margin: '3%',
    },
    comment: {
        // display: 'inline-block',
        wordBreak: 'keep-all',
        margin: '1% 1% 3% 1%',
        fontSize: '1.7vw',
    },
    myStack: {
        backgroundColor: 'grey',
        fontSize: '1.5vw',
        padding: '2%',
        color: 'white',
        borderRadius: '0 0 20px 20px',
        // margin: '5%',
    },
    myStack__Title: { textAlign: 'center' },
    myStackList: {
        listStyle: 'none',
        fontSize: '1.7vw',
        color: 'black',
    },
    myStackList__li: {
        textAlign: 'left',
        fontSize: '1.3vw',
        margin: '3%',
        color: 'white',
    },
});

const AboutDetail = ({ name }) => {
    const [meObj, setMeObj] = useState({});
    const [init, setInit] = useState(false);

    const classes = styles();

    /**
     * 들어온 이름 정보가 누구냐에 따라 만나이, 취미 등 다르게 설정될 수 있도록.
     * <속성 정보>
     * name: 이름
     * school: 학교
     *  major: 전공
     * age: 생일과 현재시각을 기준으로 만 나이 계산
     * hobby: 취미
     * comment: 간단한 자기소개 (ex: 저는 떡볶이를 먹다가 오늘 흘렸습니다 등),
     * techStacks: 내 개발가능한 분야들 json배열로 넣어둠. import 항목 참조.
     */

    useEffect(() => {
        name === '고영일' ? setMeObj(meObj012) : setMeObj(meObjKSY);
        setInit(true);
    }, [name]);

    return init ? (
        <div className={classes.root}>
            <img src={meObj.profileImg} className={classes.profileImg} alt="프로필 사진" />
            <div className={classes.container}>
                <div className={classes.headline}>"{meObj.headline}"</div>
                <div>
                    <div className={classes.name}>저는 {name}입니다... 아...</div>
                    <div className={classes.comment}>
                        저는 {meObj.school}을 졸업해 지금 만 {meObj.age}살 이며,
                        {meObj.school}에 {meObj.major} {meObj.year}학번으로 입학했고,
                        {meObj.hobby}가 내 취미입니다...
                    </div>
                    <div className={classes.intro}>
                        <div>간단한 자기소개</div>
                        <div className={classes.comment}>{meObj.comment}</div>
                        <div className={classes.myStack}>
                            <div className={classes.myStack__Title}> 사용 가능한 기술 스택</div>
                            {meObj.techStacks.map((m) => {
                                return (
                                    <ul className={classes.myStackList}>
                                        <div style={{ textAlign: 'center' }}>{m.name}</div>
                                        {m.projects.map((m) => {
                                            return <li className={classes.myStackList__li}>{m}</li>;
                                        })}
                                    </ul>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <img src={MJC_LOGO} className={classes.schoolLogo} alt="학교 로고" />
        </div>
    ) : (
        <div>initializing...</div>
    );
};

export default AboutDetail;
