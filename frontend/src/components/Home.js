import React, { useState } from 'react';
import { Box, Typography } from "@mui/material";
import Cookies from 'js-cookie';
import axios from "axios";
import { URL_USER_SVC } from "../configs";
import { useNavigate } from "react-router-dom";

function Home(props) {
    const [username, setUsername] = useState(Cookies.get('username'));

    let navigate = useNavigate();

    const ensureLoggedIn = async () => {
        await axios.post(URL_USER_SVC + '/auth',
            { withCredentials: true, credentials: 'include' })
            .catch((err) => {
                console.log(err)
                navigate("/login")
            });
    }

    ensureLoggedIn();

    return (
        <Box style={{ margin: "auto" }} display={"flex"} flexDirection={"column"} justify-content={"center"}
            padding={"4rem"}>
            <Typography variant={"h3"}>HOME PAGE PLACEHOLDER, Welcome back {username}!</Typography>
        </Box>)
}

export default Home;