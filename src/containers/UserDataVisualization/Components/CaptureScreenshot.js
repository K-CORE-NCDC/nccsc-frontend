import html2canvas from 'html2canvas';


function saveAs(uri, filename) {
    var link = document.createElement('a');
    link.className = 'watermark';
    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;
        //Firefox requires the link to be in the body
        document.body.appendChild(link);
        //simulate click
        link.click();
        //remove the link when done
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
}

function CaptureScreenshot(tab) {
    if (tab === "heatmap") {
        html2canvas(document.querySelector('#canvas')).then(function (canvas) {
            saveAs(canvas.toDataURL(), 'heatmap.png');
        });
    }

}
export default CaptureScreenshot