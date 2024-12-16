import React from 'react';
import organoid01 from '../../../assets/images/organoid_flow_chart_final_01.png';
import organoid03 from '../../../assets/images/organoid_flow_chart_2.png';
import organoid04 from '../../../assets/images/cbottle.png';
import organoid05 from '../../../assets/images/petridish.png';
import organoid06 from '../../../assets/images/flowchart_02.png';
import organoid07 from '../../../assets/images/organoid_flow_chart_new.png';
import Attachments from '../../../assets/files/Organoid_v.4.docx';
import HeaderComponent from '../../Common/HeaderComponent/HeaderComponent';
import { style } from 'd3';

function Organoid() {
  const title = { id: 'Organoid', defaultMessage: 'Oragnoid' };
  const breadCrumbs = {
    '/Home/': [{ id: 'Home', defaultMessage: 'Home', to: '/' },
    { id: `CustomerService`, defaultMessage: `Customer Service`, to: `` },
    { id: `OtherServices`, defaultMessage: `Others`, to: `` },
    { id: `Organoid`, defaultMessage: `Organoid Service`, to: `` }
    ]
  };
  const styles = {
    h1: {
      marginBottom: '2rem',
      fontSize: '2rem',
      fontWeight: 'bold'
    },
    firstBox: {
      padding: '20px',
      border: '1px solid #ddd'
    },
    imgBox: {
      width: '25%',
      textAlign: 'center'
    },
    tableBorder: {
      border: '1px solid #000'
    }
  };

  const flowchartStyles = {
    img: {
      padding: '10%',
    }
  }
  return (
    <div>
      <HeaderComponent title={title} breadCrumbs={breadCrumbs['/Home/']} type="single" />
      <article id="subContents" className="subContents">
        <div className="ptn">
          <div className="auto">
            <div className="container mx-auto px-4 txtbox">
              <section className="intro_wrap_organoid">
                <h1 className="m-5 text-4xl font-bold my-5" style={styles.h1}>
                  오가노이드 서비스 안내
                </h1>
              </section>

              <div className="MarginBottom4" style={styles.firstBox}>
                <div className="MarginLeft4 ">
                  <h1 className="m-5 text-3xl font-bold my-5 mt-16 MarginBottom4">
                    오가노이드 서비스 허브 소개
                  </h1>
                  <ul>
                    <li>
                      <ul>
                        <li className="text165rem lineHeightInitial">
                          <ul className="" style={{ lineHeight: '30px', fontSize: '16px' }}>
                            <li className="m-8 text165rem lineHeightInitial MarginBottom4">
                              - 2020년 6월부터, 임상검체의 접근성, 암종별 오가노이드 제작 기술,
                              제작비용, 시간 등 개별적 암 오가노이드 연구의 한계를 극복하고자 고품질
                              오가노이드를 제작하고 연계 데이터와 함께 제공할 수 있도록 수립된
                              수요자 친화적 서비스 허브
                            </li>
                            <li className="m-8 text165rem lineHeightInitial MarginBottom4">
                              - 대상암종: 희귀 및 진행성 난치암, 8암종 (간암, 담도암, 대장암,
                              췌장암, 유방암, 위암, 난소암, 구강암)
                            </li>
                          </ul>
                        </li>
                        <li>
                          <img
                            src={organoid01}
                            alt="organoid"
                            width="97%"
                            style={{ margin: 'auto' }}
                          ></img>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>

              {/* page 2 */}
              <div className="MarginBottom4">
                <h1 className="m-5 text-3xl font-bold mt-32 ">오가노이드 서비스제공 안내</h1>
              </div>
              <div style={styles.firstBox}>
                <ul>
                  <li>
                    <ul>
                      <div>
                        <h1 className="MarginBottom4 m-5 text-3xl MultiUploadTextCenter font-bold my-16">
                          오가노이드 제공절차
                        </h1>
                        <div className="mb-24 MarginBottom4">
                          <img
                            src={organoid03}
                            alt="organoid"
                            width="100%"
                            height="60%"
                            style={{ margin: 'auto' }}
                          ></img>
                        </div>
                      </div>
                    </ul>
                  </li>

                  <li>
                    <h1 className="MarginBottom4 m-5 text-3xl font-bold my-5 ">
                      오가노이드 제공방법
                    </h1>
                    <div className="ml-32 my-16">

                      <div className="flex items-center justify-center h-full">
                        <img src={organoid07} alt="organoid" className="max-w-full h-auto" style={flowchartStyles.img} />
                      </div>

                      {/* <div
                        className="flex my-20 Border BorderstyleViz MarginBottom5"
                        style={{ marginTop: '0%' }}
                      >
                        <div className="w-64 TextAlignCenter" style={{ width: '25%' }}>
                          <img src={organoid04} alt="organoid" width="150"></img>
                        </div>

                        <div style={{ marginLeft: '10%', lineHeight: '30px', fontSize: '16px' }}>
                          <ul className="mt-8 ml-8 ">
                            <li className="mb-4">1) 동결바이얼</li>
                            <li className="ml-12 mb-4">
                              - 드라이아이스 상태의 1 바이얼 (106 cells/vial)
                            </li>
                            <li className="ml-12 mb-4">- 매주 화요일 오전, 택배 혹은 직접분양</li>
                          </ul>
                        </div>
                      </div>

                      <div
                        className="flex Border BorderstyleViz MarginBottom5"
                        style={{ marginTop: '0%' }}
                      >
                        <div className="w-64 TextAlignCenter" style={{ width: '25%' }}>
                          <img
                            className="mt-5 ml-5"
                            src={organoid05}
                            width="150"
                            alt="organoid"
                          ></img>
                        </div>

                        <div
                          className=""
                          style={{ marginLeft: '10%', lineHeight: '30px', fontSize: '16px' }}
                        >
                          <ul className="mt-8 ml-8">
                            <li className="mb-4">2) 배양바이얼</li>
                            <li className="ml-12 mb-4">
                              - matrigel 배양상태의 오가노이드 1 바이얼 (상온)
                            </li>
                            <li className="ml-12 mb-4">- 매주 화요일 오후 3시, 직접분양만 가능</li>
                          </ul>
                        </div>
                      </div> */}

                    </div>
                  </li>

                  <li>
                    <div>
                      <h1 className="m-5 text-3xl font-bold my-5 mt-36 ">
                        {' '}
                        오가노이드 연계 데이터 제공
                      </h1>
                    </div>

                    <ul className="M4" style={{ fontSize: '16px' }}>
                      <li className="m-8 text165rem lineHeightInitial MarginTop4">
                        - 기본정보: 연구조건에 부합하는 검체자원 검색을 위한 온라인 공개정보
                      </li>
                      <li className="m-8 text165rem lineHeightInitial MarginTop4 MarginBottom5">
                        - 상세정보: 공동연구 및 임상전문가 협력 연구를 통해서만 요청가능한 비공개
                        심화 임상정보
                      </li>

                      <li>
                        <div className="flex ml-8">
                          <div className="w-86per">
                            <table className="min-w-full " style={style.tableBorder} border="1">
                              <caption></caption>
                              <thead className="border border-black">
                                <tr
                                  className="h-20 MultiUploadTextCenter TextWhite"
                                  style={{ background: '#0c3c6a' }}
                                >
                                  <th className="text165rem lineHeightInitial font-medium text-white PX6Y4 border border-black" scope='col'>
                                    연계 임상정보
                                  </th>
                                  <th
                                    className="text165rem lineHeightInitial font-medium text-white PX6Y4 border border-black"
                                    style={{ width: '20%' }} scope='col'
                                  >
                                    기본정보
                                  </th>
                                  <th
                                    className="text165rem lineHeightInitial font-medium text-white PX6Y4 border border-black"
                                    style={{ width: '20%' }} scope='col'
                                  >
                                    상세정보
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border border-black h-20">
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-slate-50">
                                    나이
                                  </td>
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-slate-50 MultiUploadTextCenter">
                                    0
                                  </td>
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-white"></td>
                                </tr>
                                <tr className="border border-black h-20">
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-slate-50">
                                    성별
                                  </td>
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-slate-50 MultiUploadTextCenter">
                                    0
                                  </td>
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-white"></td>
                                </tr>
                                <tr className="border border-black h-20">
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-slate-50">
                                    원발암
                                  </td>
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-slate-50 MultiUploadTextCenter">
                                    0
                                  </td>
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-white"></td>
                                </tr>
                                <tr className="border border-black h-20">
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-slate-50 ">
                                    검체정보
                                  </td>
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-slate-50 MultiUploadTextCenter">
                                    0
                                  </td>
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-white"></td>
                                </tr>
                                <tr className="border border-black h-20">
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-blue-100 ">
                                    병리검사결과
                                  </td>
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-white"></td>
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-blue-100 MultiUploadTextCenter">
                                    0
                                  </td>
                                </tr>
                                <tr className="border border-black h-20">
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-blue-100 ">
                                    수술정보 및 수술병리조직결과
                                  </td>
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-white"></td>
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-blue-100 MultiUploadTextCenter">
                                    0
                                  </td>
                                </tr>
                                <tr className="border border-black h-20">
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-blue-100 ">
                                    항암제 치료 정보 및 반응성
                                  </td>
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-white"></td>
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-blue-100 MultiUploadTextCenter">
                                    0
                                  </td>
                                </tr>
                                <tr className="border border-black h-20">
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-blue-100 ">
                                    방사선 치료 유무 및 반응성
                                  </td>
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-white"></td>
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-blue-100 MultiUploadTextCenter">
                                    0
                                  </td>
                                </tr>
                                <tr className="border border-black h-20">
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-blue-100 ">
                                    추적관찰
                                  </td>
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-white"></td>
                                  <td className="text165rem lineHeightInitial text-balck font-light PX6Y4 whitespace-nowrap border border-black bg-blue-100 MultiUploadTextCenter MultiUploadTextCenter">
                                    0
                                  </td>
                                </tr>
                              </tbody>
                              <tfoot></tfoot>
                            </table>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>

                  <ul>
                    <li className="m-12" style={{ lineHeight: '35px' }}>
                      <h1 className="m-5 text-3xl font-bold my-5 mt-24">
                        오가노이드 연구 관련 특화서비스 제공
                      </h1>
                      <ul className="M4" style={{ fontSize: '15px' }}>
                        <li className="m-8 text165rem lineHeightInitial">
                          1. 종사자 대상 교육 - 오가노이드 연구 초심자 혹은 경력자를대상으로 한 배양
                          이론 및 관련기법 교육
                        </li>
                        <li className="m-8 text165rem lineHeightInitial">
                          2. 연구 디자인 컨설팅 연구 디자인 및 결과의 임상적 의의 해석 등오가노이드
                          제공 전/후 전문가 그룹과의 자문/협력 제공 오가노이드제공 신청 단계에서
                          특화 서비스 항목으로 추가 신청
                        </li>
                        <li className="m-8 text165rem lineHeightInitial">3. STR analysis</li>
                      </ul>
                    </li>
                  </ul>

                  {/* <li className="m-12">
                    <h1 className="m-5 text-3xl font-bold my-5 mt-24">오가노이드 서비스 신청</h1>
                    <ul>
                      <li>
                        <img
                          src={organoid06}
                          alt="organoid"
                          width="50%"
                          className="my-2 mx-auto"
                          style={{ marginLeft: '25%' }}
                        ></img>
                      </li>
                    </ul>
                  </li> */}

                  <li className="m-12">
                    <h1 className="m-5 text-3xl font-bold my-5 ">신청자 구비서류</h1>

                    <ul style={{ marginTop: '10px', fontSize: '16px' }}>
                      <li>
                        <div className="container flex justify-items-start m-8 text165rem lineHeightInitial">
                          <div>
                            <p className="mr-5">◦ 신청단계</p>
                            <br></br>
                            <p className="ml-8" style={{ marginLeft: '1rem' }}>
                              - IRB 승인서
                            </p>
                            <br></br>
                            <p className="ml-8" style={{ marginLeft: '1rem' }}>
                              - 오가노이드 데이터 제공 신청서
                            </p>
                            <br></br>
                          </div>
                        </div>
                      </li>
                      <li>
                        <div className="container flex justify-items-start m-8 text165rem lineHeightInitial">
                          <div>
                            <p className="mr-5">◦ 제공단계</p>
                            <br></br>
                            <p className="ml-8" style={{ marginLeft: '1rem' }}>
                              - 오가노이드 제공 확인서
                            </p>
                            <br></br>
                            <p className="ml-8" style={{ marginLeft: '1rem' }}>
                              - MTA
                            </p>
                            <br></br>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>

              <div
                className="flex container m-12 justify-between"
                style={{ margin: '3%', display: 'flex', justifyContent: 'space-between' }}
              >
                <h1 className="m-5 text-3xl font-bold my-5 mt-24 ">검색 및 신청</h1>
                <div className="m-12 rounded bg-blue-100 " style={{ padding: '15px' }}>
                  <a
                    className="m-5 text-3xl font-normal my-5 block"
                    href={Attachments}
                    download="[국립암센터] 오가노이드 제공신청서_v.4.docx"
                  >
                    신청서류 다운로드
                  </a>
                </div>
              </div>

              {/* table */}
              <div className="">
                <table
                  className="table-auto border border-black mx-auto ml-16 w-86per"
                  style={{ borderTop: 'none', border: '1px solid #ddd' }}
                >
                  <caption></caption>
                  <thead>
                    <tr>
                      <th scope="col" style={{ width: '20%' }}></th>
                      <th scope="col" style={{ width: '80%' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className=" border border-black bg-gray-100">
                      <td
                        className=" border border-black m-20 p-7 MultiUploadTextCenter"
                        style={{ borderRightStyle: 'groove', width: '20%' }}
                      >
                        신청자 정보
                      </td>
                      <td style={{ width: '80%' }}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '27%',
                            margin: '20px 10px 20px 20px'
                          }}
                        >
                          <p>◦ 성명________ </p>
                          <p>◦ 연락처________ </p>
                          <p>◦ E-mail________ </p>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            margin: '20px 0px 20px 20px',
                            gap: '24%'
                          }}
                        >
                          <p>◦ 소속기관________ </p>
                          <p>◦ 기관유형________ </p>
                          <p>◦ 직위________ </p>
                        </div>
                      </td>
                    </tr>

                    <tr className=" border border-black">
                      <td
                        className=" border border-black m-5 p-7 MultiUploadTextCenter"
                        style={{ borderRightStyle: 'groove', width: '20%' }}
                      >
                        제공유형
                      </td>
                      <td style={{ width: '80%' }}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            margin: '20px 0px 20px 20px',
                            gap: '32%'
                          }}
                        >
                          <p>◦ 단순제공</p>
                          <p>◦ 공동협력 연구</p>
                        </div>
                      </td>
                    </tr>
                    <tr className=" border border-black bg-gray-100">
                      <td
                        className=" border border-black m-5 p-7 MultiUploadTextCenter "
                        style={{ borderRightStyle: 'groove', width: '20%' }}
                      >
                        기본검색
                      </td>
                      <td style={{ width: '80%' }}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            margin: '20px 0px 20px 20px',
                            gap: '28%'
                          }}
                        >
                          <p>◦ 암종 _______ </p>
                          <p>◦ 조직 (오가노이드 기원) _______</p>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td
                        className=" border border-black m-20 p-7 w-80 MultiUploadTextCenter"
                        style={{ borderRightStyle: 'groove', width: '20%' }}
                      >
                        심화검색
                      </td>
                      <td style={{ width: '80%' }}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '32%',
                            margin: '20px 0px 20px 20px'
                          }}
                        >
                          <p>◦ 면역병리</p>
                          <p>◦ 조직병리</p>
                          <p>◦ 치료반응성</p>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            margin: '20px 0px 20px 20px',
                            gap: '32%'
                          }}
                        >
                          <p>◦ 추적관찰</p>
                          <p>◦ 오믹스정보</p>
                        </div>
                      </td>
                    </tr>

                    <tr className=" border border-black bg-gray-100">
                      <td
                        className=" border border-black m-5 p-7 MultiUploadTextCenter"
                        style={{ borderRightStyle: 'groove', width: '20%' }}
                      >
                        특화서비스
                      </td>
                      <td style={{ width: '80%' }}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            margin: '20px 0px 20px 20px'
                          }}
                        >
                          <p>◦ 교육</p>
                          <p style={{ marginLeft: '36%' }}>◦ 연구컨설팅 </p>
                          <p style={{ marginLeft: '30%' }}>◦ STR analysis</p>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>



              <div>
                <h1
                  className="m-12 text-3xl font-bold my-12 mt-24"
                  style={{ margin: '3% 3% 3% 0px' }}
                >
                  검색 및 신청은 서류 작성 후 이메일 사전신청
                </h1>
                <h1 className="m-12 text-3xl font-bold my-8 mt-24" style={{ marginBottom: '3% ' }}>
                  문의
                </h1>
                <div className="" style={{ border: '1px solid #ddd', fontSize: '16px' }}>
                  <div style={{ display: 'flex', margin: '3%', justifyContent: 'space-between' }}>
                    <p>공선영</p>
                    <p>ksy@ncc.re.kr </p>
                    <p>031-920-2362</p>
                  </div>
                  <div style={{ display: 'flex', margin: '3%', justifyContent: 'space-between' }}>
                    <p>김윤희 </p>
                    <p> sensia37@ncc.re.kr </p>
                    <p>031-920-2511</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
export default Organoid;
