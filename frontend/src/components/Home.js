import React, { useState } from 'react';
import { Box, Typography } from "@mui/material";
import Cookies from 'js-cookie';

function Home(props) {
    const [username, setUsername] = useState(Cookies.get('username'));

    return (
        <Box style={{ margin: "auto" }} display={"flex"} flexDirection={"column"} justify-content={"center"}
            padding={"4rem"}>
            <Typography variant={"h3"}>HOME PAGE PLACEHOLDER, Welcome back {username}!</Typography>
        </Box>)
}

export default Home;