import React, { memo, useState } from "react";
import '../assets/css/QuestionSelection.css'
import RandomQuestions from "./RandomQuestions";
import PredefinedQuestion from "./PredefinedQuestion";
function QuestionSelection({testData,setTestData}) {
    const [questionType,setQuestionType]=useState("randomquestion");
  return(
    <div className="question-selection">
        <div className="question-type">
            <button className={`type1 ${questionType==="randomquestion"?"active-tab":""}`} onClick={(e)=>{e.preventDefault();setQuestionType("randomquestion")}}>Random Questions</button>
            <button className={`type2 ${questionType==="predefined"?"active-tab":""}`} onClick={(e)=>{e.preventDefault();setQuestionType("predefined")}}>Predefined Questions</button>
        </div><br />
       {
        questionType==="randomquestion"?(<RandomQuestions testData={testData} setTestData={setTestData}/>):(<PredefinedQuestion testData={testData} setTestData={setTestData}/>)
       }
        
    </div>
    );
}

export default memo(QuestionSelection);
