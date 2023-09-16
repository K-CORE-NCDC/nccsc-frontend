import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getNoticeData } from '../../actions/api_actions';
import config from '../../config';
import '../../interceptor/interceptor';
import Table from '../Common/Table/ReactTable';
import LoaderComp from '../Common/Loader';
import { Link } from 'react-router-dom/cjs/react-router-dom';


function NoticeList() {
    const intl = useIntl();
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async (page, method) => {
        setLoading(true);
        let response;
        if (method === 'GET') {
            response = await axios.get(config.auth + `notice-api/?page=${page}&per_page=${10}&delay=1`);
        } else {
            response = await axios.post(
                config.auth + `notice-api/?page=${page}&per_page=${10}&delay=1&input`,
                {
                    type: 'title',
                    searchTerm: ''
                }
            );
        }
        if (response.data.data) {
            setTableData(response.data.data);
        }
        else {
            setTableData([])
        }
        setLoading(false);
    };


    useEffect(() => {
        fetchUsers(1, 'GET'); // fetch page 1 of users
    }, []);

    const columns = [
        {
            Header: intl.formatMessage({ id: "Order", defaultMessage: 'Order' }),
            accessor: () => ' ',
            Cell: ({ cell: { value, row } }) => (
                < div title={value}>
                    {parseInt(row?.index) + parseInt(1)}</div>
            ),
            width: "80"
        },
        {
            Header: intl.formatMessage({ id: "Title", defaultMessage: 'Title' }),
            accessor: (row) => row.title,
            Cell: ({ cell: { _, row } }) => (
                <div>
                    <Link to={`/notice/${row?.original?.id}`}>
                        <span>{row.original.title}</span>
                    </Link>
                </div>
            ),
            width: "200"
        },
        {
            Header: intl.formatMessage({ id: "Writer", defaultMessage: 'Writer' }),
            accessor: (row) => row.writer,
        },
    ];


    return (
        <div >
            {loading ?
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LoaderComp /> </div> :
                <div >
                    {tableData && tableData.length > 0 && (
                        <Table
                            columns={columns}
                            data={tableData}
                            width={"1075"}
                        />
                    )}
                    {tableData && tableData.length === 0 && <h1 className="MultiUploadTextCenter">{intl.formatMessage({ id: "NoRecords", defaultMessage: 'No Records Found' })}</h1>}
                </div>}
        </div>
    );
}

function NoticeDetail({ slug_id }) {
    const dispatch = useDispatch();
    const notice_data = useSelector((state) => state.homeReducer.dataNotice);

    useEffect(() => {
        dispatch(getNoticeData(slug_id, ''));
    }, []);

    return (
        <div className="" style={{ color: 'black', border: '1px solid black' }}>
            {notice_data && (
                <div className="">
                </div>
            )}
        </div>
    );
}

export default function Notice() {
    let { slug } = useParams();
    const [postCreate, setPostCreate] = useState(false);

    const callback = (count) => {
        setPostCreate(count);
    };

    useEffect(() => { }, [postCreate]);

    const notice_comp = () => {
        if (slug) {
            return <NoticeDetail slug_id={slug} />;
        } else {
            return <NoticeList new_post={callback} />;
        }
    };

    return <>{notice_comp()}</>;
}
