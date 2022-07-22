import React from 'react'

function FindID() {
  return (
    <div>
      <div className='m-5'>

        <h1 className='text-center text-7xl font-sans'>Forget ID</h1>
        <section className="mt-10 flex flex-col items-center ">
          <div>
            <label className='mx-5  text-4xl' htmlFor="FindID">Enter Email:</label>
            <input
              type="text"
              id="FindID"
              name="findid"
              className={
                // (checkUserId ? " border-red-400 " : "  ") +
                "px-4 py-4 text-blueGray-600 relative bg-white rounded border border-gray-400 outline-none focus:outline-none focus:ring"
              }
            />
          </div>
          <div className='rounded-sm'>
            <button type='submit' className='text-white font-bold py-6 px-6 rounded bg-NccBlue-700 mt-8'>Find ID</button>
          </div>
        </section>

      </div>
    </div>
  )
}

export default FindID