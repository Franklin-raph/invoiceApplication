import React from "react";
// import Logo from '../assets/images/logo3.png'
// import "./spinner.css";

export default function LoadingSpinner() {
    return (
        <div className="loader-container">
            <div className="loadingBg">
                <i className="ph ph-scroll text-[68px] text-white"></i>
                <div className="text-bold text-white text-5xl mb-2">e-Invoice</div>
                {/* <img src={Logo} alt="" /> */}
                <div className="loader-parent">
                    <div className="loading-bar">
                    </div>
                </div>
            </div>
        </div>
    );
}