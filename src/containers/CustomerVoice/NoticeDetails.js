import React, { useEffect, useState } from 'react'
import HeaderComponent from '../Common/HeaderComponent/HeaderComponent';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { getDetailPageInfo } from '../../actions/api_actions'
import config from '../../config';

function NoticeDetails() {
    let { slug } = useParams();
    const title = { id: 'K-core : Notice', defaultMessage: 'Notice' };
    const [DetailData, setDetailData] = useState({})
    const breadCrumbs = {
        '/Notice/': [
            { id: 'Home', defaultMessage: 'Home', to: '/' },
            { id: `CustomerService`, defaultMessage: `Customer Service`, to: `` },
            { id: `Notice`, defaultMessage: `Notice`, to: `` },

        ]
    }

    const dataItemStyle = {
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
        marginBottom: '20px', // Margin between data-items
    };

    const dataItemHeaderStyle = {
        backgroundColor: '#3498db',
        padding: '5px 10px',
        borderRadius: '5px 5px 0 0',
    };

    const dataItemContentStyle = {
        padding: '10px',
        marginTop: '10px'
    };
    useEffect(() => {
        if (slug) {
            let url = config.auth + `notice-api/?page=${slug}&per_page=${10}&delay=1&id=${slug}`;
            let data = { id: slug }
            let method = "GET"
            let returnedData = getDetailPageInfo(url, method, data);
            returnedData
                .then((result) => {
                    if (result.status === 200) {
                        setDetailData(result.data)
                    }
                })
                .catch(() => {
                    setDetailData({})
                });
        }
    }, [slug])
    return (
        <div>
            <div>
                <HeaderComponent
                    title={title}
                    routeName="/Notice/"
                    breadCrumbs={breadCrumbs["/Notice/"]}
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
                                                <FormattedMessage id="Notice" defaultMessage="Notice" />{' '}
                                            </font>
                                        </font>
                                    </h3>
                                </div>
                                <div className="data-container">
                                    {DetailData &&
                                        <div key={Math.random()} className="data-item" style={dataItemStyle}>
                                            <div style={dataItemHeaderStyle}>
                                                <h1 className='MarginBottom4'><FormattedMessage id="Title" defaultMessage="Title" /></h1>
                                                <h4>{DetailData['title']}</h4>
                                            </div>
                                            <div style={dataItemContentStyle}>
                                                <h1 className='MarginBottom4'><FormattedMessage id="Writer" defaultMessage="Writer" /></h1>
                                                <h4>{DetailData['writer']}</h4>
                                            </div>
                                            <div style={dataItemContentStyle}>
                                                <h1 className='MarginBottom4'><FormattedMessage id="Content" defaultMessage="Content" /></h1>
                                                <div dangerouslySetInnerHTML={{ __html: DetailData['content'] }} />
                                            </div>
                                        </div>
                                    }
                                </div>
                            </>
                        </div>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default NoticeDetails