import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";

import React, { useState } from 'react';
import {Link} from "react-router-dom";

const DialogBox = (props) => {

    // const [isDialogOpen, setIsDialogOpen] = useState(false)
    // const [dialogTitle, setDialogTitle] = useState("")
    // const [dialogMsg, setDialogMsg] = useState("")
    // const [isSignupSuccess, setIsSignupSuccess] = useState(false)

    // const closeDialog = () => setIsDialogOpen(false)

    // const setSuccessDialog = (msg) => {
    //     setIsDialogOpen(true)
    //     setDialogTitle('Success')
    //     setDialogMsg(msg)
    // }

    // const setErrorDialog = (msg) => {
    //     setIsDialogOpen(true)
    //     setDialogTitle('Error')
    //     setDialogMsg(msg)
    // }

    return (
        <Dialog
            open={props.isDialogOpen}
            onClose={props.closeDialog}
        >
            <DialogTitle>{props.dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.dialogMsg}</DialogContentText>
            </DialogContent>
            <DialogActions>
                {props.isSignupSuccess
                    ? <Button component={Link} to="/login">Log in</Button>
                    : <Button onClick={props.closeDialog}>Done</Button>
                }
            </DialogActions>
        </Dialog>
    );
}

export default DialogBox;
