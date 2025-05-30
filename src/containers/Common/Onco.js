import { ZoomInIcon, ZoomOutIcon } from '@heroicons/react/outline';
import _ from 'lodash';
import $ from 'jquery';
import "oncoprintjs";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import inputJson from '../Common/data';
import './rules';

const OncoCmp = React.forwardRef(
  ({ width, data, watermarkCss, customFilterJson, project_id,filter }, ref) => {
    const [inputRule, setInputRule] = useState({});
    const [customName, setCustomName] = useState({});
    const [oncoprintObj, setOncoprintObj] = useState({});
    const [clickType, setClickType] = useState([]);
    const [state, setState] = useState({});
    const [name, setName] = useState('');
    const BrstKeys = useSelector((data) => data.dataVisualizationReducer.Keys);
    let names_variant = {
      'Missense Mutation': 'variant_classification||Missense_Mutation||4',
      'Nonsense Mutation': 'variant_classification||Nonsense_Mutation||6',
      'Splice Site': 'variant_classification||Splice_Site||6',
      'In Frame Ins': 'variant_classification||In_Frame_Ins||6',
      'In Frame Del': 'variant_classification||In_Frame_Del||6',
      'Frame Shift Ins': 'variant_classification||Frame_Shift_Ins||6',
      'Frame Shift Del': 'variant_classification||Frame_Shift_Del||6',
      'Germline': 'variant_classification||Missense_Mutation||6',
      'Proteome Down regulation (value <= 0.5)': 'protein||down||4',
      'Proteome Up regulation (value >= 1.5)': 'protein||up||4',
      'mRNA Downregulation (z-score <= -1)': 'regulation||down||3',
      'mRNA Upregulation (z-score >= 1)': 'regulation||up||3',
      'Cnv (value <= 1)': 'cnv||red',
      'Cnv (value = 2)': 'cnv||blue',
      'Cnv (value >= 3)': 'cnv||purple'
    };

    let z_score_up_rna = filter['z_score_up_rna']
    let z_score_down_rna = filter['z_score_down_rna']
    let z_score_up_prot = filter['z_score_up_prot']
    let z_score_down_prot = filter['z_score_down_prot']
    let cnv_up = filter['cn_up_value']
    let cnv_equal = filter['cn_equal_value']
    let cnv_down = filter['cn_down_value']
    non_mutation_rule_params['regulation']['up']['legend_label'] = `mRNA Upregulation (z-score >= ${z_score_up_rna})`
    non_mutation_rule_params['regulation']['down']['legend_label'] =  `mRNA Downregulation (z-score <= ${z_score_down_rna})`

    non_mutation_rule_params['protein']['up']['legend_label'] = `Proteome Up regulation (value >= ${z_score_up_prot})`
    non_mutation_rule_params['protein']['down']['legend_label'] = `Proteome Down regulation (value <= ${z_score_down_prot})`

    non_mutation_rule_params['cnv']['red']['legend_label'] = `Cnv (value <= ${cnv_down})`
    non_mutation_rule_params['cnv']['blue']['legend_label'] = `Cnv (value = ${cnv_equal})`
    non_mutation_rule_params['cnv']['purple']['legend_label'] = `Cnv (value >= ${cnv_up})`

    const drawChart = (w, gData, cData, rule_types, inputRule) => {
      var oncoprint;
      if ($('#oncoprint-glyphmap').length > 0) {
        $('#oncoprint-glyphmap').empty();
      }
      var clinical_custom_track_params = {
        rule_set_params: window.geneticrules.clinical_rule_set_custom,
        target_group: 1,
        na_z: 1.1,
        sort_direction_changeable: true,
        sortCmpFn: function (d1, d2) {
          if (d1.na && d2.na) {
            return 0;
          } else if (d1.na && !d2.na) {
            return 2;
          } else if (!d1.na && d2.na) {
            return -2;
          } else if (!d1['category'] && !d2['category']) {
            return 0;
          } else if (!d1['category'] && d2['category']) {
            return 2;
          } else if (d1['category'] && !d2['category']) {
            return -2;
          } else {
            return d1.category.localeCompare(d2.category);
          }
        },
        init_sort_direction: 0
      };

      oncoprint = new window.Oncoprint('#oncoprint-glyphmap', '1280');

      oncoprint.suppressRendering();
      var geneData = [];

      if (gData) {
        geneData = gData;
      } else {
        geneData = state['geneData'];
      }

      var share_id = null;

      function calculateMutation(genes) {
        let total = genes.length;
        var i = 0;
        for (let key in genes) {
          if (Object.keys(genes[key]).indexOf('variant_classification') !== -1) {
            i++;
          }
        }
        return Math.round((i / total) * 100, 0) + '%';
      }

      for (let i = 0; i < geneData.length; i++) {
        let x = {
          rule_set_params: inputRule,
          label: geneData[i].gene,
          target_group: 2,
          sort_direction_changeable: true,
          sortCmpFn: function (d1, d2) {
            if (d1.na && d2.na) {
              return 0;
            } else if (d1.na && !d2.na) {
              return 2;
            } else if (!d1.na && d2.na) {
              return -2;
            } else if (!d1['variant_classification'] && !d2['variant_classification']) {
              return 0;
            } else if (!d1['variant_classification'] && d2['variant_classification']) {
              return 2;
            } else if (d1['variant_classification'] && !d2['variant_classification']) {
              return -2;
            } else {
              return d1['variant_classification'].localeCompare(d2['variant_classification']);
            }
          },
          description: geneData[i].desc,
          na_z: 1.1,
          init_sort_direction: 0
        };
        var new_ga_id = oncoprint.addTracks([x])[0];
        geneData[i].track_id = new_ga_id;
        if (i === 0) {
          share_id = new_ga_id;
        } else {
          oncoprint.shareRuleSet(share_id, new_ga_id);
        }
      }

      oncoprint.keepSorted(false);
      if (geneData.length > 0) {
        for (let i = 0; i < geneData.length; i++) {
          var results = [];

          for (let j = 0; j < geneData[i].data.length; j++) {
            var result = _.cloneDeep(geneData[i].data[j]);
            if (result.type === 'search') {
              result.sample = geneData[i].data[j].sample;
            } else {
              result.sample = geneData[i].data[j].sample;
            }
            results[j] = result;
          }

          oncoprint.setTrackData(geneData[i].track_id, results, 'sample');
          oncoprint.setTrackInfo(geneData[i].track_id, calculateMutation(results));

          oncoprint.setTrackTooltipFn(geneData[i].track_id, function (data) {
            var result = '<b>Sample: ' + BrstKeys[data.sample] + '</b>';
            if (data.snv_class) {
              result = result + '<br>SNV Class: ' + data.snv_class;
            }
            if (data.no_maf) {
              result = result + '<br>This Patient has no data.';
            }
            return result;
          });
        }
      }

      var clinicalData = {};
      if (cData) {
        clinicalData = cData;
      } else {
        clinicalData = state['clinicalData'];
      }

      var global_mut_category_datum = clinicalData['globalMutCategory'];
      var mut_category_datum = clinicalData['mutCategory'];
      var global_mut_datum = clinicalData['globalMutCnt'];
      var mut_datum = clinicalData['mutCnt'];
      var custom_datum = clinicalData['custom'];



      if (custom_datum.length > 0) {
        for (let i = 0; i < custom_datum.length; i++) {
          var originDatum = custom_datum[i];
          clinical_custom_track_params['rule_set_params']['legend_label'] =
            customName[originDatum.displayName];
          clinical_custom_track_params['label'] = customName[originDatum.displayName];
          clinical_custom_track_params['description'] = customName[originDatum.displayName];
          var track_id = oncoprint.addTracks([_.clone(clinical_custom_track_params)])[0];
          oncoprint.setTrackInfo(track_id, '');
          oncoprint.setTrackData(track_id, custom_datum[i]['data'], 'sample');
          oncoprint.setTrackTooltipFn(track_id, function (data) {
            return '<b>Sample: ' + BrstKeys[data.sample] + ' (' + data.category + ')</b>';
          });
        }
      }
      oncoprint.keepSorted(true);

      var clinical_stacked_bar_track_params = {
        rule_set_params: window.geneticrules.clinical_rule_set_stacked_bar,
        target_group: 1,
        na_z: 1.1
      };

      var clinical_bar_track_params = {
        rule_set_params: window.geneticrules.clinical_rule_set_bar,
        target_group: 1,
        na_z: 1.1,
        sort_direction_changeable: true,
        sortCmpFn: function (d1, d2) {
          if (d1 == null && d2 == null) {
            return 0;
          } else if (d1 == null && d2 != null) {
            return 2;
          } else if (d1 != null && d2 == null) {
            return -2;
          } else {
            return d1['cnt'] < d2['cnt'] ? -1 : d1['cnt'] === d2['cnt'] ? 0 : 1;
          }
        },
        init_sort_direction: 0
      };

      clinical_stacked_bar_track_params['rule_set_params']['legend_label'] =
        'Global Mutation Distribution';
      clinical_stacked_bar_track_params['label'] = 'Global Mutation Distribution';
      clinical_stacked_bar_track_params['description'] = 'Global Mutation Distribution';
      var global_mut_category_id = oncoprint.addTracks([
        _.clone(clinical_stacked_bar_track_params)
      ])[0];

      clinical_bar_track_params['rule_set_params']['legend_label'] = 'Global Mutation Count';
      clinical_bar_track_params['label'] = 'Global Mutation Count';
      clinical_bar_track_params['description'] = 'Global Mutation Count';
      var global_mut_id = oncoprint.addTracks([_.clone(clinical_bar_track_params)])[0];

      clinical_stacked_bar_track_params['rule_set_params']['legend_label'] =
        'Mutation Distribution';
      clinical_stacked_bar_track_params['label'] = 'Mutation Distribution';
      clinical_stacked_bar_track_params['description'] = 'Mutation Distribution';
      var mut_category_id = oncoprint.addTracks([_.clone(clinical_stacked_bar_track_params)])[0];

      clinical_bar_track_params['rule_set_params']['legend_label'] = 'Mutation Count';
      clinical_bar_track_params['label'] = 'Mutation Count';
      clinical_bar_track_params['description'] = 'Mutation Count';
      var mut_id = oncoprint.addTracks([_.clone(clinical_bar_track_params)])[0];

      oncoprint.setTrackInfo(global_mut_category_id, '');
      oncoprint.setTrackData(global_mut_category_id, global_mut_category_datum, 'sample');
      oncoprint.setTrackTooltipFn(global_mut_category_id, function (data) {
        return '<b>Sample: ' + BrstKeys[data.sample] + '</b>';
      });

      oncoprint.setTrackInfo(mut_category_id, '');
      oncoprint.setTrackData(mut_category_id, mut_category_datum, 'sample');
      oncoprint.setTrackTooltipFn(mut_category_id, function (data) {
        return '<b>Sample: ' + BrstKeys[data.sample] + '</b>';
      });

      oncoprint.setTrackInfo(global_mut_id, '');
      oncoprint.setTrackData(global_mut_id, global_mut_datum, 'sample');
      oncoprint.setTrackTooltipFn(global_mut_id, function (data) {
        return '<b>Sample: ' + BrstKeys[data.sample] + ' <br/> Count: ' + data.cnt + '</b>';
      });

      oncoprint.setTrackInfo(mut_id, '');
      oncoprint.setTrackData(mut_id, mut_datum, 'sample');
      oncoprint.setTrackTooltipFn(mut_id, function (data) {
        return '<b>Sample: ' + BrstKeys[data.sample] + ' <br/> Count: ' + data.cnt + '</b>';
      });
      oncoprint.keepSorted(true);
      oncoprint.releaseRendering();
      // });
      setTimeout(function () {
        if (rule_types.length > 0) {
          var legends = document.getElementsByClassName('legends');
          for (let l = 0; l < legends.length; l++) {
            const legendText = legends[l]?.textContent;
            if (legendText in names_variant) {
              const ruleType = names_variant[legendText];
              if (rule_types.includes(ruleType.trim())) {
                legends[l].style.opacity = 0.5; // Set the opacity value (0.5)
              } else {
                legends[l].style.opacity = '';
              }
            }
          }

        }
      }, 50);
      setOncoprintObj(oncoprint);
    };

    useEffect(() => {
      if (watermarkCss) {
        var svgEl = oncoprintObj.toSVG();
        var xml = new XMLSerializer().serializeToString(svgEl);
        var svg64 = btoa(xml); //for utf8: btoa(unescape(encodeURIComponent(xml)))
        var b64start = 'data:image/svg+xml;base64,';
        var image64 = b64start + svg64;
        const downloadLink = document.createElement('a');
        document.body.appendChild(downloadLink);
        downloadLink.href = image64;
        downloadLink.target = '_self';
        downloadLink.download = 'onco';
        downloadLink.click();
      }
    }, [watermarkCss, oncoprintObj]);

    useEffect(() => {
      if (data) {
        let custom_name = {};

        if (customFilterJson && project_id) {
          for (let cn = 0; cn < customFilterJson.length; cn++) {
            custom_name[customFilterJson[cn]['id']] = customFilterJson[cn]['name'];
          }
        } else {
          for (let cn = 0; cn < inputJson['filterChoices'].length; cn++) {
            custom_name[inputJson['filterChoices'][cn]['id']] =
              inputJson['filterChoices'][cn]['name'];
          }
        }
        setCustomName((prevState) => ({ ...prevState, ...custom_name }));
        setState((prevState) => ({ ...prevState, ...data }));
        let rule = window.geneticrules.genetic_rule_set_custom;
        setInputRule((prevState) => ({ ...prevState, ...rule }));
      }
    }, [data]);

    useEffect(() => {
      if (Object.keys(state).length > 0) {
        let gData = state['geneData'];
        let cData = state['clinicalData'];
        drawChart(width - 300, gData, cData, clickType, inputRule);
      }
    }, [state, inputRule]);

    useEffect(() => {
      $(document).on('click', '.legends', (e) => {
        const $element = $(e.currentTarget); // Use jQuery to access the clicked element

        const name = $element.attr('data-text');
        if (name in names_variant) {
          setClickType((prevClickType) => {
            // Check if the name already exists:
            const nameExists = prevClickType.includes(names_variant[name]);

            // Construct the new array based on existence:
            return nameExists
              ? prevClickType.filter((existingName) => existingName !== names_variant[name]) // Remove if it exists
              : [...prevClickType, names_variant[name]]; // Add if it doesn't exist
          });
          setName(name);
        }
      })
    }, [])

    useEffect(() => {
      if (name) {

        const { genetic_rule_set_custom: originalRule } = window.geneticrules;
        const rule = JSON.parse(JSON.stringify(originalRule)); // Create a deep copy of the rule

        const { geneData, clinicalData } = state;

        if (clickType?.length > 0) {
          for (const r of clickType) {
            let zx = '';
            for (const [_, val] of Object.entries(names_variant)) {
              if (val === r) {
                zx = val;
                break;
              }
            }
            const [paramKey, paramValue] = zx.split('||');
            rule.rule_params[paramKey][paramValue]['shapes'][0]['z'] = 0;
          }
        }

        if (geneData && geneData.length > 0) {
          drawChart(width - 300, geneData, clinicalData, clickType, rule);
        }
      }
    }, [clickType])



    const makezoom = (e, name) => {
      $('.' + name).click();
    };

    return (
      <div>

        <div className="">
          <button className="" onClick={(e) => makezoom(e, 'fa-plus')}>
            <ZoomInIcon className="h-7 w-7" />
          </button>{' '}
          &nbsp;&nbsp;
          <button className="" onClick={(e) => makezoom(e, 'fa-minus')}>
            <ZoomOutIcon className="h-7 w-7" />
          </button>
        </div>
        <div ref={ref} className={`onco ${watermarkCss}`} id="oncoprint-glyphmap"></div>
      </div>
    );
  }
);

export default OncoCmp;
