import React, { useState, useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import Link from '@mui/material/Link';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { ensureLoggedIn } from '../Util';

function Home(props) {
    const [username, setUsername] = useState(Cookies.get('username'));

    let navigate = useNavigate();

    useEffect(() => {
        ensureLoggedIn(navigate);
    })

    return (
        <Box style={{ margin: "auto" }} display={"flex"} flexDirection={"column"} justify-content={"center"}
            padding={"4rem"}>
            <Typography variant={"h3"}>Welcome back, {username}!</Typography>
            <Link href="/selectquestiondifficulty">Start the Grind</Link>
        </Box>)
}

export default Home;