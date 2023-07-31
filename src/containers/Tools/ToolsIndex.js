import React from "react";
import HeaderComponent from "../Common/HeaderComponent/HeaderComponent";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { FormattedMessage } from "react-intl";
import icon1 from '../../assets/images/publicDataInfo-img01.svg'
import icon2 from '../../assets/images/publicDataInfo-img02.svg'
import icon3 from '../../assets/images/publicDataInfo-img03.svg'
const HomeComponent = () => {

    const title = { id: "MultiDataVisualization", defaultMessage: "Multi Data Visualization" }
    let gridData = [
        { title: 'Blast', image: require(`../../assets/images/Visualizations/circos.png`).default, link: `/newmultidataproject/`, description: 'Provides a visualization analysis service that can be implemented according to the uploaded user data.' },
        { title: 'VCFMAF', image: require(`../../assets/images/Visualizations/circos.png`).default, link: `/multidataprojectview/`, description: 'Provides a visualization analysis service that can be implemented according to the uploaded user data.' },
        { title: 'VCFMAF', image: require(`../../assets/images/Visualizations/circos.png`).default, link: `/multidataprojectview/`, description: 'Provides a visualization analysis service that can be implemented according to the uploaded user data.' },
    ]


    const breadCrumbs = {
        '/tools/': [
            { id: 'Home', defaultMessage: 'Home', to: '/' },
            { id: 'Tools', defaultMessage: 'Tools', to: '/tools/' },
        ]
    }

    return (
        <div>
            <HeaderComponent
                title={title}
                routeName="/tools/"
                breadCrumbs={breadCrumbs['/tools/']}
                type="single"

            />
            <article id="subContents" className="subContents">
                <div className="contentsTitle">
                    <h3>
                        <font>
                            <font><FormattedMessage id="Tools" defaultMessage="Tools" /></font>
                        </font>
                    </h3>
                </div>
                <div className="ptn">
                    <div className="auto">
                        <div className="publicDataInfo" style={{padding:"0px"}}>
                            <ul>
                                <li>
                                    <Link to='/blast/'>
                                        <img src={icon1} alt="" />
                                        <dl>
                                            <dt><FormattedMessage
                                                id="Blast"
                                                defaultMessage="Blast"
                                            /></dt>
                                            <dd>
                                                <FormattedMessage
                                                    id="BlastDesc"
                                                    defaultMessage="BLAST stands for Basic Local Alignment Search Tool. BLAST is a powerful tool for analyzing biological sequence data."
                                                /></dd>
                                        </dl>
                                    </Link>
                                </li>

                                <li>
                                    <Link to='/vcfmaf/'>
                                        <img src={icon2} alt="" />
                                        <dl>
                                            <dt><FormattedMessage
                                                id="VCFMAF"
                                                defaultMessage="VCFMAF"
                                            /></dt>
                                            <dd><FormattedMessage
                                                id="VCFMAFDes"
                                                defaultMessage="Vcf2maf is a tool for converting files in Variant Call Format (VCF) to MAF format. "
                                            /></dd>
                                        </dl>
                                    </Link>
                                </li>

                                <li>
                                    <Link to='/interpro/'>
                                        <img src={icon3} alt="" />
                                        <br />
                                        <br />
                                        <dl>
                                            <dt ><FormattedMessage
                                                id="Interpro"
                                                defaultMessage="Interpro"
                                            /></dt>
                                            <br />
                                            <dd ><FormattedMessage
                                                id="InterproDes"
                                                defaultMessage="InterPro is a database of protein families, protein domains in which identifiable features found in known proteins can be applied to new protein sequences"
                                            /></dd>
                                        </dl>
                                    </Link>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default HomeComponent;
