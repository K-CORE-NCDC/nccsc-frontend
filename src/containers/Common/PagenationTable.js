import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import config from '../../config.js'

const activePageCss = "z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-md font-medium"
const nonActiveClassCss = "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-md font-medium"


function PagenationTable({ imageData }) {
    const [currentActivePageNumber, setCurrentActivePageNumber] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [activeDisplayImagesContent, setActiveDisplayImagesContent] = useState([])
    const [pagenationPageNos, setPagenationPageNos] = useState([])
    const [isDataFound, setIsDataFound] = useState(false)
    const [totalImagesCount, setTotalImagesCount] = useState(0)


    const pageClickFunction = (event) => {
        const pageNumberClicked = parseInt(event.target.value)
        setCurrentActivePageNumber(pageNumberClicked)
    }

    const generatePagesNumbersForCount = () => {
        let cP = currentActivePageNumber
        let pageNumbers = []
        if (totalPages <= 5) {
            for (let i = 0; i < totalPages; i++) {
                pageNumbers.push(i + 1)
            }
        } else if ((cP === 1) || (cP === totalPages)) {
            pageNumbers = [1, 2, 3, totalPages - 2, totalPages - 1, totalPages]
        } else if ((cP === 2) || (cP === (totalPages - 1))) {
            pageNumbers = [1, 2, 3, totalPages - 2, totalPages - 1, totalPages]
        } else {
            pageNumbers = [1, cP - 1, cP, cP + 1, totalPages - 1, totalPages]
        }
        setPagenationPageNos(pageNumbers)
    }

    useEffect(() => {
        if (imageData && imageData.length > 0) {
            setIsDataFound(true)
            const imagesCount = imageData.length
            setTotalImagesCount(imagesCount)
            if (imagesCount <= 20) {
                setActiveDisplayImagesContent(imageData)
            }
            setTotalPages(parseInt(imagesCount / 10))
            setCurrentActivePageNumber(1)
        } else {
            setIsDataFound(false)
        }
    }, [imageData])

    useEffect(() => {
        const sliceFrom = (currentActivePageNumber - 1) * 10
        const sliceTo = currentActivePageNumber * 10
        console.log(sliceFrom, sliceTo, totalImagesCount);
        if (currentActivePageNumber > 0) {
            console.log(imageData.slice(sliceFrom, sliceTo))
            generatePagesNumbersForCount()
            if (sliceTo > totalImagesCount) {
                setActiveDisplayImagesContent(sliceFrom)
            } else {
                setActiveDisplayImagesContent(imageData.slice(sliceFrom, sliceTo))
            }
        }

    }, [currentActivePageNumber])

    return (
        <>

            {isDataFound ? <div >
                <div className="grid max-auto grid-cols-5 gap-4 p-6 overflow-y-scroll oncoimages_height">
                    {activeDisplayImagesContent.map(e => {
                        return <a key={e} href={config['auth']+e} target="_blank">
                            <img className='w-full block rounded' src={config['auth']+e} />
                            <h1 className='text-3xl p-6'>{e.split('/').at(-1)}</h1>
                          </a>
                    })}
                </div>
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="hidden w-full m-1 p-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-md text-gray-700">
                                Showing <span className="font-medium">{(currentActivePageNumber - 1) * 10}</span> to <span className="font-medium">{currentActivePageNumber * 10}</span> of{' '}
                                <span className="font-medium">{totalImagesCount}</span> results
                            </p>
                        </div>
                        <div>
                            <nav className="w-full inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <button
                                    value="previous"
                                    disabled={currentActivePageNumber === 1}
                                    onClick={() => setCurrentActivePageNumber(prevState => (prevState - 1))}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                                {pagenationPageNos.map(element => (
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
                                    disabled={currentActivePageNumber === totalPages}
                                    onClick={() => setCurrentActivePageNumber(prevState => (prevState + 1))}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div> :
                <div>
                    No Images Found
                </div>
            }
        </>
    )
}


const PagenationTableComponent = ({ closeShowOncoImages, imageData }) => {
    // console.log(imageData);
    return (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 h-full w-full z-50'>
            <div className="relative w-11/12 h-11/12 my-10 mx-auto">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Clinical Images
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
                    <div className=''>
                        <PagenationTable imageData={imageData} />
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                            onClick={closeShowOncoImages}
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

export default PagenationTableComponent;
