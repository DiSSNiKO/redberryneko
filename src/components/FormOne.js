import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FormOne(props){
    const alphabet = 'აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ';
    const [ validationSuccess, setValidationSuccess] = useState(false);
    const { currentForm, setCurrentForm } = props;
    useEffect(()=>{
        if(currentForm!==1){
            setCurrentForm(1);
        }
    });
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
    function finalEval(){

    }
    if(currentForm===1){
        return (
            <form className="current-form">
                <div>
                    <div className="name-lastname">
                        <div className="input-cont">
                            <span className="input-title">სახელი</span>
                            <div style={{position:"relative"}}>
                                <input className="input-small" type={"text"} onChange={(e)=>{
                                    const newValue = e.target.value;
                                    const symbols = e.target.closest('div').querySelectorAll(".inputValidationSymbols");
                                    console.log(symbols)
                                    if(newValue===''){
                                        symbols[0].classList.remove('get-opacity');
                                        symbols[1].classList.remove('get-opacity');
                                        e.target.classList.remove('validation-success');
                                        e.target.classList.remove('validation-fail');
                                        return;
                                    }
                                    if(!nameLastnameValidated(newValue)){
                                        e.target.classList.add('validation-fail');
                                        symbols[1].classList.add('get-opacity');
                                        symbols[0].classList.remove('get-opacity');
                                        e.target.classList.remove('validation-success');
                                    } else {
                                        e.target.classList.add('validation-success');
                                        symbols[0].classList.add('get-opacity');
                                        symbols[1].classList.remove('get-opacity');
                                        e.target.classList.remove('validation-fail');
                                    }
                                }}/>
                                <img className="inputValidationSymbols validated" src="/images/validated.svg"/>
                                <img className="inputValidationSymbols notValidated" src="/images/notValidated.svg"/>
                            </div>
                            <span className="validation-alert">მინიმუმ 2 ასო, ქართული ასოები</span>
                        </div>
                        <div className="input-cont">
                            <span className="input-title">გვარი</span>
                            <div style={{position:"relative"}}>
                                <input className="input-small" type={"text"} onChange={(e)=>{
                                    const newValue = e.target.value;
                                    const symbols = e.target.closest('div').querySelectorAll(".inputValidationSymbols");
                                    console.log(symbols)
                                    if(newValue===''){
                                        symbols[0].classList.remove('get-opacity');
                                        symbols[1].classList.remove('get-opacity');
                                        e.target.classList.remove('validation-success');
                                        e.target.classList.remove('validation-fail');
                                        return;
                                    }
                                    if(!nameLastnameValidated(newValue)){
                                        e.target.classList.add('validation-fail');
                                        symbols[1].classList.add('get-opacity');
                                        symbols[0].classList.remove('get-opacity');
                                        e.target.classList.remove('validation-success');
                                    } else {
                                        e.target.classList.add('validation-success');
                                        symbols[0].classList.add('get-opacity');
                                        symbols[1].classList.remove('get-opacity');
                                        e.target.classList.remove('validation-fail');
                                    }
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
                        <input type={"file"} id="upload-pic-input"/>
                    </div>
                </div>
                <div>
                    <div className="input-cont about-me-cont">
                        <span className="input-title">ჩემ შესახებ &#40;არასავალდებულო&#41;</span>
                        <textarea className="input-big"/>
                    </div>
                    <div className="email-cont input-cont">
                        <div className="input-title">ელ.ფოსტა</div>
                        <input className="input-small" type={"text"} />
                        <div className="validation-alert">უნდა მთავრდებოდეს @redberry.ge-თი</div>
                    </div>
                    <div className="phone-number-cont input-cont">
                        <span className="input-title">მობილურის ნომერი</span>
                        <input className="input-small" type={"text"}/>
                        <span className="validation-alert">უნდა აკმაყოფილებდეს ქართული მობილური ნომრის ფორმატს</span>
                    </div>
                </div>
                <Link to="/resumeForms/2" className="next-form-button no-annoying-style" onClick={(e)=>{
                    if(!validationSuccess){
                        e.preventDefault()
                    }
                }}>შემდეგი</Link>
            </form>
        );
    }
}
export default FormOne;