import { useEffect } from "react";
import { Link } from "react-router-dom"

function GreetingPage(props) {

    useEffect(() => {
        //useEffect for setting the current form
        if (props.currentForm !== 0) {
            props.setCurrentForm(0)
            sessionStorage.clear();
            props.setCompleteData({
                firstFormData: {},
                secondFormData: [],
                lastFormData: []
            });
        }
    });
    if (props.currentForm === 0) {
        return (
            <div className="greeting-main">
                <div className="greeting-header">
                    <img src="/images/redberrylogo.png"></img>
                </div>
                <Link to={"/resumeForms/1"} className="no-annoying-style add-new-resume">რეზიუმეს დამატება</Link>
            </div>
        );
    }
}

export default GreetingPage;