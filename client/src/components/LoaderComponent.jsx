import React from "react";
// import Logo from '../assets/images/logo3.png'
// import "./spinner.css";

export default function LoadingSpinner() {
    return (
        <div className="loader-container">
            <div className="loadingBg">
                <div className="text-bold text-white text-5xl mb-2">Franklin</div>
                {/* <img src={Logo} alt="" /> */}
                <div className="loader-parent">
                    <div className="loading-bar">
                    </div>
                </div>
            </div>
        </div>
    );
}