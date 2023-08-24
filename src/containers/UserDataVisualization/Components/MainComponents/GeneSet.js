import React, { useEffect, useRef, useState } from 'react';
import genes from '../../../Common/gene.json';
import { FormattedMessage } from "react-intl";

const GeneSet = ({ parentCallback, filterState }) => {
  const geneValue = useRef(null);

  const [value, setValue] = useState(filterState['type'] ? filterState['type'] : "user-defined")
  const [geneData, setGeneData] = useState(filterState['genes'] ? filterState['genes'].join(" ") : [])


  const selectGene = (event) => {
    let value = event.target.value;
    let g = genes[value].data;
    g = g.sort();
    let genesString = g.join(" ");
    geneValue.current.value = genesString;
    setValue(value)
    setGeneData(genesString)
  };

  const submitGeneSet = () => {
    let genevalue = geneData.split(' ')
    if (value === "user-defined") {
      parentCallback({ value: value, genes: genevalue });
    }
    else {

      parentCallback({ value: value, genes: genevalue });
    }
  }

  return (
    <div className="GeneSetcontainer">
      <div className="GeneSetgeneItem">
        <FormattedMessage id="EnterYourGenes" defaultMessage="Enter Your Genes">
          {placeholder =>
            <select
              id="gene_type"
              value={value}

              onChange={(e) => selectGene(e)}
              placeholder={placeholder}
              className="selectBox"
            >
              <option
                className="GeneSetGeneOption"
                value="user-defined"
                placeholder={placeholder}
              >
                <FormattedMessage id='UserDefinedList' defaultMessage="User-Defined List" />
              </option>
              <option value="major-genes"> Cancer major genes (28 genes) </option>
              <option value="brst-major-genes">Breast cancer major genes (20 genes)</option>
              <option value="hrd-genes">HRD genes (15 genes)</option>
              <option value="hrd-asso-brst">HRD association breast (26 genes)</option>
              <option value="tcell-exha-genes">Tcell exhausted genes (8 genes)</option>
              <option value="cdc-brst-genes">CDC Phenopedia breast cancer associated genes (18 genes)</option>
              <option value="cell-cycle-ctrl">General: Cell Cycle Control (34 genes)</option>
              <option value="p53-signal">General: p53 signaling (6 genes)</option>
              <option value="notch-signal">General: Notch signaling (55 genes)</option>
              <option value="dna-damage-resp">General: DNA Damage Response (12 genes)</option>
              <option value="other-grow-prol-signal">General: Other growth/proliferation signaling (11 genes)</option>
              <option value="survival-cell-signal">General: Survival/cell death regulation signaling (23genes)</option>
              <option value="telo-mere-main">General: Telomere maintenance (2 genes)</option>
              <option value="rtk-signal-family">General: RTK signaling family (16 genes)</option>
              <option value="pi3k-akt-mtor-signal">General: PI3K-AKT-mTOR signaling (17 genes)</option>
              <option value="ras-raf-signal">General: Ras-Raf-MEK-Erk/JNK signaling (26 genes)</option>
              <option value="regu-ribo-cell">General: Regulation of ribosomal protein synthesis and cell growth (9 genes)</option>
              <option value="angi-gene">General: Angiogenesis (6 genes)</option>
              <option value="fola-trans">General: Folate transport (5 genes)</option>
              <option value="inva-meta">General: Invasion and metastasis (27 genes)</option>
              <option value="tgf-beta-path">General: TGF-β Pathway (43 genes)</option>
            </select>
          }
        </FormattedMessage>

      </div>
      <div className="GeneSetgeneItem inputText" style={{ height: "100%" }}>
        <FormattedMessage id="EnterYourGenes" defaultMessage="Enter Your Genes">
          {placeholder =>
            <textarea
              rows={8}
              type="text"
              id="genes"
              ref={geneValue}
              className="GeneSetgeneInput"
              name="genes"
              placeholder={placeholder}
              value={geneData}
              onChange={(e) => {
                const abc = document.getElementById('gene_type').value;
                if (abc === 'user-defined') {
                  let userGenes = document
                    .getElementById('genes')
                    .value
                  userGenes = userGenes.toUpperCase()
                  setGeneData(userGenes)
                }

              }}
            />
          }
        </FormattedMessage>

      </div>
      <div className="GeneSetgeneItem">
        <button className="btn btnPrimary" onClick={submitGeneSet}>
          <FormattedMessage id="Filter" defaultMessage='Filter' />
        </button>
      </div>
    </div>

  );
};

export default GeneSet;









