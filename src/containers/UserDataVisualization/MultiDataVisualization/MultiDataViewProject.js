import React, { useState } from 'react';
// import './TableComponent.css'; // Import your custom CSS file
import HeaderComponent from '../../Common/HeaderComponent/HeaderComponent';
import { FormattedMessage } from "react-intl";
import PagingArrowFirst from '../../../styles/images/paging-arrow-first.svg'
// import PagingArrowFirst from '../../../styles/images/paging-arrow-first.svg'
const dummyData = [
    {
        id: 1,
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        address: "123 Main Street",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "987-654-3210",
        address: "456 Elm Street",
    },
    {
        id: 3,
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "987-654-3210",
        address: "456 Elm Street",
    },
    {
        id: 4,
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "987-654-3210",
        address: "456 Elm Street",
    },
    {
        id: 5,
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "987-654-3210",
        address: "456 Elm Street",
    },
    {
        id: 6,
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "987-654-3210",
        address: "456 Elm Street",
    },
    {
        id: 7,
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "987-654-3210",
        address: "456 Elm Street",
    },
    {
        id: 8,
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "987-654-3210",
        address: "456 Elm Street",
    },
    {
        id: 9,
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "987-654-3210",
        address: "456 Elm Street",
    },
    {
        id: 10,
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "987-654-3210",
        address: "456 Elm Street",
    }, {
        id: 11,
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "987-654-3210",
        address: "456 Elm Street",
    }, {
        id: 12,
        name: "Jane Smith",
        email: "janesmith@example.com",
        phone: "987-654-3210",
        address: "456 Elm Street",
    }
];

const TableComponent = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(dummyData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dummyData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const clearOldPageRows = () => {
        // setCurrentPage(1);
    };

    const breadCrumbs = {
        '/multidatavisualization/': [
            { id: 'FindID', defaultMessage: 'Home', to: '/' },
            { id: 'MultiDataVisualization', defaultMessage: 'Multi Data Visualization', to: '/home/visualizeMyData/' },
        ]
    }

    return (

        <>
            <HeaderComponent
                title={"sd"}
                routeName="/multidatavisualization/"
                breadCrumbs={breadCrumbs['/multidatavisualization/']}
                type="single"

            />
            <article id="subContents" className="subContents">
                <div className="contentsTitle">
                    <h3>
                        <font>
                            <font><FormattedMessage id="MultiData" defaultMessage="Multi Data" /></font>
                            <span className="colorSecondary">
                                <font ><FormattedMessage id="Visualization" defaultMessage="Visualization" /></font>
                            </span>
                        </font>
                    </h3>
                </div>
                {/* <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => {
                                handlePageChange(currentPage - 1);
                                clearOldPageRows();
                            }}
                        >
                            Previous
                        </button>
                        <span>{currentPage}</span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => {
                                handlePageChange(currentPage + 1);
                                clearOldPageRows();
                            }}
                        >
                            Next
                        </button>
                    </div>
                </div> */}
                <div className="boardList">
                    <table className="table">
                        <thead className="boardHeader">
                            <tr className='boardTr'>
                                <th className='boardCell'>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody className='boardBody'>
                            {currentItems.map((item) => (
                                <tr className='boardTr' key={item.id}>
                                    <td className='boardCell'>{item.id}</td>
                                    <td className='boardCell'>{item.name}</td>
                                    <td className='boardCell'>{item.email}</td>
                                    <td className='boardCell'>{item.phone}</td>
                                    <td className='boardCell'>{item.address}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="paging">
                        <button disabled={currentPage === 1}
                            onClick={() => {
                                handlePageChange(currentPage - 1);
                                clearOldPageRows();
                            }}>

                        </button>
                    </div>
                </div>
            </article>
        </>
    );
};

export default TableComponent;
