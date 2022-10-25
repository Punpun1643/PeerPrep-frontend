import React, { useEffect, useRef } from 'react';

import Signup from "./UserService/components/Signup";
import { init } from 'ityped';

import './SignupPage.css';

import Grid from '@mui/material/Grid';

function SignupPage() {

    const textRef = useRef();
    useEffect(() => {
        init(textRef.current, {
            showCursor: false,
            strings: ["An enhanced experience for your interview preparation."],
            disableBackTyping: true,
            typeSpeed: 60
        })
    }, []);

    return (
        <React.Fragment>
            <Grid container className="signupPage">
                <Grid item xs={6}>
                    <div className="signUp">
                        <div className="signUpWrapper">
                            <Signup />
                        </div>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div className="tagline">
                        <div className="taglineWrapper">
                            <h1 className="header">PeerPrep</h1>
                            <p className="subHeader" ref={textRef}></p>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default SignupPage;
