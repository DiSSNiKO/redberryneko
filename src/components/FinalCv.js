import { useEffect } from "react";
import axios from "axios";
import DynamicResumeDisplay from "./DynamicResumeDisplay";
import { removeWhiteSpace } from "../utilities";

function FinalCv(props) {
    const { completeData, profilePicture } = props;
    const equalsPrivate = {
        _name: "name",
        _lastName: "surname",
        _phoneNumber: "phone_number",
        _email: "email",
        selfDesc: "about_me",
    };
    const tfui = {
        "საშუალო სკოლის დიპლომი": 1,
        "ზოგადსაგანმანათლებლო დიპლომი": 2,
        "ბაკალავრი": 3,
        "მაგისტრი": 4,
        "დიქტორი": 5,
        "ასოცირებული ხარისხი": 6,
        "სტუდენტი": 7,
        "კოლეჯი(უხარისხო ხდდ)": 8,
        "სხვა": 9,
    };
    const equalsWorkExp = {
        //_VARNAME for data that needs validation
        _position: "position",
        _employer: "employer",
        _startDate: "start_date",
        _endDate: "due_date",
        _jobDescription: "description"
    };
    const equalsEdu = {
        //_VARNAME for data that needs validation
        _educationLevel: "degree_id",
        _educationInstitution: "institute",
        _endDate: "due_date",
        _educationDescription: "description"
    };
    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }
    function convertToCorrectStructureAndSend(eqPrivate, eqWork, eqEdu) {
        const bigObject = {
            "name": "",
            "surname": "",
            "email": "",
            "phone_number": "",
            "experiences": [],
            "educations": [],
            "image": "lol?",
            "about_me": ""
        }
        const feerst = completeData.firstFormData;
        const sekund = completeData.secondFormData;
        const theerd = completeData.lastFormData;
        feerst._phoneNumber = removeWhiteSpace(feerst._phoneNumber);
        fetch(bigObject.image)
            .then(res => res.blob())
            .then((blob) => {
                Object.keys(feerst).forEach((key) => {
                    bigObject[eqPrivate[key]] = feerst[key];
                });
                bigObject.image = profilePicture
                // bigObject.image = blob;
                sekund.forEach((dataObj) => {
                    let workExperience = {};
                    Object.keys(dataObj).forEach((key) => {
                        workExperience[eqWork[key]] = dataObj[key];
                    })
                    bigObject["experiences"].push(workExperience);
                });
                theerd.forEach((dataObj) => {
                    let education = {};
                    Object.keys(dataObj).forEach((key) => {
                        if (key !== "_educationLevel") {
                            education[eqEdu[key]] = dataObj[key];
                        } else {
                            education[eqEdu[key]] = tfui[dataObj[key]];
                        }

                    })
                    bigObject["educations"].push(education);
                });
                bigObject['image'] = dataURLtoBlob(bigObject.image);
                axios.post("https://resume.redberryinternship.ge/api/cvs", bigObject, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(res => res);
            });
    }
    useEffect(() => {
        convertToCorrectStructureAndSend(equalsPrivate, equalsWorkExp, equalsEdu);
    }, []);

    const ohNo = {
        "name": "დავით",
        "surname": "ონიანი",
        "email": "davitoniani@redberry.ge",
        "phone_number": "+995598123456",
        "experiences": [
            {
                "position": "back-end developer",
                "employer": "Redberry",
                "start_date": "2019/09/09",
                "due_date": "2020/09/23",
                "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ornare nunc dui, a pellentesque magna blandit dapibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis diam nisi, at venenatis dolor aliquet vel. Pellentesque aliquet leo nec tortor pharetra, ac consectetur orci bibendum."
            }
        ],
        "educations": [
            {
                "institute": "თსუ",
                "degree": "სტუდენტი",
                "due_date": "2017/06/25",
                "description": "სამართლის ფაკულტეტის მიზანი იყო მიგვეღო ფართო თეორიული ცოდნა სამართლის არსის, სისტემის, ძირითადი პრინციპების, სამართლებრივი სისტემების, ქართული სამართლის ისტორიული წყაროების, კერძო, სისხლის და საჯარო სამართლის სფეროების ძირითადი თეორიების, პრინციპებისა და რეგულირების თავისებურებების შესახებ."
            }
        ],
        "image": "/storage/images/0rI7LyNRJRrokoSKUTb9EKvNuyYFKOvUmDQWoFt6.png",
        "about_me": "ეს არის აღწერა ჩემს შესახებ"
    }
    const goodMessage = 'რეზიუმე წარმატებით გაგზავნილია (იმედია ლოლ)! 🎂';
    return (
        <div className="final-cv-cont">
            <DynamicResumeDisplay completeData={completeData} profilePicture={profilePicture} />
            <div className="congrats">
                <h2>{goodMessage}</h2>
                <img src="/images/iks.svg" alt="" style={{ position: "absolute", right: "5px", top: "5px", cursor: "pointer" }} onClick={(e) => {
                    e.target.closest(".congrats").style.display = "none"
                }} />
            </div>
        </div>
    );
}

export default FinalCv;