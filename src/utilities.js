//USEFUL VARIABLES


//Very scuffed text filters
const allowedEmailChars = ".@0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const georgianAlphabet = "აბგდევზთიკლმნოპჟრსტუფქღყშჩცძწჭხჯჰ- ";




//VALIDATION FUNCTIONS
function nameLastnameValidated(text) {
    if (!text) {
        return false;
    }
    let forbiddenChar = false;
    for (const char of text) {
        if (!georgianAlphabet.includes(char)) {
            forbiddenChar = true;
        }
    }
    if (text.length >= 2 && !forbiddenChar) {
        return true;
    } else {
        return false;
    }
} // 4, 8, 11, 14
function removeTrailingWhiteSpace(str) {
    let firstCharEncountered = false;
    let rivars = str.split('').reverse().join('');
    let newStr = '';
    for (const char of rivars) {
        if (char === " " && !firstCharEncountered) {
            continue;
        } else if (char !== " " && !firstCharEncountered) {
            firstCharEncountered = true;
            newStr += char;
        } else {
            newStr += char;
        }
    }
    return newStr.split('').reverse().join('');
}
function removeWhiteSpace(str) {
    let newStr = '';
    for (const char of str) {
        if (char !== " ") {
            newStr += char;
        }
    }
    return newStr;
}
function selfDescEval(eTarget) {
    if (eTarget.value.length > 0) {
        eTarget.classList.add('validation-success');
    } else {
        eTarget.classList.remove('validation-success');
    }
    return true;
}
async function photoEval(file) {
    const imgElem = document.querySelector("#profile-pic");
    if (!file || !imgElem) {
        return false;
    }
    return true;
}
function numberEval(phoneNum) {
    if (!phoneNum) {
        return false;
    }
    phoneNum = phoneNum.toString();
    const numbas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    if (phoneNum.length < 17) {
        return false;
    } else {
        phoneNum = removeTrailingWhiteSpace(phoneNum);
        if (phoneNum.length !== 17) {
            return false;
        }
    }
    let invalidNumber = false;
    const spacingIndices = [4, 8, 11, 14];
    const mustBeNumberIndices = [9, 10, 12, 13, 15, 16];
    const allowedPrefixes = [511, 514, 551, 552, 555, 557, 558, 559, 568, 570, 571, 574, 577, 579, 591, 592, 593, 595, 596, 597, 597, 598, 599];
    if (phoneNum.slice(0, 4) !== "+995") {
        invalidNumber = true;
    }
    if (!allowedPrefixes.includes(Number(phoneNum.slice(5, 8)))) {
        invalidNumber = true;
    }
    spacingIndices.forEach((spaceIndx) => {
        if (phoneNum[spaceIndx] !== " ") {
            invalidNumber = true;
        }
    });
    mustBeNumberIndices.forEach((Indx) => {
        if (!numbas.includes(Number(phoneNum[Indx]))) {
            invalidNumber = true;
        }
    });
    if (invalidNumber) {
        return false;
    } else {
        return true;
    }
}
function noBannedInputs(eTarget, allowedChars) {
    let valueBeforeChange = '';
    if (eTarget.value.length > 0) {
        valueBeforeChange = eTarget.value.slice(0, -1);
    }
    if (!allowedChars.includes(eTarget.value.slice(-1))) {
        eTarget.value = valueBeforeChange;
    }
}
function emailEval(email) {
    if (!email) {
        return false;
    }
    const validEmail = "redberry.ge"
    let atCount = 0;
    let afterAt = "";
    let first = true;
    for (const char of email) {
        if (first === false) {
            afterAt += char;
        }
        if (char === '@') {
            atCount++;
            if (first) {
                first = false;
            }
        }
    }
    if (atCount === 1 && afterAt === validEmail) {
        return true;
    } else {
        return false;
    }
}
function validationStyling(eTarget, validationFunctionResult) {
    //Also returns a boolean to check whether the validation was successful or not.
    const newValue = eTarget.value;
    let additionalSymbols = true;
    const symbols = eTarget.closest('div').querySelectorAll(".inputValidationSymbols");
    if (symbols.length === 0) {
        additionalSymbols = false
    }
    if (additionalSymbols) {
        if (newValue === '') {
            symbols[0].classList.remove('get-opacity-for-symbols');
            symbols[1].classList.remove('get-opacity-for-symbols');
            eTarget.classList.remove('validation-success');
            eTarget.classList.remove('validation-fail');
            return false;
        }
        if (!validationFunctionResult) {
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
    } else {
        if (newValue === '') {
            eTarget.classList.remove('validation-success');
            eTarget.classList.remove('validation-fail');
            return false;
        }
        if (!validationFunctionResult) {
            eTarget.classList.add('validation-fail');
            eTarget.classList.remove('validation-success');
            return false;
        } else {
            eTarget.classList.add('validation-success');
            eTarget.classList.remove('validation-fail');
            return true;
        }
    }
}

function formStateUpdater(eTarget, formPart, validationFunctionResult, formContent, setFormContent) {
    const newObject = {
        ...formContent
    }
    validationStyling(eTarget, validationFunctionResult)
    newObject[formPart] = eTarget.value;
    setFormContent(newObject);
}
function formStateUpdaterDynamicHTML(eTarget, formPart, validationFunctionResult, formContent, setFormContent, changeIndex) {
    const arai = [...formContent];
    const newObject = {
        ...formContent[changeIndex]
    }
    validationStyling(eTarget, validationFunctionResult);
    newObject[formPart] = eTarget.value;
    arai[changeIndex] = newObject;
    setFormContent(arai);
}
function formStateUpdaterDynamicHTMLForButtons(eTarget, formPart, validationFunctionResult, formContent, setFormContent, changeIndex) {
    const arai = [...formContent];
    const newObject = {
        ...formContent[changeIndex]
    }
    validationStyling(eTarget, validationFunctionResult);
    newObject[formPart] = eTarget.textContent;
    arai[changeIndex] = newObject;
    setFormContent(arai);
}


const finalEval = (readyForSubmission, setReadyForSubmission, formNameValidated, evalFunctionPairing, formData) => {
    const currentForm = readyForSubmission;
    if(typeof(formData)==="object"){
        if(Object.keys(formData).length===0){
            if (currentForm[formNameValidated]) {
                currentForm[formNameValidated] = false;
                setReadyForSubmission({ ...currentForm });
            }
            return false;
        }
    }
    let totalInNeedOfEval = 0;
    if (!Array.isArray(formData)) { //this way it SHOULD work for all 3.
        formData = [formData];
    }    Object.keys(formData[0]).forEach((key) => {
        if (key[0] === "_") {
            totalInNeedOfEval++;
        }
    });
    let successesArray = [];
    Array.from(formData).forEach((dataObj) => {
        let successes = 0;
        Object.keys(evalFunctionPairing).forEach((key) => {
            if (Object.keys(dataObj).includes(key) && key[0] === "_") {
                if (key === "_startDate") {
                    if (evalFunctionPairing[key](dataObj["_startDate"], dataObj["_endDate"])) {
                        successes++;
                    }
                } else if (key === "_endDate" && dataObj['_startDate']) {
                    if(dataObj["_startDate"]){
                        if(evalFunctionPairing['_startDate'](dataObj["_startDate"], dataObj["_endDate"])&&dataObj[key]){
                            successes++;
                        }
                    }
                } else {
                    if (key[0] === "_") {
                        if (evalFunctionPairing[key](dataObj[key])) {
                            successes++;
                        }
                    } else {
                        if (dataObj[key]) {
                            successes++;
                        }
                    }
                }

            }
        });
        successesArray.push(successes);
    });
    if (successesArray.every((val) => { return val === totalInNeedOfEval })) {
        if (!currentForm[formNameValidated]) {
            currentForm[formNameValidated] = true;
            setReadyForSubmission({ ...currentForm });
        }
        return true;
    } else {
        if (currentForm[formNameValidated]) {
            currentForm[formNameValidated] = false;
            setReadyForSubmission({ ...currentForm });
        }
        return false;
    }
}
function globalFinalEval(completeData, readyForSubmission, setReadyForSubmission){
    const evalFunctionPairingWork = {
        _position: moreThanTwo,
        _employer: moreThanTwo,
        _startDate: checkDateStart,
        _jobDescription: existantValue,
        _endDate: existantValue
    }
    const evalFunctionPairingPrivate = {
        _name: nameLastnameValidated,
        _lastName: nameLastnameValidated,
        _email: emailEval,
        _phoneNumber: numberEval,
        selfDesc: selfDescEval,
        _photo: photoEval
    }
    const evalFunctionPairingEdu = {
        _educationLevel: moreThanTwo,
        _educationInstitution: existantValue,
        _endDate: existantValue,
        _educationDescription: existantValue
    }
    finalEval(readyForSubmission, setReadyForSubmission, "workExpValidated", evalFunctionPairingWork, completeData.secondFormData);
    finalEval(readyForSubmission, setReadyForSubmission, "educationValidated", evalFunctionPairingEdu, completeData.lastFormData);
    finalEval(readyForSubmission, setReadyForSubmission, "privateInfoValidated", evalFunctionPairingPrivate, completeData.firstFormData);
}
function ifExistantGetDataFromMainStateAndCheckValidity(evalFunctionPairing, formContent, setFormContent, readyForSubmission, setReadyForSubmission, formNameValidated, completeData) {
    const newObj = formContent;
    Object.entries(completeData.firstFormData).forEach((keyVal) => {
        if (keyVal[1] !== null) {
            newObj[keyVal[0]] = keyVal[1];
        }
    });
    const inputs = document.querySelectorAll('.formInput');
    const objkeys = Object.keys(newObj);
    objkeys.forEach((key) => {
        inputs.forEach((inpt) => {
            if (inpt.dataset.inputFor === key) {
                if (key !== "_photo") {
                    inpt.value = newObj[key];
                }
                if (key[0] === "_") {
                    if (key !== "_photo") {
                        validationStyling(inpt, evalFunctionPairing[key](inpt.value));
                    } else {
                        evalFunctionPairing[`${key}`](newObj[`${key}`]);
                    }
                } else {
                    evalFunctionPairing[key](inpt);
                }
            }
        });
    });
    finalEval(readyForSubmission, setReadyForSubmission, formNameValidated, evalFunctionPairing, formContent);
    setFormContent(newObj);
}

//form 2

const moreThanTwo = (str) => {
    if (!str) {
        return false;
    }
    if (str.length < 2) {
        return false;
    } else {
        return true;
    }
}
function checkDateStart(_startDate, endDate) {
    if (!_startDate) {
        return false;
    }

    if (!endDate) {
        return true;
    }
    const startdatesplit = _startDate.split('-');
    const enddatesplit = endDate.split('-');

    if (Number(startdatesplit[0]) > Number(enddatesplit[0])) {

        return false;
    } else if (Number(startdatesplit[0]) === Number(enddatesplit[0])) {
        if (Number(startdatesplit[1]) > Number(enddatesplit[1])) {

            return false;
        } else if (Number(startdatesplit[1]) === Number(enddatesplit[1])) {
            if (Number(startdatesplit[2]) > Number(enddatesplit[2])) {

                return false;
            }
        }
    }
    return true;
}

function existantValue(val) {
    if (val) {
        return true;
    } else {
        return false;
    }
}

function getDataFromMain(evalFunctionPairing, formContent, setFormContent, readyForSubmission, setReadyForSubmission, formNameValidated, completeData, chosenForm) {
    const newArr = completeData[chosenForm];
    if (newArr.length === 0) {
        return 0;
    }
    finalEval(readyForSubmission, setReadyForSubmission, formNameValidated, evalFunctionPairing, formContent);
    setFormContent(newArr);
}
export {
    //form 1
    allowedEmailChars, noBannedInputs, emailEval, photoEval,
    numberEval, nameLastnameValidated, selfDescEval,
    //form 2
    checkDateStart,

    //form 3
    formStateUpdaterDynamicHTMLForButtons,

    //general
    removeWhiteSpace, removeTrailingWhiteSpace, finalEval, validationStyling, formStateUpdater,
    georgianAlphabet, ifExistantGetDataFromMainStateAndCheckValidity, moreThanTwo, formStateUpdaterDynamicHTML,
    getDataFromMain, existantValue, globalFinalEval

};