import React, { memo, useContext, useState } from "react"
import CreatableSelect from "react-select/creatable"
import { testTechnologyOption } from "./selectData"
import { context } from "./MainForm";

  
function SelectTypeCreatable() {
  let data = useContext(context);
  let { testData, setTestData } = data;
    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState(testTechnologyOption)
    
     
    const handleCreate = inputValue => {

      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setOptions((prev)=>[...prev,{"value":inputValue,"label":inputValue}])
      }, 1000)
    }
  return (
    <CreatableSelect
    isClearable
    isDisabled={isLoading}
    isLoading={isLoading}
    // onChange={(e)=>{setTestData({...testData,testType:e?.value})}}
    onChange={(newValue) => {setTestData({...testData,'testType':newValue?.value})}}
    onCreateOption={handleCreate}
    options={options}
  />
  )
}

export default memo(SelectTypeCreatable)