import igv from 'igv';
import React, { useEffect } from 'react';

const Igv = React.forwardRef(({ width, data, watermarkCss }, ref) => {
  const loadIgv = (data) => {
    var doc = document.getElementById('igv-div');
    if (doc.hasChildNodes()) {
      document.getElementById('igv-div').innerHTML = '';
    }

    var igvDiv = document.getElementById('igv-div');

    const options = {
      genome: 'hg19',
      showNavigation: true,
      showSampleNames: true,
      tracks: [
        {
          name: 'Copy number',
          type: 'seg',
          displayMode: 'EXPANDED',
          features: data,
          order: 9, // Set the Z-index to 9

        }
      ]
    };

    igv.createBrowser(igvDiv, options).then(function () {});
  };
  useEffect(() => {
    if (data && data.length !== 0) {
      loadIgv(data);
    }
  }, [data]);

  return (
    <div ref={ref} className={watermarkCss + ''}>
      <div className="" id="igv-div" style={{ height: '500px', width: width + 'px' }}></div>
    </div>
  );
});

export default Igv;
