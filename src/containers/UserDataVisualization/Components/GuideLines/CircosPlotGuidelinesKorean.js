import React from "react";

const CircosPlot = () => {
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
</div>

<p  className="py-3">
사용자는 임상정보를 업로드 한 후, 각 컬럼의 자료형(data type)을 결정해야 합니다. 선택가능한 임상정보 자료형은 문자형(character), 숫자형(number), 실수형(decimal), 논리형(yes/no)입니다. 만약 입력한 값이 선택된 자료형과 맞지 않는다면, 해당 데이터는 QC 단계에서 빨간색으로 강조 표시됩니다.
</p>

<h1 className="pt-10 pb-2 text-4xl">2단계) 유전체 정보 입력 :</h1>
<h2 className="py-4 text-green-300 text-3xl"> Mutation 정보 형식</h2>
<h1 className="py-4">모든 행은 탭(tab)으로 분리된 형식입니다.</h1>
<div  className="py-8">

<p>첫번째 (머리) 행은 ‘sample_id’ 와 각 유전정보의 이름으로 이루어집니다.</p>
<ol className="list-decimal px-10 py-2 pt-8">
<li className="py-1">
<span className="text-red-400">sample_id:</span> &nbsp; 는 임상정보와 일치해야 합니다.
</li>
<li className="py-1">
<span className="text-red-400">gene_name: </span> &nbsp; 은 공식 유전자 심볼(HUGO) 형식으로 주어져야 합니다.
</li>
<li className="py-1">
<span className="text-red-400">chromosome :</span> &nbsp;
염색체 번호 (예. chr3)
</li>
<li className="py-1">
<span className="text-red-400">start_position :</span> &nbsp; 변이의 시작 위치 (예. 1573418)
</li>
<li className="py-1">
<span className="text-red-400">end_position : </span> &nbsp; 변이의 끝 위치 (예. 1573418)
</li>
<li className="py-1">
<span className="text-red-400">variant_classification : </span>{" "}
&nbsp; 변이는 초래하는 결과에 따라 아래와 같이 분류됩니다.
<p  className=" py-2">
{" "}
● 7가지 변이 분류{" "}
</p>
<ul className="list-disc px-20">
<li className="py-1">
<span className="text-red-400 "> Missense_Mutation:</span>
chromosome number (e.g. chr3).
</li>
<li className="py-1">
<span className="text-red-400 "> Splice_Site: </span>a splice
site mutation.
</li>
<li className="py-1">
<span className="text-red-400 "> In_Frame_Ins: </span>a inframe
insertion mutation.
</li>
<li className="py-1">
<span className="text-red-400 "> In_Frame_Del: </span>a
frameshift insertion mutation.
</li>
<li className="py-1">
<span className="text-red-400 ">Frame_Shift_Del: </span>a
frameshift deletion mutation.
</li>
<li className="py-1">
<span className="text-red-400 "> Nonsense: </span>a nonsense
mutation.
</li>
</ul>
</li>
<li className="py-1">
<span className="text-red-400 px-20">variant_type :</span> 변이는 유형에 따라 아래와 같이 분류됩니다.
<p  className="px-3 py-2">
{" "}
● 3가지 변이 타입{" "}
</p>
<ul className="list-disc pl-20">
<li className="py-1">
<span className="text-red-400 "> SNP:</span>단일 뉴클레오티드 다형성
</li>
<li className="py-1">
<span className="text-red-400 "> INS: </span>삽입
</li>
<li className="py-1">
<span className="text-red-400 "> DEL: </span>결실
</li>
</ul>
</li>
<li className="py-1">
<span className="text-red-400 pl-20">protein_change : </span> &nbsp; 아미노산 변화 (예. p.R586R)
</li>
<li className="py-1">
<span className="text-red-400 pl-20">swiss_prot_acc_id : </span> &nbsp;
SwissProt 단백질 ID (예. O60477)
</li>
<li className="py-1">
<span className="text-red-400 pl-20">annotation_transcript : </span>{" "}
&nbsp; Ensembl 유전자 ID (예. ENST00000449103.1)
</li>
<li className="py-1">
<span className="text-red-400 pl-20">refseq_mrna_id : </span> &nbsp;
RefSeq mRNA ID (예. NM_001128432.2)
</li>
</ol>
</div>

<h1 className="py-5 text-green-300 text-4xl"> RNA 정보 형식</h1>
<h2 className="py-5 text-2xl">모든 행은 탭(tab)으로 분리된 형식입니다.</h2>
<div  className="pt-2 my-4">
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

<h1 className="py-2 text-green-300 my-4 text-4xl"> Methylation 정보 형식</h1>
<p className="py-2">모든 행은 탭(tab)으로 분리된 형식입니다.</p>
<div  className="py-2">
<p>첫번째 (머리) 행은 ‘sample_id’ 와 각 유전정보의 이름으로 이루어집니다.</p>
<ol className="list-decimal px-10 py-2">
<li className="py-1">
<span className="text-red-400">sample_id</span> &nbsp; 는 임상정보와 일치해야 합니다.
</li>
<li className="py-1">
<span className="text-red-400">gene_name </span> &nbsp; 은 공식 유전자 심볼(HUGO) 형식으로 주어져야 합니다.
</li>
<li className="py-1">
<span className="text-red-400">target_id : </span> &nbsp;
methylation 타겟 ID (예. cg00030074)
</li>
<li className="py-1">
<span className="text-red-400">target_type:</span> &nbsp; 샘플의 타입.
<p  className="px-3 py-2">
{" "}
● 한 샘플에 대하여, 아래 중 하나의 타입으로 지정해주세요.{" "}
</p>
<ul className="list-disc px-20">
<li className="py-1"> N : 정상(Normal)</li>
<li className="py-1"> T : 종양(Tumor)</li>
</ul>
</li>
<li className="py-1">
<span className="text-red-400">gene_vl : </span> &nbsp; methylation 유전자 값 (예. 0.962545)
</li>
</ol>
</div>

<h1 className="py-2 text-green-300 text-4xl"> Proteome 정보 형식</h1>
<h2 className="text-3xl my-4">모든 행은 탭(tab)으로 분리된 형식입니다.</h2>
<div  className="py-6">
<p>첫번째 (머리) 행은 ‘sample_id’ 와 각 유전정보의 이름으로 이루어집니다.</p>
<ol className="list-decimal px-10 py-2">
<li className="py-1">
<span className="text-red-400">sample_id</span> &nbsp; 는 임상정보와 일치해야 합니다.
</li>
<li className="py-1">
<span className="text-red-400">type : </span> &nbsp; 샘플의 타입.
<p  className="px-3 py-2">
{" "}
● 한 샘플에 대하여, 아래 중 하나의 타입으로 지정해주세요.{" "}
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
<span className="text-red-400">p_name : </span> &nbsp; 단백질 이름 (예. Q9UIB8)
</li>
<li className="py-1">
<span className="text-red-400">gene_vl : </span> &nbsp; Proteome 발현값 (예. 1.13929)
</li>
<li className="py-1">
<span className="text-red-400">z_score : </span> &nbsp; Proteome 발현값의 표준 점수 (예. 0.599818)
</li>
</ol>
</div>

<h1 className="py-2 text-green-300 text-4xl"> Copy Number Variation 정보 형식</h1>
<h2 className="text-3l my-4">모든 행은 탭(tab)으로 분리된 형식입니다.</h2>
<div  className="py-2">
<p>첫번째 (머리) 행은 ‘sample_id’ 와 각 유전정보의 이름으로 이루어집니다.</p>
<ol className="list-decimal px-10 py-2">
<li className="py-1">
<span className="text-red-400">sample_id</span> &nbsp; 는 임상정보와 일치해야 합니다.
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

<h1 className="py-2 text-green-300 text-4xl"> Fusion gene 정보 형식</h1>
<h2 className="text-3xl my-4">모든 행은 탭(tab)으로 분리된 형식입니다.</h2>
<div  className="py-2">
<p>첫번째 (머리) 행은 ‘sample_id’ 와 각 유전정보의 이름으로 이루어집니다.</p>
<ol className="list-decimal px-10 py-2">
<li className="py-1">
<span className="text-red-400">sample_id</span> &nbsp; 는 임상정보와 일치해야 합니다.
</li>
<li className="py-1">
<span className="text-red-400">left_gene_name </span> &nbsp; 은 공식 유전자 심볼(HUGO) 형식으로 주어져야 합니다.
</li>
<li className="py-1">
<span className="text-red-400">left_gene_chr : </span> &nbsp; 왼쪽 유전자의 염색체 이름(예.chr8)
</li>
<li className="py-1">
<span className="text-red-400">left_hg38_pos : </span> &nbsp; 왼쪽 유전자의 위치 - hg38 기준(예. 140793354)
</li>
<li className="py-1">
<span className="text-red-400">right_gene_name : </span> &nbsp; 은 공식 유전자 심볼(HUGO) 형식으로 주어져야 합니다.
</li>
<li className="py-1">
<span className="text-red-400">right_gene_chr : </span> &nbsp; 오른쪽 유전자의 염색체 이름 (예.chr8)
</li>
<li className="py-1">
<span className="text-red-400">right_hg38_pos : </span> &nbsp; 오른쪽 유전자의 위치 - hg38 기준 (예. 140793354)
</li>
</ol>
</div>
</div>
);
};
export default CircosPlot;
