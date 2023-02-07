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
}
function photoEval() {
    return 0;
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
function validationStyling(eTarget, validationFunction) {
    //Also returns a boolean to check whether the validation was successful or not.
    const newValue = eTarget.value;
    const symbols = eTarget.closest('div').querySelectorAll(".inputValidationSymbols");
    if (newValue === '') {
        symbols[0].classList.remove('get-opacity-for-symbols');
        symbols[1].classList.remove('get-opacity-for-symbols');
        eTarget.classList.remove('validation-success');
        eTarget.classList.remove('validation-fail');
        return false;
    }
    if (!validationFunction(newValue)) {
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
function formStateUpdater(eTarget, formPart, validationFunction, formContent, setFormContent) {
    const newObject = {
        ...formContent
    }
    if (validationStyling(eTarget, validationFunction)) {
        newObject[formPart] = eTarget.value;
        setFormContent(newObject);
    } else {
        newObject[formPart] = null;
        setFormContent(newObject);
    }
}
function finalEval(readyForSubmission, setReadyForSubmission, formNameValidated, evalFunctionPairing, formData) {
    let successes = 0;
    const currentForm = readyForSubmission;
    let totalInNeedOfEval = 0;
    Object.keys(evalFunctionPairing).forEach((key) => {
        if (key[0] === "_") {
            totalInNeedOfEval++;
            if (evalFunctionPairing[key](formData[key])) {
                successes++;
            }
        }
    });
    if (successes === totalInNeedOfEval) {
        currentForm[formNameValidated] = true;
        setReadyForSubmission({ ...currentForm });
        return true;
    } else {
        currentForm[formNameValidated] = false;
        setReadyForSubmission({ ...currentForm });
        return false;
    }
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
                inpt.value = newObj[key];
                if (key[0] === "_") {
                    validationStyling(inpt, evalFunctionPairing[key]);
                } else {
                    evalFunctionPairing[key](inpt);
                }
            }
        });
    });
    finalEval(readyForSubmission, setReadyForSubmission, formNameValidated, evalFunctionPairing, formContent);
    setFormContent(newObj);
}


export { georgianAlphabet, ifExistantGetDataFromMainStateAndCheckValidity, allowedEmailChars, noBannedInputs, emailEval, photoEval, numberEval, nameLastnameValidated, selfDescEval, removeWhiteSpace, removeTrailingWhiteSpace, finalEval, validationStyling, formStateUpdater };