import React, {useState} from 'react';
import { Slider, Input } from '@material-ui/core';
import {audio, changeAllVolume} from '../redux/actions'
import {useDispatch} from 'react-redux'
import {getOscillators, getPercent} from '../redux/selectors'
import {useSelector} from 'react-redux'
import OscVolume from './OscVolume';

function MasterVol({instrument}){
    const oscData = useSelector(getOscillators);
    const percent = useSelector(getPercent);
    const dispatch = useDispatch();
    const [vol, setVol] = useState(0);

    function stopOsc(i){
        oscData[i].osc.stop();
        oscData[i].osc.disconnect();
        const removeOsc = audio("undefined", oscData[i].id );
        dispatch(removeOsc);
    }

    function playOsc(i, v){
        var ctxs = new AudioContext();
        var osc = ctxs.createOscillator();
        var gainNode = ctxs.createGain();
        osc.connect(gainNode);
        gainNode.connect(ctxs.destination)
        if(oscData[i].instrument === 1){
            gainNode.gain.value = -1 + ((oscData[i].vol - oscData[i].masterVol + v) +1) * (percent/100);
        }else{
            gainNode.gain.value = -1 + ((oscData[i].vol - oscData[i].masterVol + v ) +1) *  ((100 - percent)/100);
        }
        osc.frequency.value = oscData[i].freq;
        osc.type = 'sine';
        osc.connect(ctxs.destination);
        osc.start();
        const addOsc = audio(osc, oscData[i].id );
        dispatch(addOsc);
    }

    function playNewAudio(v){
        for(var i = 0; i < oscData.length; i++){
            if(oscData[i].instrument === instrument){
                stopOsc(i);
                playOsc(i,v);
            }
            
        } 
    }

    return(
        <div>
           Master Volume: {vol}
            <Slider
            value={vol}
            step={.001}
            min={-1}
            max={1}
            valueLabelDisplay="auto"
            onChange={(event, v) => {
                setVol(v);
                const changeVol= changeAllVolume(Number(v), instrument);
                dispatch(changeVol);
                if(oscData[0].osc !== "undefined"){
                    playNewAudio(v);
                }
            }}
            />  
        </div>
    )

}
export default MasterVol;