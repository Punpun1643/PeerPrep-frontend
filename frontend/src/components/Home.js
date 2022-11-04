import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from "@mui/material";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { ensureLoggedIn } from '../Util';
import CreateIcon from '@mui/icons-material/Create';
import './Home.css';

function Home(props) {
    const [username, setUsername] = useState(Cookies.get('username'));

    let navigate = useNavigate();

    useEffect(() => {
        ensureLoggedIn(navigate);
    })

    return (
        <>
            <div className="homePage">
                <Box style={{ margin: "auto" }} display={"flex"} flexDirection={"column"} justify-content={"center"}
                    padding={"4rem"}>
                    <Typography variant={"h3"} color="white">Welcome back, {username}!</Typography>
                    <Button
                        href="/selectquestiondifficulty"
                        size="large"
                        variant="contained"
                        color="warning"
                        endIcon={< CreateIcon />}
                        style={{ "marginTop": 10 }}>Start the Grind </Button>
                </Box>
            </div>
        </>
    )


}

export default Home;