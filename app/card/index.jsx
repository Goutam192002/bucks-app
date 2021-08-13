import React from "react";
import { useSelector } from "react-redux";
import "./index.css";

export const CardDetailsView = () => {
    const card = useSelector(state => state.user.entity.card);

    return (
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

            <button className="d-flex justify-between align-center transparent-button">
                <div>Card Pin</div>
                <img src="/assets/edit_icon.png" />
            </button>
        </div>
    );
}