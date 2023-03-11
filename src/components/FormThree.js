import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    finalEval,
    moreThanTwo,
    formStateUpdaterDynamicHTML,
    getDataFromMain,
    existantValue,
    photoEval
} from '../utilities';
import NewEducation from "./NewEducation";

function FormThree(props) {
    const emptyEduObj = {
        //_VARNAME for data that needs validation
        _educationLevel: null,
        _educationInstitution: null,
        _endDate: null,
        _educationDescription: null
    };
    const [formContent, setFormContent] = useState([emptyEduObj]);
    const [justMounted, setJustMounted] = useState(true);
    const evalFunctionPairing = {
        _educationLevel: moreThanTwo,
        _educationInstitution: existantValue,
        _endDate: existantValue,
        _educationDescription: existantValue
    }
    const { currentForm, setCurrentForm, completeData, readyForSubmission, setReadyForSubmission, profilePicture } = props;

    useEffect(() => {
        if (currentForm !== 3) {
            setCurrentForm(3);
        }
        const sessionStorageObj = {
            ...completeData,
            lastFormData: formContent
        }
        finalEval(readyForSubmission, setReadyForSubmission, "educationValidated", evalFunctionPairing, formContent);
        sessionStorage.setItem("jetBoyRedBerryCompleteData", JSON.stringify(sessionStorageObj));
        sessionStorage.setItem("jetBoyRedBerryPfp", JSON.stringify(profilePicture));
    });

    useEffect(() => {
        if (justMounted) {
            setJustMounted(false);
        } else {
            props.setCompleteData({
                ...completeData,
                lastFormData: formContent
            })
        }
        finalEval(readyForSubmission, setReadyForSubmission, "educationValidated", evalFunctionPairing, formContent);
    }, [formContent]);

    useEffect(() => {
        photoEval(completeData.firstFormData["_photo"]);
        getDataFromMain(evalFunctionPairing, formContent, setFormContent, readyForSubmission, setReadyForSubmission, "educationValidated", completeData, "lastFormData");
    }, []);
    return (
        <form className="current-form">
            <div className="experiences-cont">
                {(formContent).map((experience, index) => {
                    return <NewEducation evalFunctionPairing={evalFunctionPairing} key={index} justMounted={justMounted} existantValue={existantValue} experienceObjectIndex={index} formStateUpdaterDynamicHTML={formStateUpdaterDynamicHTML} moreThanTwo={moreThanTwo} subFormContent={formContent[index]} formContent={formContent} setFormContent={setFormContent} />
                })}
            </div>
            <button className="add-new-experience" onClick={(e) => {
                e.preventDefault();
                const newArr = Array.from(formContent);
                newArr.push(emptyEduObj);
                setFormContent(newArr);
            }}>სხვა სასწავლებლის დამატება</button>
            <div className="backwars-forwards-cont">
                <Link to="/resumeForms/2" className="next-form-button no-annoying-style">უკან</Link>
                <Link to="/finalCV" className="next-form-button no-annoying-style" onClick={(e) => {
                    if (!finalEval(readyForSubmission, setReadyForSubmission, "educationValidated", evalFunctionPairing, formContent)) {
                        e.preventDefault()
                    }
                }}>დასრულება</Link>
            </div>
        </form>
    );
}

export default FormThree;