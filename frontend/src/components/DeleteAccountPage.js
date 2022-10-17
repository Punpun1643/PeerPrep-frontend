import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import { Box, Typography } from "@mui/material";

function DeleteAccountPage(props) {
    return (
        <Box display={"flex"} flexDirection={"column"} padding={"4rem"} margin={"auto"}>
            <Typography variant={"h1"}>"Your account has been successfully deleted."</Typography>
        </Box>
    )
}

export default DeleteAccountPage;