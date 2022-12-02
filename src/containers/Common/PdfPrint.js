import React, { useEffect } from 'react'
import { jsPDF } from 'jspdf';
import { sankeyImageData,sendReportData} from '../../actions/api_actions'
import html2canvas from 'html2canvas';
import NccLogo1 from "../../assets/images/logoncc.png";
import NccLogo2 from "../../assets/images/logo.png";
import { useSelector, useDispatch } from "react-redux";
function PdfPrint({ isReportClicked, isReportClickedFunction }) {
    const dispatch = useDispatch()
    const reportData = useSelector(state => state.dataVisualizationReducer.rniData)
    const GeneMutationData = useSelector((data) => data.dataVisualizationReducer.rniData);
    useEffect(() => {

        console.log(isReportClicked)
        let className = `.printpdf`, count = 0
        if (isReportClicked === true) {
            className = `sanky_chart_pdf${count}`
            while (document.querySelector(`.${className}`) !== null) {
                className = `sanky_chart_pdf${count}`
                const abcd = document.querySelector(`.${className}`)
                count++;
            }
            DownloadPDF(count)
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
        if (document.getElementById("printpdf")) {
            
            var page = document.getElementById("printpdf")
            
            // for (const each of page.children) {
            //     console.log("each", each);
            // }
            var doc = new jsPDF('p', 'pt', 'a4');

            doc.html(document.getElementById('printpdf'), {
                callback: function (pdf) {
                    // console.log(pdf)
                    pdf.save('DOC.pdf');
                },

            })
            // doc.save('t.pdf')
        }
        // console.log(page)


    }


    let DownloadPDF = async () => {
        let GeneListSanky = []
        for (let i in reportData['response_sanky_data']) {
            if (reportData['response_sanky_data'][i]['gene_data'].length <= 0) {
              continue
            }
            GeneListSanky.push(i)
          }
          console.log(GeneListSanky);
          console.log(GeneMutationData);
          let GeneandMutationList = {}
          
        let className = `printpdf`, count = 0
        while (document.querySelector(`.${className}`) !== null) {
            className = `sanky_chart_pdf${count}`
            count++;
        }
        // console.log("out of while loop", count);

        const captureElement1 = document.querySelector('.printpdf')
        const pdf = new jsPDF('p', 'px', 'a4', true);
        var width = pdf.internal.pageSize.getWidth();
        var height = pdf.internal.pageSize.getHeight();
        pdf.page = 1
        

        function footer() {
            pdf.text(500, 800, 'page ' + pdf.page); //print number bottom right
            pdf.page++;
        };
        if(GeneListSanky.length > 0){
            if(GeneMutationData && "variant_info" in GeneMutationData  ){
              for(let i=0; i<GeneListSanky.length; i++){
                console.log("sdsdfds",GeneMutationData["variant_info"][GeneListSanky[i]]);
                GeneandMutationList[GeneListSanky[i]] = GeneMutationData["variant_info"][GeneListSanky[i]]
              }
            }
          }
        await html2canvas(captureElement1).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg');
            var imgWidth = 500; 
            var pageHeight = 295; 
            var imgHeight = canvas.height * imgWidth / canvas.width;
            var heightLeft = imgHeight;
            var position = 0; 
            pdf.addPage();
            // pdf.addImage(imgData, 'JPEG', 20, 0, 500, 0, undefined, 'FAST');
            pdf.addImage(imgData, 'JPEG', 20, position, imgWidth, imgHeight,undefined,'FAST');
            footer()
            heightLeft -= pageHeight;
            while (heightLeft >= 0) {
                position += heightLeft - imgHeight; // top padding for other pages
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 20, position, imgWidth, imgHeight,undefined,'FAST');
                footer()
                heightLeft -= pageHeight;
            }
            pdf.addPage();

        });
      let imageDataList = {}
        for (let i = 0; i < count - 1; i++) {
            // let element = document.querySelector(`.sanky_chart_pdf${i}`)
            let element = document.querySelector(`#chart${i}`)
            await html2canvas(element).then(canvas => {
                const imgData = canvas.toDataURL('image/png',1.0);
                // const imgData = canvas.toDataURL({
                //     format: 'png',
                //     left: 300,
                //     top: 250,
                //     width: 400,
                //     height: 800
                //     // width: 200,
                //     // height: 150
                // });
                
                // imageDataList.push({"imgData":imgData, "geneName":element.getAttribute('name')})
                imageDataList[element.getAttribute('name')] = imgData
                var imgWidth = 550; 
                var pageHeight = 295; 
                var imgHeight = canvas.height * imgWidth / canvas.width;
                var heightLeft = imgHeight;
                var position = 0; 
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 20, position, imgWidth, imgHeight,undefined,'FAST');
                footer()
                heightLeft -= pageHeight;
                while (heightLeft >= 0) {
                    position += heightLeft - imgHeight; // top padding for other pages
                    pdf.addPage();
                    pdf.addImage(imgData, 'JPEG', 20, position, imgWidth, imgHeight,undefined,'FAST');
                    
                    footer()
                    heightLeft -= pageHeight;
                }
                pdf.addImage(imgData, 'JPEG', 0, 0, 550, 0, undefined, 'FAST');
                pdf.addPage();
            });
        }
        dispatch(sankeyImageData(imageDataList))
        pdf.save("Report.pdf");
        dispatch(sendReportData({"GeneandMutationList":GeneandMutationList}))
    }

    return (
        <div>
            <button
                className='hover:bg-blue-700 text-white font-bold py-6 px-6 float-left rounded bg-NccBlue-700'
                // onClick={(e)=>printpdf(e)}
                onClick={(e) => DownloadPDF(e)}
            >
                Download Report
            </button>
        </div>
    )
}

export default PdfPrint