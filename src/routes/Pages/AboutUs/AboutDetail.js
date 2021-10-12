import React, { useState, useEffect } from 'react';
import { meObj012, meObjKSY } from 'components/AboutUs/AboutMe';
import { makeStyles, Link } from '@material-ui/core';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Chart_go, Chart_Kang } from './Chart';

const styles = makeStyles({
    //이미지 flex:left로
    root: {
        margin: '3% 10% 10% 10% ',
        // padding: 'auto',
        display: 'flex',
        // flexDirection: 'row',
        whiteSpace: 'wrap',
        justifyContent: 'center',
        alignContent: 'space-between',
        flexWrap: 'wrap',
        borderRadius: '2.5rem',
        backgroundColor: 'rgba(12, 12, 12, 0.9)',
        // width:''
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        margin: '2%',
        width: '42%',
        '@media (max-width: 550px)': {
            width: '100%',
        },
        height: '100%',
    },
    container_2: {
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        flex: 'wrap',
        margin: '2%',
        '@media (max-width: 750px)': {
            width: '100%',
        },
        width: '45%',
        height: '100%',
    },
    container_chart: {
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        flex: 'wrap',
        margin: '2%',
        '@media (max-width: 850px)': {
            width: '85%',
        },
        width: '25%',
        height: '100%',
    },
    intro: {
        textAlign: 'center',
        margin: 'auto',
        // marginBottom: '8%',
        borderRadius: '2.4rem',
        backgroundColor: '#2f3640',
        padding: '2%',
    },
    headline: {
        fontSize: '1.8rem',
        margin: 'auto',
        color: '#10FF00',
        textAlign: 'center',
        borderBottom: 'none',
    },
    profileImg: {
        margin: 'auto',
        borderRadius: '70%',
        width: '15rem',
        height: '15rem',
    },
    name: {
        fontSize: '1.7rem',
        margin: '3%',
    },
    comment: {
        // wordBreak: 'keep-all',
        // wordBreak: 'break-all',
        wordBreak: 'keep-all',
        margin: 'auto',
        fontSize: '1.4rem',
    },
    myStack: {
        backgroundColor: '#1F272E',
        fontSize: '1.2rem',
        padding: '2%',
        color: 'white',
        borderRadius: '2.3rem',
        // margin: '5%',
    },
    stackName: {
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: 'bold',
    },
    myStack__availableTechs: {
        textAlign: 'center',
        color: '#10FF00',
    },
    myStackList: {
        listStyle: 'none',
        fontSize: '1.7rem',
        color: '#10FF00',
    },
    myStackList__li: {
        // textAlign: 'center',
        fontSize: '1.3rem',
        margin: '2% 0 2% -5%',
        color: 'white',
    },
    infoTable: {
        // color: 'white',
    },
    infoTable__row: {},
    infoTalbe__Cell__left: {
        color: 'white',
        fontSize: '1.5rem',
        borderBottom: 'none',
        // marginLeft: '1%',
    },
    infoTalbe__Cell__right: {
        color: 'white',
        fontSize: '1.1rem',
        borderBottom: 'none',
    },
    link: {
    color: '#FFFF00',
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
            <div className={classes.container_2}>
                <div className={classes.comment}>
                    <Table className={classes.infoTable}>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan="2" className={classes.headline}>
                                    {/* <div> */}"{meObj.headline}"{/* </div> */}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell className={classes.infoTalbe__Cell__left}>이름</TableCell>
                                <TableCell className={classes.infoTalbe__Cell__right}>{meObj.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.infoTalbe__Cell__left}>나이</TableCell>
                                <TableCell className={classes.infoTalbe__Cell__right}>{meObj.age}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.infoTalbe__Cell__left}>학력</TableCell>
                                <TableCell className={classes.infoTalbe__Cell__right}>
                                    {meObj.school} {meObj.major}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className={classes.infoTalbe__Cell__left}>취미</TableCell>
                                <TableCell className={classes.infoTalbe__Cell__right}>{meObj.hobby}</TableCell>
                            </TableRow>
                            {/* 저는 {meObj.school}을 졸업해 지금 만 {meObj.age}살 이며,
                        {meObj.school}에 {meObj.major} {meObj.year}학번으로 입학했고,
                        {meObj.hobby}가 내 취미입니다... */}
                        </TableBody>
                    </Table>
                </div>
            </div>
            {name === '고영일' ? 
            <div className={classes.container_chart}>
                <Chart_go />    
            </div>
            : 
            <div className={classes.container_chart}>
                <Chart_Kang />    
            </div>
            }
            
            <div className={classes.container_2}>
                <div className={classes.intro}>
                    <div>간단한 자기소개</div>
                    <div className={classes.comment}>{meObj.comment}</div>
                    <div className={classes.myStack}>
                        <div className={classes.myStack__availableTechs}> 사용 가능한 기술 스택</div>
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
                                                        justifyContent: 'space-around',
                                                        // flexWrap: 'wrap',
                                                        width: '100%',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: '1.7rem',
                                                            color: '#FFFF00',
                                                            textAlign: 'left',
                                                            wordBreak: 'keep-all',
                                                            flexGrow: '1',
                                                        }}
                                                    >
                                                       <Link href={'https://github.com/' +meObj.github_name +'/' + m.projectName} className={classes.link}>
                                                            {m.projectName}
                                                        </Link>
                                                    </span>
                                                    <span
                                                        style={{
                                                            fontSize: '1.2rem',
                                                            color: '#ffffff',
                                                            textAlign: 'right',
                                                            wordBreak: 'keep-all',
                                                            flexGrow: '2',
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
