/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from 'react';
import { Slider } from '@material-ui/core';
import {changeVolume} from '../redux/actions'
import {useDispatch} from 'react-redux'


function OscVolume({freq, vol, id}){
    const dispatch = useDispatch();
    return(
        <div>
            <div css= {css`width: auto; justify-content:center; text-align:center;`}>{freq}</div>
            <div css= {css`height: 200px; width: 80px; justify-content:center; text-align:center;`}>
                <Slider
                value={vol}
                step={.0001}
                min={-1}
                max={1}
                orientation="vertical"
                valueLabelDisplay="auto"
                onChange={(event, v) => {
                    const changeVol = changeVolume(v, id);
                    dispatch(changeVol);
                }}
                /> 
            </div>
            <div css= {css`width: auto; justify-content:center; text-align:center; color:#3f51b5;`}>{vol}</div>
        </div>
    )

}
export default OscVolume;