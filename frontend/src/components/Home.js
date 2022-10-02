import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import { STATUS_CODE_OK, STATUS_CODE_UNAUTHORIZED, STATUS_CODE_FORBIDDEN } from "../constants";
import { URL_USER_SVC } from "../configs";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSessionStorage } from "../customHooks";

function Home(props) {
    let navigate = useNavigate();

    //const { state } = useLocation();
    const [ username ] = useSessionStorage('username', 'NOT LOGGED IN USER') //|| 'NOT LOGGED IN USER'; // Read values passed on state

    const handleLogout = async () => {
        const res = await axios.post(URL_USER_SVC + '/logout',
            { username },
            { withCredentials: true, credentials: 'include' })
            .catch((err) => {
                console.log(err)
                // Either cookie or token expired
                if (err.response.status === STATUS_CODE_UNAUTHORIZED ||
                    err.response.status === STATUS_CODE_FORBIDDEN) {
                    navigate("/login");
                }
            })

        if (res && res.status === STATUS_CODE_OK) {
            console.log(`${username} logout success`)
            navigate("/logout", { state: { success: true } }) // placeholder until merge with matching
        }
    }

    return (
        <Box style={{ margin: "auto" }} display={"flex"} flexDirection={"column"} justify-content={"center"} 
            padding={"4rem"}>
            <Typography variant={"h3"}>HOME PAGE PLACEHOLDER, Welcome back {username}!</Typography>
            <Button variant="outlined" component={Link} to="/changePassword">Change Password</Button>
            <Button variant="outlined" onClick={handleLogout}>Logout</Button>
        </Box>)
}

export default Home;