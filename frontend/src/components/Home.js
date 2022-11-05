import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from "@mui/material";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ensureLoggedIn } from '../Util';
import CreateIcon from '@mui/icons-material/Create';
import './Home.css';
import { URL_HISTORY_SVC } from "../configs";
import { STATUS_CODE_OK, STATUS_CODE_UNAUTHORIZED } from "../constants";



function Home(props) {
    const [username, setUsername] = useState(Cookies.get('username'));

    let navigate = useNavigate();

    useEffect(() => {
        ensureLoggedIn(navigate);
        getAttemptedQuestions();
    })

    const getAttemptedQuestions = async () => {
        const res = await axios.get(URL_HISTORY_SVC + '/' + username)
            .catch((err) => {
                console.log(err)
                if (err.response.status === STATUS_CODE_UNAUTHORIZED) {
                    console.err('Unable to get attempted questions!');
                }
            });
        console.log('iguana', res.data);

    }


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