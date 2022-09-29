import React from 'react'
import organoid01 from '../../../assets/images/figure001.png'
import organoid02 from '../../../assets/images/figure02.png'
import organoid03 from '../../../assets/images/figure03.png'
import organoid04 from '../../../assets/images/figure04.png'
import organoid05 from '../../../assets/images/figure05.png'
import organoid06 from '../../../assets/images/figure06.png'
import organoidTable from '../../../assets/images/organoidTable.png'
import Attachments from '../../../assets/organoidZipAttachment.zip'


function Organoid() {
    return (
        <div className=''>
            <h1 className="m-5 text-5xl font-bold my-5">오가노이드 서비스 안내</h1>
            <div>
                <div className="">
                    <ul>
                        <li >
                            <ul>
                                <li className="m-12">
                                    오가노이드 서비스 허브 소개
                                    <ul className='m-12'>
                                        <li className='m-8'>
                                            -2020년 6월부터, 임상검체의 접근성, 암종별 오가노이드 제작 기술, 제작비용, 시간 등
                                            개별적 암  오가노이드 연구의 한계를 극복하고자 고품질 오가노이드를 제작하고
                                            연계 데이터와 함께 제공할 수 있도록 수립된 수요자 친화적 서비스 허브
                                        </li>
                                        <li className='m-8'>
                                            -대상암종: 희귀 및 진행성 난치암, 8암종
                                            (간암, 담도암, 대장암, 췌장암, 유방암, 위암, 난소암, 구강암)</li>
                                    </ul>
                                </li>
                                <li>
                                    <img src={organoid01} alt='organoid' width="30%" style={{ margin: 'auto' }}></img>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>

            </div>

            {/* page 2 */}
            <div>
                <h1 className="m-5 text-5xl font-bold my-5">오가노이드 서비스제공 안내</h1>
            </div>
            <ul>
                <li>
                    <ul>
                        <div>
                            <h1 className='m-5 text-3xl text-center font-bold my-16'>오가노이드 제공절차</h1>
                            <div className='mb-24'>
                                <img src={organoid03} alt='organoid' width="40%" style={{ margin: 'auto' }}></img>
                            </div>
                        </div>
                    </ul>
                </li>

                <li>
                    <h1 className='m-5 text-5xl font-bold my-5'> 오가노이드 제공방법 </h1>
                    <div className='ml-32 my-16'>
                        <div className='flex'>
                            <div className='w-64'>
                                <img src={organoid04} alt='organoid'></img>
                            </div>

                            <div>
                                <ul className='mt-8 ml-8'>
                                    <li className='mb-4'>1) 동결바이얼</li>
                                    <li className='ml-12'>- 드라이아이스 상태의 1 바이얼 (106 cells/vial)</li>
                                    <li className='ml-12'>- 매주 화요일 오전, 택배 혹은 직접분양</li>
                                </ul>
                            </div>

                        </div>


                        <div className='flex '>
                            <div className='w-64'>
                                <img className='mt-5 ml-5' src={organoid05} alt='organoid'></img>
                            </div>

                            <div>
                                <ul className='mt-8 ml-8'>
                                    <li className='mb-4'>2) 배양바이얼</li>
                                    <li className='ml-12'>- matrigel 배양상태의 오가노이드 1 바이얼 (상온)</li>
                                    <li className='ml-12'>- 매주 화요일 오후 3시, 직접분양만 가능</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </li>

                <li>
                    <div>
                        <h1 className='m-5 text-5xl font-bold my-5'> 오가노이드 연계 데이터 제공</h1>
                    </div>


                    <ul className='m-12'>
                        <li className='m-8'>
                            - 기본정보:  연구조건에 부합하는 검체자원 검색을 위한 온라인 공개 정보
                        </li>
                        <li className='m-8'>
                            - 상세정보:  공동연구 및 임상전문가 협력 연구를 통해서만 요청가능한
                            비공개 심화 임상정보</li>

                        <li>
                            <img src={organoidTable} style={{ margin: 'auto' }} alt="table-organoid"></img>
                        </li>
                    </ul>


                </li>



                <ul>
                    <li className="m-12">
                        <h1 className='m-5 text-5xl font-bold my-5'>오가노이드 연구 관련 특화서비스 제공</h1>
                        <ul className='m-12'>
                            <li className='m-8'>
                                1. 종사자 대상 교육
                                - 오가노이드 연구 초심자 혹은 경력자를 대상으로 한 배양 이론 및 관련기법 교육
                            </li>
                            <li className='m-8'>
                                2. 연구 디자인 컨설팅 연구 디자인 및 결과의 임상적 의의 해석 등 오가노이드 제공 전/후 전문가
                                그룹과의 자문/협력 제공 오가노이드 제공 신청 단계에서  특화 서비스 항목으로 추가 신청</li>
                            <li className='m-8'>  3. STR analysis</li>
                        </ul>
                    </li>
                </ul>

                <li className='m-12'>
                    <h1 className='m-5 text-5xl font-bold my-5'>
                        오가노이드 서비스 신청
                    </h1>
                    <ul>
                        <li><img src={organoid06} alt='organoid' className='my-32 mx-auto'></img></li>
                    </ul>
                </li>

                <li className='m-12'>
                    <h1 className='m-5 text-5xl font-bold my-5'>신청자 구비서류 </h1>

                    <ul>
                        <li>
                            <div className='container flex justify-items-start m-8'>
                                <h1 className='mr-5'>◦ 신청단계  </h1>
                                <p>IRB 승인서
                                    오가노이드/데이터 제공 신청서
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className='container flex justify-items-start m-8'>
                                <h1 className='mr-5'>◦ 제공단계</h1>
                                <p>오가노이드 제공 확인서
                                    MTA
                                </p>
                            </div>
                        </li>
                    </ul>
                </li>

            </ul>


            <div className='flex container m-12 justify-between'>
                <h1 className='m-5 text-5xl font-bold my-5'>검색 및 신청</h1>
                <div className='m-12 rounded bg-blue-100 '>

                    <a className='m-5 text-3xl font-normal my-5 block' href={Attachments} download>신청서류 다운로드</a>

                </div>

            </div>

            {/* table */}
            <div className=''>
                <table className='table-auto  border border-black mx-auto'>
                    <tbody className=' border border-black'>
                        <tr className=' border border-black bg-gray-100'>
                            <td className=' border border-black m-20 p-7'>신청자 정보</td>
                            <td className='grid grid-cols-3 gap-6 m-5'>
                                <p>◦성명________   </p>
                                <p>◦ 연락처________   </p>
                                <p>◦ E-mail________   </p>
                                <p>◦소속기관________   </p>
                                <p>◦ 기관유형________   </p>
                                <p>◦ 직위________   </p>
                            </td>
                        </tr>
                        <tr className=' border border-black'>
                            <td className=' border border-black m-5 p-7'>제공유형</td>
                            <td className='grid grid-cols-3 gap-6 m-5'>
                                <p>◦단순제공</p>
                                <p>◦ 공동협력 연구</p>
                            </td>
                        </tr>
                        <tr className=' border border-black bg-gray-100'>
                            <td className=' border border-black m-5 p-7'>기본검색</td>
                            <td className='grid grid-cols-3 gap-6 m-5'>
                                <p>◦암종 _______ </p>
                                <p>◦ 조직 (오가노이드 기원) _______</p>
                            </td>
                        </tr>
                        <tr className=' border border-black'>
                            <td className=' border border-black m-5 p-7'>심화검색</td>
                            <td className='grid grid-cols-3 gap-6 m-5'>
                                <p>◦면역병리    </p>
                                <p>◦ 조직병리   </p>
                                <p>◦치료반응성     </p>
                                <p>◦ 추적관찰     </p>
                                <p>◦ 오믹스정보  </p>
                            </td>
                        </tr>
                        <tr className=' border border-black bg-gray-100'>
                            <td className=' border border-black m-5 p-7'>특화서비스</td>
                            <td className='grid grid-cols-3 gap-6 m-5'>
                                <p>◦교육</p>
                                <p>◦ 연구컨설팅   </p>
                                <p>◦ STR analysis</p>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>


            <div>
                <h1 className='m-12 text-3xl font-bold my-12'>검색 및 신청은 서류 작성 후 이메일 사전신청</h1>
                <h1 className='m-12 text-3xl font-bold my-8'>문의</h1>
                <div className='grid grid-cols-3 gap-6 m-12 text-3xl font-normal my-8'>
                    <p>공선영</p>
                    <p>ksy@ncc.re.kr </p>
                    <p>031-920-2362</p>
                    <p>김윤희 </p>
                    <p>   sensia37@ncc.re.kr </p>
                    <p>031-920-2511</p>
                </div>
            </div>

        </div>
    )
}
export default Organoid