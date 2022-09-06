import React from 'react'

function InterPro() {
    return (
        <div>
            {/* <div className='grid place-items-center' style={{ width: '200px', border: '12px solid red' }}>
                <h1>InterPro</h1>
                <div>
                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Input V2F</label>
                    <textarea id="message" rows="4" class="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your sequence"></textarea>
                </div>
            </div> */}





            <div>
                <div className="my- py-5">
                    <section className="mt-10 flex flex-col items-center justify-center">
                        <div>
                            <div className="bg-white"
                                style={{
                                    width: "90rem",
                                    background: "1px solid red"
                                }}
                            >
                                <div className="m-28">
                                    <div>
                                        <label for="message" class=" py-2 block mb-2  font-medium text-gray-900 dark:text-gray-400">Input V2F</label>
                                        <textarea id="message" rows="4" class=" w-full  block text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your sequence"></textarea>
                                    </div>
                                    <div>
                                        <div class="flex ">
                                            <div class="mb-3 w-96">
                                                <label for="formFile" class="mx-2 form-label inline-block mb-2 text-gray-700">or upload file</label>
                                                <input class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-outm-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" />
                                            </div>
                                        </div>
                                    </div>

                                    <button>Submit</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default InterPro