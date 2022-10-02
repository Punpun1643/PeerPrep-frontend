import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { URL_USER_SVC } from "../configs";
import { STATUS_CODE_BADREQUEST, STATUS_CODE_OK, STATUS_CODE_UNAUTHORIZED } from "../constants";
import { useSessionStorage } from "../customHooks";

function ChangePasswordPage() {
    const [username, setUsername] = useSessionStorage('username' ,"") // TODO: get from client side
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    const handleChangePassword = async () => {
        setIsSuccess(false)
        const res = await axios.post(URL_USER_SVC + '/changePassword', { username, oldPassword, newPassword })
            .catch((err) => {
                console.log(err)
                // TODO: handle ERROR
                if (err.response.status === STATUS_CODE_UNAUTHORIZED) {
                    console.log('Old password is invalid.')
                } else if (err.response.status === STATUS_CODE_BADREQUEST) {
                    console.log(err.response.data.message)
                } else {
                    console.log(err.response.data.message)
                    console.log('Please try again later')
                }

            })
        if (res && res.status === STATUS_CODE_OK) {
            setIsSuccess(true)
            console.log("Password successfully changed")
        }
    }

    return (
        <Box display={"flex"} flexDirection={"column"} padding={"4rem"} width={"30%"}>
            <Stack direction="column" spacing={2}>
                <Typography variant={"h3"}>Change Password</Typography>
                <TextField 
                    label="Username" 
                    variant="standard"
                    value={username}
                    InputProps={{
                        readOnly: true,
                    }}
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
