import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from "@mui/material/Typography";
import LogoutIcon from '@mui/icons-material/Logout';



/* PLACEHOLDER ITEM BOX */
const Item = styled(Paper)(({ theme }) => ({
    display: 'flex',
    backgroundColor: '#f4eeed',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: "center"
  }));

export default function RoomPage() {
    return (
        //<Box sx={{backgroundColor: 'blue'}}
            <Grid container spacing={0} sx={{backgroundColor:'black', width:'100vw', height:'100vh', margin: '0px'}}>
                {/* left panel */}
                <Grid item xs={8} md={9}>
                    <Stack spacing={0}>
                        {/* room number and leave room button */}
                        <Box sx={{height: "10vh", display:'flex', justifyContent:'flex-start', alignItems:'center', backgroundColor: 'white'}}>
                            <Typography variant="h6" sx={{margin: 2}}> Room 110 </Typography> 
                            <Button variant="outlined" endIcon={<LogoutIcon />}>
                              Leave Room 
                            </Button>    
                        </Box>
                        {/* question box */}
                        <Item sx={{height: "50vh"}}>Placeholder question box</Item>
                        {/*code box */}
                        <Item sx={{height: "40vh"}}>Placeholder code box</Item>
                    </Stack>
                </Grid>
                
                {/* right panel */}
                <Grid item xs={4} md={3} sx={{height: "100vh"}}>
                    <Stack spacing={0}>
                        {/* chat box */}
                        <Item sx={{height: "100vh"}}>Placeholder chat box</Item>
                    </Stack>
                </Grid>

            </Grid>
       // </Box>
    )
}