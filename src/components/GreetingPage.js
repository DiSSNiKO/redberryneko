import { useEffect } from "react";
import { Link } from "react-router-dom"
import { finalEval, moreThanTwo, checkDateStart, existantValue, nameLastnameValidated, emailEval, numberEval, selfDescEval, photoEval, globalFinalEval } from "../utilities";

function GreetingPage(props) {
    const { completeData, setCompleteData, readyForSubmission, setReadyForSubmission } = props;
    
    useEffect(() => {
        //useEffect for setting the current form
        const newCompleteData = {
            firstFormData: {},
            secondFormData: [],
            lastFormData: []
        }
        if (props.currentForm !== 0) {
            props.setCurrentForm(0)
            sessionStorage.clear();
            props.setCompleteData(newCompleteData);
        }
        globalFinalEval(newCompleteData, readyForSubmission, setReadyForSubmission);
    });
    if (props.currentForm === 0) {
        return (
            <div className="greeting-main">
                <div className="greeting-header">
                    <img src="/images/redberrylogo.png"></img>
                </div>
                <Link to={"/resumeForms/1"} className="no-annoying-style add-new-resume">რეზიუმეს დამატება</Link>
            </div>
        );
    }
}

export default GreetingPage;