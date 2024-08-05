import React, { useEffect, useState } from "react";
import {
    useFilters,
    useGlobalFilter,
    usePagination,
    useRowSelect,
    useTable,
    useSortBy
} from "react-table";
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/outline';

const defaultPropGetter = () => ({});

function Table({
    columns,
    data,
    getRowProps = defaultPropGetter,
    skipReset,
    width
    // columnFil,
    // tooltips = false,

}) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page
        // The rest of these things are super handy, too ;)
        gotoPage,
        // setPageSize,
        state: { pageSize },
    } = useTable(
        {
            columns,
            data,
            autoResetPage: !skipReset,
        },
        useFilters,
        useGlobalFilter,

        useSortBy,


        usePagination,
        useRowSelect,
    );
    const [rangeArray, setRangeArray] = useState([]);
    const [pageNumber, setPageNumber] = useState(1)
    const totalCount = data?.length
    const [pageSetArray, setPageSetArray] = useState(0)

    useEffect(() => {
        let allPages = []
        for (let i = 0; i < Math.ceil(parseInt(totalCount) / parseInt(pageSize)); i++) {
            allPages.push(i + 1)
        }
        const curentSet = getPageSet(allPages, pageNumber || 1)
        setRangeArray(curentSet)
        // setSearchItem(paramObj?.query);
    }, [data?.length, pageNumber]);


    const chunkIntoN = (arr, n) => {
        const size = Math.ceil(arr.length / n);
        return Array.from({ length: n }, (v, i) =>
            arr.slice(i * size, i * size + size)
        );
    }

    const getPageSet = (allpages, pageNumber) => {
        let _num = Math.ceil(parseInt(totalCount) / parseInt(pageSize))
        let pagesetNum = Math.ceil(parseInt(_num) / parseInt(5))
        let pageSets = chunkIntoN(allpages, pagesetNum)
        setPageSetArray(pageSets[0]?.length)
        for (const pageset of pageSets) {
            if (pageset.includes(pageNumber)) {
                return pageset
            }
        }

    }


    return (
        <div>
            <div style={{ width: '100%', overflowX: 'auto' }}>
                <span style={{ display: 'flex', fontSize: '18px' }}><b>Total:</b> <div style={{ color: "#003177", paddingLeft: '10px', fontSize: "18px" }}>{data?.length}</div></span>
                <table className={" boardList"} {...getTableProps()} style={{ width:'1075px' }}>
                    <thead className="boardHeader">
                        {headerGroups.map((headerGroup) => (
                            <tr
                                className="boardTr"
                                {...headerGroup.getHeaderGroupProps()}
                            >
                                {headerGroup.headers.map((column) => (

                                    <th className={`${(column?.fixed && column?.fixed === 'left') ? 'fixed' : ''} boardCell IconSpan`} {...column.getHeaderProps(column.getSortByToggleProps())}
                                        style={column?.width && column?.width !== '' ? { width: column?.width + 'px', textAlign: 'center', padding: '16px 24px' , wordBreak:column?.wordBreak } : { textAlign: 'center', padding: '16px 24px' }} >
                                        {column.render('Header')}

                                        <span className={`${column.isSorted ? 'Opacity1' : 'Opacity0'}`}>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? <ChevronDownIcon className="IconClass Color8F" />

                                                    : <ChevronUpIcon className="IconClass Color8F" />
                                                : <ChevronUpIcon className="IconClass Color8F" />}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className="boardBody">
                        {page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr
                                    className="boardTr"
                                    {...row.getRowProps(getRowProps(row))} key={i}
                                >
                                    {row.cells.map((cell) => {
                                        return (
                                            <td
                                                className={`${(cell?.column?.fixed && cell?.column?.fixed === 'left') ? 'fixed' : ''} boardCell`}
                                                {...cell.getCellProps()} style={{ textAlign: 'center', fontWeight: '400', padding: "16px 24px" }}
                                            >
                                                {cell.render("Cell")}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div >


                <div className="paging" id="paging">
                    <button
                        className={` 
                   ${pageNumber <= pageSetArray ? "on" : ""}`
                        }
                        onClick={() => {
                            if (pageNumber > pageSetArray) {
                                setPageNumber(rangeArray[0] - pageSetArray)
                                gotoPage(rangeArray[0] - (pageSetArray + 1))
                            }
                        }}
                    >
                        {'<<'}
                    </button>
                    <button
                        className={` ${pageNumber === 1
                            ? "on"
                            : ""
                            }`}
                        onClick={() => {
                            if (pageNumber !== 1) {
                                setPageNumber(pageNumber - 1)
                                gotoPage(pageNumber - 2)
                            }
                        }}
                    >
                        {"<"}
                    </button>
                    <ul>
                        {rangeArray?.length > 0 &&
                            rangeArray?.map((n, i) => (
                                <li
                                    className={`${pageNumber === rangeArray[i]
                                        ? "on"
                                        : ""
                                        }`}
                                    key={i}
                                    onClick={() => {
                                        setPageNumber(n)
                                        gotoPage(n - 1)
                                    }}
                                >
                                    {" "}
                                    {n}
                                </li>
                            ))}
                    </ul>
                    <button
                        className={` ${pageNumber >=
                            Math.ceil(
                                parseInt(totalCount) / parseInt(pageSize)
                            )
                            ? "on"
                            : ""
                            }`}
                        onClick={() => {
                            if (
                                pageNumber <
                                Math.ceil(
                                    parseInt(totalCount) / parseInt(pageSize)
                                )
                            ) {
                                setPageNumber(pageNumber + 1)
                                gotoPage(pageNumber)
                            }
                        }}
                    >
                        {">"}
                    </button>
                    <button
                        className={` ${rangeArray && rangeArray[rangeArray.length - 1] >=
                            Math.ceil(
                                parseInt(totalCount) / parseInt(pageSize)
                            )
                            ? "on"
                            : ""
                            }`}
                        onClick={() => {
                            if (
                                rangeArray[rangeArray.length - 1] <
                                Math.ceil(
                                    parseInt(totalCount) / parseInt(pageSize)
                                )
                            ) {
                                setPageNumber(rangeArray[rangeArray.length - 1] + 1)
                                gotoPage(rangeArray[rangeArray.length - 1])
                            }
                        }}
                    >
                        {">>"}
                    </button>
                </div>

            </div>

        </div>
    );
}
export default Table;
