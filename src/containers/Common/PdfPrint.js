import React, { useEffect } from 'react'
import {jsPDF} from 'jspdf';
import html2canvas from 'html2canvas';

function PdfPrint({ isReportClicked, isReportClickedFunction }) {

    useEffect(() => {
        
        console.log(isReportClicked)
        let className = `.printpdf`, count = 0
        if (isReportClicked === true) {
            className = `sanky_chart_pdf${count}`
            while(document.querySelector(`.${className}`) !== null){
                className = `sanky_chart_pdf${count}`
                const abcd = document.querySelector(`.${className}`)
                count++;
            }
            downloadPDF(count)
        }
    }, [isReportClicked])

    const printpdf = (e) => {
        // downloadPDF(0)
        // if (isReportClicked === true) {
        //     className = `sanky_chart_pdf${count}`
        //     while(document.querySelector(`.${className}`) !== null){
        //         className = `sanky_chart_pdf${count}`
        //         const abcd = document.querySelector(`.${className}`)
        //         count++;
        //     }
        //     downloadPDF(count)
        // }
        // isReportClickedFunction(true)
        if(document.getElementById("printpdf")){
        //     console.log('print')
        var page = document.getElementById("printpdf")
        // console.log("page.style",page.style);
            for (const each of page.children) {
                console.log("each",each);
            }
            var doc = new jsPDF('p','pt','a4');
            
            doc.html(document.getElementById('printpdf'), {
                callback: function (pdf) {
                    console.log(pdf)
                    pdf.save('DOC.pdf');
                },
                
            })
            // doc.save('t.pdf')
        }
        // console.log(page)
        
        
    }
    

    let downloadPDF = async () => {

       let className = `printpdf`, count=0
            while(document.querySelector(`.${className}`) !== null){
                className = `sanky_chart_pdf${count}`
                count++;
            }
            console.log("out of while loop",count);

        const captureElement1 = document.querySelector('.printpdf')
        const pdf = new jsPDF('p', 'pt', 'a4', false);

        await html2canvas(captureElement1).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 20, 0, 550, 0, undefined, false);
            pdf.addPage();
        });

        for(let i=0; i < count-1;i++){
            let element = document.querySelector(`.sanky_chart_pdf${i}` )
            await html2canvas(element).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                pdf.addImage(imgData, 'PNG', 20, 0, 550, 0, undefined, false);
                pdf.addPage();
            });
        }
        pdf.save("Report.pdf");
    }

    return (
        <div>
            <button 
                className='hover:bg-blue-700 text-white font-bold py-6 px-6 float-left rounded bg-NccBlue-700' 
                // onClick={(e)=>printpdf(e)}
                onClick={(e)=>downloadPDF(e)}
                >
                    Download Report
            </button>
        </div>
    )
}

export default PdfPrint