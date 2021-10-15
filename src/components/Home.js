/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import OscArr from './OscArr.json'
import {initOscillators} from '../redux/actions'
import {useDispatch} from 'react-redux'
import db from './db.png';

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
    <div css={css`
   justify-content: center;
   text-align: center;
   `}>
   <img src={db} alt="Logo" css={css`width: 70px; margin-top: 10px; margin-bottom:-15px;`}/>
   </div>  
  )
}

export default Home;
