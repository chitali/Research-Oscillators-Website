/** @jsxImportSource @emotion/react */
import { Slider } from '@material-ui/core';
import {css} from '@emotion/react'
import OscArr from './OscArr.json'
import {initOscillators} from '../redux/actions'
import {useDispatch} from 'react-redux'

var initalized = false;

function Home(){
  const dispatch = useDispatch();

  if(!initalized){
    OscArr.map(osc =>{
      const addOsc = initOscillators(osc);
      dispatch(addOsc);
    });
    initalized = true;
  }

  return(
    <div>
      <h1> Oscillators</h1>
    </div>

  )
}

export default Home;
