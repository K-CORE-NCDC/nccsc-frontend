import { element } from 'prop-types';
import React, { useState,useEffect } from 'react'
import Oncoprint from "oncoprintjs";
import _ from 'lodash';
import './rules'

export default function OncoCmp({ width,data }) {

  const [state, setState] = useState([]);

  const drawChart = (w,gData,cData) => {
    // $(document).ready(function() {


      var clinical_custom_track_params = {
              'rule_set_params': window.geneticrules.clinical_rule_set_custom,
              'target_group': 1,
              'na_z': 1.1,
              'sort_direction_changeable': true,
              'sortCmpFn': function (d1, d2) {
                  if (d1.na && d2.na) {
                      return 0;
                  } else if (d1.na && !d2.na) {
                      return 2;
                  } else if (!d1.na && d2.na) {
                      return -2;
                  } else if (!d1['category'] && !d2['category']) {
                      return 0
                  } else if (!d1['category'] && d2['category']) {
                      return 2
                  } else if (d1['category'] && !d2['category']) {
                      return -2
                  } else {
                      return d1.category.localeCompare(d2.category);
                  }
              },
              'init_sort_direction': 0
          };

      var clinical_stacked_bar_track_params = {
          'rule_set_params': window.geneticrules.clinical_rule_set_stacked_bar,
          'target_group': 1,
          'na_z': 1.1
      };

      var clinical_bar_track_params = {
          'rule_set_params': window.geneticrules.clinical_rule_set_bar,
          'target_group': 1,
          'na_z': 1.1,
          'sort_direction_changeable': true,
          'sortCmpFn': function (d1, d2) {
              if (d1 == null && d2 == null) {
                  return 0;
              } else if (d1 == null && d2 != null) {
                  return 2;
              } else if (d1 != null && d2 == null) {
                  return -2;
              } else {
                  return (d1['cnt'] < d2['cnt'] ? -1 : (d1['cnt'] === d2['cnt'] ? 0 : 1));
              }
          },
          'init_sort_direction': 0
      };

      var oncoprint = new Oncoprint("#oncoprint-glyphmap", w);
      oncoprint.suppressRendering();
      var geneData = [
              {
                  "data": [
                      {
                          "regulation": "up",
                          "protein": "down",
                          "sample": "RN29433943"
                      },
                      {
                          "regulation": "up",
                          "sample": "RN31625608"
                      },
                      {
                          "protein": "down",
                          "sample": "RN98692058"
                      },
                      {
                          "snv_class": null,
                          "regulation": "up",
                          "sample": "RN96772127",
                          "variant_classification": "Missense_Mutation"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "TP53",
                  "desc": "TP53"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "EGFR",
                  "desc": "EGFR"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "regulation": "down",
                          "protein": "down",
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "PDGFRA",
                  "desc": "PDGFRA"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "MDM2",
                  "desc": "MDM2"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "regulation": "up",
                          "protein": "up",
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "CDK4",
                  "desc": "CDK4"
              },
              {
                  "data": [
                      {
                          "regulation": "up",
                          "sample": "RN29433943"
                      },
                      {
                          "regulation": "up",
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "regulation": "up",
                          "protein": "up",
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "CDK6",
                  "desc": "CDK6"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "regulation": "up",
                          "protein": "up",
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "CDKN2A",
                  "desc": "CDKN2A"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "CDKN2B",
                  "desc": "CDKN2B"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "regulation": "up",
                          "sample": "RN31625608"
                      },
                      {
                          "protein": "up",
                          "sample": "RN98692058"
                      },
                      {
                          "regulation": "down",
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "PTEN",
                  "desc": "PTEN"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "regulation": "up",
                          "sample": "RN31625608"
                      },
                      {
                          "regulation": "up",
                          "protein": "up",
                          "sample": "RN98692058"
                      },
                      {
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "NF1",
                  "desc": "NF1"
              },
              {
                  "data": [
                      {
                          "protein": "up",
                          "sample": "RN29433943"
                      },
                      {
                          "regulation": "up",
                          "sample": "RN31625608"
                      },
                      {
                          "protein": "up",
                          "sample": "RN98692058"
                      },
                      {
                          "sample": "RN96772127"
                      },
                      {
                          "regulation": "up",
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "RB1",
                  "desc": "RB1"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "regulation": "down",
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "BRAF",
                  "desc": "BRAF"
              },
              {
                  "data": [
                      {
                          "snv_class": null,
                          "sample": "RN29433943",
                          "variant_classification": "Missense_Mutation"
                      },
                      {
                          "snv_class": null,
                          "regulation": "up",
                          "sample": "RN31625608",
                          "variant_classification": "Missense_Mutation"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "sample": "RN96772127"
                      },
                      {
                          "regulation": "up",
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "PIK3CA",
                  "desc": "PIK3CA"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "PIK3R1",
                  "desc": "PIK3R1"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "regulation": "up",
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "protein": "up",
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "KRAS",
                  "desc": "KRAS"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "regulation": "up",
                          "protein": "up",
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "NRAS",
                  "desc": "NRAS"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "protein": "up",
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "HRAS",
                  "desc": "HRAS"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "regulation": "up",
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "protein": "up",
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "ATRX",
                  "desc": "ATRX"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "regulation": "up",
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "MDM4",
                  "desc": "MDM4"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "MET",
                  "desc": "MET"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "FGFR3",
                  "desc": "FGFR3"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "FGFR2",
                  "desc": "FGFR2"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "regulation": "up",
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "FGFR1",
                  "desc": "FGFR1"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "regulation": "down",
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "IDH1",
                  "desc": "IDH1"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "PIK3C2G",
                  "desc": "PIK3C2G"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "sample": "RN96772127"
                      },
                      {
                          "regulation": "up",
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "PIK3CG",
                  "desc": "PIK3CG"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "regulation": "up",
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "regulation": "down",
                          "sample": "RN96772127"
                      },
                      {
                          "regulation": "up",
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "PIK3C2A",
                  "desc": "PIK3C2A"
              },
              {
                  "data": [
                      {
                          "sample": "RN29433943"
                      },
                      {
                          "sample": "RN31625608"
                      },
                      {
                          "sample": "RN98692058"
                      },
                      {
                          "protein": "up",
                          "sample": "RN96772127"
                      },
                      {
                          "sample": "RN89646221"
                      }
                  ],
                  "gene": "PIK3R2",
                  "desc": "PIK3R2"
              }
      ]

      if (gData){
        geneData = gData
      }


      var share_id = null;


      function calculateMutation(genes) {
        var total = genes.length;
        var i = 0;
        for (var key in genes) {
          if (Object.keys(genes).indexOf("variant_classification") != -1) i++;
        }
        return Math.round((i/total)*100, 0) + "%";
      }


      for (var i = 0; i < geneData.length; i++) {
        var new_ga_id = oncoprint.addTracks([{
                'rule_set_params': window.geneticrules.genetic_rule_set_custom,
                'label': geneData[i].gene,
                'target_group': 2,
                'sort_direction_changeable': true,

                'sortCmpFn': function (d1, d2) {
                  console.log(d1,d2);
                    if (d1.na && d2.na) {
                        return 0;
                    } else if (d1.na && !d2.na) {
                        return 2;
                    } else if (!d1.na && d2.na) {
                        return -2;
                    } else if (!d1['variant_classification'] && !d2['variant_classification']) {
                        return 0
                    } else if (!d1['variant_classification'] && d2['variant_classification']) {
                        return 2
                    } else if (d1['variant_classification'] && !d2['variant_classification']) {
                        return -2
                    } else {
                        return d1['variant_classification'].localeCompare(d2['variant_classification']);
                    }
                },
                'description': geneData[i].desc,
                'na_z': 1.1,
                'init_sort_direction': 0
            }])[0]
         geneData[i].track_id = new_ga_id;
        if (i === 0) {
          share_id = new_ga_id;
        } else {
          oncoprint.shareRuleSet(share_id, new_ga_id);
        }
      }

      // oncoprint.hideIds([], true);
      oncoprint.keepSorted(false);

      for (var i = 0; i < geneData.length; i++) {
        var results = [];
        for (var j = 0; j < geneData[i].data.length; j++) {

            var result = _.cloneDeep(geneData[i].data[j]);

            if(result.type == 'search') {
                result.sample = geneData[i].data[j].sample;
            }else {
                result.sample = geneData[i].data[j].sample;
            }

            results[j] = result;
        }
        // console.log(results);
        oncoprint.setTrackData(geneData[i].track_id, results, 'sample');
        oncoprint.setTrackInfo(geneData[i].track_id, calculateMutation(results));
        oncoprint.setTrackTooltipFn(geneData[i].track_id, function(data) {
             var result = "<b>Sample: " + data.sample + "</b>"
             return result;
         });

      }

      oncoprint.keepSorted(true);



      var clinicalData =  {
        "globalMutCategory": [
            {
                "val": {
                    "In_Frame_Ins": 0,
                    "Frame_Shift_Del": 0,
                    "Frame_Shift_Ins": 0,
                    "Missense_Mutation": 45,
                    "Nonsense_Mutation": 2,
                    "Splice_Site": 3,
                    "In_Frame_Del": 0,
                    "Germline": 0
                },
                "sample": "RN29433943"
            },
            {
                "val": {
                    "In_Frame_Ins": 0,
                    "Frame_Shift_Del": 0,
                    "Frame_Shift_Ins": 0,
                    "Missense_Mutation": 32,
                    "Nonsense_Mutation": 4,
                    "Splice_Site": 7,
                    "In_Frame_Del": 1,
                    "Germline": 0
                },
                "sample": "RN31625608"
            },
            {
                "val": {
                    "In_Frame_Ins": 1,
                    "Frame_Shift_Del": 2,
                    "Frame_Shift_Ins": 1,
                    "Missense_Mutation": 100,
                    "Nonsense_Mutation": 5,
                    "Splice_Site": 3,
                    "In_Frame_Del": 1,
                    "Germline": 0
                },
                "sample": "RN98692058"
            },
            {
                "val": {
                    "In_Frame_Ins": 2,
                    "Frame_Shift_Del": 6,
                    "Frame_Shift_Ins": 2,
                    "Missense_Mutation": 156,
                    "Nonsense_Mutation": 4,
                    "Splice_Site": 13,
                    "In_Frame_Del": 1,
                    "Germline": 0
                },
                "sample": "RN96772127"
            },
            {
                "val": {
                    "In_Frame_Ins": 0,
                    "Frame_Shift_Del": 1,
                    "Frame_Shift_Ins": 0,
                    "Missense_Mutation": 42,
                    "Nonsense_Mutation": 4,
                    "Splice_Site": 2,
                    "In_Frame_Del": 0,
                    "Germline": 0
                },
                "sample": "RN89646221"
            }
        ],
        "mutCategory": [
            {
                "val": {
                    "In_Frame_Ins": 0,
                    "Frame_Shift_Del": 0,
                    "Frame_Shift_Ins": 0,
                    "Missense_Mutation": 1,
                    "Nonsense_Mutation": 0,
                    "Splice_Site": 0,
                    "In_Frame_Del": 0,
                    "Germline": 0
                },
                "sample": "RN29433943"
            },
            {
                "val": {
                    "In_Frame_Ins": 0,
                    "Frame_Shift_Del": 0,
                    "Frame_Shift_Ins": 0,
                    "Missense_Mutation": 1,
                    "Nonsense_Mutation": 0,
                    "Splice_Site": 0,
                    "In_Frame_Del": 0,
                    "Germline": 0
                },
                "sample": "RN31625608"
            },
            {
                "val": {
                    "In_Frame_Ins": 0,
                    "Frame_Shift_Del": 0,
                    "Frame_Shift_Ins": 0,
                    "Missense_Mutation": 0,
                    "Nonsense_Mutation": 0,
                    "Splice_Site": 0,
                    "In_Frame_Del": 0,
                    "Germline": 0
                },
                "sample": "RN98692058"
            },
            {
                "val": {
                    "In_Frame_Ins": 0,
                    "Frame_Shift_Del": 0,
                    "Frame_Shift_Ins": 0,
                    "Missense_Mutation": 1,
                    "Nonsense_Mutation": 0,
                    "Splice_Site": 0,
                    "In_Frame_Del": 0,
                    "Germline": 0
                },
                "sample": "RN96772127"
            },
            {
                "val": {
                    "In_Frame_Ins": 0,
                    "Frame_Shift_Del": 0,
                    "Frame_Shift_Ins": 0,
                    "Missense_Mutation": 0,
                    "Nonsense_Mutation": 0,
                    "Splice_Site": 0,
                    "In_Frame_Del": 0,
                    "Germline": 0
                },
                "sample": "RN89646221"
            }
        ],
        "mutCnt": [
            {
                "cnt": 1,
                "sample": "RN29433943"
            },
            {
                "cnt": 1,
                "sample": "RN31625608"
            },
            {
                "cnt": 0,
                "sample": "RN98692058"
            },
            {
                "cnt": 1,
                "sample": "RN96772127"
            },
            {
                "cnt": 0,
                "sample": "RN89646221"
            }
        ],
        "globalMutCnt": [
            {
                "cnt": 50,
                "sample": "RN29433943"
            },
            {
                "cnt": 44,
                "sample": "RN31625608"
            },
            {
                "cnt": 113,
                "sample": "RN98692058"
            },
            {
                "cnt": 184,
                "sample": "RN96772127"
            },
            {
                "cnt": 49,
                "sample": "RN89646221"
            }
        ]
      }

      if (cData){
        clinicalData = cData
      }
      //
      var global_mut_category_datum = clinicalData['globalMutCategory']
      var mut_category_datum = clinicalData['mutCategory']
      var global_mut_datum = clinicalData['mutCnt']
      var mut_datum = clinicalData['globalMutCnt']

      var clinical_stacked_bar_track_params = {
           'rule_set_params': window.geneticrules.clinical_rule_set_stacked_bar,
           'target_group': 1,
           'na_z': 1.1,
           'sortCmpFn':function (d1, d2) {
                if (d1.na && d2.na) {
                    return 0;
                } else if (d1.na && !d2.na) {
                    return 2;
                } else if (!d1.na && d2.na) {
                    return -2;
                } else if (!d1['category'] && !d2['category']) {
                    return 0
                } else if (!d1['category'] && d2['category']) {
                    return 2
                } else if (d1['category'] && !d2['category']) {
                    return -2
                } else {
                    return d1.category.localeCompare(d2.category);
                }
            }
       };

      var clinical_bar_track_params = {
         'rule_set_params': window.geneticrules.clinical_rule_set_bar,
         'target_group': 1,
         'na_z': 1.1,
         'sort_direction_changeable': true,
         'sortCmpFn': function (d1, d2) {
             if (d1 == null && d2 == null) {
                 return 0;
             } else if (d1 == null && d2 != null) {
                 return 2;
             } else if (d1 != null && d2 == null) {
                 return -2;
             } else {
                 return (d1['cnt'] < d2['cnt'] ? -1 : (d1['cnt'] === d2['cnt'] ? 0 : 1));
             }
         },
         'init_sort_direction': 0
      };
      clinical_stacked_bar_track_params['rule_set_params']['legend_label'] = 'Global Mutation Distribution';
      clinical_stacked_bar_track_params['label'] = 'Global Mutation Distribution';
      clinical_stacked_bar_track_params['description'] = 'Global Mutation Distribution';
      var global_mut_category_id = oncoprint.addTracks([_.clone(clinical_stacked_bar_track_params)])[0];



      clinical_bar_track_params['rule_set_params']['legend_label'] = 'Global Mutation Count';
      clinical_bar_track_params['label'] = 'Global Mutation Count';
      clinical_bar_track_params['description'] = 'Global Mutation Count';
      var global_mut_id = oncoprint.addTracks([_.clone(clinical_bar_track_params)])[0];

      clinical_stacked_bar_track_params['rule_set_params']['legend_label'] = 'Mutation Distribution';
      clinical_stacked_bar_track_params['label'] = 'Mutation Distribution';
      clinical_stacked_bar_track_params['description'] = 'Mutation Distribution';
      var mut_category_id = oncoprint.addTracks([_.clone(clinical_stacked_bar_track_params)])[0];

      clinical_bar_track_params['rule_set_params']['legend_label'] = 'Mutation Count';
      clinical_bar_track_params['label'] = 'Mutation Count';
      clinical_bar_track_params['description'] = 'Mutation Count';
      var mut_id = oncoprint.addTracks([_.clone(clinical_bar_track_params)])[0];

      oncoprint.setTrackInfo(global_mut_category_id, "");
      oncoprint.setTrackData(global_mut_category_id, global_mut_category_datum, 'sample');
      oncoprint.setTrackTooltipFn(global_mut_category_id,function(data) {
          return "<b>Sample: " + data.sample + "</b>";
      });

      oncoprint.setTrackInfo(mut_category_id, "");
      oncoprint.setTrackData(mut_category_id, mut_category_datum, 'sample');
      oncoprint.setTrackTooltipFn(mut_category_id,function(data) {
          return "<b>Sample: " + data.sample + "</b>";
      });

      oncoprint.setTrackInfo(global_mut_id, "");
      oncoprint.setTrackData(global_mut_id, global_mut_datum, 'sample');
      oncoprint.setTrackTooltipFn(global_mut_id,function(data) {
          return "<b>Sample: " + data.sample + " <br/> Count: " + data.cnt + "</b>";
      });

      oncoprint.setTrackInfo(mut_id, "");
      oncoprint.setTrackData(mut_id, mut_datum, 'sample');
      oncoprint.setTrackTooltipFn(mut_id,function(data) {
          return "<b>Sample: " + data.sample + " <br/> Count: " + data.cnt + "</b>";
      });


      oncoprint.releaseRendering();



    // });
  }


  useEffect(()=>{
    if (data){
      let d = data
      let gData = d['geneData']
      let cData = d['clinicalData']
      drawChart(width-300,gData,cData)
    }
  },[])

  return (
    <div className='onco' id='oncoprint-glyphmap' style={{width:width+'px'}}>
    </div>
  )
}
