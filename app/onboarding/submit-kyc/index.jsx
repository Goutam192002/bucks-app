import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { submitKyc } from "../../core/thunks/user";
import { Layout } from "../Layout";

import "./index.css";

export const KycFormView = () => {
    const [valid, setValid] = useState(false);
    const [form, setForm] = useState({
        name: '',
        dob: '',
        gender: 'MALE',
        pan: ''
    });
    const [dirty, setDirty] = useState({
        name: false,
        dob: false,
        pan: false,
        gender: true,
    });
    const [errors, setErrors] = useState({
        name: '',
        dob: '',
        proof_of_identity: '',
        pan: '',
        gender: ''
    });

    const dispatch = useDispatch();
    const history = useHistory();

    const next = useSelector(state => state.auth.next);
    const userId = useSelector(state => state.auth.userId);
    const mobile = useSelector(state => state.auth.mobile);

    useEffect(() => {
        if (!userId || !mobile) {
            history.replace('/');
        }
    }, [userId, mobile]);

    useEffect(() => {
        history.push(next);
    }, [next]);

    const onChange = (fieldName) => (e) => {
        const update = { ...form };
        update[fieldName] = e.target.value;

        if (!dirty[fieldName]) {
            setDirty({
                ...dirty,
                [fieldName]: true
            });
        }
        setForm(update);
    }

    const isDobValid = (value) => {
        const [date, month, year] = value.split('/');

        if (parseInt(date) > 0 && parseInt(date) < 32 && parseInt(month) > 0 && parseInt(month) < 13 && year && year.length === 4) {
            return true;
        }
        return false;
    }
    
    useEffect(() => {
        const errorUpdates = {...errors};

        if (dirty["name"]) {
            errorUpdates["name"] = form.name ? '' : 'Name cannot be empty';
        }

        if (dirty["dob"]) {
            errorUpdates["dob"] = isDobValid(form.dob) ? '' : 'DOB Must be in the format DD/MM/YYYY';
        }

        if (dirty["pan"]) {
            errorUpdates["pan"] = form.pan ? '': 'Please enter a valid PAN Number';
        }

        setErrors(errorUpdates);
    }, [form]);

    useEffect(() => {
        let valid = false;

        const hasErrors = Object.values(errors).some(value => value !== '');
        const isDirty = Object.values(dirty).every(value => value === true);

        if (isDirty) {
            valid = !hasErrors;
        }

        setValid(valid);
    }, [errors]);

    const onFormSubmit = (e) => {
        e.preventDefault();
        dispatch(
            submitKyc({
                userId,
                mobile,
                dob: form.dob,
                name: form.name,
                pan: form.pan,
                gender: form.gender
            })
        );
    }
    
    return (
        <Layout>
            <form className="kyc-form" onSubmit={onFormSubmit}>
                <div className="kyc-form-label">Tell us more...</div>

                <div className="form-group">
                    <div className="form-label">Name</div>
                    <input type="text" className={`input-field ${errors.name && "input-invalid"}`} placeholder="Enter your name" value={form.name} onChange={onChange('name')} />
                    <span className="error-feedback">{errors.name}</span>
                </div>

                <div className="form-group">
                    <div className="form-label">Date of birth</div>
                    <input type="text" className={`input-field ${errors.dob && "input-invalid"}`}  placeholder="DD/MM/YYYY" value={form.dob} onChange={onChange('dob')} />
                    <span className="error-feedback">{errors.dob}</span>
                </div>

                <div className="form-group">
                    <div className="form-label">Gender</div>
                    <div className="d-flex radio-input">
                        <input type="radio" name="proof" value="MALE" checked={form.gender === "MALE"} onChange={onChange('gender')} />
                        <div>Male</div>
                    </div>
                    <div className="d-flex radio-input">
                        <input type="radio" name="proof" value="FEMALE" checked={form.gender === "FEMALE"} onChange={onChange('gender')} />
                        <div>Female</div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="form-label">PAN</div>
                    <input type="text" className={`input-field ${errors.pan && "input-invalid"}`} placeholder="Enter your PAN" value={form.pan} onChange={onChange('pan')} />
                    <span className="error-feedback">{errors.pan}</span>
                </div>

                <button className="btn-primary" disabled={!valid}>Done</button>
            </form>
        </Layout>
    )
}