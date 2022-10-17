import React, { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";
import axios from "axios";
import { URL_USER_SVC } from "../configs";
import { useNavigate } from "react-router-dom";

function LogoutPage(props) {
    const [logoutMessage, setLogoutMessage] = useState("You have been signed out successfully!");

    let navigate = useNavigate();

    const ensureLoggedIn = async () => {
        await axios.post(URL_USER_SVC + '/auth',
            { withCredentials: true, credentials: 'include' })
            .catch((err) => {
                console.log(err)
                navigate("/login")
            });
    }

    useEffect(() => {
        ensureLoggedIn();
    })


    return (
        <Box display={"flex"} flexDirection={"column"} padding={"4rem"} margin={"auto"}>
            <Typography variant={"h1"}>{logoutMessage}</Typography>
        </Box>
    )
}

export default LogoutPage;