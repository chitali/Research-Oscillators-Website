import React from 'react';
import { Slider } from '@material-ui/core';
import {changeFrequency} from '../redux/actions'
import {useDispatch} from 'react-redux'


function MasterFreq({freq, instrument}){
    const dispatch = useDispatch();
    return(
        <div>
           Master Frequency: {freq} 
            <Slider
            value={freq}
            min={0}
            max={1000}
            valueLabelDisplay="auto"
            onChange={(event, v) => {
                const changeFreq = changeFrequency(v, instrument);
                dispatch(changeFreq);
            }}
            />  
        </div>
    )

}
export default MasterFreq;