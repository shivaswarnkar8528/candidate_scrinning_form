import React from 'react'
import { memo } from 'react'
const Radio = ({name,className,label,onClick}) => {
  return (
   <>
   <label>{label}</label>
   <input type='radio'  name={name} className={className} onClick={onClick}/>&nbsp;&nbsp;
   
   </>
  )
}

export default memo(Radio)