import { useEffect, useRef, useState } from "react";
import { existantValue, checkDateStart, validationStyling } from "../utilities";




function NewExperience(props) {
    const { formStateUpdaterDynamicHTML, evalFunctionPairing, moreThanTwo, justMounted, formContent, setFormContent, experienceObjectIndex, subFormContent } = props
    const [dataAcquired, setDataAcquired] = useState(false);
    const _positionInpt = useRef();
    const _employerInpt = useRef();
    const _startDateInpt = useRef();
    const endDateInpt = useRef();
    const jobDescriptionInpt = useRef();
    const refs = [_positionInpt, _employerInpt, _startDateInpt, endDateInpt, jobDescriptionInpt];




    useEffect(() => {
        if (!justMounted && !dataAcquired) {
            refs.forEach((inpt) => {
                inpt = inpt.current;
                inpt.value = subFormContent[inpt.dataset.inputFor];
            });
            refs.forEach((inpt) => {
                inpt = inpt.current;
                const exceptions = ['_startDate'];
                const inputfor = inpt.dataset.inputFor;
                if (inputfor[0] === "_") {
                    if(!exceptions.includes(inputfor)){
                        validationStyling(inpt, evalFunctionPairing[inputfor](inpt.value));
                    } else {
                        validationStyling(inpt, evalFunctionPairing["_startDate"](inpt.value, endDateInpt.current.value));
                    }
                    
                } else {
                    evalFunctionPairing[inputfor](inpt);
                }
            });
            setDataAcquired(true);
        }
    });

    return (
        <div className="new-experience">
            <div className="input-cont">
                <span className="input-title">თანამდებობა</span>
                <div style={{ position: "relative" }}>
                    <input ref={_positionInpt} className="input-small needsEval formInput" placeholder="დეველოპერი, დიზაინერი . ." data-input-for="_position" type={"text"} onChange={(e) => {
                        formStateUpdaterDynamicHTML(e.target, "_position", moreThanTwo(e.target.value), formContent, setFormContent, experienceObjectIndex);
                    }} />
                    <img className="inputValidationSymbols validated" src="/images/validated.svg" />
                    <img className="inputValidationSymbols notValidated" src="/images/notValidated.svg" />
                </div>
                <span className="validation-alert">მინიმუმ 2 სიმბოლო</span>
            </div>
            <div className="input-cont">
                <span className="input-title">დამსაქმებელი</span>
                <div style={{ position: "relative" }}>
                    <input ref={_employerInpt} className="input-small needsEval formInput" placeholder="დამსაქმებელი" data-input-for="_employer" type={"text"} onChange={(e) => {
                        formStateUpdaterDynamicHTML(e.target, "_employer", moreThanTwo(e.target.value), formContent, setFormContent, experienceObjectIndex);
                    }} />
                    <img className="inputValidationSymbols validated" src="/images/validated.svg" />
                    <img className="inputValidationSymbols notValidated" src="/images/notValidated.svg" />
                </div>
                <span className="validation-alert">მინიმუმ 2 სიმბოლო</span>
            </div>
            <div className="horizontal-two-inputs">
                <div className="input-cont">
                    <span className="input-title">დაწყების რიცხვი</span>
                    <div style={{ position: "relative" }}>
                        <input ref={_startDateInpt} className="input-small needsEval formInput work-start-date" data-input-for="_startDate" type={"date"} onChange={(e) => {
                            const startDate = e.target.value;
                            const endDate = e.target.closest(".horizontal-two-inputs").querySelector(".work-end-date").value;
                            formStateUpdaterDynamicHTML(endDateInpt.current, "_endDate", (existantValue(endDate)&&checkDateStart(startDate, endDate)), formContent, setFormContent, experienceObjectIndex);
                            formStateUpdaterDynamicHTML(e.target, "_startDate", checkDateStart(startDate, endDate), formContent, setFormContent, experienceObjectIndex);
                        }} />
                        <img className="inputValidationSymbols validated no-display" src="/images/validated.svg" />
                        <img className="inputValidationSymbols notValidated no-display" src="/images/notValidated.svg" />
                    </div>
                </div>
                <div className="input-cont">
                    <span className="input-title">დამთავრების რიცხვი</span>
                    <div style={{ position: "relative" }}>
                        <input ref={endDateInpt} className="input-small needsEval formInput work-end-date" data-input-for="_endDate" type={"date"} onChange={(e) => {
                            const endDate = e.target.value;
                            const startDate = e.target.closest(".horizontal-two-inputs").querySelector(".work-start-date").value;
                            formStateUpdaterDynamicHTML(_startDateInpt.current, "_startDate", checkDateStart(startDate, endDate), formContent, setFormContent, experienceObjectIndex);
                            formStateUpdaterDynamicHTML(e.target, "_endDate", (existantValue(endDate)&&checkDateStart(startDate, endDate)), formContent, setFormContent, experienceObjectIndex);
                        }} />
                        <img className="inputValidationSymbols validated no-display" src="/images/validated.svg" />
                        <img className="inputValidationSymbols notValidated no-display" src="/images/notValidated.svg" />
                    </div>
                </div>
            </div>
            <div className="input-cont textarea-cont">
                <span className="input-title">როლის აღწერა</span>
                <textarea ref={jobDescriptionInpt} className="input-big needsEval formInput" data-input-for="_jobDescription" onChange={(e) => {
                    formStateUpdaterDynamicHTML(e.target, "_jobDescription", existantValue(e.target.value), formContent, setFormContent, experienceObjectIndex);
                }} />
            </div>
        </div>
    );
}
export default NewExperience;