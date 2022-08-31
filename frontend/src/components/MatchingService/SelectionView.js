import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import DifficultyCard from './DifficultyCard';

    
export default function SelectionView() {
    const difficultyLevels = ["Easy", "Medium", "Hard"];

    return (
    <Box sx={{ flexGrow: 1, margin: 'auto'}}>
        <Grid container spacing={10}>
        {difficultyLevels.map(difficultyLevel =>
                 <Grid key={difficultyLevel} item xs={4}>
                     <DifficultyCard difficulty={difficultyLevel}/>
                </Grid>)}
          </Grid>
        </Box>
      );
    }
    



