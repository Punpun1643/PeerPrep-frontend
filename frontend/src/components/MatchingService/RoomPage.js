import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';



/* PLACEHOLDER ITEM BOX */
const Item = styled(Paper)(({ theme }) => ({
    display: "flex",
    backgroundColor: '#f4eeed',
    padding: theme.spacing(1),
    textAlign: 'center',
    alignItems: "center",
    justifyContent: "center"
  }));

export default function RoomPage() {
    return (
        <Box>
            <Grid container spacing={1}>
                {/* left panel */}
                <Grid item xs={6} md={9}>
                    <Stack spacing={1}>
                        {/* question box */}
                        <Item sx={{height: "35vh"}}>Placeholder question box</Item>
                        {/*code box */}
                        <Item sx={{height: "55vh"}}>Placeholder code box</Item>
                    </Stack>
                </Grid>
                
                {/* right panel */}
                <Grid item xs={6} md={3}>
                    <Stack spacing={1}>
                        {/* chat box */}
                        <Item sx={{height: "85vh"}}>Placeholder chat box</Item>
                        {/* leave box */}
                        <Item sx={{height: "5vh"}}>Placeholder leave box</Item>
                    </Stack>
                </Grid>

            </Grid>
        </Box>
    )
}