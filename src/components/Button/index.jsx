import React from 'react'
import { btn } from '../style';

const Button = ({ disable, text, onClick, blueCl}) => {
  return (
    <div onClick={onClick} disabled={disable} className={blueCl ? btn.btnActive : btn.btnNormal}>
      {text}
    </div>
  )
}



export default Button;
