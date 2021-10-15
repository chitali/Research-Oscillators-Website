/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react'
import logo from './logo.png';

function Footer(){
    var link = 'https://www.soundbendor.org'
  return(    
    <div css={css`
   justify-content: center;
   text-align: center;
   background-color: #eeee;
   margin: -7px;
   margin-top: 10px;
   height: 10em;
   `}>
   <img src={logo} alt="Logo" css={css`width: 400px; margin-bottom:-30px;`}/>
   <div> Copyright ©
       <a href= "https://www.soundbendor.org/"css={css`text-decoration:None; color:#d73f09;
        :hover{
           color:#e68a6a;
       }`}> Soundbendor Lab </a> 
    </div>
   <div> Developed by Chitali Buge Under Dr. Patrick Donnelly's Guidance </div>
   </div> 
    
  )
}

export default Footer;
