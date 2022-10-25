import {
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";
import React, { useState } from 'react';
import axios from "axios";
import {URL_USER_SVC} from "../../../configs";
import {STATUS_CODE_BADREQUEST, STATUS_CODE_CONFLICT, STATUS_CODE_CREATED} from "../../../constants";
import DialogBox from "./DialogBox";

function Signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [dialogTitle, setDialogTitle] = useState("")
    const [dialogMsg, setDialogMsg] = useState("")
    const [isSignupSuccess, setIsSignupSuccess] = useState(false)

    const handleSignup = async () => {
        setIsSignupSuccess(false)
        const res = await axios.post(URL_USER_SVC, { username, password })
            .catch((err) => {
                if (err.response.status === STATUS_CODE_CONFLICT) {
                    setErrorDialog('This username already exists')
                } else if (err.response.status === STATUS_CODE_BADREQUEST) {
                    setErrorDialog(err.response.data.message)
                } else {
                    setErrorDialog('Please try again later')
                }
            })
        if (res && res.status === STATUS_CODE_CREATED) {
            setSuccessDialog('Account successfully created')
            setIsSignupSuccess(true)
        }
    }

    const closeDialog = () => setIsDialogOpen(false)

    const setSuccessDialog = (msg) => {
        setIsDialogOpen(true)
        setDialogTitle('Success')
        setDialogMsg(msg)
    }

    const setErrorDialog = (msg) => {
        setIsDialogOpen(true)
        setDialogTitle('Error')
        setDialogMsg(msg)
    }

    return (
        <React.Fragment>
            <Box display={"flex"} flexDirection={"column"} width={"100hw"} padding={"4rem"}>
                <Typography variant={"h3"} marginBottom={"2rem"}>Sign Up</Typography>
                <TextField
                    required
                    label="Username"
                    variant="standard"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    sx={{marginBottom: "1rem"}}
                    autoFocus
                />
                <TextField
                    required
                    label="Password"
                    variant="standard"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    helperText="Password should contain at least 8 characters and is alphanumeric"
                    sx={{marginBottom: "2rem"}}
                />

                <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                    <Button variant={"contained"} onClick={handleSignup}>Sign up</Button>
                </Box>
                {/* <Link href="#">Link</Link> */}
                <DialogBox 
                    isDialogOpen={isDialogOpen}
                    closeDialog={closeDialog}
                    dialogTitle={dialogTitle}
                    dialogMsg={dialogMsg}
                    isSignupSuccess={isSignupSuccess}
                />
            </Box>
        </React.Fragment>
    )
}

export default Signup;
