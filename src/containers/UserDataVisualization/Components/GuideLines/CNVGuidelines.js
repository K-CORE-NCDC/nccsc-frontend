import React from 'react';

const CircosPlot = (plot_type) => {
  return (
    <div className="px-10 py-10 overflow-auto" style={{ height: '60vh' }}>
      <h1 className="pt-5 text-4xl">Step 1) Input clinical data :</h1>
      <h2 className="py-2 text-3xl text-green-300">Clinical data format</h2>
      <h1 className="py-4">All rows are tab-delimited.</h1>
      <h2 className="py-8">
        The first (header) row gives the names of each clinical attribute, as well as ‘sample_id’.
        An example first row is:
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
        Each following row gives the sample id, then the value for each clinical attribute, or the
        blank which indicates that there's no data.
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
        After you upload your clinical data, you will decide the data type for each column. The
        possible clinical data types are character, number, decimal, or yes/no. If your data in a
        specific column does not match the data type you select, the erroneous data will be
        highlighted in red in the QC step.
      </p>

      <h1 className="pt-10 pb-2 text-4xl">Step 2) Input genomic data :</h1>

      <h1 className="py-2 text-green-300 text-4xl">Copy Number Variation data format</h1>
      <h2 className="text-3l my-4">All rows are tab-delimited.</h2>
      <div className="py-2">
        <p>
          The first (header) row gives the names of each clinical attribute, as well as ‘sample_id’.
        </p>
        <ol className="list-decimal px-10 py-2">
          <li className="py-1">
            <span className="text-red-400">sample_id</span> &nbsp; should match clinical
            information.
          </li>
          <li className="py-1">
            <span className="text-red-400">gene </span> &nbsp; should be given in the official gene
            symbol(HUGO).
          </li>
          <li className="py-1">
            <span className="text-red-400">chromosome : </span> &nbsp; chromosome number (e.g.
            chr3).
          </li>
          <li className="py-1">
            <span className="text-red-400">start_pos : </span> &nbsp; start position of the mutation
            (e.g. 1573418).
          </li>
          <li className="py-1">
            <span className="text-red-400">end_pos : </span> &nbsp; send position of the mutation
            (e.g. 1573418).
          </li>
          <li className="py-1">
            <span className="text-red-400">cn : </span> &nbsp; copy numbers are given as positive
            integers or 0.
          </li>
          <li className="py-1">
            <span className="text-red-400">depth : </span> &nbsp; depths are given as decimal
            values.
          </li>
          <li className="py-1">
            <span className="text-red-400">probes : </span> &nbsp; number of probes are given as
            positive integers or 0.
          </li>
          <li className="py-1">
            <span className="text-red-400">weight: </span> &nbsp; weights are given as decimal
            values.
          </li>
        </ol>
      </div>
    </div>
  );
};
export default CircosPlot;
