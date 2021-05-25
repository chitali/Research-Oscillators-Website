/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import { Slider } from '@material-ui/core';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {getOscillators} from '../redux/selectors'
import {audio} from '../redux/actions'
import {useDispatch} from 'react-redux'

function Timbre(){
    const oscData = useSelector(getOscillators);
    const [percent, setPercent] = useState(50);
    const dispatch = useDispatch();

    function playAudio(){
       for(var i = 0; i < oscData.length; i++){
           console.log(oscData[i].osc)
           if(oscData[i].osc !== "undefined"){
                oscData[i].osc.stop();
                oscData[i].osc.disconnect();
                const removeOsc = audio("undefined", oscData[i].id );
                dispatch(removeOsc);
           }else{
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
                osc.frequency.value = oscData[i].freq;
                osc.type = 'sine';
                osc.connect(ctxs.destination);
                osc.start();
                const addOsc = audio(osc, oscData[i].id );
                dispatch(addOsc); 
           }
       }
    }

    return(
        <div>
            <p css= {css`float:left;`}>Instrument 1:  </p>
            <p css= {css`float:left; margin-left: 7px; color:#3f51b5; font-weight:400;`}>{percent}%</p>
            <p css= {css`float:right; margin-left: 7px; color:#3f51b5; font-weight:400;`}>{100-percent}%</p>
            <p css= {css`float:right;`}>Instrument 2: </p>
            <Slider
            value={percent}
            min={0}
            max={100}
            valueLabelDisplay="auto"
            onChange={(event, v) => {setPercent(v)}}
            /> 
        {oscData[0].osc != "undefined" ? <div css= {css`text-align:center;`}><button onClick={playAudio}>Pause</button></div> : <div css= {css`text-align:center;`}><button onClick={playAudio}>Play</button></div> } 
        </div>
    )

}
export default Timbre;