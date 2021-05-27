/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {useSelector} from 'react-redux'
import OscVolume from './OscVolume'
import MasterFreq from './MasterFreq'
import MasterVol from './MasterVol'
import Timbre from './Timbre'
import {getOscillators, getPercent} from '../redux/selectors'
import {useDispatch} from 'react-redux'
import {initOscillators,removeOscillator,audio} from '../redux/actions'

function Instrument(){
    const oscData = useSelector(getOscillators);
    const percent = useSelector(getPercent);
    const dispatch = useDispatch();

    function addFrequency(instrument){
       for(var i = oscData.length-1; i>= 0; i--){
           if(oscData[i].instrument === instrument){
               var volume = ((1+oscData[i].vol)/2) -1;
               var newOsc = {
                "id":oscData[oscData.length-1].id +1,
                "freq": oscData[i].freq * 2,
                "vol": parseFloat(volume.toFixed(3)) + oscData[i].masterVol,
                "masterVol": oscData[i].masterVol,
                "osc": "undefined",
                "instrument": instrument
                }
                const addOsc = initOscillators(newOsc);
                dispatch(addOsc);
                if(oscData[0].osc !== "undefined"){
                    var ctxs = new AudioContext();
                    var osc = ctxs.createOscillator();
                    var gainNode = ctxs.createGain();
                    osc.connect(gainNode);
                    gainNode.connect(ctxs.destination)
                    if(instrument === 1)
                    gainNode.gain.value = -1 + (newOsc.vol +1) * (percent/100);
                    else{
                        gainNode.gain.value = -1 + (newOsc.vol +1) *  ((100 - percent)/100);
                    }
                    osc.frequency.value = newOsc.freq;
                    osc.type = 'sine';
                    osc.connect(ctxs.destination);
                    osc.start();
                    console.log("New", newOsc.id, "Freq:",osc.frequency.value, "Vol:", gainNode.gain.value);
                    const addAudio = audio(osc, newOsc.id );
                    dispatch(addAudio);  
                }
                return;
           } 
       } 
    }

    function removeFrequency(instrument){
        var count = 0;
        oscData.map(oscillator =>(
            oscillator.instrument === instrument && count++));
        if(count <= 1){
            alert("Need at least 1 Oscillator per Instrument");
            return;
        }        
        for(var i = oscData.length-1; i>= 0; i--){
            if(oscData[i].instrument === instrument){
                if(oscData[i].osc !== "undefined"){
                    oscData[i].osc.stop();
                    oscData[i].osc.disconnect();
                    const removeOsc = audio("undefined", oscData[i].id );
                    dispatch(removeOsc);
                }
                const removeOsc = removeOscillator(oscData[i].id);
                console.log("removeOsc: ", removeOsc);
                dispatch(removeOsc);
                return;
            } 
        } 
    }


    const instrumentContainer = css`
    background-color: #eeee;
    margin: 10px;
    width: calc(50% - 6em);
    padding: 20px;
    button{
      border: none;
      padding: 5px;
      background-color:#eeee;
      color:#3f51b5;
      text-decoration: none;
    }
    button:hover{
            color:black;
      } `;  
    return(
        <div css={css`
        display: flex;
        flex-wrap: wrap;
        max-width: 80em;
        width: calc(100% - 6em);
        margin: 0 auto;
        margin-top: 20px;
        justify-content: center;
        `}>
            <div css ={instrumentContainer}>
                <h2> Instrument 1</h2>
                <MasterFreq {...oscData[0]}/>
                <MasterVol instrument ={1} />
                <div> Frequencies</div>
                <div css={css`display:flex;flex-wrap: wrap;`}>
                    {oscData.map(osc => 
                    osc.instrument === 1 ? 
                        <OscVolume key={osc.id} {...osc}/>:<div key ={osc.id}></div>
                    )}
                </div>
                <div> Volumes</div>
                <div css={css`display:flex; justify-content:space-between;`}>
                    <button onClick={() => addFrequency(1)}> + Add Frequency</button>
                    <button onClick={() => removeFrequency(1)}> - Remove Frequency</button>
                </div>
            </div>
            <div css ={instrumentContainer}>
                <h2> Instrument 2</h2>
                <MasterFreq {...oscData[1]}/>
                <div> Frequencies </div>
                <div css={css`display:flex;flex-wrap: wrap;`}>
                    {oscData.map(osc => 
                    osc.instrument === 2 ? 
                        <OscVolume key={osc.id}{...osc}/>:<div key ={osc.id}></div>
                    )}
                </div>
                <div> Volumes</div>
                <div css={css`display:flex; justify-content:space-between;`}>
                    <button css={css`border-radius: 0px;`} onClick={() => addFrequency(2)}> + Add Frequency</button>
                    <button onClick={() => removeFrequency(2)}> - Remove Frequency</button>
                </div>
            </div>
            <div css ={instrumentContainer}>
                <h2> New Instrument </h2>
                <Timbre/>
            </div>
        </div>
    )

}
export default Instrument;


export const CONST_VALUE = "const";