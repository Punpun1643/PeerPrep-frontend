import React,{ useContext, useEffect, useRef } from 'react';
import { SocketContext } from './SocketContext'
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import LogoutIcon from '@mui/icons-material/Logout';
import { io } from "socket.io-client";



export default function RoomPage() {

    const { getSocket } = useContext(SocketContext);
    let socket = getSocket();
    

    const location = useLocation();
    const navigate = useNavigate();

    const roomId = location.state.roomId;
    const secondClientSocketId = location.state.secondClientSocketId;

    //breaking question down
    let questionData = location.state.questionData;
    let questionDifficulty = questionData.question.QuestionDifficulty;
    let questionTitle = questionData.question.QuestionTitle;
    let questionBody = questionData.question.QuestionBody;

    console.log("roomId" + roomId);
    console.log("socketID " + socket.id);

    useEffect( () => {
        socket.on("connect", () => {
            console.log(socket.connected); // true
          });
        socket.emit("join-room", roomId);

        return () => {
            socket.disconnect();
            socket.connect();
        } 

    }, []);
    
    function onLeaveHandler() {
        console.log("leaving " + socket.id);
        socket.emit("leave-room", roomId);
        navigate('/selectquestiondifficulty');
    }

    return (
            <Grid container spacing={0.5} sx={{backgroundColor:'white', width:'100vw', height:'100vh', margin: '0px'}}>
                {/* left panel */}
                <Grid item xs={5} md={5}>
                    <Stack spacing={0.5}>
                        {/* room number and leave room button */}
                        <Box sx={{height: "9.5vh", display:'flex', justifyContent:'flex-start', alignItems:'center', backgroundColor: 'white'}}>
                            <Typography variant="h6" sx={{margin: 2}}> Room {roomId} </Typography> 
                            <Button variant="outlined" endIcon={<LogoutIcon />} onClick={onLeaveHandler}>
                              Leave Room 
                            </Button>    
                        </Box>
                        {/* question box */}
                        <Box sx={{height: "58vh", display:'flex', flexDirection: 'column', justifyContent:'flex-start', alignItems:'center', 
                                  backgroundColor: 'white', border: 1.5, borderColor: 'green', borderRadius: 4, overflow: "scroll"}}>
                            <Typography variant="body1" sx={{margin: 2}}> {questionTitle} </Typography> 
                            <Typography variant="caption" display="block" sx={{margin: 2}}> {questionBody} </Typography> 
                        </Box>
                        {/*chat box */}
                        <Box sx={{height: "30vh", display:'flex', justifyContent:'flex-start', alignItems:'center', 
                                  backgroundColor: 'white', border: 1.5, borderColor: 'orange', borderRadius: 4}}>
                            <Typography variant="h6" sx={{margin: 2}}> Placeholder chat box </Typography> 
                        </Box>
                    </Stack>
                </Grid>
                
                {/* right panel */}
                <Grid item xs={6.98} md={6.98} sx={{height: "100vh"}}>
                    <Stack spacing={0}>
                        {/* code box */}
                        <Box sx={{height: "99vh", display:'flex', justifyContent:'flex-start', alignItems:'center', 
                                  backgroundColor: 'white', border: 1.5, borderColor: 'grey', borderRadius: 4}}>
                            <Typography variant="h6" sx={{margin: 2}}> Placeholder code box </Typography> 
                        </Box>
                    </Stack>
                </Grid>

            </Grid>
    )
}