import DynamicResumeDisplay from "./DynamicResumeDisplay";

function FinalCv(props) {
    const { completeData } = props
    return (
        <div className="final-cv-cont">
            <DynamicResumeDisplay completeData={completeData} />
            <div className="congrats">

            </div>
        </div>
    );
}

export default FinalCv;