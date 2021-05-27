import React from 'react';
import { Slider, Input } from '@material-ui/core';
import {changeFrequency, audio} from '../redux/actions'
import {useDispatch} from 'react-redux'
import {getOscillators, getPercent} from '../redux/selectors'
import {useSelector} from 'react-redux'

function MasterFreq({freq, instrument}){
    const oscData = useSelector(getOscillators);
    const percent = useSelector(getPercent);
    const dispatch = useDispatch();

    function stopOsc(i){
        oscData[i].osc.stop();
        oscData[i].osc.disconnect();
        const removeOsc = audio("undefined", oscData[i].id );
        dispatch(removeOsc);
    }

    function playOsc(i, f){
        var ctxs = new AudioContext();
        var osc = ctxs.createOscillator();
        var gainNode = ctxs.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctxs.destination)
        if(oscData[i].instrument === 1)
            gainNode.gain.value = -1 + (oscData[i].vol +1) * (percent/100);
        else{
            gainNode.gain.value = -1 + (oscData[i].vol +1) *  ((100 - percent)/100);
        }
        osc.frequency.value = f;
        osc.type = 'sine';
        osc.connect(ctxs.destination);
        osc.start();
        const addOsc = audio(osc, oscData[i].id );
        dispatch(addOsc);
    }

    function playNewAudio(f){
        var count = 1;
        for(var i = 0; i < oscData.length; i++){
            if(oscData[i].instrument === instrument){
                stopOsc(i);
                playOsc(i,f *count++);
            }
            
        } 
    }

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
                if(oscData[0].osc !== "undefined"){
                    playNewAudio(event.target.value);
                }
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
                if(oscData[0].osc !== "undefined"){
                    playNewAudio(v);
                }
            }}
            />  
        </div>
    )

}
export default MasterFreq;