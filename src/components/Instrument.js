/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import {useSelector} from 'react-redux'
import OscVolume from './OscVolume'
import MasterFreq from './MasterFreq'
import Timbre from './Timbre'
import {getOscillators} from '../redux/selectors'
function Instrument(){
    const oscData = useSelector(getOscillators);
    
    const instrumentContainer = css`
    background-color: #eeee;
    margin: 10px;
    width: 390px;
    padding: 20px;
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
                <div> Frequencies</div>
                <div css={css`display:flex;`}>
                    {oscData.map(osc => 
                    osc.instrument === 1 ? 
                        <OscVolume key={osc.id} {...osc}/>:<div key ={osc.id}></div>
                    )}
                </div>
                <div> Volumes</div>

            </div>
            <div css ={instrumentContainer}>
                <h2> Instrument 2</h2>
                <MasterFreq {...oscData[5]}/>
                <div> Frequencies </div>
                <div css={css`display:flex;`}>
                    {oscData.map(osc => 
                    osc.instrument === 2 ? 
                        <OscVolume key={osc.id}{...osc}/>:<div key ={osc.id}></div>
                    )}
                </div>
                <div> Volumes</div>
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