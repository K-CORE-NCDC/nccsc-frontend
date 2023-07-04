import React from "react";

const VolcanoPlotGuidelinesKorean = (plot_type) => {
return (
<div className="px-10 py-10 overflow-auto" style={{height:'60vh'}}>
<h1 className="pt-5 text-4xl" >1단계) 임상정보 입력 :</h1>
<h2 className="py-2 text-3xl text-green-300">임상정보 형식</h2>
<h1 className="py-4">모든 행은 탭(tab)으로 분리된 형식입니다.</h1>
<h2 className="py-8">
첫번째 (머리) 행은 ‘sample_id’ 와 각 임상변수의 이름으로 이루어집니다.

첫 번째 행의 예시 :
</h2>

<div className="py-10">
<div className="text-red-400 bg-red-200 flex justify-between py-4 px-4">
<p>sample_id</p>
<p>diag_age</p>
<p>t_category</p>
<p>smoking_yn</p>
<p>rlps_yn</p>
<p>rlps_cnfr_drtn</p>
</div>
</div>

<p className="py-4">
다음 행은 샘플 아이디(sample id), 각 임상변수의 값으로 이루어집니다. 값이 없을 경우, 빈 칸으로 남겨둡니다.
</p>

<p>다음 행들의 예시 :</p>
<div className="py-10">
<div className="py-1 ">
<div className="text-red-400 bg-red-200 flex justify-between py-4 px-4">
<p>u01</p>
<p>42</p>
<p>T1</p>
<p>yes</p>
<p>yes</p>
<p>32.45</p>
</div>
</div>
<div className=" py-2">
<div className="text-red-400 bg-red-200 flex justify-between py-4 px-4">
<p className="pl-2">u02</p>
<p className="pr-6">23</p>
<p className="pr-6">T0</p>
<p className="pr-8">no</p>
<p className="pr-8">no</p>
<p className="pr-6"></p>
</div>
</div>
<div className=" py-2">
<div className="text-red-400 bg-red-200 flex justify-between py-4 px-4">
<p>u03</p>
<p>58</p>
<p>T3</p>
<p>yes</p>
<p>yes</p>
<p>128.5</p>
</div>
</div>
</div>

<p className="py-3">
사용자는 임상정보를 업로드 한 후, 각 컬럼의 자료형(data type)을 결정해야 합니다. 선택가능한 임상정보 자료형은 문자형(character), 숫자형(number), 실수형(decimal), 논리형(yes/no)입니다. 만약 입력한 값이 선택된 자료형과 맞지 않는다면, 해당 데이터는 QC 단계에서 빨간색으로 강조 표시됩니다.
</p>

<h1 className="pt-10 pb-2 text-4xl">2단계) 유전체정보 입력 :</h1>
<h1 className="py-5 text-green-300 text-4xl"> RNA 정보 형식</h1>
<h2 className="py-5 text-2xl">모든 행은 탭(tab)으로 분리된 형식입니다.</h2>
<div className="pt-2 my-4">
<p>첫번째 (머리) 행은 ‘sample_id’ 와 각 유전정보의 이름으로 이루어집니다.</p>
<ol className="list-decimal px-10 py-2">
<li className="py-1">
<span className="text-red-400">sample_id</span> &nbsp; 는 임상정보와 일치해야 합니다.
</li>
<li className="py-1">
<span className="text-red-400">gene_name </span> &nbsp; 은 공식 유전자 심볼(HUGO) 형식으로 주어져야 합니다.
</li>
<li className="py-1">
<span className="text-red-400">gene_vl : </span> &nbsp; RNA 발현 값 (예. 24.74)
</li>
<li className="py-1">
<span className="text-red-400">z_score :</span> &nbsp; RNA 발현 값의 표준 점수 (예. -0.29075)
</li>
</ol>
</div>

<h1 className="py-2 text-green-300 text-4xl"> Proteome 정보 형식</h1>
<h2 className="text-3xl my-4">모든 행은 탭(tab)으로 분리된 형식입니다.</h2>
<div className="py-6">
<p>첫번째 (머리) 행은 ‘sample_id’ 와 각 유전정보의 이름으로 이루어집니다.</p>
<ol className="list-decimal px-10 py-2">
<li className="py-1">
<span className="text-red-400">sample_id</span> &nbsp; 는 임상정보와 일치해야 합니다.
</li>
<li className="py-1">
<span className="text-red-400">type : </span> &nbsp; 샘플의 타입.
<p className="px-3 py-2">
{" "}
한 샘플에 대하여, 아래 중 하나의 타입으로 지정해주세요.{" "}
</p>
<ul className="list-disc px-20">
<li className="py-1"> N : 정상(Normal)</li>
<li className="py-1"> T : 종양(Tumor)</li>
</ul>
</li>
<li className="py-1">
<span className="text-red-400">gene_name</span> &nbsp; 은 공식 유전자 심볼(HUGO) 형식으로 주어져야 합니다.
</li>
<li className="py-1">
<span className="text-red-400">p_name : </span> &nbsp; 단백질 이름 (예. Q9UIB8).
</li>
<li className="py-1">
<span className="text-red-400">gene_vl : </span> &nbsp; Proteome 발현값 (예. 1.13929)
</li>
<li className="py-1">
<span className="text-red-400">z_score : </span> &nbsp; Proteome 발현값의 표준 점수 (예. 0.599818)
</li>
</ol>
</div>
</div>
);
};
export default VolcanoPlotGuidelinesKorean;
