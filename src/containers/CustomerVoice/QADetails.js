import React from 'react'
import HeaderComponent from '../Common/HeaderComponent/HeaderComponent';
import { FormattedMessage } from 'react-intl';

function QADetails() {

    const breadCrumbs = {
        '/faq/': [
            { id: 'Home', defaultMessage: 'Home', to: '/' },
            { id: `VisualizeMyData`, defaultMessage: `Visualize My Data`, to: `/home/visualizeMyData/` },
            {
                id: `SingleDataVisualization`,
                defaultMessage: `Single Data Visualization`,
                to: project_id ? `/visualise-singledata/home/${project_id}` : `/visualise-singledata/home/`
            },
            {
                id: tab !== 'home' ? tab : 'Null',
                defaultMessage: tab !== 'home' ? tab : 'Null',
                to: `/visualise-singledata/${tabName}/${project_id}`
            }
        ]
    }
    return (
        <div>
            <div>
                <HeaderComponent
                    title={title}
                    routeName="/faq/"
                    breadCrumbs={breadCrumbs["/faq/"]}
                    type="single"
                />
                <article id="subContents" className="subContents">
                    <div className="ptn">
                        <div className="auto">
                            <>
                                <div className="contentsTitle">
                                    <h3>
                                        <font>
                                            <font>
                                                {' '}
                                                <FormattedMessage id="FAQ" defaultMessage="FAQ" />{' '}
                                            </font>
                                        </font>
                                    </h3>
                                </div>
                            </>
                        </div>
                    </div>
                </article>
            </div>





        </div>
    )
}

export default QADetails