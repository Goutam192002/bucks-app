import React from "react";

import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { CardDetailsView } from "../card";
import { HomeView } from "../home";
import { ProfileView } from "../profile";

export const TabNavigation = () => {
    const location = useLocation();
    const history = useHistory();

    const navigate = (path) => () => {
        history.push(path);
    }

    return (
        <div className="container bg-primary">
            <img src="/assets/logo.png" width="65" />
            <div style={{flex: 1, flexDirection: 'column'}}>
                <Switch>
                    <Route path="/card">
                        <CardDetailsView />
                    </Route>
                    <Route path="/profile">
                        <ProfileView />
                    </Route>  
                    <Route path="/">
                        <HomeView />
                    </Route>
                </Switch>
            </div>
            <div className="bottom-navigation">
                <button className={`nav-button ${location.pathname === '/' && 'nav-button-selected'}`} onClick={navigate('/')}>
                    <img src="/assets/home.svg" />
                    {
                        location.pathname === "/" && (<div>Home</div>)
                    }
                </button>
                <button className={`nav-button ${location.pathname === '/card' && 'nav-button-selected'}`} onClick={navigate('/card')}>
                    <img src="/assets/card.svg" />
                    {
                        location.pathname === "/card" && (<div>Card</div>)
                    }
                </button>
                <button className={`nav-button ${location.pathname === '/profile' && 'nav-button-selected'}`} onClick={navigate('/profile')}>
                    <img src="/assets/account.svg" />
                    {
                        location.pathname === "/profile" && (<div>Profile</div>)
                    }
                </button>
            </div>
        </div>
    )
};