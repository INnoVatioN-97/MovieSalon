const curYear = new Date().getFullYear();
const born012 = new Date(1997, 6, 3).getFullYear();
const bornKSY = new Date(1997, 8, 11).getFullYear();

export const meObj012 = {
  name: '고영일',
  major: '전자공학과',
  school: '명지전문대학',
  year: '16',
  age: `만 ${curYear - born012}세`,
  hobby: '밥먹고 코딩하다 현타오기',
  headline: '오늘도 나는 코딩에 쩔어산다...',
  github_name: 'INnoVatioN-97',

  comment: '살려주세요 취업시켜주세요',
};

export const meObjKSY = {
  name: '강신영',
  major: '전자공학과',
  school: '명지전문대학',
  year: '16',
  age: `만 ${curYear - bornKSY}세`,
  hobby: '플스',
  headline: '맥북이 필요한 뉴비입니다.',
  github_name: 'TylerKang-97',
  comment: 'ios 배우고싶다..',
};
