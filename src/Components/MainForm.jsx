import React, { createContext, memo, useContext, useState } from "react";
import Label from "./Label";
import { ManagedBy } from "./selectData";
import { ScreeningType } from "./selectData";
import Select from "react-select";
import { MdAddCircleOutline } from "react-icons/md";
import SelectTypeCreatable from "./SelectTypeCreatable";
import QuestionSelection from "./QuestionSelection";

export const context=createContext();

const MainForm = ({setMainRender,mainRender}) => {

  let data=useContext(context);
  const [testData, setTestData] = useState({
    "managedBY": "",
    "totalQuestions": null,
    "randomQuestionDetails": {
        "questions":null,
        "technology": [],
        "programming":0,
        "mcq":null
    },
    "predefinedQuestionDetails": {  
        "questionCount":null,
        "technology":[],
        "questionType": []
    },
    "test_name": "",
    "testType": "",
    "isMcq":"true",
    "screeningType": ""
});

let flag=Object.values(testData).every((val)=>Boolean(val)!=false) && Object.values(testData.predefinedQuestionDetails).every((val)=>Boolean(val)!=false) && Object.values(testData.randomQuestionDetails).every((val)=>Boolean(val)!=false);
console.log(flag);
let flag2=Object.values(testData).every((val)=>Boolean(val)!=false);


  const TotalQuestionHandle=(e)=>{
    if(e.target.value<0){
      alert("Enter Positive number");
      e.target.value=0;
    }
    else{
      setTestData({
        ...testData,
        totalQuestions: Number(e.target.value),
      });
    }
  }
  console.log(testData);  
  return (
    <context.Provider value={{testData,setTestData}}>
    
      <form className="container questionField">
      <div className="test_name">
          <Label label={"Test Name"} className={"test_name_label"} />
          <input
            type="text"
            className="test_type_field"
            placeholder=" Enter Test Name"
            name="test_name"
            onChange={(e) =>
              setTestData({ ...testData, test_name: e.target.value })
            }
          />

          <span className="plus_btn">
            <MdAddCircleOutline onClick={()=>setMainRender((prev)=>[...prev,""])}/>
          </span>
        </div>
        <div className="select_test_type">
          <Label label={"Test Type"} className={"test_type_label"} />
          <SelectTypeCreatable testData={testData} setTestData={setTestData} />
        </div>
        <div className="managedBy_field">
          <Label label={"Managed by :"} className={"manageBy_label"} />
          <Select
            options={ManagedBy}
            onChange={(e) => {
              setTestData({ ...testData, managedBY: e.value });
            }}
          />
          <span className="radio_mcq">
            <Label label={"Is MCQ"} /> 
            &nbsp;
            {
              testData.managedBY=="agent"?<>{"Yes "} <input name="type" checked disabled type="radio"/>{" No "} <input disabled name="type" type="radio"/></>:<>{"Yes "} <input name="type" onClick={(e) => {
                setTestData({ ...testData, isMcq: "true" });
              }} type="radio"/>{" No "} <input name="type" type="radio" onClick={(e) => {
                setTestData({ ...testData, isMcq: "false" });
              }}/></>
            }
          </span>
        </div>
        <div className="screeningType_field">
          <Label label={"Screening Type"} className={"screeningType_label"} />
          <Select
            options={ScreeningType}
            onChange={(e) => {
              setTestData({ ...testData, screeningType: e.value });
            }}
          />
        </div>
        <div className="totalNoQuField">
          <Label label={"Total Number of Question"} className={"totalnoq"} />
          <input
            type="number"
            className="totalNumberfield"
            onChange={(e) =>TotalQuestionHandle(e)}
          />
        </div>
        <div>
          {testData.totalQuestions && flag2 ? (
            <QuestionSelection testData={testData} setTestData={setTestData} />
          ) : (
            ""
          )}
        </div>
        { flag==false?<div>
              <button disabled className="submit_btn submit_btn-disable">Submit Condidate Test</button>
              <button disabled className="final_Submit_btn">Final Submit</button>
         </div>:<div>
              <button onClick={(e)=>{e.preventDefault();console.log(testData);}}  className="submit_btn">Submit Condidate Test</button>
              <button onClick={(e)=>{e.preventDefault();console.log(testData);}}  className="final_Submit_btn">Final Submit</button>
         </div>}
      </form>
    </context.Provider>
  );
};

export default memo(MainForm);
