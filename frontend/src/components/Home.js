import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from "@mui/material";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { ensureLoggedIn } from '../Util';
import CreateIcon from '@mui/icons-material/Create';
import './Home.css';
import { flexbox } from '@mui/system';

function Home(props) {
    const [username, setUsername] = useState(Cookies.get('username'));

    let navigate = useNavigate();

    useEffect(() => {
        ensureLoggedIn(navigate);
    })

    return (
        <>
            <Box className="homePage">
                <Box sx={{ display: 'flex', flexDirection: 'column', alignContent: 'center' }}>
                    <Typography variant={"h4"} color="white" sx={{ textAlign: 'center', marginTop: 3 }}>Welcome back, {username}!</Typography>
                    <Button
                        href="/selectquestiondifficulty"
                        size="large"
                        variant="contained"
                        color="warning"
                        endIcon={< CreateIcon />}
                        sx={{ marginTop: 2, alignSelf: 'center' }}>Start the Grind</Button>
                </Box>
            </Box>
        </>
    )


}

export default Home;