import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { initiateAuth } from "../../core/thunks/auth";

import { AuthLayout } from "../AuthLayout";

import './index.css';

export const MobileFormView = () => {
    const [mobile, setMobile] = useState('');
    const status = useSelector(state => state.auth.loading);
    const next = useSelector(state => state.auth.next);

    const dispatch = useDispatch();
    const history = useHistory();

    const onInputMobileNumber = (event) => {
        const mobileNumber = event.target.value.replace(/[^0-9]/g, '');
        setMobile(mobileNumber)
    }

    const submitMobileNumber = (event) => {
        event.preventDefault();
        dispatch(initiateAuth(mobile));
    }

    useEffect(() => {
        if (status === "fulfilled") {
            history.replace(next);
        }
    }, [status]);

    return (
        <AuthLayout>
            <form className="d-flex flex-column mobile-form" onSubmit={submitMobileNumber}>
                <div className="mobile-input-label">Enter your number</div>
                <div className="d-flex input-group align-center">
                    <img src="/assets/flag_india.png" width="25" style={{marginRight: '4px'}} />
                    <div style={{marginRight: '4px'}}>+91</div>
                    <input autoFocus type="text"
                        onInput={onInputMobileNumber}
                        type="tel"
                        maxLength="10"
                        className="mobile-input" 
                        placeholder="Enter your mobile number"
                        value={mobile}
                    />
                </div>
                <button type="submit" className="btn-primary" disabled={mobile.length !== 10}>Proceed</button>
            </form>
        </AuthLayout>
    );
}