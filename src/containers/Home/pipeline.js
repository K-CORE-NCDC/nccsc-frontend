import cancer_capture from '../../assets/images/sub/cancer_capture.png'
import oncoprint from '../../assets/images/sub/Oncoprint.png'
import scatter_plot from '../../assets/images/sub/scatter_plot.png'
import circos_plot from '../../assets/images/sub/circos_plot.png'
import volcano_plot from '../../assets/images/sub/volcano_plot.png'
import cnv_plot from '../../assets/images/sub/cnv_plot.png'
import heatmap from '../../assets/images/sub/heatmap.png'
import lollipop_plot from '../../assets/images/sub/lollipop_plot.png'
import survival_plot from '../../assets/images/sub/survival_plot.png'

import pipeline from '../../assets/images/sub/pipeline.png'

export default function Pipeline() {
    return (
        <div className="cont_wrap my-10">
          <div className="flex justify-center">
            <div className="pl-8 pr-8">
              <img src={pipeline}/>
            </div>
          </div>
        </div>
    )
}
