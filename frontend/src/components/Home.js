import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from "@mui/material";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ensureLoggedIn } from '../Util';
import CreateIcon from '@mui/icons-material/Create';
import './Home.css';
import { URL_HISTORY_SVC } from "../configs";

function Home(props) {
    const [username, setUsername] = useState(Cookies.get('username'));
    const [questionRecords, setQuestionRecords] = useState([]);
    const [easyQuestions, setEasyQuestions] = useState([]);
    const [mediumQuestions, setMediumQuestions] = useState([]);
    const [hardQuestions, setHardQuestions] = useState([]);


    let navigate = useNavigate();

    useEffect(() => {
        ensureLoggedIn(navigate);
        //getAttemptedQuestions();
        getEasyAttemptedQuestions();
        getMediumAttemptedQuestions();
        getHardAttemptedQuestions();
    })

    const getAttemptedQuestions = async () => {
        await axios.get(URL_HISTORY_SVC + '/' + username)
            .then(response => {
                setQuestionRecords(response.data.data.records);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const getEasyAttemptedQuestions = async () => {
        await axios.get(URL_HISTORY_SVC + '/' + username + '?level=easy')
            .then(response => {
                setEasyQuestions(response.data.data.filteredRecords);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const getMediumAttemptedQuestions = async () => {
        await axios.get(URL_HISTORY_SVC + '/' + username + '?level=medium')
            .then(response => {
                setMediumQuestions(response.data.data.filteredRecords);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const getHardAttemptedQuestions = async () => {
        await axios.get(URL_HISTORY_SVC + '/' + username + '?level=hard')
            .then(response => {
                setHardQuestions(response.data.data.filteredRecords);
            })
            .catch((err) => {
                console.log(err)
            });
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
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly',  }}>
                    <Typography variant={"h4"} color="white" sx={{ textAlign: 'center', marginTop: 3 }}>{easyQuestions.length}</Typography>
                    <Typography variant={"h4"} color="white" sx={{ textAlign: 'center', marginTop: 3 }}>{mediumQuestions.length}</Typography>
                    <Typography variant={"h4"} color="white" sx={{ textAlign: 'center', marginTop: 3 }}>{hardQuestions.length}</Typography>

                </Box>
            </Box>
        </>
    )


}

export default Home;