import React, { useContext, useEffect } from 'react';
import { SocketContext } from './SocketContext'
import { useNavigate, useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import LogoutIcon from '@mui/icons-material/Logout';
import { ensureLoggedIn } from '../../Util';
// collaboration service
import CodeEditor from '../CollaborationService/CodeEditor';


export default function RoomPage() {

    const { getSocket } = useContext(SocketContext);
    let socket = getSocket();

    const location = useLocation();
    const navigate = useNavigate();

    useEffect( () => {
        ensureLoggedIn(navigate);
    });

    console.log(location);
  
    const roomId = location.state  
                   ? location.state.roomId 
                   : "";

    console.log("roomId" + roomId);
    console.log("socketID " + socket.id);

    const secondClientSocketId = location.state
                                  ? location.state.secondClientSocketId
                                  : "";

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
                        <Box sx={{height: "58vh", display:'flex', justifyContent:'flex-start', alignItems:'center', 
                                  backgroundColor: 'white', border: 1.5, borderColor: 'green', borderRadius: 4}}>
                            <Typography variant="h6" sx={{margin: 2}}> Placeholder question box </Typography> 
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
                        <CodeEditor roomId={roomId} socketIds={[roomId, secondClientSocketId]}/>
                    </Stack>
                </Grid>
            </Grid>
    )
}