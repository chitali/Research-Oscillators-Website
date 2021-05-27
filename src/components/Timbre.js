/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import { Slider } from '@material-ui/core';
import {useState, useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {getOscillators, getPercent} from '../redux/selectors'
import {audio} from '../redux/actions'
import {useDispatch} from 'react-redux'
import {instrumentPercent} from '../redux/actions'

function Timbre(){
    const oscData = useSelector(getOscillators);
    var percent = useSelector(getPercent);
    const dispatch = useDispatch();
    var timeout;

    function stopOsc(i){
        oscData[i].osc.stop();
        oscData[i].osc.disconnect();
        const removeOsc = audio("undefined", oscData[i].id );
        dispatch(removeOsc);
    }

    function playOsc(i, p){
        var ctxs = new AudioContext();
        var osc = ctxs.createOscillator();
        var gainNode = ctxs.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctxs.destination)
        if(oscData[i].instrument === 1){
            gainNode.gain.value = -1 + (oscData[i].vol +1) * (p/100);
        }else{
            gainNode.gain.value = -1 + (oscData[i].vol +1) *  ((100 - p)/100);
        }
        osc.frequency.value = oscData[i].freq;
        osc.type = 'sine';
        osc.connect(ctxs.destination);
        osc.start();
        const addOsc = audio(osc, oscData[i].id );
        dispatch(addOsc);
    }
    
    function playAudio(){
       for(var i = 0; i < oscData.length; i++){
           if(oscData[i].osc !== "undefined"){
              stopOsc(i); 
           }else{
               playOsc(i, percent);
           }
       }
    }

    function sliderChangeAudio(per){
        for(var i = 0; i < oscData.length; i++){
            stopOsc(i);
            playOsc(i, per);
        }
    }

    return(
        <div css = {css`
            button{
                border: 2px solid #3f51b5;
                height: 32px;
                width: 90%;
                border-radius: 2px;
                background-color:#eeee;
                color:#3f51b5;
                text-decoration: none;
            }
            button:hover{
                background-color:#8f9ce3;
                border: 2px solid #3f51b5;
                color:white;
            }; 
        `}>
            <p css= {css`float:left;`}>Instrument 1:  </p>
            <p css= {css`float:left; margin-left: 7px; color:#3f51b5; font-weight:400;`}>{percent}%</p>
            <p css= {css`float:right; margin-left: 7px; color:#3f51b5; font-weight:400;`}>{100-percent}%</p>
            <p css= {css`float:right;`}>Instrument 2: </p>
            <Slider
            value={percent}
            min={0}
            max={100}
            valueLabelDisplay="auto"
            onChange={(event, v) => {
                const changePercent = instrumentPercent(v);
                dispatch(changePercent);                
                if(oscData[0].osc !== "undefined"){
                    sliderChangeAudio(v);
                }
            }}
            /> 
        {oscData[0].osc !== "undefined" ? <div css= {css`text-align:center;`}><button onClick={playAudio}>Pause</button></div> : <div css= {css`text-align:center;`}><button onClick={playAudio}>Play</button></div> } 
        </div>
    )

}
export default Timbre;