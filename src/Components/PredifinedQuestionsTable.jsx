import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
function PredifinedQuestionsTable({ addQuestions ,rows,setRowsdata,clear}) {
  
  const [axiosData, setAxiosData] = useState([]);

  console.log(addQuestions);
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Question Title", width: 450 },
    { field: "question_level", headerName: "Question level", width: 130 },
    { field: "technology", headerName: "Technology", width: 130 },
    { field: "question_type", headerName: "Question Type", width: 130 },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:5000/data")
      .then((data) => {
        setAxiosData(data.data);
        let temp = data.data.map((item) => {
          return {
            id: item.id,
            title: item?.title,
            question_level: item?.question_level,
            technology: item?.technology,
            question_type: item?.question_type,
          };
        });
        setRowsdata(temp);
      })
      .catch((err) => console.log("url error"));
  }, [addQuestions,clear]);

  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    </div>
  );
}

export default PredifinedQuestionsTable;
