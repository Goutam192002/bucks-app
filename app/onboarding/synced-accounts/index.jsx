import { Layout } from "../Layout";

import React, { useEffect } from "react";

import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import { getLinkedAccounts } from "../../core/thunks/user";
import { getNextRoute } from "../../core/thunks/auth";
import { useHistory } from "react-router-dom";

export const SyncedAccountsView = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const userId = useSelector(state => state.auth.userId);
    const loading = useSelector(state => state.user.linked_accounts.loading);
    const linked_accounts = useSelector(state => state.user.linked_accounts.entity);
    const next = useSelector(state => state.auth.next);

    useEffect(() => {
        if (!userId) {
            history.replace('/onboarding/mobile');
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            dispatch(getLinkedAccounts(userId));
        }
    }, []);

    const navigateToNext = () => {
        dispatch(getNextRoute(userId));
    }

    useEffect(() => {
        history.replace(next);
    }, [next]);

    return (
        <Layout>
            <div className="container">
                <img src="/assets/logo.png" width="50" />
                {
                    ["idle", "loading"].includes(loading) ? (
                        <div className="d-flex flex-column align-center justify-center flex-auto">
                            <div className="spinner" />
                            <div>Syncing your accounts</div>
                        </div>    
                    ) : (
                        linked_accounts.length > 0 ? (
                            <>
                                <div className="synced-accounts-label">Synced Accounts</div>
                                <div className="d-flex synced-accounts-container">
                                    {
                                        linked_accounts.map(
                                            account => (
                                                <div className="client-container">
                                                    <img src={account.clientId.companyLogo} />
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                                <div className="btn-primary" onClick={navigateToNext}>Done</div>
                            </>
                        ) : (
                            <>
                                <div>
                                    No accounts linked with your number. Please reach out to your company representative for help.
                                </div>
                            </>
                        )
                    )
                }
            </div>
        </Layout>
    )
}