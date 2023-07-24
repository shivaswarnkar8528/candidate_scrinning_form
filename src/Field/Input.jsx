import React, { memo } from 'react'

function Input({type="text",placeholder,onChange,className,value}) {
  return (
    <input value={value} type={type} placeholder={placeholder} onChange={onChange} className={className}/>
  )
}

export default memo(Input) 