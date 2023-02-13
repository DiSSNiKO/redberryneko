import { photoEval } from "../utilities";

function DynamicResumeDisplay(props) {
    const { completeData } = props;
    const firstFormData = completeData.firstFormData;
    return (
        <div className="dynamic-resume-display">
            <div className="private-info-cont">
                <div className="image-info-cont">
                    <div className="info-about-self">
                        <div className="resume-name-and-lastname">
                            <h1>{firstFormData._name}</h1>
                            <h1>{firstFormData._lastName}</h1>
                        </div>
                        <div className="phone-email-cont">
                            <div className="phone-email">
                                <img src="/images/dzagluka.svg" className={firstFormData._email ? "" : "no-display"}></img>
                                <span>{firstFormData._email}</span>
                            </div>
                            <div className="phone-email">
                                <img src="/images/foun.svg" className={firstFormData._phoneNumber ? "" : "no-display"}></img>
                                <span>{firstFormData._phoneNumber}</span>
                            </div>
                        </div>
                        <div className="self-description">
                            <h1 className={firstFormData.selfDesc ? "" : "no-display"} style={{ color: "rgb(249, 59, 29)" }}>ჩემ შესახებ</h1>
                            <div className="about-me">{firstFormData.selfDesc}</div>
                        </div>
                    </div>
                    <img id={"profile-pic"} className={firstFormData._photo ? "" : "no-display"} src={photoEval(firstFormData._photo) ? firstFormData._photo : ""} />
                </div>
            </div>
            <div className="work-experience-cont">
                <h1 className={`experience-title ${Object.keys(completeData.secondFormData).length!==0 ? "" : "no-display"}`}>გამოცდილება</h1>
                {completeData['secondFormData'].map((expObj, kei) => {
                    return (
                        <div key={kei} className="work-experience">
                            <div style={{ display: 'flex' }}>
                                <h1 className="posemp-title" style={{ marginRight: "1rem" }}>{expObj['_position']}{expObj['_position'] ? "," : ""}</h1>
                                <h1 className="posemp-title">{expObj['_employer']}</h1>
                            </div>
                            <h1 className="work-dates-title">{expObj['_startDate']}{expObj['_startDate'] ? " - " : ""}{expObj['_endDate']}</h1>
                            <h2 className="jobdesc-title">{expObj['_jobDescription']}</h2>
                        </div>
                    );
                })}
            </div>
            <div className="education-cont">
                <h1 className={`experience-title ${Object.keys(completeData.lastFormData).length!==0 ? "" : "no-display"}`}>განათლება</h1>
                {completeData['lastFormData'].map((expObj, kei) => {
                    return (
                        <div key={kei} className="work-experience">
                            <div style={{ display: 'flex' }}>
                                <h1 className="posemp-title" style={{ marginRight: "1rem" }}>{expObj['_educationInstitution']}{expObj['_educationInstitution'] ? "," : ""}</h1>
                                <h1 className="posemp-title">{expObj['_educationLevel']}</h1>
                            </div>
                            <h1 className="work-dates-title">{expObj['_endDate']}</h1>
                            <h2 className="jobdesc-title">{expObj['_educationDescription']}</h2>
                        </div>
                    );
                })}
            </div>
            <img src="/images/sussybaka.png" alt="" />
        </div>
    );
}

export default DynamicResumeDisplay;