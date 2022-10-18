import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from './SocketContext'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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
    <Box sx={{ flexGrow: 1, margin: 'auto', maxWidth:'100%'}}>
        <Grid container spacing={2}>
        {difficultyLevels.map(difficultyLevel =>
                 <Grid key={difficultyLevel} item xs={'auto'}>
                     <DifficultyCard difficulty={difficultyLevel} handleOpenModal={handleOpenModal}/>
                </Grid>)}
                <CountdownView show={showModal} handleCloseModal={handleCloseModal} />
          </Grid>
        </Box>
      );
    }
    



