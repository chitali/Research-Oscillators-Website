/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import React from 'react';
import { Slider } from '@material-ui/core';
import {changeVolume,audio} from '../redux/actions'
import {useDispatch} from 'react-redux'
import {getPercent} from '../redux/selectors'
import {useSelector} from 'react-redux';

function OscVolume({freq, vol, id, osc, instrument}){
    const dispatch = useDispatch();
    const percent = useSelector(getPercent);
    return(
        <div css= {css` text-align:center; margin: auto; padding-right: 5px;`}>
            <div>{freq}</div>
            <div css= {css`height: 200px;`}>
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
                    if(osc !== "undefined"){
                        osc.stop();
                        osc.disconnect();
                        const removeOsc = audio("undefined", id);
                        dispatch(removeOsc);

                        var ctxs = new AudioContext();
                        var newOsc = ctxs.createOscillator();
                        var gainNode = ctxs.createGain();
                        newOsc.connect(gainNode);
                        gainNode.connect(ctxs.destination)
                        if(instrument === 1)
                        gainNode.gain.value = -1 + (v +1) * (percent/100);
                        else{
                            gainNode.gain.value = -1 + (v +1) *  ((100 - percent)/100);
                        }
                        newOsc.frequency.value = freq;
                        newOsc.type = 'sine';
                        newOsc.connect(ctxs.destination);
                        newOsc.start();
                        const addOsc = audio(newOsc, id );
                        dispatch(addOsc); 
                    }
                }}
                /> 
            </div>
            <div css= {css`width: auto; justify-content:center; text-align:center; color:#d73f09;`}>{parseFloat(vol.toFixed(3))}</div>
        </div>
    )

}
export default OscVolume;