import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@mui/material";

import React from 'react';
import {Link} from "react-router-dom";

const DialogBox = (props) => {
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
