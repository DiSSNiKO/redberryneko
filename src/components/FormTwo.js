import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    getDataFromMain, finalEval,
    moreThanTwo,
    formStateUpdaterDynamicHTML,
    checkDateStart,
    existantValue,
    photoEval
} from '../utilities';
import NewExperience from "./NewExperience";


function FormTwo(props) {
    const emptyExperienceObj = {
        //_VARNAME for data that needs validation
        _position: null,
        _employer: null,
        _startDate: null,
        _endDate: null,
        _jobDescription: null
    };
    const [formContent, setFormContent] = useState([emptyExperienceObj]);
    const [justMounted, setJustMounted] = useState(true);
    const evalFunctionPairing = {
        _position: moreThanTwo,
        _employer: moreThanTwo,
        _startDate: checkDateStart,
        _jobDescription: existantValue,
        _endDate: existantValue
    }
    const { currentForm, setCurrentForm, completeData, readyForSubmission, setReadyForSubmission, profilePicture } = props;

    useEffect(() => {
        if (currentForm !== 2) {
            setCurrentForm(2);
        }
        const sessionStorageObj = {
            ...completeData,
            secondFormData: formContent
        }
        finalEval(readyForSubmission, setReadyForSubmission, "workExpValidated", evalFunctionPairing, formContent);
        sessionStorage.setItem("jetBoyRedBerryCompleteData", JSON.stringify(sessionStorageObj));
    });

    useEffect(() => {
        if (justMounted) {
            setJustMounted(false);
        } else {
            props.setCompleteData({
                ...completeData,
                secondFormData: formContent
            })
        }
        finalEval(readyForSubmission, setReadyForSubmission, "workExpValidated", evalFunctionPairing, formContent);
    }, [formContent]);

    useEffect(() => {
        photoEval(completeData.firstFormData["_photo"]);
        getDataFromMain(evalFunctionPairing, formContent, setFormContent, readyForSubmission, setReadyForSubmission, "workExpValidated", completeData, "secondFormData");
    }, []);
    return (
        <form className="current-form">
            <div className="experiences-cont">
                {(formContent).map((experience, index) => {
                    return <NewExperience evalFunctionPairing={evalFunctionPairing} key={index} justMounted={justMounted} checkDateStart={checkDateStart} existantValue={existantValue} experienceObjectIndex={index} formStateUpdaterDynamicHTML={formStateUpdaterDynamicHTML} moreThanTwo={moreThanTwo} subFormContent={formContent[index]} formContent={formContent} setFormContent={setFormContent} />
                })}
            </div>
            <button className="add-new-experience" onClick={(e) => {
                e.preventDefault();
                const newArr = Array.from(formContent);
                newArr.push(emptyExperienceObj);
                setFormContent(newArr);
            }}>მეტი გამოცდილების დამატება</button>
            <div className="backwars-forwards-cont">
                <Link to="/resumeForms/1" className="next-form-button no-annoying-style">უკან</Link>
                <Link to="/resumeForms/3" className="next-form-button no-annoying-style" onClick={(e) => {
                    if (!finalEval(readyForSubmission, setReadyForSubmission, "workExpValidated", evalFunctionPairing, formContent)) {
                        e.preventDefault()
                    }
                }}>შემდეგი</Link>
            </div>
        </form>
    );
}

export default FormTwo;