// Feed this in as
import ReactDOM from 'react-dom';
import ReactTooltip from 'react-tooltip';
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import $ from "jquery";
// Mutation colors
var MUT_COLOR_MISSENSE = '#008000';
var MUT_COLOR_MISSENSE_PASSENGER = '#53D400';
var MUT_COLOR_INFRAME = '#993404';
var MUT_COLOR_INFRAME_PASSENGER = '#fe9929';
var MUT_COLOR_TRUNC = '#000000';
var MUT_COLOR_TRUNC_PASSENGER = '#708090';
var MUT_COLOR_FUSION = '#8B00C9';
var MUT_COLOR_PROMOTER = '#FFA942';

// Variant Classification colors
var VAR_CLS_MISSENSE_MUTATION = '#008000';
var VAR_CLS_NONSENSE_MUTATION = '#53D400';
var VAR_CLS_SPLICE_SITE = '#993404';
var VAR_CLS_IN_FRAME_INS = '#fe9929';
var VAR_CLS_IN_FRAME_DEL = '#708090';
var VAR_CLS_FRAME_SHIFT_INS = '#8B00C9';
var VAR_CLS_FRAME_SHIFT_DEL = '#070ffa';
var VAR_CLS_GERMLINE = '#fa0707';

var non_mutation_rule_params = {
    // Default: gray rectangle
    '*': {
  		shapes: [{
  			'type': 'rectangle',
  			'fill': 'rgba(190, 190, 190, 1)',
  			'z': 1
			}],
  		exclude_from_legend: false,
			legend_label:'No alteration'
    },
		
    // mRNA regulation
    'regulation': {
			// Light red outline for upregulation
  		'up': {
  			shapes: [{
  				'type': 'rectangle',
  				'fill': 'rgba(0, 0, 0, 0)',
  				'stroke': 'rgba(255, 153, 153, 1)',
  				'stroke-width': '2',
  				'x': '0%',
  				'y': '0%',
  				'width': '100%',
  				'height': '100%',
  				'z': 3,
  			}],
  			legend_label: 'mRNA Upregulation (z-score >= 1)',
  		},
			// Light blue outline for downregulation
  		'down': {
  			shapes: [{
  				'type': 'rectangle',
  				'fill': 'rgba(0, 0, 0, 0)',
  				'stroke': 'rgba(102, 153, 204, 1)',
  				'stroke-width': '2',
  				'x': '0%',
  				'y': '0%',
  				'width': '100%',
  				'height': '100%',
  				'z': 3,
  			}],
  			legend_label: 'mRNA Downregulation (z-score <= -1)',
  		},
    },
    // protein expression regulation
    'protein': {
		// small up arrow for upregulated
  		'up': {
  			shapes: [{
  				'type': 'triangle',
  				'x1': '50%',
  				'y1': '0%',
  				'x2': '100%',
  				'y2': '33.33%',
  				'x3': '0%',
  				'y3': '33.33%',
  				'fill': 'rgba(0,0,0,1)',
  				'z': 4,
  			}],
  			legend_label: 'Protein Upregulation (value >= 1.5)',
  		},
  		// small down arrow for upregulated
  		'down': {
  			shapes: [{
  				'type': 'triangle',
  				'x1': '50%',
  				'y1': '100%',
  				'x2': '100%',
  				'y2': '66.66%',
  				'x3': '0%',
  				'y3': '66.66%',
  				'fill': 'rgba(0,0,0,1)',
  				'z': 4,
  			}],
  			legend_label: 'Protein Downregulation (value <= 0.5)',
  		}
    },
		'cnv': {
			// small up arrow for upregulated
  		'blue': {
  			shapes: [
				{
					'type': 'triangle',
					'x1': '50%',
					'y1': '100%',
					'x2': '100%',
					'y2': '66.66%',
					'x3': '0%',
					'y3': '66.66%',
					'fill': 'rgba(255,0,0,1)',
					'z': 4,
				}  
				],
  			legend_label: 'Cnv (value <= 1)',
  		},
  		// small down arrow for upregulated
  		'white': {
  			shapes: [{
  				'type': 'triangle',
  				'x1': '50%',
  				'y1': '100%',
  				'x2': '100%',
  				'y2': '66.66%',
  				'x3': '0%',
  				'y3': '66.66%',
  				'fill': 'rgba(0,206,209,1)',
  				'z': 4,
  			}],
  			legend_label: 'Cnv (value = 2)',
  		},
		'red': {
			shapes: [{
				'type': 'triangle',
				'x1': '50%',
				'y1': '0%',
				'x2': '100%',
				'y2': '33.33%',
				'x3': '0%',
				'y3': '33.33%',
				'fill': 'rgba(139,0,139,1)',
				'z': 4,
			}],
			legend_label: 'Cnv (value >= 3)',
		}
    },
    // fusion
    'fusion': {
		// tall inset purple rectangle for fusion
  		'true': {
    			shapes: [{
    				'type': 'rectangle',
    				'fill': MUT_COLOR_FUSION,
    				'x': '0%',
    				'y': '20%',
    				'width': '100%',
    				'height': '60%',
    				'z': 5
    				}],
    			legend_label: 'Fusion'
    		}
    },
};

window.geneticrules = {};
window.geneticrules.genetic_rule_set_same_color_for_all_no_recurrence = {
    'type':'gene',
    'legend_label': 'Genetic Alteration',
    'rule_params': $.extend({}, non_mutation_rule_params, {
	     'disp_mut': {
	        'trunc,inframe,missense,promoter,trunc_rec,inframe_rec,missense_rec,promoter_rec': {
        		shapes: [{
        			'type': 'rectangle',
        			'fill': MUT_COLOR_MISSENSE,
        			'x': '0%',
        			'y': '33.33%',
        			'width': '100%',
        			'height': '33.33%',
        			'z': 6
        		}],
  		       legend_label: 'Mutation'
	        }
	      }
    })
};
window.geneticrules.genetic_rule_set_same_color_for_all_recurrence = {
    'type':'gene',
    'legend_label': 'Genetic Alteration',
    'rule_params': $.extend({}, non_mutation_rule_params, {
		'disp_mut': {
			'missense_rec,inframe_rec,trunc_rec': {
				shapes: [{
					'type': 'rectangle',
					'fill': MUT_COLOR_MISSENSE,
					'x': '0%',
					'y': '33.33%',
					'width': '100%',
					'height': '33.33%',
					'z': 6
				}],
				legend_label: 'Mutation (putative driver)'
			},
			'missense,inframe,trunc,promoter,promoter_rec': {
				shapes: [{
					'type': 'rectangle',
					'fill': MUT_COLOR_MISSENSE_PASSENGER,
					'x': '0%',
					'y': '33.33%',
					'width': '100%',
					'height': '33.33%',
					'z': 6
				}],
				legend_label: 'Mutation (putative passenger)'
			},
		},
    })
};
window.geneticrules.genetic_rule_set_different_colors_no_recurrence = {
    'type':'gene',
    'legend_label': 'Genetic Alteration',
    'rule_params': $.extend({}, non_mutation_rule_params, {
		'disp_mut': {
			'promoter,promoter_rec': {
				shapes: [{
					'type': 'rectangle',
					'fill': MUT_COLOR_PROMOTER,
					'x': '0%',
					'y': '33.33%',
					'width': '100%',
					'height': '33.33%',
					'z': 6,
					}],
				legend_label: 'Promoter Mutation'
			},
			'trunc,trunc_rec': {
				shapes: [{
					'type': 'rectangle',
					'fill': MUT_COLOR_TRUNC,
					'x': '0%',
					'y': '33.33%',
					'width': '100%',
					'height': '33.33%',
					'z': 6,
					}],
				legend_label: 'Truncating Mutation',
			},
			'inframe,inframe_rec': {
				shapes: [{
					'type': 'rectangle',
					'fill': MUT_COLOR_INFRAME,
					'x': '0%',
					'y': '33.33%',
					'width': '100%',
					'height': '33.33%',
					'z': 6,
					}],
				legend_label: 'Inframe Mutation',
			},
			'missense,missense_rec': {
				shapes: [{
					'type': 'rectangle',
					'fill': MUT_COLOR_MISSENSE,
					'x': '0%',
					'y': '33.33%',
					'width': '100%',
					'height': '33.33%',
					'z': 6,
					}],
				legend_label: 'Missense Mutation',
			},
		}
    })
};
window.geneticrules.genetic_rule_set_different_colors_recurrence = {
    'type':'gene',
    'legend_label': 'Genetic Alteration',
    'rule_params': $.extend({}, non_mutation_rule_params, {
		'disp_mut': {
			'promoter,promoter_rec': {
				shapes: [{
					'type': 'rectangle',
					'fill': MUT_COLOR_PROMOTER,
					'x': '0%',
					'y': '33.33%',
					'width': '100%',
					'height': '33.33%',
					'z': 6,
					}],
				legend_label: 'Promoter Mutation'
			},
			'trunc_rec': {
				shapes: [{
					'type': 'rectangle',
					'fill': MUT_COLOR_TRUNC,
					'x': '0%',
					'y': '33.33%',
					'width': '100%',
					'height': '33.33%',
					'z': 6,
					}],
				legend_label: 'Truncating Mutation (putative driver)',
			},
			'trunc': {
				shapes: [{
					'type': 'rectangle',
					'fill': MUT_COLOR_TRUNC_PASSENGER,
					'x': '0%',
					'y': '33.33%',
					'width': '100%',
					'height': '33.33%',
					'z': 6,
					}],
				legend_label: 'Truncating Mutation (putative passenger)',
			},
			'inframe_rec': {
				shapes: [{
					'type': 'rectangle',
					'fill': MUT_COLOR_INFRAME,
					'x': '0%',
					'y': '33.33%',
					'width': '100%',
					'height': '33.33%',
					'z': 6,
					}],
				legend_label: 'Inframe Mutation (putative driver)',
			},
			'inframe': {
				shapes: [{
					'type': 'rectangle',
					'fill': MUT_COLOR_INFRAME_PASSENGER,
					'x': '0%',
					'y': '33.33%',
					'width': '100%',
					'height': '33.33%',
					'z': 6,
					}],
				legend_label: 'Inframe Mutation (putative passenger)',
			},
			'missense_rec': {
				shapes: [{
					'type': 'rectangle',
					'fill': MUT_COLOR_MISSENSE,
					'x': '0%',
					'y': '33.33%',
					'width': '100%',
					'height': '33.33%',
					'z': 6,
					}],
				legend_label: 'Missense Mutation (putative driver)',
			},
			'missense': {
				shapes: [{
					'type': 'rectangle',
					'fill': MUT_COLOR_MISSENSE_PASSENGER,
					'x': '0%',
					'y': '33.33%',
					'width': '100%',
					'height': '33.33%',
					'z': 6,
					}],
				legend_label: 'Missense Mutation (putative passenger)',
			},
		}
    })
};

window.geneticrules.clinical_rule_set_custom = {
	'type': 'categorical',
	'fills': [
		VAR_CLS_MISSENSE_MUTATION,
		VAR_CLS_NONSENSE_MUTATION,
		VAR_CLS_SPLICE_SITE,
		VAR_CLS_IN_FRAME_INS,
		VAR_CLS_IN_FRAME_DEL,
		VAR_CLS_FRAME_SHIFT_INS,
		VAR_CLS_FRAME_SHIFT_DEL
	],
	'category_key': 'category'
};
window.geneticrules.clinical_rule_set_bar = {
	'type': 'bar',
	'fills': [
		VAR_CLS_MISSENSE_MUTATION,
		VAR_CLS_NONSENSE_MUTATION,
		VAR_CLS_SPLICE_SITE,
		VAR_CLS_IN_FRAME_INS,
		VAR_CLS_IN_FRAME_DEL,
		VAR_CLS_FRAME_SHIFT_INS,
		VAR_CLS_FRAME_SHIFT_DEL
	],
	'value_key': 'cnt'
};
window.geneticrules.clinical_rule_set_stacked_bar = {
	'type': 'stacked_bar',
	'categories': [
		'Missense_Mutation',
		'Nonsense_Mutation',
		'Splice_Site',
		'In_Frame_Ins',
		'In_Frame_Del',
		'Frame_Shift_Ins',
		'Frame_Shift_Del'
	],
	'fills': [
		VAR_CLS_MISSENSE_MUTATION,
		VAR_CLS_NONSENSE_MUTATION,
		VAR_CLS_SPLICE_SITE,
		VAR_CLS_IN_FRAME_INS,
		VAR_CLS_IN_FRAME_DEL,
		VAR_CLS_FRAME_SHIFT_INS,
		VAR_CLS_FRAME_SHIFT_DEL
	],
	'value_key': 'val'
}


const tooltip = ()=>{
	return  <span><QuestionMarkCircleIcon data-multiline="true"   className='inline ml-2 mb-1' data-tip="RNA high : z-score ≥ 1,<br>  <br/>RNA low : z-score ≤ -1 " style={{ width: '20px' , cursor:'pointer' }}></QuestionMarkCircleIcon><ReactTooltip /></span>
}
window.geneticrules.genetic_rule_set_custom = {
	'type':'gene',
	'legend_label': 'Variant Classification',
	'rule_params': $.extend({}, non_mutation_rule_params, {
		'no_maf': {
			'no_maf': {
				shapes: [{
					'type': 'rectangle',
					'fill': 'rgba(255, 255, 255, 1)',
					'z': 10
				}],
				exclude_from_legend: true,
			}
		},
		'variant_classification': {
			'Missense_Mutation': {
				shapes: [{
					'type': 'rectangle',
					'fill': VAR_CLS_MISSENSE_MUTATION,
					'x': '0%',
					'y': '0%',
					'width': '100%',
					'height': '100%',
					'z': 6,
				}],
				legend_label: 'Missense Mutation'
			},
			'Nonsense_Mutation': {
				shapes: [{
					'type': 'rectangle',
					'fill': VAR_CLS_NONSENSE_MUTATION,
					'x': '0%',
					'y': '0%',
					'width': '100%',
					'height': '100%',
					'z': 6,
				}],
				legend_label: 'Nonsense Mutation',
			},
			'Splice_Site': {
				shapes: [{
					'type': 'rectangle',
					'fill': VAR_CLS_SPLICE_SITE,
					'x': '0%',
					'y': '0%',
					'width': '100%',
					'height': '100%',
					'z': 6,
				}],
				legend_label: 'Splice Site',
			},
			'In_Frame_Ins': {
				shapes: [{
					'type': 'rectangle',
					'fill': VAR_CLS_IN_FRAME_INS,
					'x': '0%',
					'y': '0%',
					'width': '100%',
					'height': '100%',
					'z': 6,
				}],
				legend_label: 'In Frame Ins',
			},
			'In_Frame_Del': {
				shapes: [{
					'type': 'rectangle',
					'fill': VAR_CLS_IN_FRAME_DEL,
					'x': '0%',
					'y': '0%',
					'width': '100%',
					'height': '100%',
					'z': 6,
				}],
				legend_label: 'In Frame Del',
			},
			'Frame_Shift_Ins': {
				shapes: [{
					'type': 'rectangle',
					'fill': VAR_CLS_FRAME_SHIFT_INS,
					'x': '0%',
					'y': '0%',
					'width': '100%',
					'height': '100%',
					'z': 6,
				}],
				legend_label: 'Frame Shift Ins',
			},
			'Frame_Shift_Del': {
				shapes: [{
					'type': 'rectangle',
					'fill': VAR_CLS_FRAME_SHIFT_DEL,
					'x': '0%',
					'y': '0%',
					'width': '100%',
					'height': '100%',
					'z': 6,
				}],
				legend_label: 'Frame Shift Del',
			},
			'Germline': {
				shapes: [{
					'type': 'rectangle',
					'fill': VAR_CLS_GERMLINE,
					'x': '0%',
					'y': '0%',
					'width': '100%',
					'height': '100%',
					'z': 6,
				}],
				legend_label: 'Germline',
			},
		}
	})
}
