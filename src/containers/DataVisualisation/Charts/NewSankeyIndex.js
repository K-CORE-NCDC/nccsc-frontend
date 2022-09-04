import React from 'react'
import Sankey from './NewSankey'
import NewSankeyd3 from './NewSankeyd3'




function NewSankeyindex() {

  let energyjson = {
    "nodes": [
      { "name": "Genes" },
      { "name": "PIK3CA" },
      { "name": "TP53" },
      { "name": "KRAS" },
      { "name": "Variants" },
      { "name": "rs121913279" },
      { "name": "rs28934578" },
      { "name": "rs786201057" },
      { "name": "rs587782529" },
      { "name": "rs104886003" },
      { "name": "rs17851045" },
      { "name": "Diseases" },
      { "name": "Adrenocortical carcinoma" },
      { "name": "Cholangiocarcinoma" },
      { "name": "Drugs" },
      { "name": "Mitotane" },
      { "name": "Pemigatinib" },
    ],
    "links": [
      { "source": 1, "target": 4, "value": Math.floor(Math.random() * 100) },
      { "source": 2, "target": 5, "value": Math.floor(Math.random() * 100) },
      { "source": 2, "target": 6, "value": Math.floor(Math.random() * 100) },
      { "source": 2, "target": 7, "value": Math.floor(Math.random() * 100) },
      { "source": 1, "target": 8, "value": Math.floor(Math.random() * 100) },
      { "source": 3, "target": 9, "value": Math.floor(Math.random() * 100) },
      { "source": 1, "target": 10, "value": Math.floor(Math.random() * 100) },
      { "source": 3, "target": 11, "value": Math.floor(Math.random() * 100) },
      { "source": 2, "target": 10, "value": Math.floor(Math.random() * 100) },
      { "source": 10, "target": 12, "value": Math.floor(Math.random() * 100) },
      { "source": 11, "target": 13, "value": Math.floor(Math.random() * 100) }
    ]
  }
  return (
    <div>
      <Sankey></Sankey>
      <NewSankeyd3 SankeyJson={energyjson}></NewSankeyd3>
    </div>
  )
}

export default NewSankeyindex