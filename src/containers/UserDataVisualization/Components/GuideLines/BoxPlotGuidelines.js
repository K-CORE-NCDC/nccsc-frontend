import React from "react";

const CircosPlot = (plot_type) => {
  return (
    <div className="px-10 py-10 overflow-auto" style={{height:'340px'}}>
      <h1 className="pt-5 text-4xl"  >Step 1) Input clinical data :</h1>
      <h2 className="py-2 text-3xl text-green-300">Clinical data format</h2>
      <h1 className="py-4">All rows are tab-delimited.</h1>
      <h2 className="py-8">
        The first (header) row gives the names of each clinical attribute, as
        well as ‘sample_id’. An example first row is:
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
        Each following row gives the sample id, then the value for each clinical
        attribute, or the blank which indicates that there's no data.
      </p>

      <p>Some example data rows would then be:</p>
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
        After you upload your clinical data, you will decide the data type for
        each column. The possible clinical data types are character, number,
        decimal, or yes/no. If your data in a specific column does not match the
        data type you select, the erroneous data will be highlighted in red in
        the QC step.
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

      <h1 className="py-2 text-green-300 text-4xl">Proteome data format</h1>
      <h2 className="text-3xl my-4">All rows are tab-delimited.</h2>
      <div className="py-6">
        <p>The first (header) row gives the names of each clinical attribute, as
        well as ‘sample_id’.</p>
        <ol className="list-decimal px-10 py-2">
          <li className="py-1">
            <span className="text-red-400">Sample Id</span> &nbsp; should match
            clinical information.
          </li>
          <li className="py-1">
            <span className="text-red-400">type : </span> &nbsp; type of samples. It has to be one of the following.
            <p className="px-3 py-2">
              {" "}
              ● For a sample, please use either one of sample types below:{" "}
            </p>
            <ul className="list-disc px-20">
              <li className="py-1"> N : Normal</li>
              <li className="py-1">T : Tumor</li>
            </ul>
          </li>
          <li className="py-1">
            <span className="text-red-400">gene_name</span> &nbsp; should be given in the official gene symbol(HUGO).
          </li>
          <li className="py-1">
            <span className="text-red-400">p_name : </span> &nbsp; protein name (e.g. Q9UIB8).
          </li>
          <li className="py-1">
            <span className="text-red-400">gene_vl : </span> &nbsp; Proteome expression values (e.g. 1.13929).
          </li>
          <li className="py-1">
            <span className="text-red-400">z_score : </span> &nbsp; Proteome expression values in Z-score (e.g. 0.599818).
          </li>
        </ol>
      </div>

    
    </div>
  );
};
export default CircosPlot;