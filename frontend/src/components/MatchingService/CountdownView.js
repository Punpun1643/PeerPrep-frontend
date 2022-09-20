import React, { useState } from 'react';
// import {useNavigate} from 'react-router-dom';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Button from '@mui/material/Button';


function CountdownView(props) {

    const modal = {
        position: 'fixed',
        left: '0',
        top: '0',
        right: '0',
        bottom: '0',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }

    const center = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
        width: '50vw',
        fontSize: '20px',
        backgroundColor: '#ffffff'
      };

    const messages = {
        finding: "Finding a match...",
        found: "Match found!",
        notFound: "Sorry, no match found"
    }

    const[message, setMessage] = useState(messages.finding);
    const[matchingStatus, setMatchingStatus] = useState('match-finding');

    if (!props.show) {
        return null;
    }

    const socket = props.socket;
    console.log(socket);

    // const navigate = useNavigate();
    socket.on("matchSuccess", () => setMatchingStatus('match-success'));
    socket.on("matchFailure", () => setMatchingStatus('match-fail'));

    const insideCircle = ({remainingTime}) => {
        if (remainingTime === 0) {
            socket.emit('match-cancel');
            return "Sorry, no match found";
        } else {
             return `${remainingTime}`;
    }}

    if (matchingStatus === 'match-success') {
        setMessage(messages.found);
        // navigate('/roompage');\
    }

    return (
        <div style={modal}>
            <div style={center}>
                <CountdownCircleTimer 
                    size={240}
                    isPlaying
                    duration={30}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[30, 20, 10, 0]}
                    strokeWidth={12}
                    onComplete= {() => {
                        setMessage(messages.notFound);
                        setMatchingStatus('match-fail');
                        console.log('failed');
                    }}
                >
                    {insideCircle}
                </CountdownCircleTimer>  
                {matchingStatus === 'match-fail' && "Try again later!"} 
                {matchingStatus !== 'match-fail' && message} 
                <Button variant="outlined" sx={{margin: 1}} 
                    onClick={() => {
                        setMessage(messages.finding);
                        setMatchingStatus('match-finding');
                        props.handleCloseModal();
                     }}> Cancel </Button>
            </div>
        </div>
    )
}

export default CountdownView;



// import React, { useState } from 'react';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer';
// import Chip from '@mui/material/Chip';


// function CountdownView(props) {


//     const center = {
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         height: '100vh',
//         fontSize: '20px'
//       };
    
    
//     const insideCircle = ({remainingTime}) => {
//         if (remainingTime === 0) {
//             return "Sorry, no match found";
//         } else {
//              return `${remainingTime}`;
//     }}

//     const messages = {
//         finding: "Finding a match...",
//         found: "Match found!",
//         notFound: "Sorry, no match found"
//     }

//     const[message, setMessage] = useState(messages.finding);


//     return (
//         <div style={center}>
//             <CountdownCircleTimer 
//                 size={240}
//                 isPlaying
//                 duration={30}
//                 colors={['#004777', '#F7B801', '#A30000', '#A30000']}
//                 colorsTime={[30, 20, 10, 0]}
//                 strokeWidth={12}
//                 onComplete= {() => {
//                     setMessage(messages.notFound)
//                 }}
//             >
//                 {insideCircle}
//             </CountdownCircleTimer>
//             <Chip sx = {{ margin: 2 }} size="medium" label={message} variant="outlined" />
//         </div>
//     )
// }

// export default CountdownView;
