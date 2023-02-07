import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import GreetingPage from './components/GreetingPage';
import FormAndResume from './components/FormAndResume';


function App() {
  const emptyCompleteData = {
    firstFormData: {},
    secondFormData: {},
    lastFormData: {}
  }
  const [completeData, setCompleteData] = useState(
    // _VARNAME data with validation, just VARNAME is optional data.
    JSON.parse(sessionStorage.getItem("completeData")) || emptyCompleteData
  );
  const [readyForSubmission, setReadyForSubmission] = useState({
    privateInfoValidated: false,
    workExpValidated: false,
    educationValidated: false
  }) //when all 3 are true, CV is ready for POST (Ready in general)
  const [currentForm, setCurrentForm] = useState(0); //0 for none, 1/2/3 for actual forms. 
  return (
    <div className="App">
      <Routes>

        {/*greeting page*/}
        <Route exact path="/" element={<GreetingPage currentForm={currentForm} setCurrentForm={setCurrentForm} setCompleteData={setCompleteData} />} />
        <Route exact path="/home" element={<GreetingPage currentForm={currentForm} setCurrentForm={setCurrentForm} setCompleteData={setCompleteData} />} />

        {/*forms*/}
        <Route exact path="/resumeForms/1" element={<FormAndResume readyForSubmission={readyForSubmission} setReadyForSubmission={setReadyForSubmission} currentForm={currentForm} setCurrentForm={setCurrentForm} newFormVal={1} completeData={completeData} setCompleteData={setCompleteData} />} />
        <Route exact path="/resumeForms/2" element={<FormAndResume readyForSubmission={readyForSubmission} setReadyForSubmission={setReadyForSubmission} currentForm={currentForm} setCurrentForm={setCurrentForm} newFormVal={2} completeData={completeData} setCompleteData={setCompleteData} />} />
        <Route exact path="/resumeForms/3" element={<FormAndResume readyForSubmission={readyForSubmission} setReadyForSubmission={setReadyForSubmission} currentForm={currentForm} setCurrentForm={setCurrentForm} newFormVal={3} completeData={completeData} setCompleteData={setCompleteData} />} />

      </Routes>
    </div>
  );
}

export default App;
