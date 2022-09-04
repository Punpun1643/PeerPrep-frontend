import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import sapling from '../../images/sapling.png';
import youngtree from '../../images/youngtree.png'
import tree from '../../images/tree.png';



export default function DifficultyCard(props) {

  const handleFindMatchClick = (e) => {
    e.preventDefault();
    console.log(`${props.difficulty} button was clicked`);
  }

  const difficultyImageMap = { "Easy" : sapling, "Medium" : youngtree, "Hard" : tree}
  const difficultyTextMap = { "Easy" : "Beginner-friendly",
                              "Medium" : "Intermediate Questions", 
                              "Hard" : "Tests advanced concepts"}
  const difficultyColorMap = { "Easy": "#4caf50",
                               "Medium": "#ffca28",
                               "Hard": "#d32f2f"
                              }

  return (
    <Card sx={{minWidth: 200, maxWidth: 320, borderTop: '3px solid', borderTopColor: difficultyColorMap[props.difficulty]}}>
      <Typography variant="h5" color="424242" sx={{textAlign: 'center', paddingTop: '1em', paddingBottom: '1em'}}>
        {props.difficulty} 
      </Typography>
        <CardMedia
          component="img"
          height="70"
          width="70"
          image={difficultyImageMap[props.difficulty]}
          alt="plant"
          sx ={{objectFit: "contain"}}
    
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary"  sx={{textAlign: 'center'}} >
            {difficultyTextMap[props.difficulty]}
          </Typography>

        </CardContent>
        <CardActions>
        <Button size="medium" variant="outlined"  sx={{margin: 'auto', textTransform:'none', color: "#424242", borderColor: "#424242"}}
          onClick={handleFindMatchClick}>
          Find Match</Button>
      </CardActions>
    </Card>
  );
}
