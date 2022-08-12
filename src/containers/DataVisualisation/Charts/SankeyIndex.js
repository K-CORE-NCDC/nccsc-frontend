import React,{ useState, useEffect } from 'react'
import Sankeyd3 from './Sankeyd3'
import Sankey from './Sankey'
import { useSelector,useDispatch } from "react-redux";
import {getSankeyJson} from '../../../actions/api_actions'
function SankeyIndex({...props}) {
    const d = {...props}
    const [initalProps, setInitialProps] = useState({})
    const reportData = useSelector(state => state.dataVisualizationReducer.rniData)
    const sankeyJson = useSelector(state => state.dataVisualizationReducer.SankeyJson)
    const [nodes,setNodes] = useState([])
    const [links,setLinks] = useState([])
    const [width,setWidth] = useState(960)
    const [gene,setGene] = useState('')
    const dispatch = useDispatch()
    const [render,setRender] = useState(false)

    useEffect(()=>{
        console.log(initalProps);
        if(initalProps && 'data' in initalProps){
            let d = initalProps
            let variants = reportData.variant_info
            
            let gene = d['data']['gene']
            let inputData = {
                'gene':gene,
                'mutation':variants[gene]
            }
            setGene(gene)
            setNodes([])
            setLinks([])
            setRender(true)
            dispatch(getSankeyJson('POST',  inputData ))
        }
    },[initalProps])

    useEffect(()=>{
        if(d){
            setInitialProps(d)
        }
    },[])
    
    useEffect(()=>{
        if(sankeyJson){
            let x = document.getElementById('main_chart_cont').offsetWidth
            setWidth(x)
            let n = sankeyJson['nodes']
            let l = sankeyJson['links']
            setNodes(n)
            setLinks(l)
        }
    },[sankeyJson])

    return (
        
        <div id="main_chart_cont">
            {gene && nodes.length>0 && links.length>0 &&
                <>
                    <Sankeyd3></Sankeyd3>
                    <Sankey gene={gene} width={width} exampleNodes={nodes} exampleLinks={links}></Sankey>
                    <p>Double Click To Expand</p>
                </>
            }
        </div>
    )
}

export default SankeyIndex