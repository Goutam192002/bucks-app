import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSummary, getTransactions } from "../core/thunks/user";
import './index.css';

export const HomeView = () => {
    const dispatch = useDispatch();

    const userId = useSelector(state => state.auth.userId);
    const summary = useSelector(state => state.user.summary.entity);
    const summaryStatus = useSelector(state => state.user.summary.loading);
    const transactions = useSelector(state => state.user.transactions.entity);
    const transactionsStatus = useSelector(state => state.user.transactions.loading);

    useEffect(() => {
        dispatch(getSummary(userId));
        dispatch(getTransactions(userId));
    }, []);

    return (
        <div className="d-flex flex-column home-container">
            <div className="d-flex justify-between balance-container">
                <div>
                    <div className="your-balance-label">Your balance</div>
                    <div className="balance-amount">₹ {summary.balance}</div>
                </div>
                <img src="/assets/money.png" />
            </div>
            <div className="d-flex summary-row">
                <div className="d-flex justify-between summary-container">
                    <div>
                        <div className="summary-type-label">Income</div>
                        <div className="summary-amount">₹ {summary.income}</div>
                    </div>
                    <img src="/assets/arrow_up.png" width="30" height="30" />
                </div>
                <div className="d-flex justify-between summary-container">
                    <div>
                        <div className="summary-type-label">Expenses</div>
                        <div className="summary-amount">₹ {summary.expense}</div>
                    </div>
                    <img src="/assets/arrow_down.png" width="30" height="30" />
                </div>
            </div>
            <div className="d-flex justify-between">
                <div className="transactions-label">Transactions</div>
            </div>
            <div className="transactions-container">
                {
                    transactions.length > 0 && transactions.map(
                        transaction => (
                            <div className="d-flex transaction-row">
                                <img src={transaction.meta_thumbnail} width="60" height="60" />
                                <div className="flex-auto transaction-details">
                                    <div className="transaction-summary">{transaction.meta_description}</div>
                                    <div className="transaction-timestamp">{new Date(transaction.timestamp).toDateString()}</div>
                                    <div className="transaction-tag">Received</div>
                                </div>
                                <div className="transaction-amount">Rs. {transaction.amount}</div>
                            </div>    
                        )
                    )
                }
            </div>
        </div>
    )
};