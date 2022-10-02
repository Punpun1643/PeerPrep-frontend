import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { URL_USER_SVC } from "../configs";
import { STATUS_CODE_BADREQUEST, STATUS_CODE_OK, STATUS_CODE_UNAUTHORIZED } from "../constants";
import { useSessionStorage } from "../customHooks";

function ChangePasswordPage() {
    const [username, setUsername] = useSessionStorage('username' ,"")
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordTwo, setNewPasswordTwo] = useState("")
    const [passwordStrengthMsg, setPasswordStrengthMsg] = useState("")
    const [passwordErrMsg, setPasswordErrMsg] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)

    const handleChangePassword = async () => {
        setIsSuccess(false)
        if (passwordErrMsg !== '' || passwordStrengthMsg !== '') {
            // prevent from sending password
            // error snackbar
        }

        const res = await axios.post(URL_USER_SVC + '/changePassword', { username, oldPassword, newPassword })
            .catch((err) => {
                console.log(err)
                // TODO: handle ERROR -> can use error snackbar again
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
            console.log("Password successfully changed")
            setIsSuccess(true)
            // success message -> can be typography
        }
    }

    const pwRegex = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
    const validatePasswordStrength = (e) => {
        setPasswordStrengthMsg('')
        // client side password validation
        if (!e.target.value) {
            setPasswordStrengthMsg('Please enter a new Password')
        } else if (newPassword === oldPassword) {
            setPasswordStrengthMsg('New password should not be the same as your current password')
        } else if (newPassword.match(pwRegex) === null) {
            setPasswordStrengthMsg('New password does not meet requirement')
        }
    }

    const checkNewPasswordsMatch = (e) => {
        setPasswordErrMsg('')

        if (newPassword !== newPasswordTwo) {
            console.log('pw does not match')
            setPasswordErrMsg('Password does not match new password')
        }
    }

    return (
        <Box display={"flex"} flexDirection={"column"} padding={"4rem"} width={"30%"}>
            <Stack direction="column" spacing={2}>
                <Typography variant={"h3"}>Change Password</Typography>
                <Typography variant={"subtitle1"}>
                    Your new password should be alphanumeric and be at least length 8
                </Typography>
                <TextField 
                    disabled
                    label="Username" 
                    variant="standard"
                    value={username}
                />
                <TextField 
                    required
                    label="Current Password"
                    variant="standard"
                    type="password"
                    placeholder="Type your current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <TextField 
                    required
                    label="New Password"
                    variant="standard"
                    type="password"
                    placeholder="Type your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    onBlur={(e) => {validatePasswordStrength(e); checkNewPasswordsMatch(e);}}
                    error={passwordStrengthMsg !== ''}
                    helperText={passwordStrengthMsg === '' ? '' : passwordStrengthMsg}
                />
                <TextField 
                    required
                    label="Confirm New Password"
                    variant="standard"
                    type="password"
                    placeholder="Type your new password again"
                    value={newPasswordTwo}
                    onChange={(e) => setNewPasswordTwo(e.target.value)}
                    onBlur={checkNewPasswordsMatch}
                    error={passwordErrMsg !== ''}
                    helperText={passwordErrMsg === '' ? '' : passwordErrMsg}
                />
                <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                    <Button variant={"outlined"} onClick={handleChangePassword}>Submit</Button>
                </Box>
                {isSuccess && <Typography>Password has been successfully changed!</Typography>}
                {/* show appropriate ui messages */}
            </Stack>
        </Box>
    ); 
}

export default ChangePasswordPage;
