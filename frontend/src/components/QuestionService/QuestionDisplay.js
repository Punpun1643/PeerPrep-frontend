import { Box, Typography } from "@mui/material";
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2

function QuestionDisplay({ title, body, image }) {
    return (
        <Grid2 sx={{ whiteSpace: 'pre-line' }}>
            <Typography variant="h6" sx={{ margin: 2 }}> {title} </Typography>
            <Typography variant="body1" display="block" sx={{ margin: 2 }}> {body} </Typography>
            {image !== "" &&
                <Grid2 xs={12}>
                    <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: 'contain' }} />
                </Grid2>
            }
        </Grid2>
    )
}

export default QuestionDisplay;