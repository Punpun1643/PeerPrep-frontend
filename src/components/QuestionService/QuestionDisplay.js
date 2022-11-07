import { Box, Typography } from "@mui/material";

function QuestionDisplay({title, body}) {
    return (
        <Box sx={{whiteSpace: 'pre-line'}}>
            <Typography variant="h6" sx={{margin: 2}}> {title} </Typography> 
            <Typography variant="body1" display="block" sx={{margin: 2}}> {body} </Typography> 
        </Box>
    )
}

export default QuestionDisplay;