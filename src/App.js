import { useState } from 'react';
import './App.css';
import MainForm from './Components/MainForm';
function App() {
  const [mainRender,setMainRender]=useState([""]);
  return (
   <>
   <div className='test_title'>Condidate Screening Test Creation </div>
    <hr/><br/>
    {
     mainRender.map((ele,index)=>{
        return(
          <div key={index}>{<MainForm setMainRender={setMainRender} mainRender={mainRender}/>} <br/> <hr/></div>
        )
      })
    }
   </>
  );
}

export default App;
