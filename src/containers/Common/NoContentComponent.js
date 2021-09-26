import React from 'react';

const NoContentMessage = () => {
    return (
        <div className="m-10 bg-red-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p className="font-bold">No Data Found</p>
            <p>There are no matching fields for selected filters. Change the filters and try again</p>
        </div>
    );
}

export default NoContentMessage;
