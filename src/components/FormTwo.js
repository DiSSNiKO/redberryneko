import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    removeTrailingWhiteSpace,
    removeWhiteSpace, finalEval,
    formStateUpdater,
    noBannedInputs,
    ifExistantGetDataFromMainStateAndCheckValidity,
    makeArrayOfNItems,
    validationStyling,
    moreThanTwo,
    formStateUpdaterDynamicHTML,
    selfDescEval,
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
    function getDataFromMain(evalFunctionPairing, formContent, setFormContent, readyForSubmission, setReadyForSubmission, formNameValidated, completeData, chosenForm) {
        const newArr = completeData[chosenForm];
        if (newArr.length === 0) {
            return 0;
        }
        finalEval(readyForSubmission, setReadyForSubmission, formNameValidated, evalFunctionPairing, formContent);
        setFormContent(newArr);
    }
    const { currentForm, setCurrentForm, completeData, readyForSubmission, setReadyForSubmission } = props;

    useEffect(() => {
        if (currentForm !== 2) {
            setCurrentForm(2);
        }
        const sessionStorageObj = {
            ...completeData,
            lastFormData: formContent
        }
        // sessionStorageObj.firstFormData._photo = null;
        sessionStorage.setItem("completeData", JSON.stringify(sessionStorageObj));
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