import React, { memo, useState } from "react";
import "../assets/css/AddQuestions.css";
import Label from "./Label";
import Select from "react-select";
import {
  testTechnologyOption,
  testTypeOptions,
  questionLevel,
} from "./selectData";
import { MdAddCircleOutline } from "react-icons/md";
import Input from "../Field/Input";
import { AiOutlineMinusCircle } from "react-icons/ai";
import axios from "axios";



function AddQuestions({ setAddModal,setAddQuestions }) {
  const [answerOptions, setAnswerOptions] = useState([]);
  const [addQuestionData, setAddquestionData] = useState({});

  const addquestionHandle = (e, name) => {
    setAddquestionData({ ...addQuestionData, [name]: e.value });
  };
  const optionsHandle = (e, name) => {
    setAddquestionData({
      ...addQuestionData,
      options: { ...addQuestionData.options, [name]: e.target.value },
    });
  };
  function createHandle(e) {
    e.preventDefault();
    //adding data in josn server
    axios.post(" http://localhost:5000/data",addQuestionData).catch((err)=>console.log("error"))
    if(!(addQuestionData["question_type"] == "mcq")){
      setAddquestionData({ ...addQuestionData, questions: "" });
    }
    // console.log(addQuestionData);
    setAddQuestions(addQuestionData);

  }

  return (
    <div className="add-question-modal">
      <div>
        <div>
          <h2>Add Questions</h2>
          <br />
        </div>
        <div className="select_test_type">
          <Label label="Technology" />
          <Select
            options={testTechnologyOption}
            onChange={(e) => addquestionHandle(e, "technology")}
          />
        </div>
        <div className="select_test_type">
          <Label label="question_type" />
          <Select
            options={testTypeOptions}
            onChange={(e) => {
              addquestionHandle(e, "question_type");
            }}
          />
        </div>
        <div className="select_test_type">
          <Label label="Question Level" />
          <Select
            options={questionLevel}
            onChange={(e) => addquestionHandle(e, "question_level")}
          />
        </div>
        <div className="select_test_type">
          <Label label="Questions Title" />
          <input
            type={"text"}
            className="test_type_field"
            placeholder={"Questions Title"}
            onChange={(e) =>
              setAddquestionData({ ...addQuestionData, title: e.target.value })
            }
          />
        </div>
        <div>
          {addQuestionData?.["question_type"] === "mcq" ? (
            <>
              <b>Answer Options </b>{" "}
              <MdAddCircleOutline
                color="green"
                fontSize={"20px"}
                onClick={() =>
                  answerOptions.length < 4
                    ? setAnswerOptions([...answerOptions, ""])
                    : null
                }
              />
            </>
          ) : null}
          {addQuestionData?.["question_type"] === "mcq" && answerOptions.length > 0
            ? answerOptions.map((ele, index) => {
                return (
                  <div key={index}>
                    <Label label={`Answer Option (${index + 1})`} />
                    <div style={{ display: "flex" }}>
                      {" "}
                      <Input
                        onChange={(e) => optionsHandle(e, `option${index + 1}`)}
                        placeholder={`option ${index + 1}`}
                        className={"Answeroptionsfields"}
                      />
                      <span style={{ fontSize: "12px" }}>
                        &emsp; Is Correct <input type="radio" name="option" />{" "}
                        <AiOutlineMinusCircle size={"15px"} color="red" />
                      </span>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div>
        <button
          onClick={(e) => {
            createHandle(e);
          }}
        >
          Create
        </button>
        <button>Save & Create New</button>
        <button className="cancelBtn" onClick={() => setAddModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddQuestions;
