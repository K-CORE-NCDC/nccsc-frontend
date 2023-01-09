import React from "react";

const CNVGuidelinesKorean = () => {
return (
<div className="px-10 py-10 overflow-auto" style={{height:'340px'}}>
<h1 className="pt-5 text-4xl" >1단계) 임상정보 입력 :</h1>
<h2 className="py-2 text-3xl text-green-300">임상정보 형식</h2>
<h1 className="py-4">모든 행은 탭(tab)으로 분리된 형식입니다.</h1>
<h2 className="py-8">
첫번째 (머리) 행은 ‘sample_id’ 와 각 임상변수의 이름으로 이루어집니다.
첫 번째 행의 예시 :
</h2>

<div className="py-10">
<div className="text-red-400 bg-red-200 flex justify-between py-4 px-4">
<p className="py-2">sample_id</p>
<p className="py-2">diag_age</p>
<p className="py-2">t_category</p>
<p className="py-2">smoking_yn</p>
<p className="py-2">rlps_yn</p>
<p className="py-2">rlps_cnfr_drtn</p>
</div>
</div>

<p  className="py-4 py-1">
다음 행은 샘플 아이디(sample id), 각 임상변수의 값으로 이루어집니다. 값이 없을 경우, 빈 칸으로 남겨둡니다.
</p>

<p className="py-2">다음 행들의 예시 :</p>
<div className="py-10">
<div className="py-1 ">
<div className="text-red-400 bg-red-200 flex justify-between py-4 px-4">
<p className="py-2">u01</p>
<p className="py-2">42</p>
<p className="py-2">T1</p>
<p className="py-2">yes</p>
<p className="py-2">yes</p>
<p className="py-2">32.45</p>
</div>
</div>
<div className=" py-2">
<div className="text-red-400 bg-red-200 flex justify-between py-4 px-4">
<p className="py-2">u02</p>
<p className="py-2">23</p>
<p className="py-2">T0</p>
<p className="py-2">no</p>
<p className="py-2">no</p>
<p className="py-2"></p>
</div>
</div>
<div className=" py-2">
<div className="text-red-400 bg-red-200 flex justify-between py-4 px-4">
<p className="py-2">u03</p>
<p className="py-2">58</p>
<p className="py-2">T3</p>
<p className="py-2">yes</p>
<p className="py-2">yes</p>
<p className="py-2">128.5</p>
</div>
</div>
<h1 className="py-2 text-green-300 text-4xl"> Copy Number Variation 정보 형식</h1>
<h2 className="text-3l my-4">모든 행은 탭(tab)으로 분리된 형식입니다.</h2>
<div  className="py-2">
<p>첫번째 (머리) 행은 ‘sample_id’ 와 각 유전정보의 이름으로 이루어집니다.</p>
<ol className="list-decimal px-10 py-2">
<li className="py-1">
<span className="text-red-400">Sample Id</span> &nbsp; 는 임상정보와 일치해야 합니다.
</li>
<li className="py-1">
<span className="text-red-400">gene </span> &nbsp; 은 공식 유전자 심볼(HUGO) 형식으로 주어져야 합니다.
</li>
<li className="py-1">
<span className="text-red-400">chromosome : </span> &nbsp; 염색체 번호 (예. chr3)
</li>
<li className="py-1">
<span className="text-red-400">start_pos : </span> &nbsp; 변이의 시작 위치 (예. 1573418)
</li>
<li className="py-1">
<span className="text-red-400">end_pos : </span> &nbsp; 변이의 끝 위치 (예. 1573418)
</li>
<li className="py-1">
<span className="text-red-400">cn : </span> &nbsp; 복제수(copy numbers)는 0 이상의 정수를 입력합니다.
</li>
<li className="py-1">
<span className="text-red-400">depth : </span> &nbsp; 실수(decimal) 형태의 값을 입력합니다.
</li>
<li className="py-1">
<span className="text-red-400">probes : </span> &nbsp; 0 이상의 정수를 입력합니다.
</li>
<li className="py-1">
<span className="text-red-400">weight: </span> &nbsp; 실수(decimal) 형태의 값을 입력합니다.
</li>
</ol>
</div>
</div>
</div>

);
};
export default CNVGuidelinesKorean;
