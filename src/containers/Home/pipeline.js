import cancer_capture from '../../assets/images/sub/cancer_capture.png'
import oncoprint from '../../assets/images/sub/Oncoprint.png'
import scatter_plot from '../../assets/images/sub/scatter_plot.png'
import circos_plot from '../../assets/images/sub/circos_plot.png'
import volcano_plot from '../../assets/images/sub/volcano_plot.png'
import cnv_plot from '../../assets/images/sub/cnv_plot.png'
import heatmap from '../../assets/images/sub/heatmap.png'
import lollipop_plot from '../../assets/images/sub/lollipop_plot.png'
import survival_plot from '../../assets/images/sub/survival_plot.png'


export default function Pipeline() {
    return (
        <div className="cont_wrap my-10">
    		<h3 className="pipeline_tit leading-tight">다양한 암단백유전체 정보</h3>
            <div className="bg bg1">
                <ul className="pipeline_1">
                    <li className="pipeline_1_li">DNA mutation</li>
                    <li className="pipeline_1_li">Phosphoproteome</li>
                    <li className="pipeline_1_li">Methylation</li>
                    <li className="pipeline_1_li">CNV</li>
                    <li className="pipeline_1_li">RNA expression</li>
                    <li className="pipeline_1_li">Fusion gene</li>
                    <li className="pipeline_1_li">Global proteome</li>
                </ul>
            </div>
    		<div className="arrow_down"></div>
            <h3 className="pipeline_tit color2">헬스케어 빅데이터 쇼케이스 시스템</h3>
            <div className="bg bg2">
                <img alt="" src={cancer_capture} />
                <ul className="pipeline_2">
                    <li className="pipeline_2_li">입력 시스템</li>
                    <li className="pipeline_2_li">DB 시스템</li>
                    <li className="pipeline_2_li">분석 시스템</li>
                    <li className="pipeline_2_li">관리 시스템</li>
                </ul>
            </div>
            
            <div className="arrow_down"></div>
            
            <h3 className="pipeline_tit color3">임상 및 생활습관 정보</h3>
            <div className="bg bg3">
                <ul className="pipeline_3">
                    <li className="pipeline_3_li">신체계측 및 기타 건강</li>
                    <li className="pipeline_3_li">환자 정보</li>
                    <li className="pipeline_3_li">기타 건강 정보</li>
                </ul>
                <ul className="pipeline_3">
                    <li className="pipeline_3_li">면역 및 외과 병리</li>
                    <li className="pipeline_3_li">개인 면역 정보</li>
                    <li className="pipeline_3_li">외과 병리 정보</li>
                </ul>
                <ul className="pipeline_3">
                    <li className="pipeline_3_li">전이 및 재발 정보</li>
                    <li className="pipeline_3_li">전이 정보</li>
                    <li className="pipeline_3_li">재발 정보</li>
                </ul>
            </div>
            
            <div className="arrow_down"></div>
            
            <h3 className="pipeline_tit color4">플랫폼의 활용 결과</h3>
            <div className="bg bg4">
                <ul className="pipeline_4">
                    <li className="pipeline_4_li">
                        <img src={survival_plot} />
                        <p>Suvival Plot</p>
                    </li>
                    <li className="pipeline_4_li">
                        <img src={volcano_plot} />
                        <p>Volcano Plot</p>
                    </li>
                    <li className="pipeline_4_li">
                        <img src={lollipop_plot} />
                        <p>Lollipop Plot</p>
                    </li>
                    <li className="pipeline_4_li">
                        <img src={cnv_plot} />
                        <p>CNV Plot</p>
                    </li>
                    <li className="pipeline_4_li">
                        <img src={heatmap} />
                        <p>Heatmap</p>
                    </li>
                    <li className="pipeline_4_li">
                        <img src={circos_plot} />
                        <p>Circos Plot</p>
                    </li>
                    <li className="pipeline_4_li">
                        <img src={scatter_plot} />
                        <p>Scatter Plot</p>
                    </li>
                    <li className="pipeline_4_li">
                        <img src={oncoprint} />
                        <p>Oncoprint</p>
                    </li>
                    
                </ul>
            </div>
        </div>
    )
}