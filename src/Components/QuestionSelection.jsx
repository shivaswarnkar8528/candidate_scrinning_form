import React, { memo, useContext, useState } from "react";
import "../assets/css/QuestionSelection.css";
import RandomQuestions from "./RandomQuestions";
import PredefinedQuestion from "./PredefinedQuestion";
import { context } from "./MainForm";

function QuestionSelection() {
  const [questionType, setQuestionType] = useState("randomquestion");
  let data = useContext(context);
  let { testData, setTestData } = data;

  return (
    <div className="question-selection">
      <div className="question-type">
        <button
          className={`type1 ${
            questionType === "randomquestion" ? "active-tab" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            setQuestionType("randomquestion");
          }}
        >
          Random Questions
        </button>
        <button
          className={`type2 ${
            questionType === "predefined" ? "active-tab" : ""
          }`}
          onClick={(e) => {
            e.preventDefault();
            setQuestionType("predefined");
          }}
        >
          Predefined Questions
        </button>
      </div>
      <br />
      {questionType === "randomquestion" ? (
        <RandomQuestions/>
      ) : (
        <PredefinedQuestion/>
      )}
    </div>
  );
}

export default memo(QuestionSelection);
