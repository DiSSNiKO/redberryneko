import { useEffect, useRef, useState } from "react";
import { existantValue, validationStyling, formStateUpdaterDynamicHTMLForButtons } from "../utilities";




function NewEducation(props) {
    const { formStateUpdaterDynamicHTML, evalFunctionPairing, moreThanTwo, justMounted, formContent, setFormContent, experienceObjectIndex, subFormContent } = props
    const [dataAcquired, setDataAcquired] = useState(false);
    const _educationLevelInpt = useRef();
    const _educationInstitutionInpt = useRef();
    const _endDateInpt = useRef();
    const _educationDescriptionInpt = useRef();
    const educationLevels = useRef();
    const refs = [_educationInstitutionInpt, _endDateInpt, _educationDescriptionInpt];


    useEffect(() => {
        if (!justMounted && !dataAcquired) {
            refs.forEach((inpt) => {
                inpt = inpt.current;
                inpt.value = subFormContent[inpt.dataset.inputFor];
                if (inpt.dataset.inputFor[0] === "_") {
                    validationStyling(inpt, evalFunctionPairing[inpt.dataset.inputFor](inpt.value));
                } else {
                    evalFunctionPairing[inpt.dataset.inputFor](inpt);
                }
            });
            const buttonVal = subFormContent[_educationLevelInpt.current.dataset.inputFor];
            if (buttonVal) {
                _educationLevelInpt.current.textContent = buttonVal;
            }
            validationStyling(_educationLevelInpt.current, evalFunctionPairing[_educationLevelInpt.current.dataset.inputFor](_educationLevelInpt.current.textContent));
            setDataAcquired(true);
        }
    });

    return (
        <div className="new-experience">
            <div className="input-cont">
                <span className="input-title">სასწავლებელი</span>
                <div style={{ position: "relative" }}>
                    <input ref={_educationInstitutionInpt} className="input-small needsEval formInput" placeholder="დასახელება" data-input-for="_educationInstitution" type={"text"} onChange={(e) => {
                        formStateUpdaterDynamicHTML(e.target, "_educationInstitution", moreThanTwo(e.target.value), formContent, setFormContent, experienceObjectIndex);
                    }} />
                    <img className="inputValidationSymbols validated" src="/images/validated.svg" />
                    <img className="inputValidationSymbols notValidated" src="/images/notValidated.svg" />
                </div>
                <span className="validation-alert">მინიმუმ 2 სიმბოლო</span>
            </div>
            <div className="horizontal-two-inputs">
                <div className="input-cont">
                    <span className="input-title">ხარისხი</span>
                    <div style={{ position: "relative" }}>
                        <div className="education-level-select-cont">
                            <img src="/images/errou.svg" style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%) rotate(0deg)",
                                cursor: "pointer"
                            }} onClick={() => {
                                if (educationLevels.current.classList.contains("no-display")) {
                                    educationLevels.current.classList.remove('no-display');
                                } else {
                                    educationLevels.current.classList.add("no-display");
                                }
                            }} />
                            <button className="input-small formInput needsEval" data-input-for="_educationLevel" ref={_educationLevelInpt} onClick={(e) => {
                                e.preventDefault();
                                if (educationLevels.current.classList.contains("no-display")) {
                                    educationLevels.current.classList.remove('no-display');
                                } else {
                                    educationLevels.current.classList.add("no-display");
                                }
                            }} style={{ cursor: "pointer" }}>{subFormContent._educationLevel && subFormContent._educationLevel !== "" ? subFormContent._educationLevel : "აირჩიეთ ხარისხი"}</button>
                            <div className="education-levels no-display" ref={educationLevels}>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    formStateUpdaterDynamicHTMLForButtons(e.target, "_educationLevel",
                                        existantValue(e.target.textContent), formContent, setFormContent, experienceObjectIndex);
                                }}>საშუალო სკოლის დიპლომი</button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    formStateUpdaterDynamicHTMLForButtons(e.target, "_educationLevel",
                                        existantValue(e.target.textContent), formContent, setFormContent, experienceObjectIndex);
                                }}>ბაკალავრი</button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    formStateUpdaterDynamicHTMLForButtons(e.target, "_educationLevel",
                                        existantValue(e.target.textContent), formContent, setFormContent, experienceObjectIndex);
                                }}>მაგისტრი</button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    formStateUpdaterDynamicHTMLForButtons(e.target, "_educationLevel",
                                        existantValue(e.target.textContent), formContent, setFormContent, experienceObjectIndex);
                                }}>დიქტორი</button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    formStateUpdaterDynamicHTMLForButtons(e.target, "_educationLevel",
                                        existantValue(e.target.textContent), formContent, setFormContent, experienceObjectIndex);
                                }}>ასოცირებული ხარისხი</button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    formStateUpdaterDynamicHTMLForButtons(e.target, "_educationLevel",
                                        existantValue(e.target.textContent), formContent, setFormContent, experienceObjectIndex);
                                }}>სტუდენტი</button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    formStateUpdaterDynamicHTMLForButtons(e.target, "_educationLevel",
                                        existantValue(e.target.textContent), formContent, setFormContent, experienceObjectIndex);
                                }}>კოლეჯი &#40;უხარისხო ხდდ&#41;</button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    formStateUpdaterDynamicHTMLForButtons(e.target, "_educationLevel",
                                        existantValue(e.target.textContent), formContent, setFormContent, experienceObjectIndex);
                                }}>სხვა</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="input-cont">
                    <span className="input-title">დამთავრების რიცხვი</span>
                    <div style={{ position: "relative" }}>
                        <input ref={_endDateInpt} className="input-small formInput needsEval work-end-date" data-input-for="_endDate" type={"date"} onChange={(e) => {
                            const endDate = e.target.value;
                            formStateUpdaterDynamicHTML(e.target, "_endDate", existantValue(endDate), formContent, setFormContent, experienceObjectIndex);
                        }} />
                    </div>
                </div>
            </div>
            <div className="input-cont textarea-cont">
                <span className="input-title">აღწერა</span>
                <textarea ref={_educationDescriptionInpt} className="input-big needsEval formInput" data-input-for="_educationDescription" onChange={(e) => {
                    formStateUpdaterDynamicHTML(e.target, "_educationDescription", existantValue(e.target.value), formContent, setFormContent, experienceObjectIndex);
                }} />
            </div>
        </div>
    );
}
export default NewEducation;