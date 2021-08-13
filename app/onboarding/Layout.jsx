import React from "react";
import "./index.css";

export const Layout = (props) => {
    return (
        <div className="onboarding-container">{props.children}</div>
    )
};