import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DifficultyCard from './DifficultyCard';
import CountdownView from './CountdownView';
import { useNavigate } from "react-router-dom";
import { ensureLoggedIn } from '../../Util';


export default function SelectionView() {

    const difficultyLevels = ["easy", "medium", "hard"];
    const [showModal, setShowModal] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
      ensureLoggedIn(navigate);
    })


    const handleOpenModal = () => {
      setShowModal(true);
  
    }

    const handleCloseModal = (e) => {
      setShowModal(false);
    }

    return (
    <Box backgroundColor={"#132439"} height={"100vh"} display={"flex"} flexDirection={"column"} padding={"4rem"}>
      <Box display={"flex"} flexDirection={"column"} sx={{alignItems: 'center', flexGrow: 1, margin: 'auto', maxWidth:'100%'}}>
          <Typography margin="16px" variant="h6" color={"#ffffff"}> Choose a difficulty level </Typography>
          <Grid container spacing={2}>
          {difficultyLevels.map(difficultyLevel =>
                  <Grid key={difficultyLevel} item xs={'auto'}>
                      <DifficultyCard difficulty={difficultyLevel} handleOpenModal={handleOpenModal}/>
                  </Grid>)}
                  <CountdownView show={showModal} handleCloseModal={handleCloseModal} />
            </Grid>
          </Box>
    </Box>
      );
    }
    



