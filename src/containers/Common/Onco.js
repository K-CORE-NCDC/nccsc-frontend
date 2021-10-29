import { element } from 'prop-types';
import React, { useState,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Oncoprint from "oncoprintjs";
// import CanvasXpressReact from 'canvasxpress-react';
import _ from 'lodash';
import './rules';
import html2canvas from 'html2canvas';
import $ from 'jquery'
import inputJson from '../Common/data'
import {
    ZoomInIcon,
    ZoomOutIcon,
  } from '@heroicons/react/outline'
function saveAs(uri, filename) {
    var link = document.createElement('a');
    link.className = 'watermark'
    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;
        //Firefox requires the link to be in the body
        document.body.appendChild(link);
        //simulate click
        link.click();
        //remove the link when done
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}

const OncoCmp = React.forwardRef(({ width,data, watermarkCss }, ref) => {
    const [inputRule,setInputRule] = useState({})
    const [customName,setCustomName] = useState({})
    let names_variant ={
        "Missense Mutation":"variant_classification||Missense_Mutation||4",
        "Nonsense Mutation":"variant_classification||Nonsense_Mutation||6",
        "Splice Site":"variant_classification||Splice_Site||6",
        "In Frame Ins":"variant_classification||In_Frame_Ins||6",
        "In Frame Del":"variant_classification||In_Frame_Del||6",
        "Frame Shift Ins":"variant_classification||Frame_Shift_Ins||6",
        "Frame Shift Del":"variant_classification||Frame_Shift_Del||6",
        "Germline":"variant_classification||Missense_Mutation||6",
        "Protein Downregulation (value <= 0.5)":"protein||down||4",
        "Protein Upregulation (value >= 1.5)":"protein||up||4",
        "mRNA Downregulation (z-score <= -1)":"regulation||down||3",
        "mRNA Upregulation (z-score >= 1)":"regulation||up||3"

    }
    var type = []
    const [state, setState] = useState({});
    const BrstKeys = useSelector((data) => data.dataVisualizationReducer.Keys);

    var oncoprint 
    const drawChart = (w,gData,cData,rule_types,inputRule) => {
        
        
        if($('#oncoprint-glyphmap').length>0){
            $('#oncoprint-glyphmap').empty()
        }
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

        oncoprint = new window.Oncoprint("#oncoprint-glyphmap", "80vw");
        
        let models = {
            vert_scroll:1
        }
        // oncoprint.model();
        oncoprint.suppressRendering();
        var geneData = []

        if(gData){
            geneData = gData
        }else{
            geneData = state['geneData']
        }

        var share_id = null;


        function calculateMutation(genes) {

            let total = genes.length;

            var i = 0;
            for (var key in genes) {
                if (Object.keys(genes[key]).indexOf("variant_classification") != -1){
                    i++;
                }
            }
            return Math.round((i/total)*100, 0) + "%";
        }

        
        
        
        for (var i = 0; i < geneData.length; i++) {
            let x = {
                'rule_set_params': inputRule,
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
            var new_ga_id = oncoprint.addTracks([x])[0]
            geneData[i].track_id = new_ga_id;
            if (i === 0) {
                share_id = new_ga_id;
            } else {
                oncoprint.shareRuleSet(share_id, new_ga_id);
            }
        }

        // oncoprint.hideIds([], true);
        oncoprint.keepSorted(false);
        if(geneData.length>0){
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

                    var result = "<b>Sample: " + BrstKeys[data.sample] + "</b>"
                    if (data.snv_class) {
                        result = result + "<br>SNV Class: " + data.snv_class;
                    }
                    if (data.no_maf) {
                        result = result + "<br>This Patient has no data.";
                    }
                    return result
                });
            }
        }
        // },300)
        var clinicalData =  {}
        if(cData){
            clinicalData = cData
        }else{
            clinicalData = state['clinicalData']
        }
        

        var global_mut_category_datum = clinicalData['globalMutCategory']
        var mut_category_datum = clinicalData['mutCategory']
        var global_mut_datum =  clinicalData['globalMutCnt']
        var mut_datum = clinicalData['mutCnt']
        var custom_datum = clinicalData['custom']


        if(custom_datum.length>0){
            for (var i = 0; i < custom_datum.length; i++) {
                var originDatum = custom_datum[i]
                clinical_custom_track_params['rule_set_params']['legend_label'] = customName[originDatum.displayName];
                clinical_custom_track_params['label'] = customName[originDatum.displayName];
                clinical_custom_track_params['description'] = customName[originDatum.displayName];

                
                var track_id = oncoprint.addTracks([_.clone(clinical_custom_track_params)])[0];

                oncoprint.setTrackInfo(track_id, "");
                oncoprint.setTrackData(track_id, custom_datum[i]['data'], 'sample');
                oncoprint.setTrackTooltipFn(track_id,function(data) {
                    return "<b>Sample: " + BrstKeys[data.sample]+ " (" + data.category + ")</b>";
                });
            }
        }
        oncoprint.keepSorted(true);

        var clinical_stacked_bar_track_params = {
            'rule_set_params': window.geneticrules.clinical_rule_set_stacked_bar,
            'target_group': 1,
            'na_z': 1.1,
            
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
            return "<b>Sample: " + BrstKeys[data.sample] + "</b>";
        });

        oncoprint.setTrackInfo(mut_category_id, "");
        oncoprint.setTrackData(mut_category_id, mut_category_datum, 'sample');
        oncoprint.setTrackTooltipFn(mut_category_id,function(data) {
            return "<b>Sample: " + BrstKeys[data.sample] + "</b>";
        });

        oncoprint.setTrackInfo(global_mut_id, "");
        oncoprint.setTrackData(global_mut_id, global_mut_datum, 'sample');
        oncoprint.setTrackTooltipFn(global_mut_id,function(data) {
            return "<b>Sample: " + BrstKeys[data.sample] + " <br/> Count: " + data.cnt + "</b>";
        });

        oncoprint.setTrackInfo(mut_id, "");
        oncoprint.setTrackData(mut_id, mut_datum, 'sample');
        oncoprint.setTrackTooltipFn(mut_id,function(data) {
            return "<b>Sample: " + BrstKeys[data.sample] + " <br/> Count: " + data.cnt + "</b>";
        });
        oncoprint.keepSorted(true);
        oncoprint.releaseRendering();
        // });
        setTimeout(function(){ 
            if(rule_types.length>0){
                var legends = document.getElementsByClassName('legends')
                for (let r = 0; r < rule_types.length; r++) {
                    for (let l = 0; l < legends.length; l++) {
                        if(legends[l].textContent in names_variant && names_variant[legends[l].textContent]==rule_types[r]){
                            legends[l].classList.add('linethrough')
                        }
                        
                    }
                }
            }
        },500);
    }

    useEffect(()=>{
        if(watermarkCss){
            html2canvas(document.querySelector('canvas')).then(function(canvas) {
                saveAs(canvas.toDataURL(), 'oncoprint.png');
            });
        }
    },[watermarkCss])


    useEffect(()=>{
        if (data){
            let custom_name = {}
            for (let cn = 0; cn < inputJson['filterChoices'].length; cn++) {
                custom_name[inputJson['filterChoices'][cn]['id']] = inputJson['filterChoices'][cn]['name']
            }
            setCustomName((prevState)=>({...prevState,...custom_name}))

            setState((prevState) => ({...prevState,...data }))
            let rule = window.geneticrules.genetic_rule_set_custom
            setInputRule((prevState) => ({...prevState,...rule }))


        }
    },[data])

   
    
    document.addEventListener('click',function(e){
        
        let elem = e.target.parentNode
        if(elem){
            if(elem.classList.contains('legends')){
                let name = elem.getAttribute('data-text')
                if (name in names_variant){
                    let zx = names_variant[name]
                    let index = type.indexOf(zx)
                    let r = zx.split('||')
                    let key = r[0]
                    let value = r[1]
                    let z = r[2]
                    let rule = window.geneticrules.genetic_rule_set_custom
                    if(index > -1){
                        type.splice(index, 1);
                        rule.rule_params[key][value]['shapes'][0]['z']=z
                    }else{
                        type.push(zx)
                        rule.rule_params[key][value]['shapes'][0]['z']=0
                    }
                    let gData = state['geneData']
                    let cData = state['clinicalData']
                    if(gData){
                        if(gData.length>0){
                            
                            drawChart(width-300,gData,cData,type,rule)
                        }
                    }

                }
                e.preventDefault()
                e.stopPropagation()
            }
        }
        
    })
    
    
    useEffect(()=>{
        if(Object.keys(state).length>0){
            let gData = state['geneData']
            let cData = state['clinicalData']
            drawChart(width-300,gData,cData,type,inputRule)
        }
    },[state,inputRule])

    const makezoom = (e,name)=>{
        $('.'+name).click()
    }

  return (
    <div>
        <div className='text-right mx-12'>
            <button className='h-10' onClick={e=>makezoom(e,'fa-plus')}><ZoomInIcon className='h-7 w-7'/></button> &nbsp;&nbsp;
            <button className='h-10' onClick={e=>makezoom(e,'fa-minus')}><ZoomOutIcon className='h-7 w-7'/></button>
        </div>
        <div ref={ref}  className={`onco ${watermarkCss}`} id='oncoprint-glyphmap'>
        </div>
        
    </div>
  )
})

export default OncoCmp
