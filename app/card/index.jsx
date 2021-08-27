import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCardDetails } from "../core/thunks/user";
import "./index.css";

export const CardDetailsView = () => {
    const card = useSelector(state => state.user.card.entity);
    const loading = useSelector(state => state.user.card.loading);
    const userId = useSelector(state => state.auth.userId);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCardDetails(userId));
    }, []);

    const getFormattedCardNumber = (cardNumber) => {
        cardNumber = cardNumber.replace(/-/g, '');
        return cardNumber;
    }

    return (
        loading !== 'fulfilled' ? (
            <div>Hang On</div>
        ) : (
            <div className="card-details-container">
                <div className="card">
                    <img src="/assets/card/visa.png" />
                    <img src="/assets/card/chip.png" className="chip-container" />
                    <div className="flex-auto"></div>
                    <div className="d-flex flex-column align-end w-100">
                        <img src="/assets/card/bucks_logo.png" />
                        <div className="card-holder-name">{card.cardHolderName}</div>
                    </div>
                </div>
                <div className="card-number">Card Number: {getFormattedCardNumber(card.maskedPan)}</div>
    
                <button className="d-flex justify-between align-center transparent-button">
                    <div>Card Pin</div>
                    <img src="/assets/edit_icon.png" />
                </button>
            </div>
        )
    )
}