import React from "react";
import { Layout } from './Layout';

export const AuthLayout = (props) => {
    return (
        <Layout>
            <div>
                <img src="/assets/onboarding/shape.svg" />
                <div className="welcome-label">Welcome</div>
            </div>
            {props.children}
        </Layout>
    );
}