import React, { useState, useEffect } from 'react'

import {
    vcfmaf
} from "../../actions/api_actions";
import { useSelector, useDispatch } from "react-redux";
import LoaderCmp from '../Common/Loader'

function Blast(){
    return (
        <div>
            <div>
                <iframe title='blast search' src='http://3.144.127.180:4567/' width={"100%"} height={"600px"}></iframe>
            </div>
        </div>
    )
}
export default Blast