// export default {
//   defaultPath: '/k-core/',
//   basename: '/k-core/',
//   auth: 'https://www.cancerdata.re.kr/k-corev/',
//   media: 'https://www.cancerdata.re.kr/k-corev/media/',
// };

// export default {
//   defaultPath: '/k-core/',
//   basename: '/k-core/',
//   auth: 'http://3bigs.co.kr/k-corev/',
//   media: 'http://3bigs.co.kr/k-corev/media/',
// };

const isProduction = process.env.REACT_APP_PRODUCTION === 'True';
const config = isProduction ? {
  defaultPath: '/k-core/',
  basename: '/k-core/',
  auth: 'https://www.cancerdata.re.kr/k-corev/',
  media: 'https://www.cancerdata.re.kr/k-corev/media/',
}
  :
  {
    defaultPath: '/k-core/',
    basename: '/k-core/',
    auth: 'http://3bigs.co.kr/k-corev/',
    media: 'http://3bigs.co.kr/k-corev/media/',
  }
  // {
  //   defaultPath: "/k-core/",
  //   basename: "/k-core/",
  //   auth: "http://kcorep-django-service.t2021-0011.tanzu.ncdc.ncc.re.kr/",
  //   media: "http://kcorep-django-service.t2021-0011.tanzu.ncdc.ncc.re.kr/media/"
  // }
export default config;
