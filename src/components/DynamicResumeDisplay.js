

function DynamicResumeDisplay(props) {
    const {completeData} = props;
    const firstFormData = completeData.firstFormData;
    return (
        <div className="dynamic-resume-display">
            <div className="private-info-cont">
                <div className="image-info-cont">
                    <div className="info-about-self">
                        <div className="resume-name-and-lastname">
                            <h1>{firstFormData.name}</h1>
                            <h1>{firstFormData.lastName}</h1>
                        </div>
                        <div className="phone-email-cont">
                            <div className="phone-email">
                                <img src="/images/dzagluka.svg" className={firstFormData.email ? "":"no-display"}></img>
                                <span>{firstFormData.email}</span>
                            </div>
                            <div className="phone-email">
                                <img src="/images/foun.svg" className={firstFormData.phoneNumber ? "":"no-display"}></img>
                                <span>{firstFormData.phoneNumber}</span>
                            </div>
                        </div>
                        <div className="self-description">
                            <h1 className={firstFormData.selfDesc ? "":"no-display"} style={{color: "rgb(249, 59, 29)"}}>ჩემ შესახებ</h1>
                            <div className="about-me">{firstFormData.selfDesc}</div>
                        </div>
                    </div>
                    <img src="https://scontent.ftbs5-2.fna.fbcdn.net/v/t1.6435-9/164505026_280516806779798_4525003623650170447_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=jY9PYtwUPB8AX8RSp_B&_nc_ht=scontent.ftbs5-2.fna&oh=00_AfDjnfNC5QymJs0d6hk9ZMOyMYGSZx8wDhhbYTjTALajpw&oe=64073187"/>
                </div>
            </div>
            <div className="work-experience-cont">

            </div>
            <div className="education-info-cont">

            </div>
        </div> 
    );
}

export default DynamicResumeDisplay;