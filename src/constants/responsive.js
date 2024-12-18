// responsive 처럼 딱 고정되있는 값들 넣는 폴더, 파일

export const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1100 },
    items: 6,
  },
  bigTablet: {
    breakpoint: { max: 1100, min: 826 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 826, min: 480 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 1,
  },
};
