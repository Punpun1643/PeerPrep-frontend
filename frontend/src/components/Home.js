import { Box, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useSessionStorage } from "../customHooks";

function Home(props) {
    let navigate = useNavigate();

    const { state } = useLocation();
    const [ username, setUsername ] = useSessionStorage('username', state.username) //|| 'NOT LOGGED IN USER'; // Read values passed on state

    return (
        <Box style={{ margin: "auto" }} display={"flex"} flexDirection={"column"} justify-content={"center"} 
            padding={"4rem"}>
            <Typography variant={"h3"}>HOME PAGE PLACEHOLDER, Welcome back {username}!</Typography>
        </Box>)
}

export default Home;