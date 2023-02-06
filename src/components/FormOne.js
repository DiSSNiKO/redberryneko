import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    emailEval, numberEval,
    nameLastnameValidated, removeTrailingWhiteSpace,
    removeWhiteSpace, selfDescEval, photoEval, finalEval,
    formStateUpdater,
    noBannedInputs,
    allowedEmailChars,
    ifExistantGetDataFromMainStateAndCheckValidity
} from '../utilities'
function FormOne(props) {
    const [justMounted, setJustMounted] = useState(true);
    const [formContent, setFormContent] = useState({
        name: null,
        lastName: null,
        phoneNumber: null,
        email: null,
        selfDesc: null,
        photo: null
    });
    const { currentForm, setCurrentForm, completeData, readyForSubmission, setReadyForSubmission } = props;
    useEffect(() => {
        if (currentForm !== 1) {
            setCurrentForm(1);
        }
    });
    useEffect(() => {
        if (justMounted) {
            setJustMounted(false);
        } else {
            props.setCompleteData({
                ...props.completeData,
                firstFormData: formContent
            })
        }
        finalEval(readyForSubmission, setReadyForSubmission, "privateInfoValidated");
    }, [formContent]);
    useEffect(() => {
        const evalFunctionPairingWithSymbols = {
            name: nameLastnameValidated,
            lastName: nameLastnameValidated,
            email: emailEval,
            phoneNumber: numberEval
        }
        const evalFunctionWithoutSymbols = {
            selfDesc: selfDescEval,
            photo: photoEval
        }
        ifExistantGetDataFromMainStateAndCheckValidity(evalFunctionPairingWithSymbols, evalFunctionWithoutSymbols, formContent, setFormContent, readyForSubmission, setReadyForSubmission, "privateInfoValidated", completeData);
    }, []);
    if (currentForm === 1) {
        return (
            <form className="current-form">
                <div>
                    <div className="name-lastname">
                        <div className="input-cont">
                            <span className="input-title">სახელი</span>
                            <div style={{ position: "relative" }}>
                                <input className="input-small needsEval formInput" data-input-for="name" type={"text"} onChange={(e) => {
                                    e.target.value = removeWhiteSpace(e.target.value);
                                    formStateUpdater(e.target, "name", nameLastnameValidated, formContent, setFormContent);
                                }} />
                                <img className="inputValidationSymbols validated" src="/images/validated.svg" />
                                <img className="inputValidationSymbols notValidated" src="/images/notValidated.svg" />
                            </div>
                            <span className="validation-alert">მინიმუმ 2 ასო, ქართული ასოები</span>
                        </div>
                        <div className="input-cont">
                            <span className="input-title">გვარი</span>
                            <div style={{ position: "relative" }}>
                                <input className="input-small needsEval formInput" data-input-for="lastName" type={"text"} onChange={(e) => {
                                    e.target.value = removeWhiteSpace(e.target.value);
                                    formStateUpdater(e.target, "lastName", nameLastnameValidated, formContent, setFormContent);
                                }} />
                                <img className="inputValidationSymbols validated" src="/images/validated.svg" />
                                <img className="inputValidationSymbols notValidated" src="/images/notValidated.svg" />
                            </div>
                            <span className="validation-alert">მინიმუმ 2 ასო, ქართული ასოები</span>
                        </div>
                    </div>
                    <div className="upload-pic-cont">
                        <span className="input-title">პირადი ფოტოს ატვირთვა</span>
                        <label htmlFor="upload-pic-input">ატვირთვა</label>
                        <input type={"file"} id="upload-pic-input" data-input-for="photo" className="formInput" />
                    </div>
                </div>
                <div>
                    <div className="input-cont about-me-cont">
                        <span className="input-title">ჩემ შესახებ &#40;არასავალდებულო&#41;</span>
                        <textarea className="input-big formInput" data-input-for="selfDesc" onChange={(e) => {
                            selfDescEval(e.target);
                            setFormContent({
                                ...formContent,
                                selfDesc: e.target.value
                            })
                        }} />
                    </div>
                    <div className="email-cont input-cont">
                        <div className="input-title">ელ.ფოსტა</div>
                        <div style={{ position: "relative" }}>
                            <input className="input-small needsEval formInput" data-input-for="email" type={"text"} onChange={(e) => {
                                noBannedInputs(e.target, allowedEmailChars);
                                formStateUpdater(e.target, "email", emailEval, formContent, setFormContent);
                            }} />
                            <img className="inputValidationSymbols validated" src="/images/validated.svg" />
                            <img className="inputValidationSymbols notValidated" src="/images/notValidated.svg" />
                        </div>
                        <div className="validation-alert">უნდა მთავრდებოდეს @redberry.ge-თი</div>
                    </div>
                    <div className="phone-number-cont input-cont">
                        <span className="input-title">მობილურის ნომერი</span>
                        <div style={{ position: "relative" }}>
                            <input className="input-small needsEval formInput" data-input-for="phoneNumber" placeholder="+995 000 00 00 00" type={"text"} onChange={(e) => {
                                formStateUpdater(e.target, "phoneNumber", numberEval, formContent, setFormContent);
                                if (e.target.value.length >= 17) {
                                    e.target.value = removeTrailingWhiteSpace(e.target.value);
                                }
                            }} />
                            <img className="inputValidationSymbols validated" src="/images/validated.svg" />
                            <img className="inputValidationSymbols notValidated" src="/images/notValidated.svg" />
                        </div>
                        <span className="validation-alert">უნდა აკმაყოფილებდეს ქართული მობილური ნომრის ფორმატს</span>
                    </div>
                </div>
                <Link to="/resumeForms/2" className="next-form-button no-annoying-style" onClick={(e) => {
                    if (!finalEval(readyForSubmission, setReadyForSubmission, "privateInfoValidated")) {
                        e.preventDefault()
                    }
                }}>შემდეგი</Link>
            </form>
        );
    }
}
export default FormOne;