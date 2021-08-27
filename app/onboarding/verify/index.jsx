import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { verify } from "../../core/thunks/auth";

import { AuthLayout } from "../AuthLayout";

import "./index.css";

export const VerifyMobileView = () => {
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [focusedIndex, setFocusIndex] = useState(0);

    const mobile = useSelector(state => state.auth.mobile);
    const next = useSelector(state => state.auth.next);
    const status = useSelector(state => state.auth.loading);
    const error = useSelector(state => state.auth.error);

    const otpContainer = createRef();
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        history.replace(next);
    }, [next]);

    useEffect(() => {
        if (!mobile) {
            history.replace('/');
        }
    }, [mobile]);

    useEffect(() => {
        if (otpContainer) {
            otpContainer.current.children[focusedIndex].focus();
        }
    }, [focusedIndex]);

    useEffect(() => {
        const emptyIndex = otp.findIndex(value => !value);

        if (emptyIndex === -1) {
            setFocusIndex(5);
        } else {
            setFocusIndex(emptyIndex);
        }
    }, [otp]);

    const onOtpInput = (index) => (e) => {
        const update = [...otp];
        update[index] = e.target.value;
        setOtp(update);
    }

    const handleBackspace = (index) => (e) => {
        if (["Backspace", "Delete"].includes(e.key) && index !== 0 && !otp[index]) {
            const update = [...otp];
            if (index - 1 > 0) {
                update[index - 1] = '';
            } else {
                update[0] = '';
            }
            setOtp(update);
        }
    }

    const submitOtp = (e) => {
        e.preventDefault();
        dispatch(verify({ mobile, code: otp.join('') })).then(() => {
            setOtp(['', '', '', '', '', '']);
        });
    }

    return (
        <AuthLayout>
            {
                !otp.join('') && status === "error" && (
                    <div className="error">
                        { error }
                    </div>
                )
            }
            <form onSubmit={submitOtp} className="d-flex flex-column verify-form">
                <div className="text-center">
                    <div className="otp-sent-label">OTP Sent To</div>
                    <div className="mobile-number">+91 - {mobile}</div>
                </div>
                <div className="d-flex otp-container justify-center" ref={otpContainer}>
                    <input className="flex-auto otp-input" maxLength="1" autoFocus onChange={onOtpInput(0)} onKeyDown={handleBackspace(0)} value={otp[0]} />
                    <input className="flex-auto otp-input" maxLength="1" onChange={onOtpInput(1)} onKeyDown={handleBackspace(1)} value={otp[1]} />
                    <input className="flex-auto otp-input" maxLength="1" onChange={onOtpInput(2)} onKeyDown={handleBackspace(2)} value={otp[2]} />
                    <input className="flex-auto otp-input" maxLength="1" onChange={onOtpInput(3)} onKeyDown={handleBackspace(3)} value={otp[3]} />
                    <input className="flex-auto otp-input" maxLength="1" onChange={onOtpInput(4)} onKeyDown={handleBackspace(4)} value={otp[4]} />
                    <input className="flex-auto otp-input" maxLength="1" onChange={onOtpInput(5)} onKeyDown={handleBackspace(5)} value={otp[5]} />
                </div>
                <button type="submit" className="btn-primary" disabled={otp.join('').length < 6}>Proceed</button>
            </form>
        </AuthLayout>
    );
}