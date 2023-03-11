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
    //_VARNAME for data that needs validation
    const [formContent, setFormContent] = useState({
        _name: null,
        _lastName: null,
        _phoneNumber: null,
        _email: null,
        selfDesc: null,
    });
    const evalFunctionPairing = {
        _name: nameLastnameValidated,
        _lastName: nameLastnameValidated,
        _email: emailEval,
        _phoneNumber: numberEval,
        selfDesc: selfDescEval,
    }
    const { currentForm, setCurrentForm, completeData, readyForSubmission, setReadyForSubmission, profilePicture, setProfilePicture } = props;
    useEffect(() => {
        if (currentForm !== 1) {
            setCurrentForm(1);
        }
        const sessionStorageObj = {
            ...completeData,
            firstFormData: formContent
        }
        sessionStorage.setItem("jetBoyRedBerryCompleteData", JSON.stringify(sessionStorageObj));
    });
    useEffect(() => {
        if (justMounted) {
            setJustMounted(false);
        } else {
            props.setCompleteData({
                ...completeData,
                firstFormData: formContent
            })
        }
        if (profilePicture) {
            finalEval(readyForSubmission, setReadyForSubmission, "privateInfoValidated", evalFunctionPairing, formContent);
        } else {
            const validationsObjekt = {
                ...readyForSubmission
            }
            validationsObjekt['privateInfoValidated'] = false;
            setReadyForSubmission(validationsObjekt);
        }
    }, [formContent, profilePicture]);
    useEffect(() => {
        ifExistantGetDataFromMainStateAndCheckValidity(evalFunctionPairing, formContent, setFormContent, readyForSubmission, setReadyForSubmission, "privateInfoValidated", completeData);
    }, []);
    if (currentForm === 1) {
        return (
            <form className="current-form">
                <div>
                    <div className="horizontal-two-inputs">
                        <div className="input-cont">
                            <span className="input-title">სახელი</span>
                            <div style={{ position: "relative" }}>
                                <input className="input-small needsEval formInput" data-input-for="_name" type={"text"} onChange={(e) => {
                                    e.target.value = removeWhiteSpace(e.target.value);
                                    formStateUpdater(e.target, "_name", nameLastnameValidated(e.target.value), formContent, setFormContent);
                                }} />
                                <img className="inputValidationSymbols validated" src="/images/validated.svg" />
                                <img className="inputValidationSymbols notValidated" src="/images/notValidated.svg" />
                            </div>
                            <span className="validation-alert">მინიმუმ 2 ასო, ქართული ასოები</span>
                        </div>
                        <div className="input-cont">
                            <span className="input-title">გვარი</span>
                            <div style={{ position: "relative" }}>
                                <input className="input-small needsEval formInput" data-input-for="_lastName" type={"text"} onChange={(e) => {
                                    e.target.value = removeWhiteSpace(e.target.value);
                                    formStateUpdater(e.target, "_lastName", nameLastnameValidated(e.target.value), formContent, setFormContent);
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
                        <input type={"file"} accept="image/*" id="upload-pic-input" data-input-for="_photo" className="formInput" onChange={(e) => {
                            if (photoEval(e.target.files[0])) {
                                const obj = { ...formContent };
                                const photoString = "_photo";
                                const fr = new FileReader();
                                fr.readAsDataURL(e.target.files[0]);
                                fr.addEventListener('load', () => {
                                    const image = fr.result;
                                    obj[photoString] = image;
                                    setProfilePicture(image);
                                });
                            }
                        }} />
                    </div>
                </div>
                <div>
                    <div className="input-cont textarea-cont">
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
                            <input className="input-small needsEval formInput" data-input-for="_email" type={"text"} onChange={(e) => {
                                noBannedInputs(e.target, allowedEmailChars);
                                formStateUpdater(e.target, "_email", emailEval(e.target.value), formContent, setFormContent);
                            }} />
                            <img className="inputValidationSymbols validated" src="/images/validated.svg" />
                            <img className="inputValidationSymbols notValidated" src="/images/notValidated.svg" />
                        </div>
                        <div className="validation-alert">უნდა მთავრდებოდეს @redberry.ge-თი</div>
                    </div>
                    <div className="phone-number-cont input-cont">
                        <span className="input-title">მობილურის ნომერი</span>
                        <div style={{ position: "relative" }}>
                            <input className="input-small needsEval formInput" data-input-for="_phoneNumber" placeholder="+995 000 00 00 00" type={"text"} onChange={(e) => {
                                formStateUpdater(e.target, "_phoneNumber", numberEval(e.target.value), formContent, setFormContent);
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
                    if (!finalEval(readyForSubmission, setReadyForSubmission, "privateInfoValidated", evalFunctionPairing, formContent)) {
                        e.preventDefault()
                    }
                }}>შემდეგი</Link>
            </form>
        );
    }
}
export default FormOne;