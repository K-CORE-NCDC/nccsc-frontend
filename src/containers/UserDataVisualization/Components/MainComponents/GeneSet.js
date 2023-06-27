import React, { useRef, useState } from 'react';
import genes from '../../../Common/gene.json';
import { FormattedMessage } from "react-intl";

const GeneSet = ({ parentCallback, filterState }) => {
    const geneValue = useRef(null);

    const [value, setValue] = useState(filterState['type'] ? filterState['type'] : "user-defined")
    const [geneData, setGeneData] = useState(filterState['genes'] ? filterState['genes'] : [])

    const selectGene = (event) => {
        let value = event.target.value;
        let g = genes[value].data;
        let genesString = g.sort().join(' ');
        geneValue.current.value = genesString;
        setValue(value)
        setGeneData(g)
    };

    const submitGeneSet = () => {
        console.log(value, geneData);
        if (value === "user-defined"){
            let genevalue = geneData.split(' ')
            parentCallback({ value: value, genes: genevalue });
        } 
        else{
            parentCallback({ value: value, genes: geneData });
        }
    }

    return (
        <div className="GeneSetcontainer">
            <div className="GeneSetgeneItem">
                <select
                    id="gene_type"
                    value={value}
                    
                    onChange={(e) => selectGene(e)}
                    placeholder="Enter your Genes"
                    className="selectBox"
                >
                    <option
                        className="GeneSetGeneOption"
                        value="user-defined"
                        placeholder="Enter your Genes"
                    >
                        <FormattedMessage id='UserDefinedList' defaultMessage="User-Defined List" />
                    </option>
                    <option
                        className="GeneSetGeneOption"
                        value="major-genes"
                    >
                        Cancer major genes (28 genes)
                    </option>
                </select>
            </div>
            <div className="GeneSetgeneItem inputText">
                <input
                    type="text"
                    id="genes"
                    ref={geneValue}
                    className="GeneSetgeneInput"
                    name="genes"
                    placeholder="Enter your Genes"
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
            </div>
            <div className="GeneSetgeneItem">
                <button className="GeneSetgeneButton" onClick={submitGeneSet}>
                    Filter
                </button>
            </div>
        </div>
        
    );
};

export default GeneSet;









