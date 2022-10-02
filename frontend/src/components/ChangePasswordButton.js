import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";


function ChangePasswordButton() {
    // redirects to changePasswordPage
    // current represented as a text link but could be other reps too
    return (
        <Box>
            <Button variant="text" component={Link} to="/changePassword">Change Password</Button>
        </Box>
    )
}

export default ChangePasswordButton;