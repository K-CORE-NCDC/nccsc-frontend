import React, { useEffect } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function PdfPrint({ isReportClicked, isReportClickedFunction }) {

    useEffect(() => {
        // if (isReportClicked === true) {
        //  console.log("inside report CLicked");

        //     let count = 0;
        //     checkElement('.printpdf') && checkElement('.sanky_chart_pdf1') && checkElement('.sanky_chart_pdf2')

        //     function rafAsync() {
        //         return new Promise(resolve => {
        //             requestAnimationFrame(resolve);
        //         });
        //     }

        //     function checkElement(selector) {
        //         if (document.querySelector(selector) === null) {
        //             return rafAsync().then(() => checkElement(selector));
        //         } else {
        //             if (count < 2) {
        //                 count++;
        //             }
        //             else {

        //                 downloadPDF()

        //             }
        //             return Promise.resolve(true);
        //         }
        //     }
        // }

        let className = `.printpdf`, count = 0

        if (isReportClicked === true) {
            className = `sanky_chart_pdf${count}`
            while(document.querySelector(`.${className}`) !== null){
                className = `sanky_chart_pdf${count}`
                console.log("count is",count);
                console.log("className is",className);
                const abcd = document.querySelector(`.${className}`)
                console.log("abcd", abcd);
                count++;
            
            }
            downloadPDF(count)
        }

    }, [isReportClicked])



    let printpdf = () => {


        isReportClickedFunction(true)
    }

    let downloadPDF = async (count) => {


        const captureElement1 = document.querySelector('.printpdf')
        // const captureElement2 = document.querySelector('.sanky_chart_pdf1')
        // const captureElement3 = document.querySelector('.sanky_chart_pdf2')

        const pdf = new jsPDF('p', 'pt', 'a4', false);

        await html2canvas(captureElement1).then(canvas => {
            // document.body.appendChild(canvas);  // if you want see your screenshot in body.;
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 20, 0, 550, 0, undefined, false);
            // pdf.autoTable({ html: ".printpdf", startY: pdf.autoTable.previous.finalY + 1115 });
            pdf.addPage();

        });
        for(let i=0; i < count-1;i++){
            let element = document.querySelector(`.sanky_chart_pdf${i}` )
            console.log("element",element);
            await html2canvas(element).then(canvas => {
                // document.body.appendChild(canvas);  // if you want see your screenshot in body.
                const imgData = canvas.toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', 20, 0, 550, 0, undefined, false);
                // pdf.autoTable({ html: ".printpdf", startY: pdf.autoTable.previous.finalY + 1115 });
                pdf.addPage();
    
            });
        }
        // await html2canvas(captureElement2).then(canvas => {
        //     // document.body.appendChild(canvas);  // if you want see your screenshot in body.
        //     const imgData = canvas.toDataURL('image/png');
        //     pdf.addPage();
        //     pdf.addImage(imgData, 'PNG', 20, 0, 550, 0, undefined, false);

        // });
        // await html2canvas(captureElement3).then(canvas => {
        //     // document.body.appendChild(canvas);  // if you want see your screenshot in body.
        //     const imgData = canvas.toDataURL('image/png');
        //     pdf.addPage();
        //     pdf.addImage(imgData, 'PNG', 20, 0, 550, 0, undefined, false);

        // });
        pdf.save("Report.pdf");
    }

    return (
        <div>
            <button className='hover:bg-blue-700 text-white font-bold py-6 px-6 float-left rounded bg-NccBlue-700' onClick={printpdf}>Download Report</button>
        </div>
    )
}

export default PdfPrint