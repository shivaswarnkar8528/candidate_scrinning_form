import React from 'react'
import Label from './Label'
import Select from 'react-select'
import Input from '../Field/Input'
import { testTechnologyOption } from './selectData'
function RandomQuestions({setTestData,testData}) {
    function multiSelect(e,name){
        // console.log(e);
        // let arr=e.map((ele)=>ele.value);
        // setTestData({...testData,randomQuestionDetails:{...testData.randomQuestionDetails,[name]:arr}})
        setTestData({...testData,randomQuestionDetails:{...testData.randomQuestionDetails,[name]:e}})

    }
    function OnChangeHandler(e,name){
        if(name=="programmming"){
        let programming_question=testData.randomQuestionDetails.questions-testData.randomQuestionDetails.mcq
        setTestData({...testData,randomQuestionDetails:{...testData.randomQuestionDetails,[name]:programming_question}});
        }
        else{
        setTestData({...testData,randomQuestionDetails:{...testData.randomQuestionDetails,[name]:e.target.value}});
        }
    }
    const randomQuestionHandle=(e)=>{
        const {value}=e.target;
        if(value<0){  
            e.target.value=0;
            alert("negative not allow like"+value); 
        }
        else if(value>testData["totalQuestions"]){
            e.target.value=0;
            alert("Value can't be greter than total question");
        }
        else{
            OnChangeHandler(e,"questions");
            setTestData({...testData,predefinedQuestionDetails:{...testData.predefinedQuestionDetails,questionCount:Number(testData.totalQuestions-e.target.value)}});
            
        }
    }
    function mcqQuestionHandler(e){
        if(e.target.value<0){alert("Negative number not allow");e.target.value=0;}
        else if(e.target.value>testData?.randomQuestionDetails?.questions){
            alert("value can't be more than Total random Quesions");
            e.target.value=0;
        }
        else{
            OnChangeHandler(e,"mcq");
            OnChangeHandler(e,"programmming");
            
        }
    }
  return (
    <div>
        <div>
            <Label label="Random Question"/>
            <Input type={"number"} placeholder={"Random Question"} value={testData.randomQuestionDetails.questions} onChange={(e)=>randomQuestionHandle(e)}/>
        </div>
        <div className="select_test_type">
            <Label label="Technology"/>
            <Select isMulti options={testTechnologyOption} value={testData.randomQuestionDetails.technology} onChange={(e)=>multiSelect(e,"technology")} />
        </div>
        <div className="select_test_type">
            <Label label="Number of MCQ Questions"/>
            <Input type={"number"} placeholder={"No. of MCQ questions"} onChange={(e)=>mcqQuestionHandler(e)}/>
        </div>
        <div>
            <button className='submit_btn'>Submit Condidate Test</button>
            <button className='final_Submit_btn'>Final Submit</button>
        </div>
    </div>
  )
}

export default RandomQuestions