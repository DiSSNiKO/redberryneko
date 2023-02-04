import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'; 
import GreetingPage from './components/GreetingPage';
import FormAndResume from './components/FormAndResume';


function App() {
  const [ stateOfValidations, setStateOfValidations] = useState({
    firstFormData: {},
    secondFormData: {},
    lastFormData: {}
  });
  const [currentForm, setCurrentForm] = useState(0); //0 for none, 1/2/3 for actual forms. 
  return (
    <div className="App">
      <Routes>

        {/*greeting page*/}
        <Route exact path="/" element={<GreetingPage currentForm={currentForm} setCurrentForm={setCurrentForm}/>} />
        <Route exact path="/home" element={<GreetingPage currentForm={currentForm} setCurrentForm={setCurrentForm}/>} />

        {/*forms*/}
        <Route exact path="/resumeForms/1" element={<FormAndResume currentForm={currentForm} setCurrentForm={setCurrentForm} newFormVal={1} />}/>
        <Route exact path="/resumeForms/2" element={<FormAndResume currentForm={currentForm} setCurrentForm={setCurrentForm} newFormVal={2} />}/>
        <Route exact path="/resumeForms/3" element={<FormAndResume currentForm={currentForm} setCurrentForm={setCurrentForm} newFormVal={3} />}/>

      </Routes>
    </div>
  );
}

export default App;
