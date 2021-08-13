import React, { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch, useHistory } from "react-router-dom";
import { TabNavigation } from "./core/TabNavigation";
import { MobileFormView } from "./onboarding/mobile";
import { VerifyMobileView } from "./onboarding/verify";
import { KycFormView } from './onboarding/submit-kyc';
import { SyncedAccountsView } from "./onboarding/synced-accounts";
import { useSelector } from "react-redux";

const App = () => {
  const logged = useSelector((state) => state.auth.logged);

  return(
    <BrowserRouter>
      {
        <Switch>
          <Route path="/onboarding/mobile">
            <MobileFormView />
          </Route>
          <Route path="/onboarding/verify">
            <VerifyMobileView />
          </Route>
          <Route path="/onboarding/submit-kyc">
            <KycFormView />
          </Route>
          <Route path="/onboarding/sync-accounts">
            <SyncedAccountsView />
          </Route>
          {
            logged ? (
              <Route path="/">
                <TabNavigation />
              </Route>
            ): (
              <Route path="/">
                <Redirect to="/onboarding/mobile" />
              </Route>
            )
          }
        </Switch>  
      }
    </BrowserRouter>
  );
}

export default App;