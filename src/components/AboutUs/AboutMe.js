import Profile012 from 'assets/images/DefaultProfileImage.png';
import ProfileKSY from 'assets/images/DefaultProfileImage.png';

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
  github_name: 'INnoVatioN-97',

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
          projectName: 'MJCCapstoneDesign',
          description: 'Google CloudVision API를 활용한 사진 자동정리앱',
        },
        {
          projectName: 'Android_WeatherApp',
          description:
            '공공데이터 API를 활용한 지역별 코로나 현황 및 날씨정보 출력',
        },
      ],
    },
    {
      name: 'React(Javascript)',
      projects: [
        {
          projectName: 'MovieSalon',
          description: 'REST API를 활용한 국내,북미 박스오피스 웹페이지',
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
  hobby: '플스',
  headline: '맥북이 필요한 뉴비입니다.',
  profileImg: ProfileKSY,
  github_name: 'TylerKang-97',
  comment: 'ios 배우고싶다..',

  techStacks: [
    {
      name: 'JAVA',
      projects: [
        {
          projectName: 'OnYourStudyPlan',
          description: '자율 학습 모니터링 프로그램',
        },
      ],
    },
    {
      name: 'C++(Arduino)',
      projects: [
        {
          projectName: 'BoxFarmers',
          description: '교육용 스마트팜 시스템',
        },
      ],
    },
    {
      name: 'React(Javascript)',
      projects: [
        {
          projectName: 'Movie Salon',
          description: 'REST API를 활용한 국내,북미 박스오피스 웹페이지',
        },
      ],
    },
  ],
};
