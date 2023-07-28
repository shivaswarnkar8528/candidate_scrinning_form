import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "title", headerName: "Question Title", width: 450 },
    { field: "question_level", headerName: "Question level", width: 130 },
    { field: "technology", headerName: "Technology", width: 130 },
    { field: "question_type", headerName: "Question Type", width: 130 },

  ];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

export default function Demotable({ addQuestions}) {
  const [axiosData, setAxiosData] = React.useState([]);
  const [rows, setRowsdata] = React.useState([]);


    React.useEffect(() => {
        axios.get("http://localhost:5000/data").then((data) => {
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
      }, [addQuestions]);
  return (
    <div style={{ height: 400, width: '100%' }}>
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
  );
}