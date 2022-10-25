import React from 'react';

import Signup from "./UserService/components/Signup";

import './SignupPage.css';

import Grid from '@mui/material/Grid';

function SignupPage() {
    return (
        <React.Fragment>
        <Grid>
            <div className="signUp">
                <div className="signUpWrapper">
                    <Signup />
                </div>
            </div>
        </Grid>
        </React.Fragment>
    )
}

export default SignupPage;
