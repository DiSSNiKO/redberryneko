
import { useEffect } from "react";
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";
import FormThree from "./FormThree";

function FormAndResume(props) {
    const { currentForm, setCurrentForm, newFormVal } = props;
    const headerText = {
        1:"პირადი ინფო",
        2:"გამოცდილება",
        3:"განათლება"
    }
    useEffect(()=>{
        if(currentForm!==newFormVal){
            setCurrentForm(newFormVal);
        }
    });
    const availableForms = {
        1:<FormOne currentForm={currentForm} setCurrentForm={setCurrentForm}/>,
        2:<FormTwo currentForm={currentForm} setCurrentForm={setCurrentForm}/>,
        3:<FormThree currentForm={currentForm} setCurrentForm={setCurrentForm}/>
    }
    if(currentForm===newFormVal){
        return (
            <div className="form-resume-cont">
                <div className="current-form-cont">
                    <div className="progression-header">
                        <h1>{headerText[currentForm]}</h1>
                        <span>{currentForm}/3</span>
                    </div>
                    {availableForms[currentForm]}
                </div>
                <div className="dynamic-resume-display">
    
                </div>    
            </div>
        );
    }
}

export default FormAndResume;