
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React from 'react'

function PdfPrint({ showPdfReportTablefunction }) {


    let printpdf = () => {

        let count = 0;
        showPdfReportTablefunction(true)
        checkElement('.printpdf') && checkElement('#sanky_chart_pdf1') && checkElement('#sanky_chart_pdf2')


        function rafAsync() {
            return new Promise(resolve => {
                requestAnimationFrame(resolve);
            });
        }

        function checkElement(selector) {
            if (document.querySelector(selector) === null) {
                return rafAsync().then(() => checkElement(selector));
            } else {
                if (count < 2) {
                    count++;
                }
                else {
                    downloadPDF()
                }
                return Promise.resolve(true);
            }
        }


    }

    let downloadPDF = async () => {
        const captureElement1 = document.querySelector('.printpdf')
        const captureElement2 = document.querySelector('#sanky_chart_pdf1')
        const captureElement3 = document.querySelector('#sanky_chart_pdf2')
        const pdf = new jsPDF('p', 'pt', 'a4', false);



        await html2canvas(captureElement1).then(canvas => {
            // document.body.appendChild(canvas);  // if you want see your screenshot in body.
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 20, 0, 550, 0, undefined, false);

        });
        await html2canvas(captureElement2).then(canvas => {
            // document.body.appendChild(canvas);  // if you want see your screenshot in body.
            const imgData = canvas.toDataURL('image/png');
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 20, 0, 550, 0, undefined, false);

        });
        await html2canvas(captureElement3).then(canvas => {
            // document.body.appendChild(canvas);  // if you want see your screenshot in body.
            const imgData = canvas.toDataURL('image/png');
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 20, 0, 550, 0, undefined, false);

        });
        pdf.save("Report.pdf");
    }

    return (
        <div>
            <button className='hover:bg-blue-700 text-white font-bold py-6 px-6 float-left rounded bg-NccBlue-700' onClick={printpdf}>Download Report</button>
        </div>
    )
}

export default PdfPrint