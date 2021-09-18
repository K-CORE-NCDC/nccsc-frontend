import React, { useState, useEffect } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
const activePageCss = "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
const nonActiveClassCss = "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"



function PagenationTable() {
    const pages = [1, 2, 3, 4, 5]
    const [currentActivePageNumber, setCurrentActivePageNumber] = useState(0)

    const pageClickFunction = (event) => {
        const pageNumberClicked = parseInt(event.target.value)
        setCurrentActivePageNumber(pageNumberClicked)
    }
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-1/4 m-1 p-1">
                    <img src="https://img.fonwall.ru/o/1c/kosmos-planety-vselennaya-360z.jpg" className="rounded-lg" />
                </div>
                <div className="w-1/4 m-1 p-1">
                    <img src="https://img.fonwall.ru/o/1c/kosmos-planety-vselennaya-360z.jpg" className="rounded-lg" />
                </div>
                <div className="w-1/4 m-1 p-1">
                    <img src="https://img.fonwall.ru/o/1c/kosmos-planety-vselennaya-360z.jpg" className="rounded-lg" />
                </div>
                <div className="w-1/4 m-1 p-1">
                    <img src="https://img.fonwall.ru/o/1c/kosmos-planety-vselennaya-360z.jpg" className="rounded-lg" />
                </div>
                <div className="w-1/4 m-1 p-1">
                    <img src="https://img.fonwall.ru/o/1c/kosmos-planety-vselennaya-360z.jpg" className="rounded-lg" />
                </div>
                <div className="w-1/4 m-1 p-1">
                    <img src="https://img.fonwall.ru/o/1c/kosmos-planety-vselennaya-360z.jpg" className="rounded-lg" />
                </div>
                <div className="w-1/4 m-1 p-1">
                    <img src="https://img.fonwall.ru/o/1c/kosmos-planety-vselennaya-360z.jpg" className="rounded-lg" />
                </div>
                <div className="w-1/4 m-1 p-1">
                    <img src="https://img.fonwall.ru/o/1c/kosmos-planety-vselennaya-360z.jpg" className="rounded-lg" />
                </div>
                <div className="w-1/4 m-1 p-1">
                    <img src="https://img.fonwall.ru/o/1c/kosmos-planety-vselennaya-360z.jpg" className="rounded-lg" />
                </div>
                <div className="w-1/4 m-1 p-1">
                    <img src="https://img.fonwall.ru/o/1c/kosmos-planety-vselennaya-360z.jpg" className="rounded-lg" />
                </div>
                <div className="w-1/4 m-1 p-1">
                    <img src="https://img.fonwall.ru/o/1c/kosmos-planety-vselennaya-360z.jpg" className="rounded-lg" />
                </div>
            </div>
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="hidden sm:w-1/4 m-1 p-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                            <span className="font-medium">97</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <button
                                value="previous"
                                onClick={() => setCurrentActivePageNumber(prevState => (prevState - 1))}
                                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                            {pages.map(element => (
                                <button
                                    onClick={pageClickFunction}
                                    key={element}
                                    value={element}
                                    className={element == currentActivePageNumber ? activePageCss : nonActiveClassCss}
                                >
                                    {element}
                                </button>
                            ))}

                            <button
                                value="next"
                                onClick={() => setCurrentActivePageNumber(prevState => (prevState + 1))}
                                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}


const PagenationTableInModal = () => {
    return (
        <div
            className="justify-center items-center w-screen flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none"
        >
            <div className="relative w-11/12 h-11/12 my-6 mx-auto">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Error in the uploaded file
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                            </span>
                        </button>
                    </div>
                    {/*body*/}
                    <div className="overflow-y-scroll">
                    <PagenationTable />
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PagenationTableInModal;