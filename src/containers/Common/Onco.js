import { element } from 'prop-types';
import React, { useState,useEffect } from 'react'
import Oncoprint from "oncoprintjs";
import _ from 'lodash';
import './rules'

const OncoCmp = React.forwardRef(({ width,data, watermarkCss }, ref) => {

  const [state, setState] = useState({});

  const drawChart = (w,gData,cData) => {
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

    var oncoprint = new window.Oncoprint("#oncoprint-glyphmap", "80vw");
    oncoprint.suppressRendering();
    var geneData = []

    if(gData){
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
      let x = {
              'rule_set_params': window.geneticrules.genetic_rule_set_custom,
              'label': geneData[i].gene,
              'target_group': 2,
              'sort_direction_changeable': true,
              'sortCmpFn': function (d1, d2) {
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
          }
      var new_ga_id = oncoprint.addTracks([_.clone(x)])[0]
      geneData[i].track_id = new_ga_id;
      if (i === 0) {
        share_id = new_ga_id;
      } else {
        oncoprint.shareRuleSet(share_id, new_ga_id);
      }
    }

    // oncoprint.hideIds([], true);
    oncoprint.keepSorted(true);

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

      oncoprint.setTrackData(geneData[i].track_id, results, 'sample');
      oncoprint.setTrackInfo(geneData[i].track_id, calculateMutation(results));
      oncoprint.setTrackTooltipFn(geneData[i].track_id, function(data) {

        var result = "<b>Sample: " + data.sample + "</b>"
        if (data.snv_class) {
            result = result + "<br>SNV Class: " + data.snv_class;
        }
        if (data.no_maf) {
            result = result + "<br>This Patient has no data.";
        }
        return result
      });
    }


    var clinicalData =  {}
    if(cData){
      clinicalData = cData
    }

    var global_mut_category_datum = clinicalData['globalMutCategory']
    var mut_category_datum = clinicalData['mutCategory']
    var global_mut_datum = clinicalData['mutCnt']
    var mut_datum = clinicalData['globalMutCnt']
    var custom_datum = clinicalData['custom']

    // var custom_datum = [
    //   {
    //     "displayName":'sex',
    //     "data":[
    //
    //       {"sample": "RN10281584","category":"M","value":'M'},
    //       {"sample": "RN37312989","category":"F","value":'F'},
    //       {"sample": "RN57508938","category":"F","value":'M'},
    //       {"sample": "RN44439642","category":"M","value":'M'}
    //     ]
    //   }
    // ]

    for (var i = 0; i < custom_datum.length; i++) {
      var originDatum = custom_datum[i]
      clinical_custom_track_params['rule_set_params']['legend_label'] = originDatum.displayName;
      clinical_custom_track_params['label'] = originDatum.displayName;
      clinical_custom_track_params['description'] = originDatum.displayName;


      var track_id = oncoprint.addTracks([_.clone(clinical_custom_track_params)])[0];

      oncoprint.setTrackInfo(track_id, "");
      oncoprint.setTrackData(track_id, custom_datum[i]['data'], 'sample');
      // oncoprint.setTrackTooltipFn(track_id,function(data) {
      //     return "<b>Sample: " + data.sample + " (" + data.category + ")</b>";
      // });
    }



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

      setState((prevState) => ({...prevState,...data }))
    }
  },[data])
  useEffect(()=>{
    if(Object.keys(state).length>0){

      let gData = state['geneData']
      let cData = state['clinicalData']
      drawChart(width-300,gData,cData)
    }
  },[state])

  return (
    <div ref={ref} className={`onco ${watermarkCss}`} id='oncoprint-glyphmap'>
    </div>
  )
})

export default OncoCmp
