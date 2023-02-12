
import { useEffect } from "react";
import FormOne from "./FormOne";
import FormTwo from "./FormTwo";
import FormThree from "./FormThree";
import DynamicResumeDisplay from "./DynamicResumeDisplay";

function FormAndResume(props) {
    const { currentForm, setCurrentForm, newFormVal, readyForSubmission, setReadyForSubmission } = props;
    const headerText = {
        1: "პირადი ინფო",
        2: "გამოცდილება",
        3: "განათლება"
    }
    useEffect(() => {
        if (currentForm !== newFormVal) {
            setCurrentForm(newFormVal);
        }
    });
    const availableForms = {
        1: <FormOne readyForSubmission={readyForSubmission} setReadyForSubmission={setReadyForSubmission} currentForm={currentForm} setCurrentForm={setCurrentForm} completeData={props.completeData} setCompleteData={props.setCompleteData} />,
        2: <FormTwo readyForSubmission={readyForSubmission} setReadyForSubmission={setReadyForSubmission} currentForm={currentForm} setCurrentForm={setCurrentForm} completeData={props.completeData} setCompleteData={props.setCompleteData} />,
        3: <FormThree readyForSubmission={readyForSubmission} setReadyForSubmission={setReadyForSubmission} currentForm={currentForm} setCurrentForm={setCurrentForm} completeData={props.completeData} setCompleteData={props.setCompleteData} />
    }
    if (currentForm === newFormVal) {
        return (
            <div className="form-resume-cont">
                <div className="current-form-cont">
                    <div className="progression-header">
                        <h1>{headerText[currentForm]}</h1>
                        <span>{currentForm}/3</span>
                    </div>
                    {availableForms[currentForm]}
                </div>
                <DynamicResumeDisplay completeData={props.completeData} />
            </div>
        );
    }
}

export default FormAndResume;