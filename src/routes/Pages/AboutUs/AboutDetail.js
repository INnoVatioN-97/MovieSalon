import React, { useState, useEffect } from 'react';

import MJC_LOGO from 'images/MJC_LOGO.svg';
import { meObj012, meObjKSY } from 'components/AboutUs/AboutMe';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
    //이미지 flex:left로
    root: {
        margin: '3% 10% 10% 10% ',
        // padding: 'auto',
        display: 'flex',
        // flexDirection: 'row',
        whiteSpace: 'wrap',
        justifyContent: 'center',
        alignContent: 'space-around',
        flexWrap: 'wrap',
        borderRadius: '2vw',
        backgroundColor: 'rgba(12, 12, 12, 0.9)',
        // width:''
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        margin: '2%',
        width: '100%',
        height: '100%',
    },
    intro: {
        textAlign: 'center',
        margin: 'auto',
        // marginBottom: '8%',
        borderRadius: '3vw',
        backgroundColor: '#2f3640',
        padding: '2%',
    },
    headline: {
        fontSize: '2.5vw',
        // margin: 'auto',
        margin: 'auto',
        color: '#10FF00',
        textAlign: 'center',
    },
    profileImg: {
        margin: 'auto',
        borderRadius: '70%',
        width: '20vw',
        height: '20vw',
    },
    name: {
        fontSize: '2.1vw',
        margin: '3%',
    },
    comment: {
        // wordBreak: 'keep-all',
        // wordBreak: 'break-all',
        wordBreak: 'keep-all',
        margin: 'auto',
        fontSize: '1.7vw',
    },
    myStack: {
        backgroundColor: '#1F272E',
        fontSize: '1.5vw',
        padding: '2%',
        color: 'white',
        borderRadius: '3vw',
        // margin: '5%',
    },
    stackName: {
        textAlign: 'center',
        fontSize: '2vw',
        fontWeight: 'bold',
    },
    myStack__availableTechs: { textAlign: 'center', color: '#10FF00' },
    myStackList: {
        listStyle: 'none',
        fontSize: '1.7vw',
        color: '#10FF00',
    },
    myStackList__li: {
        // textAlign: 'center',
        fontSize: '1.3vw',
        margin: '2% 0 2% 0',
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
            <div className={classes.container}>
                <img src={meObj.profileImg} className={classes.profileImg} alt="프로필 사진" />
            </div>
            <div className={classes.container}>
                <div className={classes.headline}>"{meObj.headline}"</div>
                <div className={classes.name}>저는 {name}입니다... 아...</div>
                <div className={classes.comment}>
                    저는 {meObj.school}을 졸업해 지금 만 {meObj.age}살 이며,
                    {meObj.school}에 {meObj.major} {meObj.year}학번으로 입학했고,
                    {meObj.hobby}가 내 취미입니다...
                </div>
            </div>
            <div className={classes.container}>
                <div className={classes.intro}>
                    <div>간단한 자기소개</div>
                    <div className={classes.comment}>{meObj.comment}</div>
                    <div className={classes.myStack}>
                        <div className={classes.myStack__availableTechs}>
                            {' '}
                            사용 가능한 기술 스택
                        </div>
                        {meObj.techStacks.map((m) => {
                            return (
                                <ul className={classes.myStackList}>
                                    <div className={classes.stackName}>{m.name} Projects</div>
                                    {m.projects.map((m) => {
                                        return (
                                            <li className={classes.myStackList__li}>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                        width: '100%',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: '1.52vw',
                                                            color: '#44bd32',
                                                            textAlign: 'center',
                                                            wordBreak: 'break-word',
                                                        }}
                                                    >
                                                        {m.projectName}
                                                    </span>
                                                    <span
                                                        style={{
                                                            fontSize: '1.3vw',
                                                            color: '#ffffff',
                                                            textAlign: 'right',
                                                            wordBreak: 'break-word',
                                                        }}
                                                    >
                                                        {m.description}
                                                    </span>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div>initializing...</div>
    );
};

export default AboutDetail;
