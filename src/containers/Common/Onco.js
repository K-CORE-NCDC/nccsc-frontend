import React, { useState,useEffect } from 'react'
import {OncoPrint} from 'react-oncoprint';

export default class OncoCmp extends React.Component {
  render() {
    const data = [
      {
        sample: 'TCGA-25-2392-01',
        gene: 'TP53',
        alteration: 'FUSION',
        type: 'FUSION',
      },
      {
        sample: 'TCGA-25-2393-01',
        gene: 'TP53',
        alteration: 'FUSION',
        type: 'FUSION2',
      },
      // ...
    ];

    return (
      <OncoPrint data={data}/>
    );
  }
}
// import Oncoprint from "oncoprintjs";
// import  './geneticrules'

// import OncoprintJS from 'oncoprintjs';
// import geneticrules from './geneticrules.ts'

// export default function OncoCmp({ width,data }) {
//   const [state, setState] = useState([])
//   const [colorScale, setColorScale] = useState('')
//
//   const drawChart = (hm_data)=>{
//       var oncoprint = new Oncoprint("#onco", 800);
//       var TRACK_GROUP = 1;
//
//       // hm_data is in heatmap-data.js
//
//       var current_expansion_tracks = [];
//       function makeExpandCallback(gene_id) {
//         return function (parent_track_id) {
//           oncoprint.suppressRendering();
//           try {
//             for (var i = 0; i < 3; i++) {
//               var track_params = {
//                   'rule_set_params': {
//                     'type': 'gradient',
//                     'legend_label': 'Expansion',
//                     'value_key': 'vaf',
//                     'value_range': [-3, 3],
//                     'colors': [[0, 255, 255,1],[0,0,0,1],[255,255,0,1]],
//                     'value_stop_points': [-3, 0, 3],
//                     'null_color': 'rgba(224,224,224,1)',
//                   },
//                   'has_column_spacing': true,
//                   'track_padding': 5,
//                   'label': gene_id + 'abc'[i],
//                   'track_label_color': 'teal',
//                   'sortCmpFn': function(d1, d2) {return 0;},
//                   'target_group': TRACK_GROUP,
//                   'expansion_of': parent_track_id,
//                   'removable': true,
//                   'removeCallback': function (track_id) {
//                     current_expansion_tracks.splice(
//                         current_expansion_tracks.indexOf(track_id),
//                         1
//                     )
//                   }
//               }
//               var new_track_id = oncoprint.addTracks([track_params])[0];
//               if (current_expansion_tracks.length > 0) {
//                 oncoprint.shareRuleSet(current_expansion_tracks[0], new_track_id);
//               }
//               current_expansion_tracks.push(new_track_id);
//               var data_record = hm_data.filter(function (record) {
//                 return record.gene === gene_id;
//               })[0];
//               oncoprint.setTrackData(new_track_id, data_record.data, 'sample');
//             }
//           } finally {
//             oncoprint.releaseRendering();
//           }
//         }
//       }
//
//       oncoprint.suppressRendering();
//
//       var share_id = null;
//       for (var i = 0; i < hm_data.length; i++) {
//         var track_params = {
//           'rule_set_params': {
//               'type': 'gradient',
//               'legend_label': 'Heatmap',
//               'value_key': 'vaf',
//               'value_range': [-3, 3],
//               'colors': [[255,0,0,1],[0,0,0,1],[0,0,255,1]],
//               'value_stop_points': [-3, 0, 3],
//               'null_color': 'rgba(224,224,224,1)'
//           },
//           'has_column_spacing': true,
//           'track_padding': 5,
//           'label': hm_data[i].gene,
//           'sortCmpFn': function(d1, d2) {return 0;},
//           'target_group': TRACK_GROUP,
//           'expandCallback': makeExpandCallback(hm_data[i].gene),
//           'removable': true
//         };
//         var new_hm_id = oncoprint.addTracks([track_params])[0];
//         hm_data[i].track_id = new_hm_id;
//         if (i === 0) {
//           share_id = new_hm_id;
//         } else {
//           oncoprint.shareRuleSet(share_id, new_hm_id);
//         }
//       }
//
//       oncoprint.hideIds([], true);
//       oncoprint.keepSorted(false);
//
//       for (var i = 0; i < hm_data.length; i++) {
//         oncoprint.setTrackData(hm_data[i].track_id, hm_data[i].data, 'sample');
//         oncoprint.setTrackInfo(hm_data[i].track_id, "VAF");
//         oncoprint.setTrackTooltipFn(hm_data[i].track_id, function(data) {
//           setColorScale(data.sample)
//           return "<b>Sample: " + data.sample + "<br/>VAF: " + data.vaf + "</b>";
//         });
//       }
//
//       oncoprint.keepSorted(true);
//       oncoprint.releaseRendering();
//
//   }
//
//   useEffect(()=>{
//
//     var hm_data = [
//         {
//             "gene": "GENE0",
//             "data": [
//                 {
//                     "vaf": 1.5210648764527586,
//                     "sample": "TCGA-00"
//                 },
//                 {
//                     "vaf": 0.4242120301869339,
//                     "sample": "TCGA-01"
//                 },
//                 {
//                     "vaf": 1.1419531633207796,
//                     "sample": "TCGA-02"
//                 },
//                 {
//                     "vaf": 0.6806715828549048,
//                     "sample": "TCGA-03"
//                 },
//                 {
//                     "vaf": 1.6915387510701865,
//                     "sample": "TCGA-04"
//                 },
//                 {
//                     "vaf": 1.694749143656006,
//                     "sample": "TCGA-05"
//                 },
//                 {
//                     "vaf": 0.2744026215364157,
//                     "sample": "TCGA-06"
//                 },
//                 {
//                     "vaf": -0.3833639553950554,
//                     "sample": "TCGA-07"
//                 },
//                 {
//                     "vaf": -0.5829383973350819,
//                     "sample": "TCGA-08"
//                 },
//                 {
//                     "vaf": 1.6103793791072052,
//                     "sample": "TCGA-09"
//                 },
//                 {
//                     "vaf": -0.1888592577840289,
//                     "sample": "TCGA-10"
//                 },
//                 {
//                     "vaf": 0.49318364570131246,
//                     "sample": "TCGA-11"
//                 },
//                 {
//                     "vaf": -2.133701559668439,
//                     "sample": "TCGA-12"
//                 },
//                 {
//                     "vaf": -0.9222561940237373,
//                     "sample": "TCGA-13"
//                 },
//                 {
//                     "vaf": -3.1268258087567435,
//                     "sample": "TCGA-14"
//                 },
//                 {
//                     "vaf": -2.7306777528648247,
//                     "sample": "TCGA-15"
//                 },
//                 {
//                     "vaf": -2.3848798091812755,
//                     "sample": "TCGA-16"
//                 },
//                 {
//                     "vaf": -1.905648410682926,
//                     "sample": "TCGA-17"
//                 },
//                 {
//                     "vaf": -2.042171451290579,
//                     "sample": "TCGA-18"
//                 },
//                 {
//                     "vaf": -2.2868871923899077,
//                     "sample": "TCGA-19"
//                 },
//                 {
//                     "vaf": -2.0616264020956474,
//                     "sample": "TCGA-20"
//                 },
//                 {
//                     "vaf": -2.1073052762911746,
//                     "sample": "TCGA-21"
//                 },
//                 {
//                     "vaf": -2.719604388551793,
//                     "sample": "TCGA-22"
//                 },
//                 {
//                     "vaf": -2.812992988554077,
//                     "sample": "TCGA-23"
//                 },
//                 {
//                     "vaf": -1.7254836422760604,
//                     "sample": "TCGA-24"
//                 },
//                 {
//                     "vaf": -2.890915082995528,
//                     "sample": "TCGA-25"
//                 },
//                 {
//                     "vaf": -3.1573552591908536,
//                     "sample": "TCGA-26"
//                 },
//                 {
//                     "vaf": -2.3122922511256934,
//                     "sample": "TCGA-27"
//                 },
//                 {
//                     "vaf": 1.5327792143584575,
//                     "sample": "TCGA-28"
//                 },
//                 {
//                     "vaf": 1.469358769900285,
//                     "sample": "TCGA-29"
//                 },
//                 {
//                     "vaf": 0.1549474256969163,
//                     "sample": "TCGA-30"
//                 },
//                 {
//                     "vaf": 0.37816251960217356,
//                     "sample": "TCGA-31"
//                 },
//                 {
//                     "vaf": -0.8877857476301128,
//                     "sample": "TCGA-32"
//                 },
//                 {
//                     "vaf": -1.980796468223927,
//                     "sample": "TCGA-33"
//                 },
//                 {
//                     "vaf": -0.3479121493261526,
//                     "sample": "TCGA-34"
//                 },
//                 {
//                     "vaf": 0.15634896910398005,
//                     "sample": "TCGA-35"
//                 },
//                 {
//                     "vaf": 1.2302906807277207,
//                     "sample": "TCGA-36"
//                 },
//                 {
//                     "vaf": 1.2023798487844113,
//                     "sample": "TCGA-37"
//                 },
//                 {
//                     "vaf": -0.3873268174079523,
//                     "sample": "TCGA-38"
//                 },
//                 {
//                     "vaf": -0.30230275057533557,
//                     "sample": "TCGA-39"
//                 },
//                 {
//                     "vaf": -1.0485529650670926,
//                     "sample": "TCGA-40"
//                 },
//                 {
//                     "vaf": -1.4200179371789752,
//                     "sample": "TCGA-41"
//                 },
//                 {
//                     "vaf": -1.7062701906250126,
//                     "sample": "TCGA-42"
//                 },
//                 {
//                     "vaf": 1.9507753952317897,
//                     "sample": "TCGA-43"
//                 },
//                 {
//                     "vaf": -0.5096521817516535,
//                     "sample": "TCGA-44"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-45"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-46"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-47"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-48"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-49"
//                 }
//             ]
//         },
//         {
//             "gene": "GENE1",
//             "data": [
//                 {
//                     "vaf": 0.4036859615494919,
//                     "sample": "TCGA-00"
//                 },
//                 {
//                     "vaf": 0.9474327037304537,
//                     "sample": "TCGA-01"
//                 },
//                 {
//                     "vaf": -0.9362798058465069,
//                     "sample": "TCGA-02"
//                 },
//                 {
//                     "vaf": 1.1887785967938285,
//                     "sample": "TCGA-03"
//                 },
//                 {
//                     "vaf": 1.5238910238342056,
//                     "sample": "TCGA-04"
//                 },
//                 {
//                     "vaf": 1.0884220870446615,
//                     "sample": "TCGA-05"
//                 },
//                 {
//                     "vaf": 0.6891138283015283,
//                     "sample": "TCGA-06"
//                 },
//                 {
//                     "vaf": 1.0974001662687833,
//                     "sample": "TCGA-07"
//                 },
//                 {
//                     "vaf": 1.39904634564013,
//                     "sample": "TCGA-08"
//                 },
//                 {
//                     "vaf": -1.7725927564266502,
//                     "sample": "TCGA-09"
//                 },
//                 {
//                     "vaf": 2.955912308250694,
//                     "sample": "TCGA-10"
//                 },
//                 {
//                     "vaf": 1.3900933226879264,
//                     "sample": "TCGA-11"
//                 },
//                 {
//                     "vaf": -2.157667016163816,
//                     "sample": "TCGA-12"
//                 },
//                 {
//                     "vaf": 0.2567234972982093,
//                     "sample": "TCGA-13"
//                 },
//                 {
//                     "vaf": -2.7047002758562337,
//                     "sample": "TCGA-14"
//                 },
//                 {
//                     "vaf": -1.0567392750305054,
//                     "sample": "TCGA-15"
//                 },
//                 {
//                     "vaf": -1.252811665795368,
//                     "sample": "TCGA-16"
//                 },
//                 {
//                     "vaf": -3.188944955203736,
//                     "sample": "TCGA-17"
//                 },
//                 {
//                     "vaf": -1.2267470225974004,
//                     "sample": "TCGA-18"
//                 },
//                 {
//                     "vaf": -3.1838806401933177,
//                     "sample": "TCGA-19"
//                 },
//                 {
//                     "vaf": -4.65917223799674,
//                     "sample": "TCGA-20"
//                 },
//                 {
//                     "vaf": -1.3936804756406191,
//                     "sample": "TCGA-21"
//                 },
//                 {
//                     "vaf": -3.7558905834377194,
//                     "sample": "TCGA-22"
//                 },
//                 {
//                     "vaf": -1.5490655381940852,
//                     "sample": "TCGA-23"
//                 },
//                 {
//                     "vaf": -2.684010897737217,
//                     "sample": "TCGA-24"
//                 },
//                 {
//                     "vaf": -0.3404492038101279,
//                     "sample": "TCGA-25"
//                 },
//                 {
//                     "vaf": -0.9314906006839909,
//                     "sample": "TCGA-26"
//                 },
//                 {
//                     "vaf": -2.4533858038513876,
//                     "sample": "TCGA-27"
//                 },
//                 {
//                     "vaf": -0.31155253212737266,
//                     "sample": "TCGA-28"
//                 },
//                 {
//                     "vaf": 0.05616534222974544,
//                     "sample": "TCGA-29"
//                 },
//                 {
//                     "vaf": -1.1651498407833565,
//                     "sample": "TCGA-30"
//                 },
//                 {
//                     "vaf": 0.9008264869541871,
//                     "sample": "TCGA-31"
//                 },
//                 {
//                     "vaf": 0.46566243973045984,
//                     "sample": "TCGA-32"
//                 },
//                 {
//                     "vaf": -1.5362436862772237,
//                     "sample": "TCGA-33"
//                 },
//                 {
//                     "vaf": 1.4882521937955997,
//                     "sample": "TCGA-34"
//                 },
//                 {
//                     "vaf": 1.8958891760305832,
//                     "sample": "TCGA-35"
//                 },
//                 {
//                     "vaf": 1.1787795711596507,
//                     "sample": "TCGA-36"
//                 },
//                 {
//                     "vaf": -0.17992483581235091,
//                     "sample": "TCGA-37"
//                 },
//                 {
//                     "vaf": -1.0707526215105425,
//                     "sample": "TCGA-38"
//                 },
//                 {
//                     "vaf": 1.0544517269311366,
//                     "sample": "TCGA-39"
//                 },
//                 {
//                     "vaf": -0.40317694697317963,
//                     "sample": "TCGA-40"
//                 },
//                 {
//                     "vaf": 1.2224450703824274,
//                     "sample": "TCGA-41"
//                 },
//                 {
//                     "vaf": 0.2082749780768603,
//                     "sample": "TCGA-42"
//                 },
//                 {
//                     "vaf": 0.9766390364837128,
//                     "sample": "TCGA-43"
//                 },
//                 {
//                     "vaf": 0.3563663971744019,
//                     "sample": "TCGA-44"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-45"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-46"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-47"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-48"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-49"
//                 }
//             ]
//         },
//         {
//             "gene": "GENE2",
//             "data": [
//                 {
//                     "vaf": 0.34759141761297996,
//                     "sample": "TCGA-00"
//                 },
//                 {
//                     "vaf": 0.6090466248123989,
//                     "sample": "TCGA-01"
//                 },
//                 {
//                     "vaf": 1.4937417773491886,
//                     "sample": "TCGA-02"
//                 },
//                 {
//                     "vaf": 0.8838960609656334,
//                     "sample": "TCGA-03"
//                 },
//                 {
//                     "vaf": -1.0306844677814944,
//                     "sample": "TCGA-04"
//                 },
//                 {
//                     "vaf": 3.0644928613593194,
//                     "sample": "TCGA-05"
//                 },
//                 {
//                     "vaf": 0.8894593427675274,
//                     "sample": "TCGA-06"
//                 },
//                 {
//                     "vaf": 2.0201727117157997,
//                     "sample": "TCGA-07"
//                 },
//                 {
//                     "vaf": 0.30795015221560884,
//                     "sample": "TCGA-08"
//                 },
//                 {
//                     "vaf": 2.536377054245798,
//                     "sample": "TCGA-09"
//                 },
//                 {
//                     "vaf": 1.2863436888922797,
//                     "sample": "TCGA-10"
//                 },
//                 {
//                     "vaf": 1.6088438344754508,
//                     "sample": "TCGA-11"
//                 },
//                 {
//                     "vaf": -0.8612256850547025,
//                     "sample": "TCGA-12"
//                 },
//                 {
//                     "vaf": 1.9100649530990337,
//                     "sample": "TCGA-13"
//                 },
//                 {
//                     "vaf": -0.2680033709513804,
//                     "sample": "TCGA-14"
//                 },
//                 {
//                     "vaf": 0.8024563957963952,
//                     "sample": "TCGA-15"
//                 },
//                 {
//                     "vaf": 0.947251967773748,
//                     "sample": "TCGA-16"
//                 },
//                 {
//                     "vaf": -0.1550100930908342,
//                     "sample": "TCGA-17"
//                 },
//                 {
//                     "vaf": 0.6140793703460803,
//                     "sample": "TCGA-18"
//                 },
//                 {
//                     "vaf": 0.9222066715665268,
//                     "sample": "TCGA-19"
//                 },
//                 {
//                     "vaf": 0.37642553115562943,
//                     "sample": "TCGA-20"
//                 },
//                 {
//                     "vaf": -1.0994007905841945,
//                     "sample": "TCGA-21"
//                 },
//                 {
//                     "vaf": 0.298238174206056,
//                     "sample": "TCGA-22"
//                 },
//                 {
//                     "vaf": 1.3263858966870303,
//                     "sample": "TCGA-23"
//                 },
//                 {
//                     "vaf": -0.6945678597313655,
//                     "sample": "TCGA-24"
//                 },
//                 {
//                     "vaf": -0.14963454032767076,
//                     "sample": "TCGA-25"
//                 },
//                 {
//                     "vaf": -0.43515355172163744,
//                     "sample": "TCGA-26"
//                 },
//                 {
//                     "vaf": 1.8492637284793418,
//                     "sample": "TCGA-27"
//                 },
//                 {
//                     "vaf": 2.3121623889713177,
//                     "sample": "TCGA-28"
//                 },
//                 {
//                     "vaf": 1.7859225969058794,
//                     "sample": "TCGA-29"
//                 },
//                 {
//                     "vaf": 2.559077367707409,
//                     "sample": "TCGA-30"
//                 },
//                 {
//                     "vaf": 2.719644504815491,
//                     "sample": "TCGA-31"
//                 },
//                 {
//                     "vaf": 2.6353064556083146,
//                     "sample": "TCGA-32"
//                 },
//                 {
//                     "vaf": 3.156703855272364,
//                     "sample": "TCGA-33"
//                 },
//                 {
//                     "vaf": 3.5785214977288784,
//                     "sample": "TCGA-34"
//                 },
//                 {
//                     "vaf": 0.6764332949464997,
//                     "sample": "TCGA-35"
//                 },
//                 {
//                     "vaf": 0.5765908166149409,
//                     "sample": "TCGA-36"
//                 },
//                 {
//                     "vaf": -0.20829875557799488,
//                     "sample": "TCGA-37"
//                 },
//                 {
//                     "vaf": 0.3960067126616453,
//                     "sample": "TCGA-38"
//                 },
//                 {
//                     "vaf": -1.0930615087305058,
//                     "sample": "TCGA-39"
//                 },
//                 {
//                     "vaf": -1.4912575927056055,
//                     "sample": "TCGA-40"
//                 },
//                 {
//                     "vaf": 0.4393917012645369,
//                     "sample": "TCGA-41"
//                 },
//                 {
//                     "vaf": 0.16667349537252904,
//                     "sample": "TCGA-42"
//                 },
//                 {
//                     "vaf": 0.6350314368921064,
//                     "sample": "TCGA-43"
//                 },
//                 {
//                     "vaf": 2.383144774863942,
//                     "sample": "TCGA-44"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-45"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-46"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-47"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-48"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-49"
//                 }
//             ]
//         },
//         {
//             "gene": "GENE3",
//             "data": [
//                 {
//                     "vaf": -1.5452533661469547,
//                     "sample": "TCGA-00"
//                 },
//                 {
//                     "vaf": 0.7111452896827009,
//                     "sample": "TCGA-01"
//                 },
//                 {
//                     "vaf": 0.1898181645347884,
//                     "sample": "TCGA-02"
//                 },
//                 {
//                     "vaf": 0.8018462295649984,
//                     "sample": "TCGA-03"
//                 },
//                 {
//                     "vaf": -1.128087559641579,
//                     "sample": "TCGA-04"
//                 },
//                 {
//                     "vaf": -0.9810271184607877,
//                     "sample": "TCGA-05"
//                 },
//                 {
//                     "vaf": 1.8039166976839418,
//                     "sample": "TCGA-06"
//                 },
//                 {
//                     "vaf": -1.5600158227215473,
//                     "sample": "TCGA-07"
//                 },
//                 {
//                     "vaf": -0.6359497006783208,
//                     "sample": "TCGA-08"
//                 },
//                 {
//                     "vaf": 0.6368913626026953,
//                     "sample": "TCGA-09"
//                 },
//                 {
//                     "vaf": -0.4022750322851444,
//                     "sample": "TCGA-10"
//                 },
//                 {
//                     "vaf": 0.0829536797532936,
//                     "sample": "TCGA-11"
//                 },
//                 {
//                     "vaf": 0.9494208069257608,
//                     "sample": "TCGA-12"
//                 },
//                 {
//                     "vaf": 0.0875512413851909,
//                     "sample": "TCGA-13"
//                 },
//                 {
//                     "vaf": -1.225435518830168,
//                     "sample": "TCGA-14"
//                 },
//                 {
//                     "vaf": 0.8443629764015471,
//                     "sample": "TCGA-15"
//                 },
//                 {
//                     "vaf": -1.0002153473895647,
//                     "sample": "TCGA-16"
//                 },
//                 {
//                     "vaf": -1.5447710967776116,
//                     "sample": "TCGA-17"
//                 },
//                 {
//                     "vaf": 1.1880297923523018,
//                     "sample": "TCGA-18"
//                 },
//                 {
//                     "vaf": 0.3169426119248496,
//                     "sample": "TCGA-19"
//                 },
//                 {
//                     "vaf": 0.920858823780819,
//                     "sample": "TCGA-20"
//                 },
//                 {
//                     "vaf": 0.3187276529430212,
//                     "sample": "TCGA-21"
//                 },
//                 {
//                     "vaf": 0.8568306119026912,
//                     "sample": "TCGA-22"
//                 },
//                 {
//                     "vaf": -0.6510255933001469,
//                     "sample": "TCGA-23"
//                 },
//                 {
//                     "vaf": -1.0342428417844647,
//                     "sample": "TCGA-24"
//                 },
//                 {
//                     "vaf": 0.681594518281627,
//                     "sample": "TCGA-25"
//                 },
//                 {
//                     "vaf": -0.8034096641738411,
//                     "sample": "TCGA-26"
//                 },
//                 {
//                     "vaf": -0.6895497777502005,
//                     "sample": "TCGA-27"
//                 },
//                 {
//                     "vaf": 3.349654456993174,
//                     "sample": "TCGA-28"
//                 },
//                 {
//                     "vaf": 2.235856076093557,
//                     "sample": "TCGA-29"
//                 },
//                 {
//                     "vaf": 1.5622085261984215,
//                     "sample": "TCGA-30"
//                 },
//                 {
//                     "vaf": 4.364531848102471,
//                     "sample": "TCGA-31"
//                 },
//                 {
//                     "vaf": 2.3105508154500622,
//                     "sample": "TCGA-32"
//                 },
//                 {
//                     "vaf": 2.3477064000649808,
//                     "sample": "TCGA-33"
//                 },
//                 {
//                     "vaf": 2.478810687698889,
//                     "sample": "TCGA-34"
//                 },
//                 {
//                     "vaf": -1.6020576556067476,
//                     "sample": "TCGA-35"
//                 },
//                 {
//                     "vaf": -1.1043833394284506,
//                     "sample": "TCGA-36"
//                 },
//                 {
//                     "vaf": 0.052165079260974405,
//                     "sample": "TCGA-37"
//                 },
//                 {
//                     "vaf": -0.7395629963913133,
//                     "sample": "TCGA-38"
//                 },
//                 {
//                     "vaf": 1.5430145954067358,
//                     "sample": "TCGA-39"
//                 },
//                 {
//                     "vaf": -1.2928569097234486,
//                     "sample": "TCGA-40"
//                 },
//                 {
//                     "vaf": 0.26705086934918293,
//                     "sample": "TCGA-41"
//                 },
//                 {
//                     "vaf": -0.0392828182274956,
//                     "sample": "TCGA-42"
//                 },
//                 {
//                     "vaf": -1.1680934977411974,
//                     "sample": "TCGA-43"
//                 },
//                 {
//                     "vaf": 0.5232766605317537,
//                     "sample": "TCGA-44"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-45"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-46"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-47"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-48"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-49"
//                 }
//             ]
//         },
//         {
//             "gene": "GENE4",
//             "data": [
//                 {
//                     "vaf": -0.8994490292628752,
//                     "sample": "TCGA-00"
//                 },
//                 {
//                     "vaf": -0.12994411215248125,
//                     "sample": "TCGA-01"
//                 },
//                 {
//                     "vaf": -1.8065268517353166,
//                     "sample": "TCGA-02"
//                 },
//                 {
//                     "vaf": 1.158130679618188,
//                     "sample": "TCGA-03"
//                 },
//                 {
//                     "vaf": -0.6181640451285697,
//                     "sample": "TCGA-04"
//                 },
//                 {
//                     "vaf": -1.1801782039968503,
//                     "sample": "TCGA-05"
//                 },
//                 {
//                     "vaf": 0.16638308203191432,
//                     "sample": "TCGA-06"
//                 },
//                 {
//                     "vaf": -0.9607197873885533,
//                     "sample": "TCGA-07"
//                 },
//                 {
//                     "vaf": -1.8342584714027534,
//                     "sample": "TCGA-08"
//                 },
//                 {
//                     "vaf": -1.8467175057975553,
//                     "sample": "TCGA-09"
//                 },
//                 {
//                     "vaf": 0.1937731526901325,
//                     "sample": "TCGA-10"
//                 },
//                 {
//                     "vaf": -0.6595734381462669,
//                     "sample": "TCGA-11"
//                 },
//                 {
//                     "vaf": 0.7863279621089762,
//                     "sample": "TCGA-12"
//                 },
//                 {
//                     "vaf": -0.46641909673594306,
//                     "sample": "TCGA-13"
//                 },
//                 {
//                     "vaf": -0.9444462559182504,
//                     "sample": "TCGA-14"
//                 },
//                 {
//                     "vaf": -0.41004969320254847,
//                     "sample": "TCGA-15"
//                 },
//                 {
//                     "vaf": -0.017020413861440594,
//                     "sample": "TCGA-16"
//                 },
//                 {
//                     "vaf": 0.3791517355550818,
//                     "sample": "TCGA-17"
//                 },
//                 {
//                     "vaf": 2.259308950690852,
//                     "sample": "TCGA-18"
//                 },
//                 {
//                     "vaf": -0.04225715166064269,
//                     "sample": "TCGA-19"
//                 },
//                 {
//                     "vaf": -0.955945000492777,
//                     "sample": "TCGA-20"
//                 },
//                 {
//                     "vaf": -0.34598177569938643,
//                     "sample": "TCGA-21"
//                 },
//                 {
//                     "vaf": -0.4635959746460942,
//                     "sample": "TCGA-22"
//                 },
//                 {
//                     "vaf": 0.4814814737734622,
//                     "sample": "TCGA-23"
//                 },
//                 {
//                     "vaf": -1.5407970144446248,
//                     "sample": "TCGA-24"
//                 },
//                 {
//                     "vaf": 0.06326199420033171,
//                     "sample": "TCGA-25"
//                 },
//                 {
//                     "vaf": 0.1565065379653756,
//                     "sample": "TCGA-26"
//                 },
//                 {
//                     "vaf": 0.23218103620027578,
//                     "sample": "TCGA-27"
//                 },
//                 {
//                     "vaf": 1.1569304498433515,
//                     "sample": "TCGA-28"
//                 },
//                 {
//                     "vaf": 2.5220259959595133,
//                     "sample": "TCGA-29"
//                 },
//                 {
//                     "vaf": 2.5203441859920526,
//                     "sample": "TCGA-30"
//                 },
//                 {
//                     "vaf": 3.6203582983435125,
//                     "sample": "TCGA-31"
//                 },
//                 {
//                     "vaf": 3.698457149107336,
//                     "sample": "TCGA-32"
//                 },
//                 {
//                     "vaf": 3.0037708890862693,
//                     "sample": "TCGA-33"
//                 },
//                 {
//                     "vaf": 3.9318483741143035,
//                     "sample": "TCGA-34"
//                 },
//                 {
//                     "vaf": 0.7811981017099934,
//                     "sample": "TCGA-35"
//                 },
//                 {
//                     "vaf": 1.4944845444913688,
//                     "sample": "TCGA-36"
//                 },
//                 {
//                     "vaf": -2.0699850250135325,
//                     "sample": "TCGA-37"
//                 },
//                 {
//                     "vaf": 0.42625873077810095,
//                     "sample": "TCGA-38"
//                 },
//                 {
//                     "vaf": 0.6769080350302455,
//                     "sample": "TCGA-39"
//                 },
//                 {
//                     "vaf": -0.637437025552229,
//                     "sample": "TCGA-40"
//                 },
//                 {
//                     "vaf": -0.39727181432879766,
//                     "sample": "TCGA-41"
//                 },
//                 {
//                     "vaf": -0.13288057758695562,
//                     "sample": "TCGA-42"
//                 },
//                 {
//                     "vaf": -0.2977908794017283,
//                     "sample": "TCGA-43"
//                 },
//                 {
//                     "vaf": -0.3090129690471222,
//                     "sample": "TCGA-44"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-45"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-46"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-47"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-48"
//                 },
//                 {
//                     "vaf": 0.0,
//                     "sample": "TCGA-49"
//                 }
//             ]
//         }
//     ];
//     drawChart(hm_data)
//
//     // var oncoprint = new Oncoprint("#onco", 800);
//     // console.log(oncoprint);
//     // oncoprint.suppressRendering();
//
//
//   },[data])
//
//   return (
//     <div>
//       <div className='onco' id='onco' style={{"width":width+"px"}}>
//
//       </div>
//       {colorScale}
//     </div>
//   )
// }
