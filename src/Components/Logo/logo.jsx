import React from "react";
import Tilt from "react-parallax-tilt";
import Ai from './Ai.jpg';
import './logo.css';

const Logo =()=>{
    return(
     <div className=" mt0">
         <Tilt className='Tilt   ' tiltMaxAngleX={25} tiltMaxAngleY={55} style={{height: '150px', width: '150px'    }}>
                <div className='Tilt-inner '>
                <img className='logoimage' src={Ai} alt="logo" />
                
                </div>
        </Tilt>
          
         
        </div>
    )
}
export default Logo;