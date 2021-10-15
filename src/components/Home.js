/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import OscArr from './OscArr.json'
import {initOscillators} from '../redux/actions'
import {useDispatch} from 'react-redux'
// import 'logo.png';

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
    <img src={require('../logo.png')}/>

  )
}

export default Home;
