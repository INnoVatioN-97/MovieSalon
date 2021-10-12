import React, { useState, useEffect } from 'react';
import { meObj012, meObjKSY } from 'components/AboutUs/AboutMe';
import { makeStyles, Link } from '@material-ui/core';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import { Project } from './Chart';

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
      //  borderRadius: '2.5rem',
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
        textAlign: 'center',
        wordBreak: 'keep-all',
        margin: 'auto',
        fontSize: '1.4rem',
    },
    intro: {
        textAlign: 'justify',
       // margin: 'auto',
        // marginBottom: '8%',
       // borderRadius: '2.4rem',
      //  backgroundColor: '#2f3640',
        padding: '2%',
        fontFamily: 'Wemakeprice-Regular',
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
const AboutProject = () => {
    const classes = styles();
return (
    <div className={classes.root}>
            <div className={classes.container_2}>
                <div className={classes.comment}>
                    <h2>"영화를 이야기 하다!"</h2>
                    <div className={classes.intro}>
                        <span>
                            안녕하세요. Movie Salon 제작자 입니다. 프로젝트명 Salon(:살롱)은 프랑스 궁전을 배경으로 사교계
                            활동을 의미합니다. 저희는 다양한 사람들이 영화에 대한 생각들을 자유롭게 나눌 수 있는 공간을 만들기
                            위해 프로젝트를 시작했습니다.
                        </span>
                    </div>
                    <div>
                        <Project />
                    </div>
                </div>
            </div>
    </div>
    
);
};

export default AboutProject;