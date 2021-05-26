import React from 'react';
import { Slider, Input } from '@material-ui/core';
import {changeFrequency} from '../redux/actions'
import {useDispatch} from 'react-redux'


function MasterFreq({freq, instrument}){
    const dispatch = useDispatch();
    return(
        <div>
           Master Frequency:
           <Input
            style={{
                width: "85px",
                padding: "0px 10px",
                display: "inline-block",
                appearance: "textfield",
                fontFamily: 'Source Sans Pro'
            }}
            
            value={freq}
            margin="dense"
            onChange={(event) => {
                if(event.target.value > 1000) event.target.value = 1000;
                const changeFreq = changeFrequency(Number(event.target.value), instrument);
                dispatch(changeFreq);
            }}
            inputProps={{
              min: 0,
              max: 1000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />

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