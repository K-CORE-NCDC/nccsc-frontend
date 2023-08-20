/* This example requires Tailwind CSS v2.0+ */
import React from 'react';

export default function ExampleUserTable({ tableData }) {
  return (
    <>
      {tableData && (
        <div className="flex justify-center items-center ">
          <div className="-my-2 overflow-scroll sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-scroll border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {tableData['headers'].map((name) => (
                        <th
                          key={name}
                          scope="col"
                          className="px-6 py-3 text-center text-lg font-medium text-black uppercase tracking-wider"
                        >
                          {name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[...tableData['fault'], ...tableData['normal']].map((tableRows, index) => (
                      <tr key={`${index}-${Math.random()}`}>
                        {tableRows.map((cell) =>
                          cell['status'] === true ? (
                            <td key={`${cell.data} ${Math.random()}`}>
                              <div>
                                <div className="ml-4">
                                  <div className="text-center text-lg font-medium tracking-wider text-gray-900">
                                    {cell.data}
                                  </div>
                                </div>
                              </div>
                            </td>
                          ) : (
                            <td>
                              <div>
                                <div className="ml-4">
                                  <div className="text-center text-lg bg-red-200 font-medium tracking-wider text-gray-900">
                                    {cell.data}
                                  </div>
                                </div>
                              </div>
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
