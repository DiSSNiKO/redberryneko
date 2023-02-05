import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FormOne(props){
    const alphabet = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ- ';
    const [ justMounted, setJustMounted ] = useState(true); 
    const [ formContent, setFormContent ] = useState({
        name: null,
        lastName: null,
        phoneNumber: null,
        email: null,
        selfDesc: null,
        photo: null
    });
    const { currentForm, setCurrentForm, completeData } = props;
    useEffect(()=>{
        if(currentForm!==1){
            setCurrentForm(1);
        }
    });
    useEffect(()=>{
        if(justMounted){
            setJustMounted(false);
        } else {
            props.setCompleteData({
                ...props.completeData,
                firstFormData: formContent
            })
        }
    }, [formContent]);
    useEffect(()=>{
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
        const newObj = formContent;
        Object.entries(completeData.firstFormData).forEach((keyVal)=>{
            if(keyVal[1]!==null){
                newObj[keyVal[0]]=keyVal[1];
            }
        });
        const inputs = document.querySelectorAll('.formInput');
        const objkeys = Object.keys(newObj);
        objkeys.forEach((key, index)=>{
            inputs.forEach((inpt)=>{
                if(inpt.dataset.inputFor===key){
                    inpt.value=newObj[key];
                    if(Object.keys(evalFunctionPairingWithSymbols).includes(key)){
                        validationStyling(inpt, evalFunctionPairingWithSymbols[key]);
                    } else {
                        evalFunctionWithoutSymbols[key](inpt);
                    }
                }
            });
        });
        setFormContent(newObj);
    }, []);
    function nameLastnameValidated(text){
        let forbiddenChar = false;
        for(const char of text){
            if(!alphabet.includes(char)){
                forbiddenChar=true;
            }
        }
        if(text.length>=2&&!forbiddenChar){
            return true;
        } else {
            return false;
        }
    } // 4, 8, 11, 14
    function removeTrailingWhiteSpace(str){
        let firstCharEncountered = false;
        let rivars = str.split('').reverse().join('');
        let newStr = '';
        for(const char of rivars){
            if(char===" "&&!firstCharEncountered){
                continue;
            } else if(char!==" "&&!firstCharEncountered){
                firstCharEncountered=true;
                newStr+=char;
            } else {
                newStr+=char;
            }
        }
        return newStr.split('').reverse().join('');
    }
    function removeWhiteSpace(str){
        let newStr = '';
        for(const char of str){
            if(char!==" "){
                newStr+=char;
            }
        }
        return newStr;
    }
    function selfDescEval(eTarget){
        if(eTarget.value.length>0){
            eTarget.classList.add('validation-success');
        } else {
            eTarget.classList.remove('validation-success');
        }
    }
    function photoEval(){
        return 0;
    }
    function numberEval(phoneNum){
        phoneNum = phoneNum.toString();
        const numbas = [1,2,3,4,5,6,7,8,9,0];
        if(phoneNum.length<17){
            return false;
        } else {
            phoneNum=removeTrailingWhiteSpace(phoneNum);
            if(phoneNum.length!==17){
                return false;
            }
        }
        let invalidNumber = false;
        const spacingIndices = [4, 8, 11, 14];
        const mustBeNumberIndices = [9, 10, 12, 13, 15, 16];
        const allowedPrefixes = [511, 514, 551, 552, 555, 557, 558, 559, 568, 570, 571, 574, 577, 579, 591, 592, 593, 595, 596, 597, 597, 598, 599];
        if(phoneNum.slice(0,4)!=="+995"){
            invalidNumber=true;
        }
        if(!allowedPrefixes.includes(Number(phoneNum.slice(5,8)))){
            invalidNumber=true;
        }
        spacingIndices.forEach((spaceIndx)=>{
            if(phoneNum[spaceIndx]!==" "){
                invalidNumber=true;
            }
        });
        mustBeNumberIndices.forEach((Indx)=>{
            if(!numbas.includes(Number(phoneNum[Indx]))){
                invalidNumber=true;
            }
        });
        if(invalidNumber){
            return false;
        } else {
            return true;
        }
    }
    function emailEval(email){
        const validEmail = "@redberry.ge"
        let atCount = 0;
        let afterAt = "";
        let first = true;
        for(const char of email){
            if(first===false){
                afterAt+=char;
            }
            if(char==='@'){
                atCount++;
                if(first){
                    first=false;
                }
            }
        }
        /* returns true on special characters (?!#$%^& . .) but not specified not to :P */
        if(atCount===1&&afterAt==='redberry.ge'){
            return true;
        } else {
            return false;
        }
    }
    function validationStyling(eTarget, validationFunction){
        //Also returns a boolean to check whether the validation was successful or not.
        const newValue = eTarget.value;
        const symbols = eTarget.closest('div').querySelectorAll(".inputValidationSymbols");
        if(newValue===''){
            symbols[0].classList.remove('get-opacity-for-symbols');
            symbols[1].classList.remove('get-opacity-for-symbols');
            eTarget.classList.remove('validation-success');
            eTarget.classList.remove('validation-fail');
            return false;
        }
        if(!validationFunction(newValue)){
            eTarget.classList.add('validation-fail');
            symbols[1].classList.add('get-opacity-for-symbols');
            symbols[0].classList.remove('get-opacity-for-symbols');
            eTarget.classList.remove('validation-success');
            return false;
        } else {
            eTarget.classList.add('validation-success');
            symbols[0].classList.add('get-opacity-for-symbols');
            symbols[1].classList.remove('get-opacity-for-symbols');
            eTarget.classList.remove('validation-fail');
            return true;
        }
    }
    function formStateUpdater(eTarget, formPart, validationFunction){
        const newObject = {
            ...formContent
        }
        if(validationStyling(eTarget, validationFunction)){
            newObject[formPart] = eTarget.value;
            setFormContent(newObject);
        } else {
            newObject[formPart] = null;
            setFormContent(newObject);
        }
    }
    function finalEval(){
        let successes = 0;
        const evalStatusElems = document.querySelectorAll('.needsEval');
        evalStatusElems.forEach((elem)=>{
            if(elem.classList.contains('validation-success')){
                successes++;
            }
        });
        if(successes===evalStatusElems.length){
            return true;
        } else {
            return false;
        }
    }
    if(currentForm===1){
        return (
            <form className="current-form">
                <div>
                    <div className="name-lastname">
                        <div className="input-cont">
                            <span className="input-title">სახელი</span>
                            <div style={{position:"relative"}}>
                                <input className="input-small needsEval formInput" data-input-for="name" type={"text"} onChange={(e)=>{
                                    e.target.value = removeWhiteSpace(e.target.value);
                                    formStateUpdater(e.target, "name", nameLastnameValidated);
                                }}/>
                                <img className="inputValidationSymbols validated" src="/images/validated.svg"/>
                                <img className="inputValidationSymbols notValidated" src="/images/notValidated.svg"/>
                            </div>
                            <span className="validation-alert">მინიმუმ 2 ასო, ქართული ასოები</span>
                        </div>
                        <div className="input-cont">
                            <span className="input-title">გვარი</span>
                            <div style={{position:"relative"}}>
                                <input className="input-small needsEval formInput" data-input-for="lastName" type={"text"} onChange={(e)=>{
                                    e.target.value = removeWhiteSpace(e.target.value);
                                    formStateUpdater(e.target, "lastName", nameLastnameValidated);
                                }}/>
                                <img className="inputValidationSymbols validated" src="/images/validated.svg"/>
                                <img className="inputValidationSymbols notValidated" src="/images/notValidated.svg"/>
                            </div>
                            <span className="validation-alert">მინიმუმ 2 ასო, ქართული ასოები</span>
                        </div>
                    </div>
                    <div className="upload-pic-cont">
                        <span className="input-title">პირადი ფოტოს ატვირთვა</span>
                        <label htmlFor="upload-pic-input">ატვირთვა</label>
                        <input type={"file"} id="upload-pic-input" data-input-for="photo" className="formInput"/>
                    </div>
                </div>
                <div>
                    <div className="input-cont about-me-cont">
                        <span className="input-title">ჩემ შესახებ &#40;არასავალდებულო&#41;</span>
                        <textarea className="input-big formInput" data-input-for="selfDesc" onChange={(e)=>{
                            selfDescEval(e.target);
                            setFormContent({
                                ...formContent,
                                selfDesc: e.target.value
                            })
                        }}/>
                    </div>
                    <div className="email-cont input-cont">
                        <div className="input-title">ელ.ფოსტა</div>
                        <div style={{position:"relative"}}>
                            <input className="input-small needsEval formInput" data-input-for="email" type={"text"} onChange={(e)=>{
                                e.target.value = removeWhiteSpace(e.target.value);
                                formStateUpdater(e.target, "email", emailEval);
                            }}/>
                            <img className="inputValidationSymbols validated" src="/images/validated.svg"/>
                            <img className="inputValidationSymbols notValidated" src="/images/notValidated.svg"/>
                        </div>
                        <div className="validation-alert">უნდა მთავრდებოდეს @redberry.ge-თი</div>
                    </div>
                    <div className="phone-number-cont input-cont">
                        <span className="input-title">მობილურის ნომერი</span>
                        <div style={{position:"relative"}}>
                            <input className="input-small needsEval formInput" data-input-for="phoneNumber" placeholder="+995 000 00 00 00" type={"text"} onChange={(e)=>{
                                formStateUpdater(e.target, "phoneNumber", numberEval);
                                if(e.target.value.length>=17){
                                    e.target.value=removeTrailingWhiteSpace(e.target.value);
                                }
                            }}/>
                            <img className="inputValidationSymbols validated" src="/images/validated.svg"/>
                            <img className="inputValidationSymbols notValidated" src="/images/notValidated.svg"/>
                        </div>
                        <span className="validation-alert">უნდა აკმაყოფილებდეს ქართული მობილური ნომრის ფორმატს</span>
                    </div>
                </div>
                <Link to="/resumeForms/2" className="next-form-button no-annoying-style" onClick={(e)=>{
                    if(!finalEval()){
                        e.preventDefault()
                    }
                }}>შემდეგი</Link>
            </form>
        );
    }
}
export default FormOne;