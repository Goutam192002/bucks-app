import React from "react";
import { useSelector } from "react-redux";

import "./index.css";

export const ProfileView = () => {
    const user = useSelector(state => state.user.entity);

    return (
        <div className="d-flex flex-column">
            <img src="/assets/profile_pic.png" width="150" className="profile-pic" />

            <div>{user.name}</div>

            <button className="d-flex justify-between align-center profile-button">
                <div>Edit Profile</div>
                <img src="/assets/edit_icon.png" />
            </button>
            <button className="d-flex justify-between align-center profile-button">
                <div>Notifications</div>
                <img src="/assets/edit_icon.png" />
            </button>
            <button className="d-flex justify-between align-center profile-button">
                <div>Settings</div>
                <img src="/assets/edit_icon.png" />
            </button>

            {/* <div>Contact Us</div>
            <div>Sign Out</div>
            <div>Delete Account</div> */}
        </div>
    )
}