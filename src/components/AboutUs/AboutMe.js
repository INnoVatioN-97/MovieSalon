import Profile012 from 'images/Profile012.gif';
import ProfileKSY from 'images/ProfileKSY.jpg';

const curYear = new Date().getFullYear();
const born012 = new Date(1997, 6, 3).getFullYear();
const bornKSY = new Date(1997, 8, 11).getFullYear();

export const meObj012 = {
    name: '고영일',
    major: '전자공학과',
    school: '명지전문대학',
    year: '16',
    age: `${curYear - born012}`,
    hobby: '밥먹고 코딩하다 현타오기',
    headline: '오늘도 나는 코딩에 쩔어산다...',
    profileImg: Profile012,

    comment: '살려주세요 취업시켜주세요',

    techStacks: [
        {
            name: 'java(Android)',
            projects: [
                // {
                //     projectName: '',
                //     description: '',
                // },
                {
                    projectName: '띵글 카메라',
                    description:
                        'Google CloudVision API를 활용한 사진 자동정리앱 (캡스톤 디자인 교내대회 출품작)',
                },
                {
                    projectName: '날씨 어플리케이션',
                    description:
                        '공공데이터 API를 활용한 내 지역(도단위) 코로나 현황 및 날씨정보 출력',
                },
            ],
        },
        {
            name: 'React(Javascript)',
            projects: [
                {
                    projectName: 'Movie Salon',
                    description:
                        'TMDB, KOBIS, Firebase API를 활용한 국내,북미 박스오피스 웹페이지 (깃허브 리포지토리 내 프로젝트명은 MovieRank)',
                },
            ],
        },
    ],
};

export const meObjKSY = {
    name: '강신영',
    major: '전자공학과',
    school: '명지전문대학',
    year: '16',
    age: `${curYear - bornKSY}`,
    hobby: 'MLB 더쇼 하기',
    headline: '아...',
    profileImg: ProfileKSY,

    comment: '코멘트입니다.',

    techStacks: [
        {
            name: 'java(Swing)',
            projects: [
                {
                    projectName: 'On Your Study Plan',
                    description: '내 수강과목들에 대한 학점 현황 관리 프로그램',
                },
            ],
        },
        {
            name: 'C(Arduino)',
            projects: [
                {
                    projectName: 'Box Farmers',
                    description: '온습도센서, 히터, 쿨러등을 활용한 스마트팜 시스템',
                },
            ],
        },
        {
            name: 'React(Javascript)',
            projects: [
                {
                    projectName: 'Movie Salon',
                    description:
                        'TMDB, KOBIS, Firebase API를 활용한 국내,북미 박스오피스 웹페이지 (깃허브 리포지토리 내 프로젝트명은 MovieRank)',
                },
            ],
        },
    ],
};
