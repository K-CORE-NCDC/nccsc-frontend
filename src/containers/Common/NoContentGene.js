import React from 'react';
import { FormattedMessage } from 'react-intl';
const NoContentGene = () => {
  return (
    <div className="m-10 bg-red-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
      <p className="font-bold">No Data Found</p>
      <p>
        <FormattedMessage
          id="NoGene"
          defaultMessage="There is no related drug information for the selected gene"
        />
      </p>
    </div>
  );
};

export default NoContentGene;
