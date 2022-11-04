import { Box, IconButton, Typography } from "@mui/material";
import AutorenewIcon from '@mui/icons-material/Autorenew';

function QuestionDisplay({title, body, handleOpenRefreshModal, handleCloseRefreshModal}) {

const refreshHandler = () => {
    console.log('refresh-button clicked');
    handleOpenRefreshModal();
}

    return (
        <Box sx={{whiteSpace: 'pre-line'}}>
            <Box sx={{ display: 'flex',
                       flexDirection: 'row',
                       alignItems: 'center', 
                       padding: 2, 
                       gap: 1}}>           
                <Typography variant="h6"> {title} </Typography> 
                <IconButton onClick={refreshHandler} sx={{backgroundColor: '#F0F0F0'}}>
                    <AutorenewIcon></AutorenewIcon>
                </IconButton>
            </Box>
                <Typography variant="body1" display="block" sx={{margin: 2}}> {body} </Typography> 
        </Box>
    )
}

export default QuestionDisplay;