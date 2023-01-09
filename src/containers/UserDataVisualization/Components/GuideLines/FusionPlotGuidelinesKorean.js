import React from "react";

const FusionPlotGuidelinesKorean = (plot_type) => {
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

<h1 className="pt-10 pb-2 text-4xl">Step 2) Input genomic data :</h1>
<h2 className="py-4 text-green-300 text-3xl">Mutation data format</h2>
<h1 className="py-4">All rows are tab-delimited.</h1>
<div className="py-8">
<p>The first (header) row gives the names of each clinical attribute, as
well as ‘sample_id’.</p>
<ol className="list-decimal px-10 py-2 pt-8">
<li className="py-1">
<span className="text-red-400">Sample Id:</span> &nbsp; should match
clinical information.
</li>
<li className="py-1">
<span className="text-red-400">gene_name: </span> &nbsp; should be
given in the official gene symbol(HUGO).
</li>
<li className="py-1">
<span className="text-red-400">chromosome :</span> &nbsp;
chromosome number (e.g. chr3).
</li>
<li className="py-1">
<span className="text-red-400">start_position :</span> &nbsp; start
position of the mutation (e.g. 1573418).
</li>
<li className="py-1">
<span className="text-red-400">end_position : </span> &nbsp; end
position of the mutation (e.g. 1573418).
</li>
<li className="py-1">
<span className="text-red-400">variant_classification : </span>{" "}
&nbsp; Definition of consequences type. It has to be one of the
following.
<p className=" py-2">
{" "}
● For a mutation event, please use one of the seven mutation types
below:{" "}
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
<span className="text-red-400 px-20">variant_type :</span> Definition of
alteration type. It has to be one of the following.
<p className="px-3 py-2">
{" "}
● For a mutation event, please use one of the three mutation types
below:{" "}
</p>
<ul className="list-disc pl-20">
<li className="py-1">
<span className="text-red-400 "> SNP:</span>a single nucleotide
polymorphism.
</li>
<li className="py-1">
<span className="text-red-400 "> INS: </span>an insertion
mutation.
</li>
<li className="py-1">
<span className="text-red-400 "> DEL: </span>a deletion
mutation.
</li>
</ul>
</li>
<li className="py-1">
<span className="text-red-400 pl-20">protein_change : </span> &nbsp; an
amino acid change (e.g. p.R586R).
</li>
<li className="py-1">
<span className="text-red-400 pl-20">swiss_prot_acc_id : </span> &nbsp;
SwissProt protein accession ID (e.g. O60477).
</li>
<li className="py-1">
<span className="text-red-400 pl-20">annotation_transcript : </span>{" "}
&nbsp; Ensembl Gene ID (e.g. ENST00000449103.1).
</li>
<li className="py-1">
<span className="text-red-400 pl-20">refseq_mrna_id : </span> &nbsp;
RefSeq mRNA ID (e.g. NM_001128432.2).
</li>
</ol>
</div>


<h1 className="py-2 text-green-300 text-4xl"> Fusion gene 정보 형식</h1>
<h2 className="text-3xl my-4">모든 행은 탭(tab)으로 분리된 형식입니다.</h2>
<div className="py-2">
<p>첫번째 (머리) 행은 ‘sample_id’ 와 각 유전정보의 이름으로 이루어집니다.</p>
<ol className="list-decimal px-10 py-2">
<li className="py-1">
<span className="text-red-400">Sample Id</span> &nbsp; 는 임상정보와 일치해야 합니다.
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
export default FusionPlotGuidelinesKorean;