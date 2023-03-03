import React from "react";
// import Logo from '../assets/images/logo3.png'
// import "./spinner.css";

export default function LoadingSpinner() {
    return (
        <div className="loader-container">
            <div className="loadingBg">
                {/* <img src={Logo} alt="" /> */}
                <div className="loader-parent">
                    <div className="loading-bar">
                    </div>
                </div>
            </div>
        </div>
    );
}