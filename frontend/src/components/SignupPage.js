import React, { useEffect, useRef } from 'react';

import Signup from "./UserService/components/Signup";
import { init } from 'ityped';

import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import './SignupPage.css';

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
            <Stack 
                direction={{ xs: 'column', sm: 'row' }}
                className="signupPage">
                <Grid xs={6} className="taglineDivider">
                    <div className="tagline">
                        <div className="taglineWrapper">
                            <h1 className="header">PeerPrep</h1>
                            <p className="subHeader" ref={textRef}></p>
                        </div>
                    </div>
                </Grid>
                <Grid xs={6} className="signUpDivier">
                    <div className="signUp">
                        <div className="signUpWrapper">
                            <Signup />
                        </div>
                    </div>
                </Grid>
            </Stack>
        </React.Fragment>
    )
}

export default SignupPage;
