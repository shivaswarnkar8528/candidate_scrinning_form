import React, { useState } from "react";
import Label from "./Label";
import Input from "../Field/Input";
import { testTechnologyOption, testTypeOptions } from "./selectData";
import Select from "react-select";
import PredifinedQuestionsTable from "./PredifinedQuestionsTable";
import AddQuestions from "./AddQuestions";
import axios from "axios";
function PredefinedQuestion({ setTestData, testData }) {
  const [addQuestions, setAddQuestions] = useState({});
  const [addModal, setAddModal] = useState(false);
  const [rows, setRowsdata] = useState([]);
  const [clear,setClear]=useState(false);

  function OnChangeHandler(e, name) {
    setTestData({
      ...testData,
      predefinedQuestionDetails: {
        ...testData.predefinedQuestionDetails,
        [name]: e,
      },
    });
  }
  function clearHandle(e) {
    e.preventDefault();
    setTestData({
      ...testData,
      predefinedQuestionDetails: {
        ...testData.predefinedQuestionDetails,
        question_type: [],
        technology: [],
      },
    });
  }
  function OnChangeHandlerTypeNum(e, name) {
    setTestData({
      ...testData,
      predefinedQuestionDetails: {
        ...testData.predefinedQuestionDetails,
        [name]: parseInt(e.target.value),
      },
    });
  }

  const questionCountHandle = (e, name) => {
    const { value } = e.target;
    if (value < 0) {
      alert("value can't be negative");
      e.target.value = 0;
    } else if (
      value > testData?.totalQuestions ||
      testData?.totalQuestions <
        testData?.randomQuestionDetails?.questions + value
    ) {
      e.target.value = 0;
      alert("warning: Limit Exceed");
    } else {
      OnChangeHandlerTypeNum(e, name);
    }
  };
   //function to search


   const handleSearch = () => {
    const { technology, question_type } = testData.predefinedQuestionDetails;
console.log(technology,question_type);
    const technology1 =
      technology?.length != 0 && technology[0]?.value;
    const technology2 =
      technology?.length === 2 && technology[1]?.value;
    const question_type1 =
      question_type?.length !== 0 && question_type[0]?.value;
    const question_type2 =
      question_type?.length === 2 && question_type[1]?.value;

    if (question_type1) {
      if (question_type2 && technology2) {
        axios
          .get(
            `http://localhost:5000/AddNewQuestion?technology=${technology1}&technology=${technology2}&question_type=${question_type1}&question_type=${question_type2}`
          )
          .then((resp) => {
            setRowsdata(resp.data);
          });
      } else if (question_type2 && technology1) {
        axios
          .get(
            `http://localhost:5000/AddNewQuestion?technology=${technology1}&question_type=${question_type1}&question_type=${question_type2}`
          )
          .then((resp) => {
            setRowsdata(resp.data);
          });
      } else if (technology1 && technology2) {
        axios
          .get(
            `http://localhost:5000/data?technology=${technology1}&technology=${technology2}&question_type=${question_type1}`
          )
          .then((resp) => {
            setRowsdata(resp.data);
          });
      } else if (technology1) {
        axios
          .get(
            `http://localhost:5000/data?technology=${technology1}&question_type=${question_type1}`
          )
          .then((resp) => {
            setRowsdata(resp.data);
          });
      } else {
        axios
          .get(
            `http://localhost:5000/data?question_type=${question_type1}`
          )
          .then((resp) => {
            setRowsdata(resp.data);
          });
      }
    } else if (technology2) {
      axios
        .get(
          `http://localhost:5000/data?technology=${technology1}&technology=${technology2}`
        )
        .then((resp) => {
            setRowsdata(resp.data);
        });
    } else {
      axios
        .get(
          `http://localhost:5000/data?Addtechnology=${technology1}`
        )
        .then((resp) => setRowsdata(resp.data));
    }
  };


  return (
    <div>
      <div>
        <label label="Total Predefined Questions" />
        <Input
          type={"number"}
          placeholder={"Predefined Questions"}
          onChange={(e) => questionCountHandle(e, "questionCount")}
          value={testData.predefinedQuestionDetails.questionCount}
        />
      </div>

      <div style={{ display: "flex", gap: "15px" }}>
        <div className="predefinedTechs">
          <Label label="Technology" />
          <Select
            isMulti
            options={testTechnologyOption}
            value={testData.predefinedQuestionDetails.technology}
            onChange={(e) => OnChangeHandler(e, "technology")}
          />
        </div>
        <div className="predefinedType">
          <Label label="Question Type" />
          <Select
            isMulti
            options={testTypeOptions}
            value={testData.predefinedQuestionDetails.question_type}
            onChange={(e) => OnChangeHandler(e, "question_type")}
          />
        </div>
        <div className="predefined-question-btn">
          <button type="button" onClick={()=>{handleSearch()}}>
            Search
          </button>
          <button
            onClick={(e) => {
              clearHandle(e);setClear(!clear)
            }}
          >
            Clear{" "}
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              setAddModal(true);
            }}
          >
            Add New Question
          </button>
        </div>
      </div>
      {/* render add question modal if addModal state is true  */}
      {addModal ? (
        <AddQuestions
          setAddModal={setAddModal}
          setAddQuestions={setAddQuestions}
        />
      ) : (
        ""
      )}

      {/* data-grid table for predefined questions  */}
      {/* used MUI  */}

      <div>
        {" "}
        <PredifinedQuestionsTable addQuestions={addQuestions} rows={rows} setRowsdata={setRowsdata} clear={clear}/>
      </div>

      <div>
        <button onClick={(e) => e.preventDefault()} className="submit_btn">
          Submit Condidate Test
        </button>
        <button
          onClick={(e) => e.preventDefault()}
          className="final_Submit_btn"
        >
          Final Submit
        </button>
      </div>
    </div>
  );
}

export default PredefinedQuestion;
