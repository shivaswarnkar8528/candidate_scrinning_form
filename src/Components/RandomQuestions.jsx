import React, { useContext, useEffect } from 'react'
import Label from './Label'
import Select from 'react-select'
import Input from '../Field/Input'
import { testTechnologyOption } from './selectData'
import { context } from './MainForm'

function RandomQuestions() {
    let data = useContext(context);
    let { testData, setTestData } = data;

    useEffect(()=>{
    setTestData((prev)=>({...prev,predefinedQuestionDetails:{...prev.predefinedQuestionDetails,"questionCount":prev.totalQuestions-prev.randomQuestionDetails.questions}}))
    if(testData.managedBY=="agent" || testData.isMcq=="true" ){
        setTestData((prev)=>({...prev,randomQuestionDetails:{...prev.randomQuestionDetails,"mcq":prev.randomQuestionDetails.questions}}));

        }
},[testData.randomQuestionDetails.questions])
    useEffect(()=>{
        setTestData({...testData,randomQuestionDetails:{...testData.randomQuestionDetails,"programming":testData.randomQuestionDetails.questions-testData.randomQuestionDetails.mcq}});
    },[testData.randomQuestionDetails.mcq])

   
    


    function multiSelect(e,name){
        setTestData({...testData,randomQuestionDetails:{...testData.randomQuestionDetails,[name]:e}})

    }
    function OnChangeHandler(e,name){ 
        setTestData({...testData,randomQuestionDetails:{...testData.randomQuestionDetails,[name]:Number(e.target.value)}});
        console.log(testData.randomQuestionDetails);
    }
    const randomQuestionHandle=(e,name)=>{
        const {value}=e.target;
        if(value<0){  
            e.target.value=0;
            alert("negative not allow like"+value); 
            setTestData({...testData,randomQuestionDetails:{...testData.randomQuestionDetails,[name]:0}});

        }
        else if(value>testData["totalQuestions"]){
            e.target.value=0;
            alert("Value can't be greter than total question");
            setTestData({...testData,randomQuestionDetails:{...testData.randomQuestionDetails,[name]:0}});

        }
        else{
            setTestData({...testData,randomQuestionDetails:{...testData.randomQuestionDetails,[name]:Number(e.target.value)}});
            
        }
    }
    function mcqQuestionHandler(e){
        if(e.target.value<0){alert("Negative number not allow");e.target.value=0;}
        else if(e.target.value>testData.randomQuestionDetails?.questions){
            alert("enter valid details");e.target.value=0;
            // e.target.value="can't be 0";
        }
        else{
            OnChangeHandler(e,"mcq");
      
        }
    }
  return (
    <div>
        <div>
            <Label label="Random Question"/>
            <Input type={"number"} placeholder={"Random Question"} value={testData.randomQuestionDetails.questions} onChange={(e)=>randomQuestionHandle(e,"questions")}/>
        </div>
        <div className="select_test_type">
            <Label label="Technology"/>
            <Select isMulti options={testTechnologyOption} value={testData.randomQuestionDetails.technology} onChange={(e)=>multiSelect(e,"technology")} />
        </div>
        {testData.managedBY!=="agent" && testData.isMcq!=="true"?<div className="select_test_type">
            <Label label="Number of MCQ Questions"/>
            <Input type={"number"} placeholder={"No. of MCQ questions"} value={testData.randomQuestionDetails.mcq} onChange={(e)=>mcqQuestionHandler(e)}/>
        </div>:""}
       
    </div>
  )
}

export default RandomQuestions