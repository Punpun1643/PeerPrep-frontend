import { Box, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { STATUS_CODE_OK } from "../constants";

function ChangePasswordPage() {
    const [username, setUsername] = useState("") // TODO: get from client side
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    const handleChangePassword = async () => {
        setIsSuccess(false)
        const res = await axios.post(URL_USER_SVC + '/changePassword', { username, oldPassword, newPassword })
            .catch((err) => {
                // TODO: handle ERROR
                // if (err.response.status === STATUS_CODE_CONFLICT) {
                //     setErrorDialog('This username already exists')
                // } else {
                //     setErrorDialog('Please try again later')
                // }
            })
        if (res && res.status === STATUS_CODE_OK) {
            setSuccessDialog('Account successfully created')
            setIsSuccess(true)
        }
    }

    return (
        <Box>
            <Stack direction="column" spacing="2">
                <Typography>Change Password</Typography>
                <TextField 
                    label="username" 
                    variant="standard"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    // InputProps={{
                    //     readOnly: true,
                    // }}
                />
                <TextField 
                    label="Old Password"
                    variant="standard"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <TextField 
                    label="New Password"
                    variant="standard"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                    <Button variant={"outlined"} onClick={handleChangePassword}>Submit</Button>
                </Box>
                <Typography></Typography>
                {/* show appropriate ui messages */}
            </Stack>
        </Box>
    ); 
}

export default ChangePasswordPage;
